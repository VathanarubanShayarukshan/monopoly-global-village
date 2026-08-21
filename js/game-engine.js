import {
  BOARD, GO_SALARY, JAIL_POSITION, STARTING_MONEY,
  PROPERTY_GROUPS, AIRPORTS, UTILITIES,
  CHANCE_CARDS, CHEST_CARDS, PLAYER_COLORS, PLAYER_TOKENS
} from './constants.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uid() {
  return crypto.randomUUID().slice(0, 8);
}

export class GameEngine {
  constructor() {
    this.state = null;
    this.listeners = [];
  }

  onChange(fn) { this.listeners.push(fn); }
  emit() { this.listeners.forEach(fn => fn(this.state)); }

  createGame(playerNames, hostId, opts = {}) {
    const startingMoney = opts.startingMoney > 0 ? opts.startingMoney : STARTING_MONEY;
    const botCount = opts.botCount || 0;
    const walletProps = Array.isArray(opts.walletProperties) ? opts.walletProperties : [];
    const players = playerNames.map((name, i) => ({
      id: i === 0 ? hostId : uid(),
      name,
      money: i === 0 ? startingMoney : STARTING_MONEY,
      position: 0,
      properties: i === 0 ? [...walletProps] : [],
      inJail: false,
      jailTurns: 0,
      jailFreeCards: 0,
      bankrupt: false,
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      token: PLAYER_TOKENS[i % PLAYER_TOKENS.length],
      doublesCount: 0,
      isHost: i === 0,
      isBot: i >= playerNames.length - botCount
    }));

    const props = BOARD.filter(s => ['property', 'airport', 'utility'].includes(s.type)).map(s => ({
      spaceId: s.id,
      ownerId: null,
      houses: 0,
      mortgaged: false
    }));
    // Restore wallet-owned properties to the human player
    walletProps.forEach(sid => {
      const p = props.find(x => x.spaceId === sid);
      if (p) p.ownerId = players[0].id;
    });

    this.state = {
      id: uid(),
      phase: 'waiting',
      players,
      currentPlayerIndex: 0,
      properties: props,
      chanceDeck: shuffle(CHANCE_CARDS.map((c, i) => ({ ...c, _id: i }))),
      chestDeck: shuffle(CHEST_CARDS.map((c, i) => ({ ...c, _id: i }))),
      chanceDiscard: [],
      chestDiscard: [],
      housesAvailable: 32,
      hotelsAvailable: 12,
      dice: [0, 0],
      lastAction: null,
      log: [{ msg: 'Game created! Waiting for players...', time: Date.now() }],
      freeParkingPot: 0,
      turnPhase: 'roll',
      auction: null,
      winner: null,
      createdAt: Date.now(),
      hostId,
      walletFunds: {}
    };
    this.emit();
    return this.state;
  }

  startGame() {
    if (!this.state) return;
    this.state.phase = 'playing';
    this.state.turnPhase = 'roll';
    this.addLog('Game started! ' + this.currentPlayer().name + ' goes first.');
    this.emit();
  }

  /** Add an online guest who joined the room (only before the game starts) */
  addPlayer(id, name) {
    if (!this.state || this.state.phase !== 'waiting') return null;
    const existing = this.state.players.find(p => p.id === id);
    if (existing) return existing;
    const player = {
      id,
      name: name || 'Guest',
      money: STARTING_MONEY,
      position: 0,
      properties: [],
      inJail: false,
      jailTurns: 0,
      jailFreeCards: 0,
      bankrupt: false,
      color: PLAYER_COLORS[this.state.players.length % PLAYER_COLORS.length],
      token: PLAYER_TOKENS[this.state.players.length % PLAYER_TOKENS.length],
      doublesCount: 0,
      isHost: false,
      isBot: false
    };
    this.state.players.push(player);
    this.addLog(`${player.name} joined!`);
    this.emit();
    return player;
  }

  /** Net worth of a player inside the current game (cash + property value + half of house spend) */
  playerNetWorth(playerId) {
    const p = this.getPlayer(playerId);
    if (!p) return 0;
    const props = (p.properties || []).reduce((sum, sid) => {
      const s = BOARD[sid];
      const pr = this.getPropertyState(sid);
      return sum + (s?.price || 0) + (pr?.houses || 0) * ((s?.houseCost || 0) / 2);
    }, 0);
    return p.money + props;
  }

  currentPlayer() {
    return this.state.players[this.state.currentPlayerIndex];
  }

  getSpace(id) {
    return BOARD[id];
  }

  getPropertyState(spaceId) {
    return this.state.properties.find(p => p.spaceId === spaceId);
  }

  getPlayer(id) {
    return this.state.players.find(p => p.id === id);
  }

  addLog(msg) {
    this.state.log.unshift({ msg, time: Date.now() });
    if (this.state.log.length > 100) this.state.log.pop();
  }

  rollDice() {
    const player = this.currentPlayer();
    if (this.state.turnPhase !== 'roll' || player.bankrupt) return null;

    const d1 = Math.ceil(Math.random() * 6);
    const d2 = Math.ceil(Math.random() * 6);
    this.state.dice = [d1, d2];
    const isDoubles = d1 === d2;

    if (player.inJail) {
      if (isDoubles) {
        player.inJail = false;
        player.jailTurns = 0;
        this.addLog(`${player.name} rolled doubles and escaped jail!`);
        this.movePlayer(d1 + d2);
      } else {
        player.jailTurns++;
        if (player.jailTurns >= 3) {
          this.payMoney(player, 50, 'Jail fine');
          player.inJail = false;
          player.jailTurns = 0;
          this.movePlayer(d1 + d2);
        } else {
          this.addLog(`${player.name} failed to roll doubles in jail (turn ${player.jailTurns}/3)`);
          this.endTurn();
        }
      }
      this.emit();
      return { dice: [d1, d2], isDoubles };
    }

    if (isDoubles) {
      player.doublesCount++;
      if (player.doublesCount >= 3) {
        this.sendToJail(player);
        player.doublesCount = 0;
        this.endTurn();
        this.emit();
        return { dice: [d1, d2], isDoubles, tripleDoubles: true };
      }
    } else {
      player.doublesCount = 0;
    }

    this.movePlayer(d1 + d2);
    this.emit();
    return { dice: [d1, d2], isDoubles };
  }

  movePlayer(steps, targetPos = null) {
    const player = this.currentPlayer();
    const oldPos = player.position;
    let newPos = targetPos !== null ? targetPos : (oldPos + steps) % 40;

    if (targetPos === null && oldPos + steps >= 40) {
      player.money += GO_SALARY;
      this.addLog(`${player.name} passed GO and collected $${GO_SALARY}`);
    }

    player.position = newPos;
    this.handleLanding(newPos);
  }

  handleLanding(pos) {
    const space = BOARD[pos];
    const player = this.currentPlayer();
    this.addLog(`${player.name} landed on ${space.name}`);

    switch (space.type) {
      case 'property':
      case 'airport':
      case 'utility':
        this.handlePropertyLanding(space, player);
        break;
      case 'tax':
        this.payMoney(player, space.tax, space.name);
        this.state.freeParkingPot += space.tax;
        this.checkDoublesContinue();
        break;
      case 'chance':
        this.state.turnPhase = 'card';
        break;
      case 'chest':
        this.state.turnPhase = 'card';
        break;
      case 'gotojail':
        this.sendToJail(player);
        this.endTurn();
        break;
      case 'go':
      case 'parking':
      case 'jail':
        this.checkDoublesContinue();
        break;
    }
    this.emit();
  }

  handlePropertyLanding(space, player) {
    const prop = this.getPropertyState(space.id);
    if (!prop.ownerId) {
      this.state.turnPhase = 'buy';
      this.state.lastAction = { type: 'buy', spaceId: space.id, price: space.price };
    } else if (prop.ownerId !== player.id && !prop.mortgaged) {
      const rent = this.calculateRent(space, prop);
      this.transferMoney(player.id, prop.ownerId, rent, `Rent for ${space.name}`);
      this.checkDoublesContinue();
    } else {
      this.checkDoublesContinue();
    }
  }

  calculateRent(space, prop) {
    if (space.type === 'property') {
      return space.rent[prop.houses] || space.rent[0];
    }
    if (space.type === 'airport') {
      const owned = this.state.properties.filter(p => AIRPORTS.includes(p.spaceId) && p.ownerId === prop.ownerId && !p.mortgaged).length;
      return [25, 50, 100, 200][owned - 1] || 25;
    }
    if (space.type === 'utility') {
      const owned = this.state.properties.filter(p => UTILITIES.includes(p.spaceId) && p.ownerId === prop.ownerId && !p.mortgaged).length;
      const mult = owned === 2 ? 10 : 4;
      return mult * (this.state.dice[0] + this.state.dice[1]);
    }
    return 0;
  }

  buyProperty() {
    const player = this.currentPlayer();
    const action = this.state.lastAction;
    if (!action || action.type !== 'buy') return false;

    const space = BOARD[action.spaceId];
    if (player.money < space.price) return false;

    player.money -= space.price;
    const prop = this.getPropertyState(action.spaceId);
    prop.ownerId = player.id;
    player.properties.push(action.spaceId);
    this.addLog(`${player.name} bought ${space.name} for $${space.price}`);
    this.state.turnPhase = 'roll';
    this.state.lastAction = null;
    this.checkDoublesContinue();
    this.emit();
    return true;
  }

  declineProperty() {
    this.state.turnPhase = 'auction';
    const spaceId = this.state.lastAction?.spaceId;
    this.state.auction = {
      spaceId,
      currentBid: 0,
      currentBidder: null,
      participants: this.state.players.filter(p => !p.bankrupt).map(p => p.id),
      active: true
    };
    this.addLog(`Auction started for ${BOARD[spaceId]?.name}`);
    this.emit();
  }

  placeBid(playerId, amount) {
    const auction = this.state.auction;
    if (!auction?.active) return false;
    const player = this.getPlayer(playerId);
    if (!player || player.money < amount || amount <= auction.currentBid) return false;

    auction.currentBid = amount;
    auction.currentBidder = playerId;
    this.addLog(`${player.name} bid $${amount}`);
    this.emit();
    return true;
  }

  endAuction() {
    const auction = this.state.auction;
    if (!auction) return;
    if (auction.currentBidder) {
      const player = this.getPlayer(auction.currentBidder);
      const space = BOARD[auction.spaceId];
      player.money -= auction.currentBid;
      const prop = this.getPropertyState(auction.spaceId);
      prop.ownerId = player.id;
      player.properties.push(auction.spaceId);
      this.addLog(`${player.name} won auction for ${space.name} at $${auction.currentBid}`);
    } else {
      this.addLog(`No bids for ${BOARD[auction.spaceId]?.name}`);
    }
    this.state.auction = null;
    this.state.turnPhase = 'roll';
    this.state.lastAction = null;
    this.checkDoublesContinue();
    this.emit();
  }

  drawCard(type) {
    const deckKey = type === 'chance' ? 'chanceDeck' : 'chestDeck';
    const discardKey = type === 'chance' ? 'chanceDiscard' : 'chestDiscard';
    let deck = this.state[deckKey];

    if (deck.length === 0) {
      this.state[deckKey] = this.state[discardKey];
      this.state[discardKey] = [];
      deck = this.state[deckKey];
    }

    const card = deck.pop();
    this.state[discardKey].push(card);
    this.addLog(`${this.currentPlayer().name} drew: ${card.text}`);
    this.executeCard(card);
    this.state.turnPhase = 'roll';
    this.emit();
    return card;
  }

  executeCard(card) {
    const player = this.currentPlayer();
    switch (card.action) {
      case 'move': {
        const oldPos = player.position;
        const target = card.target;
        if (card.collectGo && target < oldPos) player.money += GO_SALARY;
        player.position = target;
        this.handleLanding(target);
        break;
      }
      case 'nearestAirport': {
        const pos = player.position;
        const next = AIRPORTS.find(a => a > pos) || AIRPORTS[0];
        if (next < pos) player.money += GO_SALARY;
        player.position = next;
        this.handleLanding(next);
        break;
      }
      case 'nearestUtility': {
        const pos = player.position;
        const next = UTILITIES.find(u => u > pos) || UTILITIES[0];
        if (next < pos) player.money += GO_SALARY;
        player.position = next;
        this.handleLanding(next);
        break;
      }
      case 'money':
        if (card.amount > 0) player.money += card.amount;
        else this.payMoney(player, Math.abs(card.amount), card.text);
        this.checkDoublesContinue();
        break;
      case 'jailFree':
        player.jailFreeCards++;
        this.checkDoublesContinue();
        break;
      case 'back':
        player.position = (player.position - card.spaces + 40) % 40;
        this.handleLanding(player.position);
        break;
      case 'jail':
        this.sendToJail(player);
        this.endTurn();
        break;
      case 'repairs': {
        let cost = 0;
        player.properties.forEach(sid => {
          const p = this.getPropertyState(sid);
          if (p.houses === 5) cost += card.hotel;
          else cost += p.houses * card.house;
        });
        this.payMoney(player, cost, 'Repairs');
        this.checkDoublesContinue();
        break;
      }
      case 'birthday': {
        this.state.players.filter(p => p.id !== player.id && !p.bankrupt).forEach(p => {
          const amt = Math.min(card.amount, p.money);
          p.money -= amt;
          player.money += amt;
        });
        this.checkDoublesContinue();
        break;
      }
    }
  }

  sendToJail(player) {
    player.inJail = true;
    player.jailTurns = 0;
    player.position = JAIL_POSITION;
    this.addLog(`${player.name} was sent to Jail!`);
  }

  payJailFine() {
    const player = this.currentPlayer();
    if (!player.inJail) return false;
    if (player.money < 50) return false;
    this.payMoney(player, 50, 'Jail fine');
    player.inJail = false;
    player.jailTurns = 0;
    this.state.turnPhase = 'roll';
    this.emit();
    return true;
  }

  useJailFreeCard() {
    const player = this.currentPlayer();
    if (!player.inJail || player.jailFreeCards <= 0) return false;
    player.jailFreeCards--;
    player.inJail = false;
    player.jailTurns = 0;
    this.addLog(`${player.name} used Get Out of Jail Free card`);
    this.state.turnPhase = 'roll';
    this.emit();
    return true;
  }

  buildHouse(spaceId) {
    const player = this.currentPlayer();
    const space = BOARD[spaceId];
    const prop = this.getPropertyState(spaceId);
    if (!space || !prop || prop.ownerId !== player.id || prop.mortgaged) return false;
    if (!this.hasMonopoly(player.id, space.group)) return false;

    const groupSpaces = PROPERTY_GROUPS[space.group];
    const maxHouses = Math.min(...groupSpaces.map(sid => this.getPropertyState(sid).houses));
    if (prop.houses > maxHouses) return false;
    if (prop.houses >= 4 && this.state.hotelsAvailable <= 0) return false;
    if (prop.houses < 4 && this.state.housesAvailable <= 0) return false;
    if (player.money < space.houseCost) return false;

    player.money -= space.houseCost;
    if (prop.houses === 4) {
      prop.houses = 5;
      this.state.housesAvailable += 4;
      this.state.hotelsAvailable--;
    } else {
      prop.houses++;
      this.state.housesAvailable--;
    }
    this.addLog(`${player.name} built on ${space.name} (now ${prop.houses >= 5 ? 'hotel' : prop.houses + ' houses'})`);
    this.emit();
    return true;
  }

  sellHouse(spaceId) {
    const player = this.currentPlayer();
    const space = BOARD[spaceId];
    const prop = this.getPropertyState(spaceId);
    if (!prop || prop.ownerId !== player.id || prop.houses === 0) return false;

    const groupSpaces = PROPERTY_GROUPS[space.group];
    const minHouses = Math.max(...groupSpaces.map(sid => this.getPropertyState(sid).houses));
    if (prop.houses < minHouses) return false;

    if (prop.houses === 5) {
      prop.houses = 4;
      this.state.hotelsAvailable++;
      this.state.housesAvailable -= 4;
    } else {
      prop.houses--;
      this.state.housesAvailable++;
    }
    player.money += Math.floor(space.houseCost / 2);
    this.addLog(`${player.name} sold house on ${space.name}`);
    this.emit();
    return true;
  }

  mortgage(spaceId) {
    const player = this.currentPlayer();
    const space = BOARD[spaceId];
    const prop = this.getPropertyState(spaceId);
    if (!prop || prop.ownerId !== player.id || prop.mortgaged || prop.houses > 0) return false;

    prop.mortgaged = true;
    player.money += Math.floor(space.price / 2);
    this.addLog(`${player.name} mortgaged ${space.name}`);
    this.emit();
    return true;
  }

  unmortgage(spaceId) {
    const player = this.currentPlayer();
    const space = BOARD[spaceId];
    const prop = this.getPropertyState(spaceId);
    const cost = Math.ceil(space.price * 0.55);
    if (!prop || prop.ownerId !== player.id || !prop.mortgaged || player.money < cost) return false;

    prop.mortgaged = false;
    player.money -= cost;
    this.addLog(`${player.name} unmortgaged ${space.name}`);
    this.emit();
    return true;
  }

  hasMonopoly(playerId, group) {
    const spaces = PROPERTY_GROUPS[group];
    if (!spaces) return true;
    return spaces.every(sid => {
      const p = this.getPropertyState(sid);
      return p.ownerId === playerId && !p.mortgaged;
    });
  }

  payMoney(player, amount, reason) {
    if (player.money >= amount) {
      player.money -= amount;
      this.addLog(`${player.name} paid $${amount} (${reason})`);
      return true;
    }
    return this.handleDebt(player, amount, reason);
  }

  transferMoney(fromId, toId, amount, reason) {
    const from = this.getPlayer(fromId);
    const to = this.getPlayer(toId);
    if (from.money >= amount) {
      from.money -= amount;
      to.money += amount;
      this.addLog(`${from.name} paid $${amount} to ${to.name} (${reason})`);
      return true;
    }
    return this.handleDebt(from, amount, reason, toId);
  }

  /** ATM transfer between two players by id (no debt handling — must have funds) */
  transferMoneyToPlayer(fromId, toId, amount, reason = 'ATM transfer') {
    const from = this.getPlayer(fromId);
    const to = this.getPlayer(toId);
    if (!from || !to) return { ok: false, error: 'Player not found' };
    if (from.bankrupt || to.bankrupt) return { ok: false, error: 'Player is bankrupt' };
    if (!Number.isFinite(amount) || amount <= 0) return { ok: false, error: 'Invalid amount' };
    if (from.money < amount) return { ok: false, error: 'Not enough money' };
    from.money -= amount;
    to.money += amount;
    this.addLog(`${from.name} sent $${amount} to ${to.name} (${reason})`);
    this.emit();
    return { ok: true };
  }

  /** Direct money adjustment (ATM deposit/withdraw between game money and wallet) */
  adjustMoney(playerId, amount, reason) {
    const player = this.getPlayer(playerId);
    if (!player || player.bankrupt) return false;
    if (player.money + amount < 0) return false;
    player.money += amount;
    this.addLog(`${player.name} ${amount >= 0 ? 'received' : 'paid'} $${Math.abs(amount)} (${reason})`);
    this.emit();
    return true;
  }

  /** Track how much wallet money is currently inside the game for a player.
   *  Deposit → negative delta (wallet money left the game), withdraw → positive.
   *  Banking subtracts this so wallet money is never banked twice. */
  adjustWalletFunds(playerId, delta) {
    if (!this.state) return;
    this.state.walletFunds = this.state.walletFunds || {};
    this.state.walletFunds[playerId] = (this.state.walletFunds[playerId] || 0) + delta;
  }

  /** Net wallet money inside the game for a player (0 if none) */
  walletFundsOf(playerId) {
    return this.state?.walletFunds?.[playerId] || 0;
  }

  /** After selling/mortgaging in debt phase, retry the owed payment */
  retryDebtPayment() {
    const player = this.currentPlayer();
    const action = this.state.lastAction;
    if (this.state.turnPhase !== 'debt' || !action || player.bankrupt) return false;
    if (player.money < action.amount) return false;
    if (action.creditorId) {
      this.transferMoney(player.id, action.creditorId, action.amount, action.reason);
    } else {
      this.payMoney(player, action.amount, action.reason);
    }
    this.state.turnPhase = 'roll';
    this.state.lastAction = null;
    this.checkDoublesContinue();
    this.emit();
    return true;
  }

  handleDebt(player, amount, reason, creditorId = null) {
    this.addLog(`${player.name} cannot pay $${amount} (${reason}) — must raise funds or go bankrupt`);
    this.state.turnPhase = 'debt';
    this.state.lastAction = { type: 'debt', amount, reason, creditorId };
    this.emit();
    return false;
  }

  declareBankruptcy(creditorId = null) {
    const player = this.currentPlayer();
    player.bankrupt = true;
    const creditor = creditorId ? this.getPlayer(creditorId) : null;

    player.properties.forEach(sid => {
      const prop = this.getPropertyState(sid);
      if (prop.houses > 0) {
        this.state.housesAvailable += prop.houses === 5 ? 0 : prop.houses;
        if (prop.houses === 5) this.state.hotelsAvailable++;
        prop.houses = 0;
      }
      if (creditor) {
        prop.ownerId = creditor.id;
        creditor.properties.push(sid);
        creditor.money += player.money;
      } else {
        prop.ownerId = null;
      }
    });

    player.properties = [];
    player.money = 0;
    this.addLog(`${player.name} is BANKRUPT!`);

    const active = this.state.players.filter(p => !p.bankrupt);
    if (active.length === 1) {
      this.state.winner = active[0];
      this.state.phase = 'finished';
      this.addLog(`${active[0].name} WINS THE GAME!`);
    }

    this.state.turnPhase = 'roll';
    this.endTurn();
    this.emit();
  }

  checkDoublesContinue() {
    const player = this.currentPlayer();
    if (player.doublesCount > 0 && player.doublesCount < 3 && !player.inJail) {
      this.state.turnPhase = 'roll';
      this.addLog(`${player.name} rolled doubles — roll again!`);
    } else {
      this.endTurn();
    }
  }

  endTurn() {
    const player = this.currentPlayer();
    player.doublesCount = 0;
    let next = (this.state.currentPlayerIndex + 1) % this.state.players.length;
    while (this.state.players[next].bankrupt && next !== this.state.currentPlayerIndex) {
      next = (next + 1) % this.state.players.length;
    }
    this.state.currentPlayerIndex = next;
    this.state.turnPhase = 'roll';
    this.state.lastAction = null;
    this.emit();
  }

  endTurnManual() {
    this.endTurn();
    this.emit();
  }

  loadState(state) {
    if (state && !state.walletFunds) state.walletFunds = {};
    this.state = state;
    this.emit();
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

export const gameEngine = new GameEngine();
