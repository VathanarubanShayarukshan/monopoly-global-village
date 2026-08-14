import { BOARD } from './constants.js';

export const BOT_NAMES = ['Bot Ash', 'Bot Misty', 'Bot Brock', 'Bot Gary', 'Bot Dawn', 'Bot Serena'];

const BOT_CHAT = [
  'Nice move! 🎲', 'Let\'s go! 💪', 'I\'m winning this! 😎', 'Good luck everyone! 🍀',
  'Roll the dice! 🎲', '💰💰💰', 'Buying everything! 🏠', 'Watch out for my properties! 😏',
  'Free parking here I come! 🅿️', 'That rent is expensive! 😅', 'GG! 🏆', 'Anyone want to trade? 🤝'
];

/** Drives AI turns for offline bot players */
export class BotManager {
  constructor(app) {
    this.app = app;
    this.timer = null;
    this.enabled = false;
  }

  /** Called after every state change — schedules the bot's next action */
  tick() {
    if (!this.enabled || this.timer) return;
    const state = this.app.engine.getState();
    if (state.phase !== 'playing') return;
    const player = state.players[state.currentPlayerIndex];
    if (!player || !player.isBot || player.bankrupt) return;
    this.timer = setTimeout(() => this.act(), 700 + Math.random() * 900);
  }

  act() {
    this.timer = null;
    const app = this.app;
    const engine = app.engine;
    const state = engine.getState();
    const player = state.players[state.currentPlayerIndex];
    if (!player || !player.isBot || player.bankrupt) return;

    switch (state.turnPhase) {
      case 'roll':
        if (player.inJail) {
          if (player.jailFreeCards > 0 && Math.random() < 0.7) engine.useJailFreeCard();
          else if (player.money >= 50 && Math.random() < 0.6) engine.payJailFine();
          else engine.rollDice();
        } else {
          engine.rollDice();
        }
        break;

      case 'buy': {
        const space = BOARD[state.lastAction?.spaceId];
        const price = space?.price || 0;
        const want = player.money >= price && (player.money > price * 1.5 || Math.random() < 0.55);
        if (want) engine.buyProperty();
        else engine.declineProperty();
        break;
      }

      case 'card':
        engine.drawCard(BOARD[player.position]?.type === 'chance' ? 'chance' : 'chest');
        break;

      case 'auction': {
        const a = state.auction;
        const maxBid = Math.min(player.money, (a?.currentBid || 0) + 20 + Math.ceil(Math.random() * 80));
        if (a?.active && maxBid > (a.currentBid || 0) && Math.random() < 0.5) {
          engine.placeBid(player.id, maxBid);
        } else {
          engine.endAuction();
        }
        break;
      }

      case 'debt': {
        // Try to raise funds, then retry the payment; otherwise go bankrupt
        const raised = this.raiseFunds(player);
        if (raised) {
          if (!engine.retryDebtPayment()) this.tick();
        } else {
          engine.declareBankruptcy(state.lastAction?.creditorId);
        }
        break;
      }
    }

    // Chained actions (doubles, landing again) need another tick
    this.tick();
  }

  raiseFunds(player) {
    const engine = this.app.engine;
    const state = engine.getState();
    // Sell houses first
    for (const sid of [...player.properties]) {
      const prop = state.properties.find(p => p.spaceId === sid);
      if (prop?.houses > 0) { engine.sellHouse(sid); return true; }
    }
    // Then mortgage
    for (const sid of [...player.properties]) {
      const prop = state.properties.find(p => p.spaceId === sid);
      if (prop && !prop.mortgaged && prop.houses === 0) { engine.mortgage(sid); return true; }
    }
    return false;
  }

  /** Offline bots occasionally chat back */
  botReply() {
    const state = this.app.engine.getState();
    const bots = state.players.filter(p => p.isBot && !p.bankrupt);
    if (!bots.length) return;
    const bot = bots[Math.floor(Math.random() * bots.length)];
    setTimeout(() => {
      this.app.ui.addChatMessage({
        type: 'chat',
        name: bot.name,
        text: BOT_CHAT[Math.floor(Math.random() * BOT_CHAT.length)],
        time: Date.now(),
        bot: true
      });
    }, 800 + Math.random() * 1500);
  }
}