import { BOARD, PLAYER_TOKENS, STARTING_MONEY } from './constants.js';
import { renderBoard, updateTokens, animateDice, setDiceImages, showCardOverlay, hideCardOverlay } from './board.js';
import { RANKS } from './constants.js';
import { audio } from './audio.js';

export class UIManager {
  constructor(app) {
    this.app = app;
  }

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
  }

  showModal(id, show = true) {
    const modal = document.getElementById(id);
    if (show) modal?.classList.add('show');
    else modal?.classList.remove('show');
  }

  renderLobby() {
    const profile = this.app.storage.getPlayerProfile();
    const rank = this.app.storage.getRank();
    document.getElementById('player-name-input').value = profile.name;
    document.getElementById('player-avatar').textContent = profile.avatar;
    const walletEl = document.getElementById('wallet-balance');
    if (walletEl) walletEl.textContent = '$' + profile.wallet.toLocaleString();
    const addrEl = document.getElementById('wallet-address');
    if (addrEl) addrEl.textContent = profile.walletAddress;
    const propsEl = document.getElementById('wallet-props');
    if (propsEl) propsEl.textContent = '🏠 ' + profile.walletProperties.length + ' properties';
    const rankChip = document.getElementById('wallet-rank-chip');
    if (rankChip) rankChip.textContent = rank.icon + ' ' + rank.name;
    const nwEl = document.getElementById('wallet-networth');
    if (nwEl) nwEl.textContent = '💎 Net worth $' + rank.netWorth.toLocaleString();
    const fill = document.getElementById('rank-progress-fill');
    if (fill) {
      const pct = rank.next ? Math.max(2, Math.min(100, Math.round((rank.progress || 0) * 100))) : 100;
      fill.style.width = pct + '%';
    }
    this.renderSavedGames();
  }

  /** Rank overview modal — all ranks + the player's current progress */
  renderRanks() {
    const rank = this.app.storage.getRank();
    const list = document.getElementById('rank-list');
    if (!list) return;
    list.innerHTML = RANKS.map(r => {
      const isCurrent = r.name === rank.name;
      const pct = isCurrent && r.next
        ? Math.max(2, Math.min(100, Math.round((rank.progress || 0) * 100)))
        : 100;
      return `
        <div class="rank-item ${isCurrent ? 'current' : ''}">
          <span class="rank-icon">${r.icon}</span>
          <div class="rank-info">
            <strong>${r.name} ${isCurrent ? '<small class="rank-you">YOU</small>' : ''}</strong>
            <small>Net worth from $${r.min.toLocaleString()}${r.next ? ` — $${r.next.toLocaleString()}` : ' +'}</small>
            <div class="rank-progress bar">
              <div class="rank-progress-fill${isCurrent ? ' cur' : ''}" style="width:${pct}%"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    this.showModal('rank-modal');
  }

  setConnStatus(status, detail) {
    const el = document.getElementById('conn-status');
    if (!el) return;
    const map = {
      connected: ['Online · Connected', 'ok'],
      connecting: ['Online · Connecting…', 'busy'],
      peers: [`Online · ${detail || 0} peer(s)`, 'ok'],
      offline: ['Online · Offline', 'bad'],
      error: ['Online · Error', 'bad']
    };
    const [text, cls] = map[status] || ['', ''];
    if (!text) { el.hidden = true; return; }
    el.hidden = false;
    el.textContent = text;
    el.className = 'conn-status ' + cls;
  }

  async renderSavedGames() {
    const games = await this.app.storage.getAllGames();
    const list = document.getElementById('saved-games-list');
    if (!list) return;
    list.innerHTML = games.length ? '' : '<p class="empty">No saved games yet</p>';
    games.forEach(g => {
      const item = document.createElement('div');
      item.className = 'saved-game-item';
      item.innerHTML = `
        <span>${g.players?.length || 0} players — ${new Date(g.savedAt || g.createdAt).toLocaleDateString()}</span>
        <button class="btn btn-sm" data-load="${g.id}">Load</button>
        <button class="btn btn-sm btn-danger" data-delete="${g.id}">✕</button>
      `;
      list.appendChild(item);
    });
  }

  renderSetup() {
    const container = document.getElementById('player-slots');
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const slot = document.createElement('div');
      slot.className = 'player-slot';
      slot.innerHTML = `
        <input type="text" placeholder="Player ${i + 1}" value="${i === 0 ? this.app.storage.getPlayerProfile().name : ''}" ${i === 0 ? 'readonly' : ''}>
        <span class="slot-token">${PLAYER_TOKENS[i]}</span>
      `;
      container.appendChild(slot);
    }

    // Bot toggle — 6 offline AI bots
    const botRow = document.createElement('div');
    botRow.className = 'bot-toggle';
    botRow.innerHTML = `
      <label class="switch-row">
        <input type="checkbox" id="bot-toggle">
        <span>🤖 Add 6 Bots (offline AI)</span>
      </label>
      <small id="bot-count-label" class="info">0 bots</small>
    `;
    container.appendChild(botRow);
    this.botCount = 0;
    document.getElementById('bot-toggle').addEventListener('change', (e) => {
      this.botCount = e.target.checked ? 6 : 0;
      document.getElementById('bot-count-label').textContent = this.botCount + ' bots';
    });
  }

  getBotCount() {
    return this.botCount || 0;
  }

  renderGame(state) {
    if (!state) return;
    this._syncInviteButton();
    const boardContainer = document.getElementById('board-container');
    if (!boardContainer.querySelector('.monopoly-board')) {
      renderBoard(boardContainer, state);
    } else {
      updateTokens(boardContainer, state);
      this.updatePropertyOverlays(state);
    }

    this.renderPlayersPanel(state);
    this.renderActionPanel(state);
    this.renderLog(state);
    this.updateDice(state.dice);
  }

  updatePropertyOverlays(state) {
    state.properties.forEach(prop => {
      const cell = document.querySelector(`[data-space-id="${prop.spaceId}"]`);
      if (!cell) return;
      const owner = state.players.find(p => p.id === prop.ownerId);
      let badge = cell.querySelector('.owner-badge');
      if (owner) {
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'owner-badge';
          cell.querySelector('.cell-content')?.appendChild(badge);
        }
        badge.style.background = owner.color;
        badge.textContent = owner.token;
      } else if (badge) badge.remove();

      let buildings = cell.querySelector('.buildings');
      if (prop.houses > 0) {
        if (!buildings) {
          buildings = document.createElement('div');
          buildings.className = 'buildings';
          cell.querySelector('.cell-content')?.appendChild(buildings);
        }
        buildings.textContent = prop.houses >= 5 ? '🏨' : '🏠'.repeat(prop.houses);
      } else if (buildings) buildings.remove();
    });
  }

  /** Invite button appears ONLY while hosting an online room — fully absent in
   *  offline/bot games and for online guests. Created on demand, removed otherwise. */
  _syncInviteButton() {
    const hostOnline = this.app.isMultiplayer && this.app.isHost;
    let btn = document.getElementById('btn-invite');
    if (!hostOnline) {
      btn?.remove();
      return;
    }
    if (btn) return;
    btn = document.createElement('button');
    btn.className = 'btn btn-icon';
    btn.id = 'btn-invite';
    btn.title = 'Invite Friends';
    btn.textContent = '🔗';
    btn.addEventListener('click', () => {
      if (this.app.roomId) {
        this.app.ui.showInviteModal(this.app.multiplayer.getShareUrl(this.app.roomId));
      }
    });
    const sound = document.getElementById('btn-sound');
    sound?.parentElement?.insertBefore(btn, sound);
  }

  renderPlayersPanel(state) {
    const panel = document.getElementById('players-panel');
    panel.innerHTML = state.players.map((p, i) => `
      <div class="player-card ${i === state.currentPlayerIndex ? 'active' : ''} ${p.bankrupt ? 'bankrupt' : ''}">
        <span class="p-token" style="background:${p.color}">${p.token}</span>
        <div class="p-info">
          <strong>${p.name} ${p.isBot ? '🤖' : ''} ${i === 0 && this.app.isHost ? '👑' : ''}</strong>
          <span>$${p.money.toLocaleString()}</span>
          <small>${p.properties.length} properties ${p.inJail ? '🔒' : ''}</small>
          <small class="wallet-addr">${this.app.walletAddressOf(p)}</small>
        </div>
      </div>
    `).join('');
  }

  renderActionPanel(state) {
    const panel = document.getElementById('action-panel');
    const player = state.players[state.currentPlayerIndex];
    const isMyTurn = this.isLocalPlayerTurn(state);
    let html = '';

    if (state.phase === 'waiting') {
      html = this.app.isHost
        ? `<p class="info">Share the invite link, then start when everyone is in.</p>
           <button class="btn btn-primary btn-lg" id="btn-start">▶ Start Game</button>`
        : `<p class="info">Waiting for the host to start the game…</p>`;
    } else if (state.phase === 'finished') {
      html = `<div class="winner-banner">🏆 ${state.winner?.name} Wins!</div>`;
    } else if (player?.bankrupt) {
      html = `<p class="info">Waiting for other players...</p>`;
    } else {
      html += `<div class="turn-indicator">${player?.name}'s Turn ${isMyTurn ? '(You)' : ''}</div>`;

      switch (state.turnPhase) {
        case 'roll':
          if (player?.inJail) {
            html += `<button class="btn" id="btn-jail-fine" ${!isMyTurn ? 'disabled' : ''}>Pay $50 Fine</button>`;
            if (player.jailFreeCards > 0) html += `<button class="btn" id="btn-jail-card" ${!isMyTurn ? 'disabled' : ''}>Use Jail Free Card</button>`;
          } else {
            html += `<p class="info roll-prompt">🎲 Click the dice in the middle of the board to roll.</p>`;
          }
          break;
        case 'buy':
          const space = BOARD[state.lastAction?.spaceId];
          html += `<p>Buy ${space?.name} for $${space?.price}?</p>`;
          html += `<button class="btn btn-success" id="btn-buy" ${!isMyTurn ? 'disabled' : ''}>Buy Property</button>`;
          html += `<button class="btn btn-secondary" id="btn-decline" ${!isMyTurn ? 'disabled' : ''}>Decline (Auction)</button>`;
          break;
        case 'card':
          html += `<button class="btn btn-primary" id="btn-draw-card" ${!isMyTurn ? 'disabled' : ''}>Draw Card</button>`;
          break;
        case 'auction':
          html += this.renderAuctionPanel(state);
          break;
        case 'debt':
          html += `<p class="warning">You owe $${state.lastAction?.amount}! Sell assets or declare bankruptcy.</p>`;
          html += `<button class="btn btn-success" id="btn-pay-debt" ${!isMyTurn ? 'disabled' : ''}>💵 Pay Debt</button>`;
          html += `<button class="btn btn-danger" id="btn-bankrupt" ${!isMyTurn ? 'disabled' : ''}>Declare Bankruptcy</button>`;
          html += `<button class="btn" id="btn-manage" ${!isMyTurn ? 'disabled' : ''}>Manage Properties</button>`;
          break;
      }

      html += `<button class="btn btn-outline" id="btn-manage-props">🏠 Manage Properties</button>`;
      html += `<button class="btn btn-outline" id="btn-end-turn">End Turn</button>`;
    }

    panel.innerHTML = html;
    this.bindActionButtons(state);
  }

  renderAuctionPanel(state) {
    const auction = state.auction;
    const space = BOARD[auction?.spaceId];
    return `
      <p>Auction: ${space?.name} — Current bid: $${auction?.currentBid || 0}</p>
      <input type="number" id="bid-amount" min="${(auction?.currentBid || 0) + 1}" placeholder="Your bid">
      <button class="btn" id="btn-bid">Place Bid</button>
      <button class="btn btn-secondary" id="btn-end-auction">End Auction</button>
    `;
  }

  renderLog(state) {
    const log = document.getElementById('game-log');
    log.innerHTML = state.log.slice(0, 20).map(l =>
      `<div class="log-entry"><small>${new Date(l.time).toLocaleTimeString()}</small> ${l.msg}</div>`
    ).join('');
  }

  updateDice(dice) {
    if (dice && dice[0] > 0) setDiceImages(dice[0], dice[1]);
  }

  isLocalPlayerTurn(state) {
    if (!this.app.isMultiplayer) return true;
    const current = state.players[state.currentPlayerIndex];
    return current?.id === this.app.myPlayerId;
  }

  bindActionButtons(state) {
    document.getElementById('btn-roll')?.addEventListener('click', () => this.app.handleRoll());
    document.getElementById('btn-buy')?.addEventListener('click', () => this.app.handleBuy());
    document.getElementById('btn-decline')?.addEventListener('click', () => this.app.handleDecline());
    document.getElementById('btn-draw-card')?.addEventListener('click', () => this.app.handleDrawCard());
    document.getElementById('btn-jail-fine')?.addEventListener('click', () => this.app.handleJailFine());
    document.getElementById('btn-jail-card')?.addEventListener('click', () => this.app.handleJailCard());
    document.getElementById('btn-bankrupt')?.addEventListener('click', () => this.app.handleBankrupt());
    document.getElementById('btn-pay-debt')?.addEventListener('click', () => this.app.handleRetryDebt());
    document.getElementById('btn-end-turn')?.addEventListener('click', () => this.app.handleEndTurn());
    document.getElementById('btn-start')?.addEventListener('click', () => this.app.handleStart());
    document.getElementById('btn-bid')?.addEventListener('click', () => this.app.handleBid());
    document.getElementById('btn-end-auction')?.addEventListener('click', () => this.app.handleEndAuction());
    document.getElementById('btn-manage-props')?.addEventListener('click', () => this.showPropertyManager(state));
  }

  showPropertyManager(state) {
    const player = state.players[state.currentPlayerIndex];
    const modal = document.getElementById('property-modal');
    const list = document.getElementById('property-list');
    list.innerHTML = player.properties.map(sid => {
      const space = BOARD[sid];
      const prop = state.properties.find(p => p.spaceId === sid);
      return `
        <div class="prop-item">
          <span class="color-dot" style="background:${space.color || '#666'}"></span>
          <strong>${space.name}</strong>
          <span>${prop.mortgaged ? 'Mortgaged' : prop.houses > 0 ? (prop.houses >= 5 ? 'Hotel' : `${prop.houses} houses`) : 'No buildings'}</span>
          <div class="prop-actions">
            ${space.houseCost && !prop.mortgaged && prop.houses < 5 ? `<button class="btn btn-sm" data-build="${sid}">Build ($${space.houseCost})</button>` : ''}
            ${prop.houses > 0 ? `<button class="btn btn-sm" data-sell="${sid}">Sell House</button>` : ''}
            ${!prop.mortgaged && prop.houses === 0 ? `<button class="btn btn-sm" data-mortgage="${sid}">Mortgage ($${Math.floor(space.price / 2)})</button>` : ''}
            ${prop.mortgaged ? `<button class="btn btn-sm" data-unmortgage="${sid}">Unmortgage ($${Math.ceil(space.price * 0.55)})</button>` : ''}
          </div>
        </div>
      `;
    }).join('') || '<p>No properties owned</p>';

    list.querySelectorAll('[data-build]').forEach(btn =>
      btn.addEventListener('click', () => { this.app.handleBuild(+btn.dataset.build); this.showPropertyManager(this.app.engine.getState()); }));
    list.querySelectorAll('[data-sell]').forEach(btn =>
      btn.addEventListener('click', () => { this.app.handleSell(+btn.dataset.sell); this.showPropertyManager(this.app.engine.getState()); }));
    list.querySelectorAll('[data-mortgage]').forEach(btn =>
      btn.addEventListener('click', () => { this.app.handleMortgage(+btn.dataset.mortgage); this.showPropertyManager(this.app.engine.getState()); }));
    list.querySelectorAll('[data-unmortgage]').forEach(btn =>
      btn.addEventListener('click', () => { this.app.handleUnmortgage(+btn.dataset.unmortgage); this.showPropertyManager(this.app.engine.getState()); }));

    this.showModal('property-modal');
  }

  showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  showInviteModal(url) {
    document.getElementById('invite-url').value = url;
    const codeEl = document.getElementById('invite-room-code');
    if (codeEl) codeEl.textContent = this.app.roomId || '—';
    this.showModal('invite-modal');
  }

  copyInviteUrl() {
    const input = document.getElementById('invite-url');
    input.select();
    navigator.clipboard.writeText(input.value);
    this.showToast('Invite link copied!', 'success');
  }

  /** ATM modal — your address, wallet balance, rank, player list, send form */
  renderAtm() {
    const profile = this.app.storage.getPlayerProfile();
    const rank = this.app.storage.getRank();
    const myAddr = document.getElementById('atm-my-address');
    const myWallet = document.getElementById('atm-wallet');
    if (myAddr) myAddr.textContent = profile.walletAddress;
    if (myWallet) myWallet.textContent = '$' + profile.wallet.toLocaleString() + ' · ' + profile.walletProperties.length + ' props · ' + rank.icon + ' ' + rank.name;

    const list = document.getElementById('atm-players');
    if (!list) return;
    const state = this.app.engine.getState();
    if (!state) {
      list.innerHTML = '<p class="info">Start a game to send money to players.</p>';
      return;
    }
    list.innerHTML = state.players.map(p => `
      <div class="atm-player ${p.id === this.app.myPlayerId ? 'me' : ''}">
        <span class="p-token" style="background:${p.color}">${p.token}</span>
        <div class="p-info">
          <strong>${p.name} ${p.isBot ? '🤖' : ''}</strong>
          <small class="wallet-addr">${this.app.walletAddressOf(p)}</small>
        </div>
        <span class="atm-money">$${p.money.toLocaleString()}</span>
      </div>
    `).join('');
  }

  /** Chat — append a message bubble with the sender's name */
  addChatMessage(msg) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const row = document.createElement('div');
    row.className = 'chat-msg' + (msg.bot ? ' bot' : '');
    const time = new Date(msg.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    row.innerHTML = `<span class="chat-name">${msg.name}</span> <span class="chat-text">${this._escapeHtml(msg.text)}</span> <small>${time}</small>`;
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  _escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
}

export { animateDice, showCardOverlay, hideCardOverlay };
