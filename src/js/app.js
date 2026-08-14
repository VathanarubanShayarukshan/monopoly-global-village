import { storage } from './storage.js';
import { gameEngine } from './game-engine.js';
import { multiplayer } from './multiplayer.js';
import { audio } from './audio.js';
import { UIManager, animateDice, showCardOverlay, hideCardOverlay } from './ui.js';
import { PLAYER_TOKENS, STARTING_MONEY } from './constants.js';
import { BotManager, BOT_NAMES } from './bots.js';

class App {
  constructor() {
    this.storage = storage;
    this.engine = gameEngine;
    this.multiplayer = multiplayer;
    this.ui = new UIManager(this);
    this.bots = new BotManager(this);
    this.isMultiplayer = false;
    this.isHost = false;
    this.myPlayerId = null;
    this.roomId = null;
    this.lastFinishedId = null;
    this.gameScreenShown = false;
  }

  async init() {
    await this.storage.init();
    await audio.init();
    this.myPlayerId = this.storage.playerId;

    this.engine.onChange((state) => {
      this.ui.renderGame(state);
      // Save on EVERY state change (local + online host) so property data is never lost
      if (this.isHost) {
        this.storage.saveGame(state);
        if (this.isMultiplayer) this.multiplayer.broadcastState(state);
      }
      this.bots.tick();
      this.checkGameEnd(state);
    });

    this.multiplayer.onStateSync = (state) => {
      this.engine.loadState(state);
      if (!this.gameScreenShown) {
        this.gameScreenShown = true;
        this.ui.showScreen('game-screen');
      }
    };

    this.multiplayer.onStatus = (status, detail) => {
      this.ui.setConnStatus(status, detail);
    };

    // Host: provide current state to newly connected players
    this.multiplayer.onHostStateRequest = () => this.engine.getState();

    this.multiplayer.onPlayerJoin = () => {
      this.ui.setConnStatus('peers', this.multiplayer.getConnectedCount() - 1);
    };

    this.multiplayer.onMessage = (msg) => {
      if (msg.type === 'player-joined') {
        if (this.isHost && msg.player) {
          const added = this.engine.addPlayer(
            msg.player.playerId || msg.player.id,
            msg.player.name || 'Guest'
          );
          if (added) {
            this.ui.showToast(`${added.name} joined the room!`, 'success');
            this.syncState();
          } else {
            this.ui.showToast(`${msg.player.name} joined the room!`, 'success');
          }
        } else if (!this.isHost) {
          this.ui.showToast(`${msg.player?.name} joined the room!`, 'success');
        }
      }
      if (msg.type === 'chat') {
        this.ui.addChatMessage(msg);
      }
      if (msg.type === 'action' && this.isHost) {
        this.processRemoteAction(msg.action, msg.playerId);
      }
    };

    this.bindGlobalEvents();
    this.checkRoomUrl();
    this.ui.renderLobby();
    this.registerServiceWorker();
    this._installBeforeUnloadBank();
  }

  bindGlobalEvents() {
    document.getElementById('btn-new-game')?.addEventListener('click', () => {
      this.ui.renderSetup();
      this.ui.showScreen('setup-screen');
    });

    document.getElementById('btn-setup-online')?.addEventListener('click', () => {
      this.ui.renderSetup();
      this.ui.showScreen('setup-screen');
    });

    document.getElementById('btn-join-game')?.addEventListener('click', () => {
      this.ui.showScreen('join-screen');
    });

    document.getElementById('btn-create-room')?.addEventListener('click', () => this.createOnlineGame());
    document.getElementById('btn-join-room')?.addEventListener('click', () => this.joinOnlineGame());
    document.getElementById('btn-start-local')?.addEventListener('click', () => this.startLocalGame());
    document.getElementById('btn-back-lobby')?.addEventListener('click', () => this.ui.showScreen('lobby-screen'));
    document.getElementById('btn-back-lobby2')?.addEventListener('click', () => this.ui.showScreen('lobby-screen'));

    document.getElementById('btn-export')?.addEventListener('click', () => this.exportGame());
    document.getElementById('btn-import')?.addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file')?.addEventListener('change', (e) => this.importGame(e));

    document.getElementById('btn-save-name')?.addEventListener('click', () => {
      const name = document.getElementById('player-name-input').value.trim();
      if (name) {
        this.storage.setPlayerName(name);
        this.ui.showToast('Name saved!', 'success');
      }
    });

    document.querySelectorAll('.avatar-option').forEach(el => {
      el.addEventListener('click', () => {
        this.storage.setAvatar(el.textContent);
        document.getElementById('player-avatar').textContent = el.textContent;
      });
    });

    document.getElementById('btn-sound')?.addEventListener('click', () => {
      const on = audio.toggle();
      document.getElementById('btn-sound').textContent = on ? '🔊' : '🔇';
    });

    document.getElementById('btn-music')?.addEventListener('click', () => {
      audio.toggleMusic();
      document.getElementById('btn-music').classList.toggle('active');
    });

    document.getElementById('btn-atm')?.addEventListener('click', () => {
      this.ui.renderAtm();
      this.ui.showModal('atm-modal');
    });
    document.getElementById('btn-close-atm')?.addEventListener('click', () => this.ui.showModal('atm-modal', false));
    document.getElementById('btn-atm-send')?.addEventListener('click', () => this.handleAtmSend());
    document.getElementById('btn-atm-deposit')?.addEventListener('click', () => this.handleAtmDeposit());
    document.getElementById('btn-atm-withdraw')?.addEventListener('click', () => this.handleAtmWithdraw());

    document.getElementById('btn-chat')?.addEventListener('click', () => this.ui.showModal('chat-modal'));
    document.getElementById('btn-close-chat')?.addEventListener('click', () => this.ui.showModal('chat-modal', false));
    document.getElementById('btn-chat-send')?.addEventListener('click', () => this.sendChat());
    document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendChat();
    });

    document.getElementById('btn-copy-invite')?.addEventListener('click', () => this.ui.copyInviteUrl());
    document.getElementById('btn-close-invite')?.addEventListener('click', () => this.ui.showModal('invite-modal', false));
    document.getElementById('btn-close-props')?.addEventListener('click', () => this.ui.showModal('property-modal', false));

    document.getElementById('btn-show-ranks')?.addEventListener('click', () => this.ui.renderRanks());
    document.getElementById('btn-close-ranks')?.addEventListener('click', () => this.ui.showModal('rank-modal', false));

    document.addEventListener('click', (e) => {
      if (e.target.closest('.dice-area') || e.target.closest('.die-img')) this.handleDiceClick();
    });

    document.getElementById('btn-menu')?.addEventListener('click', () => this.ui.showModal('menu-modal'));
    document.getElementById('btn-close-menu')?.addEventListener('click', () => this.ui.showModal('menu-modal', false));
    document.getElementById('btn-menu-export')?.addEventListener('click', () => this.exportGame());
    document.getElementById('btn-menu-quit')?.addEventListener('click', () => this.quitToLobby());

    document.getElementById('saved-games-list')?.addEventListener('click', async (e) => {
      const loadId = e.target.dataset.load;
      const deleteId = e.target.dataset.delete;
      if (loadId) {
        const game = await this.storage.loadGame(loadId);
        if (game) {
          this.engine.loadState(game);
          this.ui.showScreen('game-screen');
        }
      }
      if (deleteId) {
        await this.storage.deleteGame(deleteId);
        this.ui.renderSavedGames();
      }
    });

    document.getElementById('card-overlay')?.addEventListener('click', () => hideCardOverlay());
  }

  checkRoomUrl() {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      document.getElementById('join-room-code').value = room;
      this.ui.showScreen('join-screen');
      this.ui.showToast(`Room ${room} detected — enter your name and join!`, 'info');
    }
  }

  startLocalGame() {
    const inputs = document.querySelectorAll('#player-slots input[type="text"]');
    const names = [...inputs].map(i => i.value.trim()).filter(Boolean);
    if (names.length < 1) {
      this.ui.showToast('Enter at least your name!', 'error');
      return;
    }

    const botCount = this.ui.getBotCount();
    const allNames = [...names, ...BOT_NAMES.slice(0, botCount)];
    const wallet = this.storage.getWalletData();

    this.isMultiplayer = false;
    this.isHost = true;
    this.gameScreenShown = true;
    this.bots.enabled = botCount > 0;
    this.engine.createGame(allNames, this.myPlayerId, {
      startingMoney: STARTING_MONEY,
      walletProperties: wallet.properties,
      botCount
    });
    this.engine.startGame();
    this.ui.showScreen('game-screen');
    if (wallet.properties.length > 0) this.ui.showToast(`🏠 ${wallet.properties.length} wallet properties restored!`, 'info');
    if (botCount > 0) this.ui.showToast(`🤖 ${botCount} bots joined the game!`, 'info');
    audio.play('click');
  }

  async createOnlineGame() {
    if (!this.multiplayer.isAvailable()) {
      this.ui.showToast('Online mode needs internet — the PeerJS library could not load.', 'error');
      return;
    }
    if (!navigator.onLine) {
      this.ui.showToast('You appear to be offline — online mode needs an internet connection.', 'error');
      return;
    }

    const inputs = document.querySelectorAll('#player-slots input[type="text"]');
    let names = [...inputs].map(i => i.value.trim()).filter(Boolean);
    if (names.length < 1) names = [this.storage.getPlayerProfile().name || 'Host'];

    this.roomId = this.multiplayer.generateRoomId();
    this.isMultiplayer = true;
    this.isHost = true;
    this.gameScreenShown = true;

    this.engine.createGame(names, this.myPlayerId);
    await this.storage.saveRoom({ id: this.roomId, hostId: this.myPlayerId, createdAt: Date.now() });
    try {
      await this.multiplayer.initPeer(this.roomId, true);
    } catch (err) {
      this.ui.showToast('Room created but online server unreachable — invite links need internet.', 'error');
      console.error(err);
      this.ui.showScreen('game-screen');
      this.ui.showInviteModal(this.multiplayer.getShareUrl(this.roomId));
      return;
    }
    this.multiplayer.initBroadcastChannel(this.roomId);

    const url = this.multiplayer.getShareUrl(this.roomId);
    try { history.replaceState(null, '', url); } catch (e) { console.warn('replaceState failed:', e); }

    this.ui.showScreen('game-screen');
    this.ui.showInviteModal(url);
    this.ui.showToast('Room created! Share the link so friends can join before you press Start.', 'info');
    audio.play('click');
  }

  async joinOnlineGame() {
    const roomId = document.getElementById('join-room-code').value.trim().toUpperCase();
    const name = document.getElementById('join-player-name').value.trim() || this.storage.getPlayerProfile().name;

    if (!roomId) {
      this.ui.showToast('Enter a room code!', 'error');
      return;
    }
    if (!this.multiplayer.isAvailable()) {
      this.ui.showToast('Online mode needs internet — the PeerJS library could not load.', 'error');
      return;
    }

    this.storage.setPlayerName(name);
    this.roomId = roomId;
    this.isMultiplayer = true;
    this.isHost = false;
    this.gameScreenShown = false;

    this.ui.showToast('Connecting to room…', 'info');
    try {
      await this.multiplayer.joinRoom(roomId);
      this.multiplayer.initBroadcastChannel(roomId);
      this.ui.showToast('Connected to room! Waiting for the host to start…', 'success');
      audio.play('click');
    } catch (err) {
      this.ui.showToast(err.message || 'Could not connect. Check the room code and try again.', 'error');
      console.error(err);
    }
  }

  syncState() {
    const state = this.engine.getState();
    if (this.isHost) {
      this.multiplayer.broadcastState(state);
      this.storage.saveGame(state);
    } else {
      this.multiplayer.broadcastAction({ type: 'sync-request' });
    }
  }

  /** Route an action through the host when online, or run it locally in solo games */
  dispatch(action) {
    if (this.isMultiplayer && !this.isHost) {
      this.multiplayer.broadcastAction(action);
      return;
    }
    this.executeAction(action);
  }

  /** Host-authoritative executor — solo games and online hosts both run here */
  executeAction(action) {
    switch (action?.type) {
      case 'roll': {
        const r = this.engine.rollDice();
        if (r) {
          audio.play('diceRoll');
          animateDice(r.dice[0], r.dice[1]);
          if (r.tripleDoubles) audio.play('jail');
        }
        break;
      }
      case 'buy': if (this.engine.buyProperty()) audio.play('buy'); break;
      case 'decline': this.engine.declineProperty(); break;
      case 'draw': {
        const sp = this.engine.getSpace(this.engine.currentPlayer().position);
        const t = action.cardType || (sp?.type === 'chance' ? 'chance' : 'chest');
        const card = this.engine.drawCard(t);
        showCardOverlay(card, t);
        audio.play('card');
        setTimeout(hideCardOverlay, 2500);
        break;
      }
      case 'jailFine': this.engine.payJailFine(); break;
      case 'jailCard': this.engine.useJailFreeCard(); break;
      case 'payDebt': this.engine.retryDebtPayment(); break;
      case 'bankrupt':
        this.engine.declareBankruptcy(action.creditorId || this.engine.state?.lastAction?.creditorId);
        audio.play('jail');
        break;
      case 'endTurn': this.engine.endTurnManual(); break;
      case 'start': this.engine.startGame(); break;
      case 'bid':
        if (action.amount > 0 && this.engine.placeBid(action.playerId, action.amount)) audio.play('money');
        break;
      case 'endAuction': this.engine.endAuction(); break;
      case 'build': if (this.engine.buildHouse(action.spaceId)) audio.play('buy'); break;
      case 'sell': if (this.engine.sellHouse(action.spaceId)) audio.play('money'); break;
      case 'mortgage': if (this.engine.mortgage(action.spaceId)) audio.play('money'); break;
      case 'unmortgage': if (this.engine.unmortgage(action.spaceId)) audio.play('money'); break;
      case 'transfer': {
        const res = this.engine.transferMoneyToPlayer(action.fromId, action.toId, action.amount, 'ATM transfer');
        if (res.ok) {
          this.ui.showToast(`Sent $${action.amount.toLocaleString()}`, 'success');
          audio.play('money');
        } else {
          this.ui.showToast(res.error, 'error');
        }
        break;
      }
      default:
        break;
    }
    this.syncState();
  }

  /** Host processes actions coming from online guests */
  processRemoteAction(action, playerId) {
    if (!this.isHost) return;
    if (action?.type === 'sync-request') { this.syncState(); return; }
    this.executeAction({ ...action, playerId });
  }

  handleRoll() { this.dispatch({ type: 'roll' }); }

  /** Dice in the board center act as the roll button (click to roll) */
  handleDiceClick() {
    const state = this.engine.getState();
    if (!state || state.phase !== 'playing') return;
    if (state.turnPhase !== 'roll') return;
    if (this.isMultiplayer && !this.ui.isLocalPlayerTurn(state)) return;
    this.handleRoll();
  }
  handleBuy() { this.dispatch({ type: 'buy' }); }
  handleDecline() { this.dispatch({ type: 'decline' }); }

  handleDrawCard() {
    const space = this.engine.getSpace(this.engine.currentPlayer().position);
    const type = space?.type === 'chance' ? 'chance' : 'chest';
    this.dispatch({ type: 'draw', cardType: type });
  }

  handleJailFine() { this.dispatch({ type: 'jailFine' }); }
  handleJailCard() { this.dispatch({ type: 'jailCard' }); }
  handleBankrupt() {
    this.dispatch({ type: 'bankrupt', creditorId: this.engine.state?.lastAction?.creditorId });
  }
  handleEndTurn() { this.dispatch({ type: 'endTurn' }); }
  handleStart() { this.dispatch({ type: 'start' }); }

  handleBid() {
    const amount = parseInt(document.getElementById('bid-amount')?.value);
    if (amount > 0) this.dispatch({ type: 'bid', playerId: this.myPlayerId, amount });
  }

  handleEndAuction() { this.dispatch({ type: 'endAuction' }); }

  /** ATM: move game money into the persistent wallet (cookie) */
  handleAtmDeposit() {
    if (this.isMultiplayer && !this.isHost) {
      this.ui.showToast('Wallet ATM is local-only — online guests use the host wallet.', 'error');
      return;
    }
    const amount = parseInt(document.getElementById('atm-amount').value);
    const state = this.engine.getState();
    if (!state) { this.ui.showToast('Start a game first!', 'error'); return; }
    const me = state.players.find(p => p.id === this.myPlayerId);
    if (!me || me.money < amount || amount <= 0) {
      this.ui.showToast('Not enough game money!', 'error');
      return;
    }
    this.engine.adjustMoney(this.myPlayerId, -amount, 'ATM deposit to wallet');
    this.engine.adjustWalletFunds(this.myPlayerId, -amount);
    this.storage.addWallet(amount);
    this.ui.showToast(`💰 $${amount.toLocaleString()} deposited to wallet`, 'success');
    this.ui.renderAtm();
    this.syncState();
  }

  /** ATM: move wallet money (cookie) back into the game */
  handleAtmWithdraw() {
    if (this.isMultiplayer && !this.isHost) {
      this.ui.showToast('Wallet ATM is local-only — online guests use the host wallet.', 'error');
      return;
    }
    const amount = parseInt(document.getElementById('atm-amount').value);
    const wallet = this.storage.getWallet();
    if (amount <= 0 || amount > wallet) {
      this.ui.showToast('Not enough wallet balance!', 'error');
      return;
    }
    const state = this.engine.getState();
    if (!state) { this.ui.showToast('Start a game first!', 'error'); return; }
    this.engine.adjustMoney(this.myPlayerId, amount, 'ATM withdraw from wallet');
    this.engine.adjustWalletFunds(this.myPlayerId, amount);
    this.storage.setWallet(wallet - amount);
    this.ui.showToast(`💵 $${amount.toLocaleString()} withdrawn from wallet`, 'success');
    this.ui.renderAtm();
    this.syncState();
  }

  /** Chat — send a message with your name; bots reply in offline games */
  sendChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    const msg = {
      type: 'chat',
      name: this.storage.getPlayerProfile().name,
      text,
      time: Date.now()
    };
    this.ui.addChatMessage(msg);
    if (this.isMultiplayer) {
      this.multiplayer.broadcastChat(msg);
    } else {
      this.bots.botReply();
    }
  }

  /** When a game finishes or the player quits, earnings + properties bank to the wallet.
   *  Only *net winnings* are banked: current money minus any wallet money that was
   *  withdrawn into this game, minus the $1500 starting cash. This means:
   *   - every dollar actually won shows up in the wallet (fixes the "$0 wallet" confusion)
   *   - wallet money is never double-counted, so the infinite-money exploit stays dead. */
  _bankSurplus(me) {
    const state = this.engine.getState();
    const stateId = state?.id;
    if (!me || stateId == null || this.storage.isBanked(stateId)) return null;
    const walletInGame = this.engine.walletFundsOf(me.id);
    const surplus = Math.max(0, me.money - walletInGame - STARTING_MONEY);
    if (surplus > 0 || (me.properties && me.properties.length > 0)) {
      this.storage.bankToWallet(surplus, me.properties);
      this.storage.markBanked(stateId);
      return { surplus, props: me.properties.length };
    }
    return null;
  }

  /** Auto-bank before the tab is closed/reloaded so nothing is ever lost */
  _installBeforeUnloadBank() {
    window.addEventListener('beforeunload', () => {
      const state = this.engine.getState();
      if (!state || state.phase === 'finished') return;
      const me = state.players.find(p => p.id === this.myPlayerId);
      if (!me || me.bankrupt) return;
      this._bankSurplus(me);
    });
  }

  checkGameEnd(state) {
    if (!state || state.phase !== 'finished') return;
    if (this.lastFinishedId === state.id) return;
    this.lastFinishedId = state.id;
    const me = state.players.find(p => p.id === this.myPlayerId);
    if (!me) return;
    const banked = this._bankSurplus(me);
    if (banked) {
      this.ui.showToast(
        `💾 Banked $${banked.surplus.toLocaleString()} + ${banked.props} properties to your wallet!`,
        'success'
      );
    }
  }

  /** Quit to lobby — bank any earnings/properties first so nothing is lost */
  quitToLobby() {
    const state = this.engine.getState();
    if (state && state.phase !== 'finished') {
      const me = state.players.find(p => p.id === this.myPlayerId);
      if (me && !me.bankrupt) {
        const banked = this._bankSurplus(me);
        if (banked) {
          this.ui.showToast(
            banked.surplus > 0
              ? `💾 Banked $${banked.surplus.toLocaleString()} earnings + ${banked.props} properties`
              : `💾 ${banked.props} properties banked to wallet`,
            'success'
          );
        }
      }
    }
    this.multiplayer.destroy();
    this.ui.showScreen('lobby-screen');
    this.ui.showModal('menu-modal', false);
    this.ui.renderLobby();
  }

  handleRetryDebt() {
    if (this.engine.retryDebtPayment()) {
      audio.play('money');
      this.ui.showToast('Debt paid!', 'success');
    } else {
      this.ui.showToast('Not enough money yet — sell more assets.', 'error');
    }
    this.syncState();
  }

  /** Unique wallet address for any player (MGV-XXXXXXXX) */
  walletAddressOf(player) {
    return this.storage.getWalletAddress(player?.id);
  }

  /** ATM: send game money to another player by wallet address */
  handleAtmSend() {
    const address = document.getElementById('atm-address').value.trim().toUpperCase();
    const amount = parseInt(document.getElementById('atm-amount').value);
    const state = this.engine.getState();
    if (!state) {
      this.ui.showToast('Start a game first!', 'error');
      return;
    }
    const target = state.players.find(p => this.walletAddressOf(p) === address);
    if (!target) {
      this.ui.showToast('Wallet address not found!', 'error');
      return;
    }
    this.dispatch({ type: 'transfer', fromId: this.myPlayerId, toId: target.id, amount });
    this.ui.renderAtm();
  }

  handleBuild(spaceId) { this.dispatch({ type: 'build', spaceId }); }
  handleSell(spaceId) { this.dispatch({ type: 'sell', spaceId }); }
  handleMortgage(spaceId) { this.dispatch({ type: 'mortgage', spaceId }); }
  handleUnmortgage(spaceId) { this.dispatch({ type: 'unmortgage', spaceId }); }

  async exportGame() {
    await this.storage.exportDataset(this.engine.state?.id);
    this.ui.showToast('Game data downloaded!', 'success');
  }

  async importGame(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await this.storage.importDataset(file);
      this.ui.showToast(`Imported ${data.games?.length || 0} games!`, 'success');
      this.ui.renderSavedGames();
    } catch {
      this.ui.showToast('Invalid file format', 'error');
    }
    e.target.value = '';
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' });
      } catch (err) {
        console.warn('SW registration failed:', err);
      }
    }
  }
}

const app = new App();
window.app = app; // expose for debugging / console access
document.addEventListener('DOMContentLoaded', () => app.init());

export { app };
