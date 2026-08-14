// Monopoly Global Village — Board & Game Constants
const GO_SALARY = 200;
const JAIL_POSITION = 10;
const GO_TO_JAIL_POSITION = 30;
const STARTING_MONEY = 1500;
const MAX_HOUSES = 32;
const MAX_HOTELS = 12;
const COOKIE_MAX_AGE_DAYS = 730; // 2 years — long-lived like Google login

const PLAYER_COLORS = [
  '#e63946', '#457b9d', '#2a9d8f', '#e9c46a',
  '#9b5de5', '#f72585', '#00bbf9', '#fee440'
];

const PLAYER_TOKENS = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪'];

// 40-space board — Global Village cities (Pokémon GO theme)
const BOARD = [
  { id: 0,  type: 'go',           name: 'GO',              icon: '🏁' },
  { id: 1,  type: 'property',     name: 'Manila',          color: '#8B4513', price: 60,  rent: [2,10,30,90,160,250], houseCost: 50, group: 'brown' },
  { id: 2,  type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 3,  type: 'property',     name: 'Bangkok',         color: '#8B4513', price: 60,  rent: [4,20,60,180,320,450], houseCost: 50, group: 'brown' },
  { id: 4,  type: 'tax',          name: 'Income Tax',      tax: 200, icon: '💰' },
  { id: 5,  type: 'airport',      name: 'North Airport',   price: 200, icon: '✈️' },
  { id: 6,  type: 'property',     name: 'London',          color: '#87CEEB', price: 100, rent: [6,30,90,270,400,550], houseCost: 50, group: 'lightblue' },
  { id: 7,  type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 8,  type: 'property',     name: 'Toronto',         color: '#87CEEB', price: 100, rent: [6,30,90,270,400,550], houseCost: 50, group: 'lightblue' },
  { id: 9,  type: 'property',     name: 'Washington',      color: '#87CEEB', price: 120, rent: [8,40,100,300,450,600], houseCost: 50, group: 'lightblue' },
  { id: 10, type: 'jail',         name: 'Just Visiting',   icon: '🔒' },
  { id: 11, type: 'property',     name: 'Paris',           color: '#FF69B4', price: 140, rent: [10,50,150,450,625,750], houseCost: 100, group: 'pink' },
  { id: 12, type: 'utility',      name: 'Poké Center',     price: 150, icon: '🏥' },
  { id: 13, type: 'property',     name: 'Berlin',          color: '#FF69B4', price: 140, rent: [10,50,150,450,625,750], houseCost: 100, group: 'pink' },
  { id: 14, type: 'property',     name: 'Moscow',          color: '#FF69B4', price: 160, rent: [12,60,180,500,700,900], houseCost: 100, group: 'pink' },
  { id: 15, type: 'airport',      name: 'East Airport',    price: 200, icon: '✈️' },
  { id: 16, type: 'property',     name: 'Dubai',           color: '#FF8C00', price: 180, rent: [14,70,200,550,750,950], houseCost: 100, group: 'orange' },
  { id: 17, type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 18, type: 'property',     name: 'Cairo',           color: '#FF8C00', price: 180, rent: [14,70,200,550,750,950], houseCost: 100, group: 'orange' },
  { id: 19, type: 'property',     name: 'Madrid',          color: '#FF8C00', price: 200, rent: [16,80,220,600,800,1000], houseCost: 100, group: 'orange' },
  { id: 20, type: 'parking',      name: 'Free Parking',    icon: '🅿️' },
  { id: 21, type: 'property',     name: 'Istanbul',        color: '#FF0000', price: 220, rent: [18,90,250,700,875,1050], houseCost: 150, group: 'red' },
  { id: 22, type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 23, type: 'property',     name: 'Sydney',          color: '#FF0000', price: 220, rent: [18,90,250,700,875,1050], houseCost: 150, group: 'red' },
  { id: 24, type: 'property',     name: 'Taipei',          color: '#FF0000', price: 240, rent: [20,100,300,750,925,1100], houseCost: 150, group: 'red' },
  { id: 25, type: 'airport',      name: 'South Airport',   price: 200, icon: '✈️' },
  { id: 26, type: 'property',     name: 'Tokyo',           color: '#008000', price: 300, rent: [26,130,390,900,1100,1275], houseCost: 200, group: 'green' },
  { id: 27, type: 'property',     name: 'Seoul',           color: '#008000', price: 300, rent: [26,130,390,900,1100,1275], houseCost: 200, group: 'green' },
  { id: 28, type: 'utility',      name: 'Poké Stop',       price: 150, icon: '📍' },
  { id: 29, type: 'property',     name: 'Rio de Janeiro',  color: '#008000', price: 320, rent: [28,150,450,1000,1200,1400], houseCost: 200, group: 'green' },
  { id: 30, type: 'gotojail',     name: 'Go To Jail',      icon: '👮' },
  { id: 31, type: 'property',     name: 'New York',        color: '#000080', price: 350, rent: [35,175,500,1100,1300,1500], houseCost: 200, group: 'darkblue' },
  { id: 32, type: 'property',     name: 'Chicago',         color: '#000080', price: 360, rent: [37,185,550,1150,1350,1550], houseCost: 200, group: 'darkblue' },
  { id: 33, type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 34, type: 'tax',          name: 'Luxury Tax',      tax: 100, icon: '💎' },
  { id: 35, type: 'airport',      name: 'West Airport',    price: 200, icon: '✈️' },
  { id: 36, type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 37, type: 'property',     name: 'Shanghai',        color: '#FFD700', price: 260, rent: [22,110,330,800,975,1150], houseCost: 150, group: 'yellow' },
  { id: 38, type: 'property',     name: 'Hong Kong',       color: '#FFD700', price: 260, rent: [22,110,330,800,975,1150], houseCost: 150, group: 'yellow' },
  { id: 39, type: 'property',     name: 'Mumbai',          color: '#FFD700', price: 280, rent: [24,120,360,850,1025,1200], houseCost: 150, group: 'yellow' }
];

const PROPERTY_GROUPS = {
  brown: [1, 3], lightblue: [6, 8, 9], pink: [11, 13, 14],
  orange: [16, 18, 19], red: [21, 23, 24], yellow: [37, 38, 39],
  green: [26, 27, 29], darkblue: [31, 32]
};

const AIRPORTS = [5, 15, 25, 35];
const UTILITIES = [12, 28];

const CHANCE_CARDS = [
  { text: 'Advance to GO — Collect $200', action: 'move', target: 0, collectGo: true },
  { text: 'Advance to Tokyo', action: 'move', target: 26 },
  { text: 'Advance to South Airport — If you pass GO collect $200', action: 'move', target: 25, collectGo: true },
  { text: 'Advance to nearest Airport', action: 'nearestAirport' },
  { text: 'Advance to nearest Utility', action: 'nearestUtility' },
  { text: 'Bank pays you dividend of $50', action: 'money', amount: 50 },
  { text: 'Get Out of Jail Free', action: 'jailFree' },
  { text: 'Go Back 3 Spaces', action: 'back', spaces: 3 },
  { text: 'Go to Jail — Do not pass GO', action: 'jail' },
  { text: 'Make general repairs — $25 per house, $100 per hotel', action: 'repairs', house: 25, hotel: 100 },
  { text: 'Pay poor tax of $15', action: 'money', amount: -15 },
  { text: 'Take a trip to Paris — Advance to Paris', action: 'move', target: 11 },
  { text: 'Your building loan matures — Collect $150', action: 'money', amount: 150 },
  { text: 'You have won a crossword competition — Collect $100', action: 'money', amount: 100 },
  { text: 'Speeding fine $15', action: 'money', amount: -15 },
  { text: 'Catch a Pikachu! Collect $200', action: 'money', amount: 200 }
];

const CHEST_CARDS = [
  { text: 'Advance to GO — Collect $200', action: 'move', target: 0, collectGo: true },
  { text: 'Bank error in your favor — Collect $200', action: 'money', amount: 200 },
  { text: 'Doctor\'s fees — Pay $50', action: 'money', amount: -50 },
  { text: 'From sale of stock you get $50', action: 'money', amount: 50 },
  { text: 'Get Out of Jail Free', action: 'jailFree' },
  { text: 'Go to Jail — Do not pass GO', action: 'jail' },
  { text: 'Holiday fund matures — Receive $100', action: 'money', amount: 100 },
  { text: 'Income tax refund — Collect $20', action: 'money', amount: 20 },
  { text: 'It is your birthday — Collect $10 from every player', action: 'birthday', amount: 10 },
  { text: 'Life insurance matures — Collect $100', action: 'money', amount: 100 },
  { text: 'Pay hospital fees of $100', action: 'money', amount: -100 },
  { text: 'Pay school fees of $50', action: 'money', amount: -50 },
  { text: 'Receive $25 consultancy fee', action: 'money', amount: 25 },
  { text: 'You are assessed for street repairs — $40 per house, $100 per hotel', action: 'repairs', house: 40, hotel: 100 },
  { text: 'You have won second prize in a beauty contest — Collect $10', action: 'money', amount: 10 },
  { text: 'You inherit $100', action: 'money', amount: 100 }
];

/** Player wealth ranks — based on total net worth (wallet cash + property value) */
const RANKS = [
  { name: 'Rookie', icon: '🌱', min: 0 },
  { name: 'Collector', icon: '🎒', min: 5000 },
  { name: 'Trader', icon: '💰', min: 15000 },
  { name: 'Tycoon', icon: '🏙️', min: 40000 },
  { name: 'Millionaire', icon: '💎', min: 100000 },
  { name: 'Billionaire', icon: '👑', min: 1000000 }
];

/** Purchase value of a property/airport/utility space */
function propertyValue(spaceId) {
  const s = BOARD[spaceId];
  return s ? (s.price || 0) : 0;
}

const MEDIA = {
  diceRoll: 'assets/audio/diceRoll.mp3',
  money: 'assets/audio/money.mp3',
  buy: 'assets/audio/buy.mp3',
  jail: 'assets/audio/jail.mp3',
  win: 'assets/audio/win.mp3',
  card: 'assets/audio/card.mp3',
  click: 'assets/audio/click.mp3',
  bgMusic: 'assets/audio/bgMusic.mp3'
};



const DB_NAME = 'MonopolyGlobalVillage';
const DB_VERSION = 2;

/** Long-lived cookie storage (2-year expiry like Google login sessions).
 *  Mirrors every value into localStorage so data survives even where
 *  cookies are blocked (file://, some browsers). */
class CookieStore {
  static _lsKey(name) { return 'mgv_ls_' + name; }

  static set(name, value, days = COOKIE_MAX_AGE_DAYS) {
    const encoded = encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
    try {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encoded}; expires=${expires}; path=/; SameSite=Strict`;
    } catch (e) { /* cookies unavailable — localStorage mirror below still works */ }
    try { localStorage.setItem(this._lsKey(name), encoded); } catch (e) { /* storage full/blocked */ }
  }

  static get(name) {
    let raw = null;
    try {
      const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
      raw = match ? match[1] : null;
    } catch (e) { raw = null; }
    if (!raw) {
      try { raw = localStorage.getItem(this._lsKey(name)); } catch (e) { raw = null; }
    }
    if (!raw) return null;
    try {
      const decoded = decodeURIComponent(raw);
      return decoded.startsWith('{') || decoded.startsWith('[') ? JSON.parse(decoded) : decoded;
    } catch {
      return decodeURIComponent(raw);
    }
  }

  static remove(name) {
    try { document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; } catch (e) {}
    try { localStorage.removeItem(this._lsKey(name)); } catch (e) {}
  }

  static getAll() {
    const acc = {};
    try {
      document.cookie.split(';').forEach(c => {
        const [k, ...v] = c.trim().split('=');
        if (k) acc[k] = decodeURIComponent(v.join('='));
      });
    } catch (e) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('mgv_ls_')) acc[k.slice(7)] = decodeURIComponent(localStorage.getItem(k));
      }
    } catch (e) {}
    return acc;
  }
}

/** IndexedDB for large game state (no 4KB cookie limit) */
class GameDatabase {
  constructor() {
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('games')) db.createObjectStore('games', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('players')) db.createObjectStore('players', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('assets')) db.createObjectStore('assets', { keyPath: 'url' });
        if (!db.objectStoreNames.contains('rooms')) db.createObjectStore('rooms', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('accounts')) db.createObjectStore('accounts', { keyPath: 'username' });
      };
      req.onsuccess = () => { this.db = req.result; resolve(this.db); };
      req.onerror = () => reject(req.error);
    });
  }

  async get(store, key) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async put(store, data) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async getAll(store) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(store, key) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async cacheAsset(url, blob) {
    await this.put('assets', { url, blob, cachedAt: Date.now() });
  }

  async getCachedAsset(url) {
    const entry = await this.get('assets', url);
    return entry?.blob || null;
  }
}

/** Unified storage manager — accounts & lifetime wallet in IndexedDB, session in cookies.
 *  PR3: two wallets — the permanent LIFETIME wallet (username + password + PIN protected,
 *  permanent system-issued address) and the temporary per-game GAME wallet ($1500 start,
 *  deleted at game end). Incomes (rent, GO, Chance/Community Chest) always go to the
 *  lifetime wallet; every outgoing payment comes from the game wallet. */
class StorageManager {
  constructor() {
    this.db = new GameDatabase();
    this.playerId = null;
    this.account = null;
  }

  async init() {
    await this.db.init();
    this.playerId = CookieStore.get('mgv_player_id');
    if (!this.playerId) {
      this.playerId = 'player_' + crypto.randomUUID().slice(0, 8);
      CookieStore.set('mgv_player_id', this.playerId);
    }
    if (!CookieStore.get('mgv_session')) CookieStore.set('mgv_session', crypto.randomUUID());
    const username = CookieStore.get('mgv_user');
    if (username) this.account = (await this.getAccount(username)) || null;
    return this.playerId;
  }

  isLoggedIn() { return !!this.account; }
  logout() { this.account = null; CookieStore.remove('mgv_user'); }

  getPlayerProfile() {
    const wallet = this.getLifetime();
    return {
      id: this.playerId,
      name: this.account?.displayName || CookieStore.get('mgv_player_name') || 'Trainer',
      username: this.account?.username || '',
      session: CookieStore.get('mgv_session'),
      avatar: CookieStore.get('mgv_avatar') || '🔴',
      wallet: wallet.balance,
      walletProperties: wallet.properties,
      walletAddress: this.getWalletAddress(),
      createdAt: this.account?.createdAt || CookieStore.get('mgv_created') || new Date().toISOString()
    };
  }

  /* ---------------- hashing (SHA-256 with salt, best-effort fallback) ---------------- */
  async _digest(str) {
    const data = new TextEncoder().encode(str);
    try {
      const buf = await crypto.subtle.digest('SHA-256', data);
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h1 = 0x811c9dc5, h2 = 0x01000193;
      for (let i = 0; i < str.length; i++) {
        h1 = Math.imul(h1 ^ str.charCodeAt(i), 0x01000193);
        h2 = Math.imul(h2 ^ (str.charCodeAt(i) + 7), 0x85ebca6b);
      }
      return (h1 >>> 0).toString(16) + (h2 >>> 0).toString(16);
    }
  }
  _salt() { return crypto.randomUUID().replace(/[^a-z0-9]/gi, ''); }
  _hashPass(pw, salt) { return this._digest('mgv-pass:' + salt + ':' + pw); }
  _hashPin(pin, salt) { return this._digest('mgv-pin:' + salt + ':' + pin); }

  /* ---------------- accounts (username + password + wallet PIN) ---------------- */
  async hasAnyAccount() {
    const list = await this.db.getAll('accounts');
    return list.length > 0;
  }

  async getAccount(username) {
    const key = String(username || '').trim().toLowerCase();
    if (!key) return null;
    return this.db.get('accounts', key);
  }

  /** Create the permanent account: username, password and the lifetime-wallet PIN.
   *  The system generates a permanent lifetime wallet address that can never change. */
  async createAccount({ username, password, pin }) {
    const key = String(username || '').trim().toLowerCase();
    if (!key || key.length < 3) return { ok: false, error: 'Username needs at least 3 characters' };
    if (!/^[a-z0-9_.]+$/.test(key)) return { ok: false, error: 'Username may only contain letters, numbers, _ and .' };
    if (await this.getAccount(key)) return { ok: false, error: 'Username already taken' };
    if (String(password || '').length < 4) return { ok: false, error: 'Password needs at least 4 characters' };
    if (!/^\d{4,6}$/.test(String(pin || ''))) return { ok: false, error: 'Wallet PIN must be 4–6 digits' };

    const passSalt = this._salt();
    const pinSalt = this._salt();
    const account = {
      username: key,
      displayName: String(username).trim(),
      passHash: await this._hashPass(password, passSalt),
      passSalt,
      pinHash: await this._hashPin(pin, pinSalt),
      pinSalt,
      lifetimeAddr: this.makeLifetimeAddress(),
      balance: 0,
      properties: [],
      createdAt: new Date().toISOString()
    };

    // Carry over the legacy cookie wallet CASH (if any) so nothing is ever lost.
    // PR5: game properties are temporary — they never enter the lifetime wallet.
    const legacy = CookieStore.get('mgv_wallet');
    if (legacy && typeof legacy === 'object') {
      account.balance = Math.max(0, Math.floor(Number(legacy.balance) || 0));
      account.properties = [];
    } else if (legacy && typeof legacy === 'string' && !isNaN(Number(legacy))) {
      account.balance = Math.max(0, Math.floor(Number(legacy)));
    }
    if (account.balance > 0 || account.properties.length > 0) CookieStore.remove('mgv_wallet');

    await this.db.put('accounts', account);
    this.account = account;
    CookieStore.set('mgv_user', key);
    return { ok: true, account };
  }

  async loginAccount(username, password) {
    const account = await this.getAccount(username);
    if (!account) return { ok: false, error: 'Account not found — check your username' };
    const hash = await this._hashPass(String(password || ''), account.passSalt);
    if (hash !== account.passHash) return { ok: false, error: 'Wrong password' };
    this.account = account;
    CookieStore.set('mgv_user', account.username);
    return { ok: true, account };
  }

  async verifyPassword(password) {
    const acc = this.account;
    if (!acc) return false;
    return (await this._hashPass(String(password || ''), acc.passSalt)) === acc.passHash;
  }

  async verifyPin(pin) {
    const acc = this.account;
    if (!acc) return false;
    return (await this._hashPin(String(pin || ''), acc.pinSalt)) === acc.pinHash;
  }

  /** Change username / password / wallet PIN (address is permanent) */
  async changeAccount({ newUsername, newPassword, newPin }) {
    const acc = this.account;
    if (!acc) return { ok: false, error: 'Not logged in' };
    const changes = {};
    if (newUsername && String(newUsername).trim().toLowerCase() !== acc.username) {
      const key = String(newUsername).trim().toLowerCase();
      if (key.length < 3) return { ok: false, error: 'Username needs at least 3 characters' };
      if (!/^[a-z0-9_.]+$/.test(key)) return { ok: false, error: 'Username may only contain letters, numbers, _ and .' };
      if (await this.getAccount(key)) return { ok: false, error: 'Username already taken' };
      changes.username = key;
      changes.displayName = String(newUsername).trim();
    }
    if (newPassword) {
      if (String(newPassword).length < 4) return { ok: false, error: 'New password needs at least 4 characters' };
      changes.passSalt = this._salt();
      changes.passHash = await this._hashPass(newPassword, changes.passSalt);
    }
    if (newPin) {
      if (!/^\d{4,6}$/.test(String(newPin))) return { ok: false, error: 'New wallet PIN must be 4–6 digits' };
      changes.pinSalt = this._salt();
      changes.pinHash = await this._hashPin(newPin, changes.pinSalt);
    }
    if (!Object.keys(changes).length) return { ok: false, error: 'Nothing to change' };
    const updated = { ...acc, ...changes };
    if (changes.username) await this.db.delete('accounts', acc.username);
    await this.db.put('accounts', updated);
    this.account = updated;
    CookieStore.set('mgv_user', updated.username);
    return { ok: true, account: updated };
  }

  /* ---------------- permanent lifetime wallet ---------------- */
  makeLifetimeAddress() {
    const hex = crypto.randomUUID().replace(/[^a-f0-9]/gi, '').toUpperCase();
    return 'LIF-' + hex.slice(0, 4) + '-' + hex.slice(4, 8);
  }

  getLifetime() {
    const acc = this.account;
    return {
      balance: acc ? Math.max(0, Math.floor(Number(acc.balance) || 0)) : 0,
      properties: acc ? (Array.isArray(acc.properties) ? acc.properties : []) : []
    };
  }

  getLifetimeBalance() { return this.getLifetime().balance; }

  async addLifetime(cash) {
    const acc = this.account;
    if (!acc) return null;
    acc.balance += Math.max(0, Math.floor(Number(cash) || 0));
    await this.db.put('accounts', acc);
    return acc;
  }

  async debitLifetime(amount) {
    const acc = this.account;
    if (!acc) return false;
    amount = Math.floor(Number(amount) || 0);
    if (amount <= 0 || amount > acc.balance) return false;
    acc.balance -= amount;
    await this.db.put('accounts', acc);
    return true;
  }

  /* ---------------- PR4 ATM: lifetime → lifetime transfers ---------------- */

  /** Find any account by its permanent LIF address (never exposes secrets) */
  async findAccountByLifetimeAddr(addr) {
    const key = String(addr || '').trim().toUpperCase();
    if (!/^LIF-[A-F0-9]{4}-[A-F0-9]{4}$/.test(key)) return null;
    const all = await this.db.getAll('accounts');
    return all.find(a => String(a.lifetimeAddr || '').toUpperCase() === key) || null;
  }

  /** PR4 ATM: send money from MY lifetime wallet to ANY account's lifetime wallet.
   *  Lifetime → lifetime only — game money can never be converted into lifetime
   *  money, so players cannot cheat free game cash into their wallet. */
  async atmSend(recipientAddr, amount, pin) {
    const acc = this.account;
    if (!acc) return { ok: false, error: 'Not logged in' };
    if (!(await this.verifyPin(pin))) return { ok: false, error: 'Wrong wallet PIN' };
    const recipient = await this.findAccountByLifetimeAddr(recipientAddr);
    if (!recipient) return { ok: false, error: 'No account has that lifetime address' };
    if (recipient.username === acc.username) return { ok: false, error: 'You cannot send to your own wallet' };
    amount = Math.floor(Number(amount) || 0);
    if (amount <= 0) return { ok: false, error: 'Enter a valid amount' };
    if (amount > acc.balance) return { ok: false, error: `Not enough lifetime balance ($${acc.balance.toLocaleString()})` };
    acc.balance -= amount;
    recipient.balance = Math.max(0, Math.floor(Number(recipient.balance) || 0)) + amount;
    await this.db.put('accounts', acc);
    await this.db.put('accounts', recipient);
    return { ok: true, recipient };
  }

  /** Legacy cookie-wallet alias — returns the lifetime wallet shape {balance, properties} */
  getWalletData() { return this.getLifetime(); }
  getWallet() { return this.getLifetimeBalance(); }

  setWalletData(data) {
    if (!this.account) return;
    // PR5: lifetime wallet holds CASH only — properties are game-temporary.
    this.account.balance = Math.max(0, Math.floor(Number(data?.balance) || 0));
    this.account.properties = [];
    this.db.put('accounts', this.account);
  }

  setWallet(amount) {
    if (!this.account) return;
    this.account.balance = Math.max(0, Math.floor(Number(amount) || 0));
    this.db.put('accounts', this.account);
  }

  addWallet(amount) {
    if (!this.account) return;
    this.account.balance += Math.floor(Number(amount) || 0);
    this.db.put('accounts', this.account);
  }

  saveWalletProperties(properties) {
    if (!this.account) return;
    this.account.properties = Array.isArray(properties) ? properties : [];
    this.db.put('accounts', this.account);
  }

  bankToWallet(cash, propertyIds) {
    const acc = this.account;
    if (!acc) return null;
    acc.balance += Math.max(0, Math.floor(Number(cash) || 0));
    acc.properties = [...new Set([...(acc.properties || []), ...(propertyIds || [])])];
    this.db.put('accounts', acc);
    return acc;
  }

  /** Net worth = LIFETIME wallet cash only. PR5: properties are game-wallet
   *  temporary and never counted towards the rank. */
  computeNetWorth() {
    return this.getLifetimeBalance();
  }

  /** Rank is decided by the LIFETIME wallet only (game money never counts) */
  getRank() {
    const net = this.computeNetWorth();
    let rank = RANKS[0];
    let idx = 0;
    for (let i = 0; i < RANKS.length; i++) {
      if (net >= RANKS[i].min) { rank = RANKS[i]; idx = i; }
    }
    const next = RANKS[idx + 1] || null;
    const progress = next
      ? Math.min(100, Math.round(((net - rank.min) / (next.min - rank.min)) * 100))
      : 100;
    return { ...rank, netWorth: net, progress, next };
  }

  /** In-memory banking used at game end — bank NOW and record visits.
   *  PR5: only CASH income is banked to the lifetime wallet — properties live in
   *  the temporary GAME wallet and are deleted with it when the game ends. */
  bankGameToLifetime(gameId, income) {
    if (this.isBanked(gameId)) return null;
    const acc = this.account;
    if (!acc) return null;
    const amt = Math.max(0, Math.floor(Number(income) || 0));
    acc.balance += amt;
    this.db.put('accounts', acc);
    this.markBanked(gameId);
    return { income: amt };
  }

  /** Each game can only be banked once (prevents repeat banking of the same
   *  earnings when the page is reloaded or the tab closed more than once). */
  isBanked(gameId) {
    return !!CookieStore.get('mgv_banked_' + gameId);
  }

  markBanked(gameId) {
    CookieStore.set('mgv_banked_' + gameId, '1');
  }

  /** Permanent lifetime wallet address (system-generated at account creation) */
  getWalletAddress() {
    return this.account?.lifetimeAddr || '';
  }

  setPlayerName(name) {
    // username is permanent — kept only for legacy compatibility
    if (name && this.account) this.account.displayName = String(name).trim();
  }

  setAvatar(avatar) {
    CookieStore.set('mgv_avatar', avatar);
  }

  async saveGame(gameState) {
    gameState.savedAt = Date.now();
    gameState.ownerId = this.playerId;
    await this.db.put('games', gameState);
    CookieStore.set('mgv_last_game', gameState.id);
    return gameState;
  }

  async loadGame(gameId) {
    return this.db.get('games', gameId);
  }

  async getAllGames() {
    return this.db.getAll('games');
  }

  async deleteGame(gameId) {
    await this.db.delete('games', gameId);
  }

  /** Export full dataset as downloadable file */
  async exportDataset(gameId) {
    const game = gameId ? await this.loadGame(gameId) : null;
    const allGames = await this.getAllGames();
    const profile = this.getPlayerProfile();
    const cookies = CookieStore.getAll();

    const dataset = {
      version: '1.3',
      exportedAt: new Date().toISOString(),
      profile,
      wallet: this.getWalletData(),
      account: this.account ? {
        username: this.account.username,
        displayName: this.account.displayName,
        lifetimeAddr: this.account.lifetimeAddr,
        balance: this.account.balance,
        properties: this.account.properties,
        createdAt: this.account.createdAt
      } : null,
      cookies: {
        player_id: cookies.mgv_player_id,
        player_name: cookies.mgv_player_name,
        session: cookies.mgv_session,
        avatar: cookies.mgv_avatar,
        wallet: cookies.mgv_wallet
      },
      games: allGames,
      currentGame: game
    };

    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monopoly-global-village-${Date.now()}.mgv`;
    a.click();
    URL.revokeObjectURL(url);
    return dataset;
  }

  /** Import dataset from uploaded file */
  async importDataset(file) {
    const text = await file.text();
    const data = JSON.parse(text);

    if (data.cookies) {
      Object.entries(data.cookies).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') CookieStore.set(`mgv_${k}`, v);
      });
    }
    if (data.profile?.name) this.setPlayerName(data.profile.name);
    if (data.wallet !== undefined && data.wallet !== null) {
      if (typeof data.wallet === 'object') this.setWalletData(data.wallet);
      else this.setWallet(data.wallet);
    }
    // Restore the lifetime wallet CASH into the CURRENT account (never overrides
    // identity/security). PR5: properties are game-temporary and never imported.
    if (data.account && this.account && data.account.username === this.account.username) {
      if (data.account.lifetimeAddr) this.account.lifetimeAddr = data.account.lifetimeAddr;
      this.account.balance = Math.max(0, Math.floor(Number(data.account.balance) || 0));
      this.account.properties = [];
      await this.db.put('accounts', this.account);
    }
    if (data.games) {
      for (const game of data.games) {
        await this.db.put('games', game);
      }
    }
    return data;
  }

  /** Collect player cookie data for secure multiplayer sync (each player sends their own) */
  getSecurePlayerPayload() {
    const profile = this.getPlayerProfile();
    return {
      playerId: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      session: profile.session,
      timestamp: Date.now(),
      checksum: this._hash(JSON.stringify({ id: profile.id, session: profile.session }))
    };
  }

  _hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return h.toString(36);
  }

  async saveRoom(roomData) {
    await this.db.put('rooms', roomData);
    CookieStore.set('mgv_room_id', roomData.id);
  }

  async loadRoom(roomId) {
    return this.db.get('rooms', roomId);
  }
}

const storage = new StorageManager();



class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.enabled = true;
    this.musicEnabled = false;
    this.volume = 0.7;
  }

  async init() {
    const urls = Object.entries(MEDIA);
    for (const [key, url] of urls) {
      try {
        const cached = await storage.db.getCachedAsset(url);
        if (cached) {
          this.sounds[key] = URL.createObjectURL(cached);
        } else {
          this.sounds[key] = url;
          this._cacheInBackground(url);
        }
      } catch {
        this.sounds[key] = url;
      }
    }
  }

  async _cacheInBackground(url) {
    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      await storage.db.cacheAsset(url, blob);
    } catch { /* offline fallback */ }
  }

  play(name) {
    if (!this.enabled || !this.sounds[name]) return;
    const audio = new Audio(this.sounds[name]);
    audio.volume = this.volume;
    audio.play().catch(() => {});
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.music = new Audio(this.sounds.bgMusic);
      this.music.loop = true;
      this.music.volume = this.volume * 0.3;
      this.music.play().catch(() => {});
    } else {
      this.music?.pause();
      this.music = null;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const audio = new AudioManager();



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

class GameEngine {
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

    // Every player gets a temporary GAME wallet address (private to this game, public in-game)
    const walletAddrs = {};
    players.forEach(p => {
      const hex = crypto.randomUUID().replace(/[^a-f0-9]/gi, '').toUpperCase();
      walletAddrs[p.id] = 'GMV-' + hex.slice(0, 8);
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
      walletFunds: {},
      // PR3: income accrued during this game (rent, GO, Chance & Community Chest) that is
      // saved to each player's LIFETIME wallet at the end of the game. Game money is temp.
      lifetime: {},
      walletAddrs
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
    if (this.state.walletAddrs) {
      const hex = crypto.randomUUID().replace(/[^a-f0-9]/gi, '').toUpperCase();
      this.state.walletAddrs[player.id] = 'GMV-' + hex.slice(0, 8);
    }
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
      this.creditIncome(player.id, GO_SALARY, 'GO salary');
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
        if (card.collectGo && target < oldPos) this.creditIncome(player.id, GO_SALARY, 'Passed GO');
        player.position = target;
        this.handleLanding(target);
        break;
      }
      case 'nearestAirport': {
        const pos = player.position;
        const next = AIRPORTS.find(a => a > pos) || AIRPORTS[0];
        if (next < pos) this.creditIncome(player.id, GO_SALARY, 'Passed GO');
        player.position = next;
        this.handleLanding(next);
        break;
      }
      case 'nearestUtility': {
        const pos = player.position;
        const next = UTILITIES.find(u => u > pos) || UTILITIES[0];
        if (next < pos) this.creditIncome(player.id, GO_SALARY, 'Passed GO');
        player.position = next;
        this.handleLanding(next);
        break;
      }
      case 'money':
        if (card.amount > 0) this.creditIncome(player.id, card.amount, card.text);
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
        let collected = 0;
        this.state.players.filter(p => p.id !== player.id && !p.bankrupt).forEach(p => {
          const amt = Math.min(card.amount, p.money);
          p.money -= amt;
          collected += amt;
        });
        this.creditIncome(player.id, collected, 'Birthday gifts');
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
      this.creditIncome(toId, amount, reason);
      return true;
    }
    return this.handleDebt(from, amount, reason, toId);
  }

  /** ATM transfer between two players by id — sender pays from GAME money,
   *  the receiver's money is saved to their lifetime wallet (income). */
  transferMoneyToPlayer(fromId, toId, amount, reason = 'ATM transfer') {
    const from = this.getPlayer(fromId);
    const to = this.getPlayer(toId);
    if (!from || !to) return { ok: false, error: 'Player not found' };
    if (from.bankrupt || to.bankrupt) return { ok: false, error: 'Player is bankrupt' };
    if (!Number.isFinite(amount) || amount <= 0) return { ok: false, error: 'Invalid amount' };
    if (from.money < amount) return { ok: false, error: 'Not enough money' };
    from.money -= amount;
    this.creditIncome(toId, amount, reason);
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

  /** PR3: every INCOME in the game (rent received, GO salary, Chance & Community
   *  Chest rewards, birthday gifts) is credited to the player's LIFETIME wallet
   *  accrual — it never joins the temporary game money that is deleted at game end.
   *  All outgoing payments come from the game wallet (player.money). */
  creditIncome(playerId, amount, reason) {
    if (!this.state || amount <= 0) return;
    const player = this.getPlayer(playerId);
    if (!player || player.bankrupt) return;
    const amt = Math.floor(amount);
    this.state.lifetime = this.state.lifetime || {};
    this.state.lifetime[playerId] = (this.state.lifetime[playerId] || 0) + amt;
    this.addLog(`${player.name} earned $${amt} (${reason}) → saved to lifetime wallet`);
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
    const leftoverCash = player.money;

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
      } else {
        prop.ownerId = null;
      }
    });

    player.properties = [];
    player.money = 0;
    if (creditor && leftoverCash > 0) this.creditIncome(creditor.id, leftoverCash, 'Bankruptcy assets');
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
    if (state) {
      if (!state.walletFunds) state.walletFunds = {};
      if (!state.lifetime) state.lifetime = {};
      if (!state.walletAddrs) {
        state.walletAddrs = {};
        state.players.forEach(p => {
          const hex = crypto.randomUUID().replace(/[^a-f0-9]/gi, '').toUpperCase();
          state.walletAddrs[p.id] = 'GMV-' + hex.slice(0, 8);
        });
      }
    }
    this.state = state;
    this.emit();
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

const gameEngine = new GameEngine();



const STUN_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
];

/** WebRTC P2P multiplayer — frontend-only, no backend server required.
 *  Host is authoritative: guests send actions, the host executes them and
 *  re-broadcasts the full game state to everyone. */
class MultiplayerManager {
  constructor() {
    this.peer = null;
    this.connections = new Map();
    this.isHost = false;
    this.roomId = null;
    this.onStateSync = null;
    this.onPlayerJoin = null;
    this.onMessage = null;
    this.onHostStateRequest = null;
    this.onStatus = null;
    this.localPlayerPayload = null;
  }

  generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  /** PeerJS is loaded from a CDN — check it is available before going online */
  isAvailable() {
    return typeof Peer !== 'undefined';
  }

  getShareUrl(roomId) {
    let base;
    try {
      base = window.location.origin && window.location.origin !== 'null'
        ? window.location.origin + window.location.pathname
        : window.location.pathname;
    } catch (e) {
      base = window.location.pathname;
    }
    return `${base}?room=${roomId}`;
  }

  _report(status, detail) {
    if (this.onStatus) this.onStatus(status, detail);
  }

  async initPeer(roomId, isHost) {
    this.roomId = roomId;
    this.isHost = isHost;
    this.localPlayerPayload = storage.getSecurePlayerPayload();

    if (!this.isAvailable()) {
      this._report('error', 'PeerJS library not loaded (check internet access to unpkg.com)');
      return false;
    }

    this._report('connecting');

    return new Promise((resolve, reject) => {
      const attempt = (tryCount) => {
        if (tryCount > 0 && this.peer) this.peer.destroy();

        const hostPeerId = `mgv-host-${roomId}`;
        // Only the host needs a stable id so guests can find it; guests get an
        // auto-generated unique id (works even from two tabs on the same machine).
        const peerId = isHost ? hostPeerId : undefined;
        const peer = new Peer(peerId, { debug: 1, config: { iceServers: STUN_SERVERS } });
        this.peer = peer;

        const done = (id) => {
          this._report('connected', id);
          resolve(id);
        };

        peer.on('open', done);

        peer.on('error', (err) => {
          if (err.type === 'unavailable-id' || err.type === 'network') {
            if (tryCount < 3) {
              this._report('connecting', `${err.type} — retrying (${tryCount + 1}/3)`);
              setTimeout(() => attempt(tryCount + 1), 1200 * (tryCount + 1));
            } else {
              this._report('error', `Cannot reach the online matchmaking server (${err.type}).`);
              reject(new Error(err.type));
            }
          } else if (err.type === 'peer-unavailable') {
            this._report('error', 'Room not found — check the code and that the host is online.');
            reject(err);
          } else {
            this._report('error', err.message || err.type);
            reject(err);
          }
        });

        peer.on('connection', (conn) => this._setupConnection(conn));
      };

      attempt(0);

      // Watchdog so the UI never hangs on "connecting"
      setTimeout(() => {
        if (!this.peer || this.peer.disconnected) this._report('connecting', 'still trying…');
      }, 4000);
    });
  }

  _setupConnection(conn) {
    const register = () => {
      this.connections.set(conn.peer, conn);
      this._report(this.connections.size > 0 ? 'peers' : 'connected', this.connections.size);

      conn.send(JSON.stringify({
        type: 'player-cookie',
        payload: this.localPlayerPayload
      }));

      if (this.isHost && this.onHostStateRequest) {
        const state = this.onHostStateRequest();
        if (state) conn.send(JSON.stringify({ type: 'state-sync', state, timestamp: Date.now() }));
      }

      if (this.onPlayerJoin) this.onPlayerJoin(conn.peer);
    };

    if (conn.open) register();
    else conn.on('open', register);

    conn.on('data', (data) => {
      try {
        const msg = typeof data === 'string' ? JSON.parse(data) : data;
        this._handleMessage(msg, conn);
      } catch (e) {
        console.error('Message parse error:', e);
      }
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      this._report('peers', this.connections.size);
    });
  }

  _handleMessage(msg, conn) {
    switch (msg.type) {
      case 'player-cookie':
        if (this.onMessage) this.onMessage({ type: 'player-joined', player: msg.payload });
        if (this.isHost) {
          if (this.onHostStateRequest) {
            const state = this.onHostStateRequest();
            if (state) conn.send(JSON.stringify({ type: 'state-sync', state, timestamp: Date.now() }));
          }
          this._broadcastExcept(conn.peer, msg);
        }
        break;
      case 'state-sync':
        if (this.onStateSync) this.onStateSync(msg.state);
        break;
      case 'action':
        if (this.isHost && this.onMessage) this.onMessage(msg);
        break;
      case 'chat':
        if (this.onMessage) this.onMessage(msg);
        break;
      default:
        if (this.onMessage) this.onMessage(msg);
    }
  }

  async joinRoom(hostRoomId) {
    let ok = false;
    try {
      await this.initPeer(hostRoomId, false);
      ok = true;
    } catch (e) {
      throw new Error('Signaling server unreachable — check your internet connection.');
    }
    if (!ok) throw new Error('Could not initialise peer connection.');

    const hostPeerId = `mgv-host-${hostRoomId}`;
    this._report('connecting', 'looking for host…');

    return new Promise((resolve, reject) => {
      const conn = this.peer.connect(hostPeerId, { reliable: true });
      const timeout = setTimeout(() => {
        this._report('error', 'Timed out waiting for the host.');
        reject(new Error('Connection timeout'));
      }, 20000);

      conn.on('open', () => {
        clearTimeout(timeout);
        this._setupConnection(conn);
        conn.send(JSON.stringify({
          type: 'player-cookie',
          payload: this.localPlayerPayload
        }));
        this._report('connected', 'host');
        resolve(conn);
      });

      conn.on('error', (err) => {
        clearTimeout(timeout);
        this._report('error', err.type || err.message);
        reject(err);
      });
    });
  }

  broadcastState(state) {
    const msg = JSON.stringify({ type: 'state-sync', state, timestamp: Date.now() });
    this.connections.forEach(conn => { if (conn.open) conn.send(msg); });
  }

  /** Guest → host action request, or host → everyone relay */
  broadcastAction(action) {
    const msg = JSON.stringify({
      type: 'action',
      action,
      playerId: storage.playerId,
      timestamp: Date.now()
    });
    if (this.isHost) {
      this.connections.forEach(conn => { if (conn.open) conn.send(msg); });
    } else {
      const hostConn = [...this.connections.values()][0];
      if (hostConn?.open) hostConn.send(msg);
    }
  }

  broadcastChat(chatMsg) {
    const msg = JSON.stringify({ type: 'chat', ...chatMsg, timestamp: Date.now() });
    this.connections.forEach(conn => { if (conn.open) conn.send(msg); });
    this.broadcastViaChannel(JSON.parse(msg));
  }

  _broadcastExcept(excludePeer, msg) {
    const data = JSON.stringify(msg);
    this.connections.forEach((conn, peer) => {
      if (peer !== excludePeer && conn.open) conn.send(data);
    });
  }

  /** Fallback: BroadcastChannel for same-browser tabs */
  initBroadcastChannel(roomId) {
    if (!('BroadcastChannel' in window)) return;
    this.channel = new BroadcastChannel(`mgv-${roomId}`);
    this.channel.onmessage = (e) => this._handleMessage(e.data, null);
  }

  broadcastViaChannel(msg) {
    this.channel?.postMessage(msg);
  }

  getConnectedCount() {
    return this.connections.size + (this.isHost ? 1 : 0);
  }

  destroy() {
    this.connections.forEach(c => c.close());
    this.connections.clear();
    this.peer?.destroy();
    this.channel?.close();
  }
}

const multiplayer = new MultiplayerManager();



const CORNERS = new Set([0, 10, 20, 30]);

function renderBoard(container, gameState) {
  container.innerHTML = '';

  const board = document.createElement('div');
  board.className = 'monopoly-board';

  const center = document.createElement('div');
  center.className = 'board-center';
  center.innerHTML = `
    <div class="center-logo">
      <h2>Monopoly<br><span>Global Village</span></h2>
      <div class="deck-slots">
        <div class="deck chance-deck" title="Chance cards remaining">❓<strong>${gameState.chanceDeck?.length || 0}</strong></div>
        <div class="deck chest-deck" title="Community Chest cards remaining">📦<strong>${gameState.chestDeck?.length || 0}</strong></div>
      </div>
      <small class="center-hint">Hover a tile for details</small>
    </div>
    <div class="dice-area" title="Click to roll the dice">
      <img class="die-img" data-die="0" src="assets/img/dice-1.png" alt="dice 1">
      <img class="die-img" data-die="1" src="assets/img/dice-2.png" alt="dice 2">
    </div>
    <small class="dice-hint">Click the dice to roll</small>`;
  board.appendChild(center);

  const positions = getBoardPositions();
  BOARD.forEach((space, i) => {
    board.appendChild(createCell(space, i, positions[i], gameState));
  });

  container.appendChild(board);
  updateTokens(container, gameState);
}

function getBoardPositions() {
  const pos = {};
  for (let i = 0; i <= 9; i++) pos[i] = { row: 10, col: 10 - i };
  for (let i = 10; i <= 19; i++) pos[i] = { row: 20 - i, col: 0 };
  for (let i = 20; i <= 29; i++) pos[i] = { row: 0, col: i - 20 };
  for (let i = 30; i <= 39; i++) pos[i] = { row: i - 30, col: 10 };
  return pos;
}

function buildTooltip(space, prop, owner) {
  const lines = [space.name];
  if (space.type === 'property') {
    lines.push(`Group: ${space.group} · Price $${space.price}`);
    lines.push(`Rent: ${space.rent.join(' / ')}`);
    if (space.houseCost) lines.push(`House cost $${space.houseCost}`);
  } else if (space.price) {
    lines.push(`Price $${space.price}`);
  }
  if (owner) lines.push(`Owner: ${owner.name}`);
  if (prop?.houses > 0) lines.push(prop.houses >= 5 ? 'Hotel' : `${prop.houses} house${prop.houses > 1 ? 's' : ''}`);
  if (prop?.mortgaged) lines.push('Mortgaged');
  return lines.join(' · ');
}

function createCell(space, index, pos, gameState) {
  const cell = document.createElement('div');
  cell.className = `board-cell cell-${space.type}${CORNERS.has(index) ? ' corner' : ''}`;
  cell.dataset.spaceId = space.id;
  cell.style.gridRow = pos.row + 1;
  cell.style.gridColumn = pos.col + 1;

  const prop = gameState?.properties?.find(p => p.spaceId === space.id);
  const owner = prop?.ownerId ? gameState.players.find(p => p.id === prop.ownerId) : null;

  let html = '';
  if (space.color) html += `<div class="color-bar" style="background:${space.color}" title="${space.group}"></div>`;

  html += `<div class="cell-content">`;
  html += `<span class="cell-icon">${space.icon || ''}</span>`;
  html += `<span class="cell-name">${space.name}</span>`;
  if (space.price) html += `<span class="cell-price">$${space.price}</span>`;
  if (space.tax) html += `<span class="cell-price">$${space.tax}</span>`;

  if (owner) {
    html += `<div class="owner-badge" style="background:${owner.color}" title="${owner.name}">${owner.token}</div>`;
  }

  if (prop?.houses > 0) {
    const n = prop.houses;
    html += `<div class="buildings" title="${n >= 5 ? 'Hotel' : n + ' house' + (n > 1 ? 's' : '')}">${
      n >= 5 ? '<span class="hotel">H</span>' : '<span class="house"></span>'.repeat(n)
    }</div>`;
  }
  if (prop?.mortgaged) html += `<div class="mortgaged" title="Mortgaged">M</div>`;

  html += `<div class="token-container" data-space="${space.id}"></div>`;
  html += `</div>`;

  cell.innerHTML = html;
  cell.title = buildTooltip(space, prop, owner);
  return cell;
}

function updateTokens(container, gameState) {
  if (!gameState) return;
  container.querySelectorAll('.token-container').forEach(tc => tc.innerHTML = '');

  gameState.players.forEach(player => {
    if (player.bankrupt) return;
    const tc = container.querySelector(`.token-container[data-space="${player.position}"]`);
    if (tc) {
      const token = document.createElement('span');
      token.className = 'player-token';
      token.style.background = player.color;
      token.textContent = player.name ? player.name[0].toUpperCase() : '?';
      token.title = player.name;
      if (player.id === gameState.players[gameState.currentPlayerIndex]?.id) {
        token.classList.add('active-turn');
      }
      tc.appendChild(token);
    }
  });
}

function setDiceImages(d1, d2) {
  const imgs = document.querySelectorAll('.die-img');
  if (!imgs.length) return;
  if (d1 > 0 && d1 <= 6) imgs[0].src = `assets/img/dice-${d1}.png`;
  if (d2 > 0 && d2 <= 6) imgs[1].src = `assets/img/dice-${d2}.png`;
}

function animateDice(d1, d2) {
  const area = document.querySelector('.dice-area');
  const imgs = document.querySelectorAll('.die-img');
  if (!area || !imgs.length) return;
  area.classList.add('rolling');
  let frames = 0;
  const interval = setInterval(() => {
    imgs.forEach(img => {
      img.src = `assets/img/dice-${Math.ceil(Math.random() * 6)}.png`;
    });
    frames++;
    if (frames > 10) {
      clearInterval(interval);
      setDiceImages(d1, d2);
      area.classList.remove('rolling');
    }
  }, 80);
}

function showCardOverlay(card, type) {
  const overlay = document.getElementById('card-overlay');
  if (!overlay) return;
  overlay.className = `card-overlay show ${type}`;
  overlay.querySelector('.card-text').textContent = card.text;
  overlay.querySelector('.card-type').textContent = type === 'chance' ? '❓ CHANCE' : '📦 COMMUNITY CHEST';
}

function hideCardOverlay() {
  document.getElementById('card-overlay')?.classList.remove('show');
}



const BOT_NAMES = ['Bot Ash', 'Bot Misty', 'Bot Brock', 'Bot Gary', 'Bot Dawn', 'Bot Serena'];

const BOT_CHAT = [
  'Nice move! 🎲', 'Let\'s go! 💪', 'I\'m winning this! 😎', 'Good luck everyone! 🍀',
  'Roll the dice! 🎲', '💰💰💰', 'Buying everything! 🏠', 'Watch out for my properties! 😏',
  'Free parking here I come! 🅿️', 'That rent is expensive! 😅', 'GG! 🏆', 'Anyone want to trade? 🤝'
];

/** Drives AI turns for offline bot players */
class BotManager {
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


class UIManager {
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
    const revealed = this._walletRevealed;
    const nameEl = document.getElementById('player-name-display');
    if (nameEl) nameEl.textContent = profile.name;
    document.getElementById('player-avatar').textContent = profile.avatar;
    const walletEl = document.getElementById('wallet-balance');
    if (walletEl) {
      walletEl.textContent = revealed ? '$' + profile.wallet.toLocaleString() : '●●●●●●';
      walletEl.classList.toggle('masked', !revealed);
    }
    const addrEl = document.getElementById('wallet-address');
    if (addrEl) addrEl.textContent = profile.walletAddress;
    const rankChip = document.getElementById('wallet-rank-chip');
    if (rankChip) rankChip.textContent = rank.icon + ' ' + rank.name;
    const nwEl = document.getElementById('wallet-networth');
    if (nwEl) nwEl.textContent = revealed ? '💎 Net worth $' + rank.netWorth.toLocaleString() : 'Net worth ●●●●●●';
    const fill = document.getElementById('rank-progress-fill');
    if (fill) {
      const pct = rank.next ? Math.max(2, Math.min(100, Math.round((rank.progress || 0) * 100))) : 100;
      fill.style.width = pct + '%';
    }
    this.renderSavedGames();
  }

  /** Show the auth (login / create account) screen. `defaultLogin` = true when an
   *  account already exists so the login tab is shown first. */
  showAuthScreen(defaultLogin) {
    this.setAuthTab(defaultLogin === false ? 'register' : 'login');
    this.showScreen('auth-screen');
  }

  setAuthTab(mode) {
    const loginTab = document.getElementById('auth-tab-login');
    const regTab = document.getElementById('auth-tab-register');
    const loginForm = document.getElementById('auth-login-form');
    const regForm = document.getElementById('auth-register-form');
    if (!loginTab || !regTab) return;
    const isLogin = mode === 'login';
    loginTab.classList.toggle('active', isLogin);
    regTab.classList.toggle('active', !isLogin);
    loginForm.hidden = !isLogin;
    regForm.hidden = isLogin;
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
          <small class="wallet-addr" title="Game wallet address (public)">${this.app.gameWalletAddressOf(p)}</small>
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

  /** PR3 In-Game Bank modal — shows the game wallet (public) and the lifetime
   *  wallet (masked until PIN is entered). Moved here: no ATM send/deposit. */
  renderBank() {
    const state = this.app.engine.getState();
    const me = state?.players?.find(p => p.id === this.app.myPlayerId);
    const lifetime = this.app.storage.getLifetime();
    const gameAddr = document.getElementById('bank-game-addr');
    const gameBal = document.getElementById('bank-game-balance');
    const lifeAddr = document.getElementById('bank-lifetime-addr');
    const lifeBal = document.getElementById('bank-lifetime-balance');

    if (gameAddr) gameAddr.textContent = me ? this.app.gameWalletAddressOf(me) : 'Game not started';
    if (gameBal) gameBal.textContent = '$' + (me ? me.money : 0).toLocaleString();
    if (lifeAddr) lifeAddr.textContent = this.app.lifetimeAddressOf() || '—';
    if (lifeBal) {
      lifeBal.textContent = this._bankPinVerified
        ? '$' + lifetime.balance.toLocaleString()
        : '●●●●●●';
      lifeBal.className = this._bankPinVerified ? 'lifetime-revealed' : '';
    }
  }

  /** Reveal/hide the lifetime balance in the bank modal based on PIN validity */
  setBankPinState(verified) {
    this._bankPinVerified = !!verified;
    this.renderBank();
    const hint = document.getElementById('bank-pin-hint');
    if (!hint) return;
    hint.textContent = verified
      ? '✅ PIN verified — lifetime balance unlocked.'
      : 'Enter your wallet PIN to unlock your lifetime balance.';
    hint.className = 'info ' + (verified ? 'ok' : '');
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
    this.pendingRoom = null;
    this.authHandled = false;
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
      this._liveBankIncome(state);
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
    this.registerServiceWorker();
    this._installBeforeUnloadBank();
    this.checkRoomUrl();

    // Password gate (PR3): an existing account must log in, a new player creates one.
    // The lifetime wallet is protected by this account's password + wallet PIN.
    if (this.storage.isLoggedIn()) {
      this.afterAuth();
    } else {
      this.ui.showAuthScreen(await this.storage.hasAnyAccount());
    }
  }

  /** Called after login/registration or remembered session — resume the lobby / room link */
  afterAuth() {
    this.authHandled = true;
    this.ui.renderLobby();
    if (this.pendingRoom) {
      document.getElementById('join-room-code').value = this.pendingRoom;
      this.ui.showScreen('join-screen');
      this.ui.showToast('Room detected — enter your name and join!', 'info');
    } else {
      this.ui.showScreen('lobby-screen');
    }
  }

  async handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
      this.ui.showToast('Enter your username and password', 'error');
      return;
    }
    const res = await this.storage.loginAccount(username, password);
    if (res.ok) {
      const remember = document.getElementById('login-remember').checked;
      if (!remember) this.storage.logout();
      else this.ui.showToast(`Welcome back, ${res.account.displayName}!`, 'success');
      audio.play('click');
      this.afterAuth();
    } else {
      this.ui.showToast(res.error, 'error');
    }
  }

  async handleRegister() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;
    const pin = document.getElementById('reg-pin').value.trim();
    const pin2 = document.getElementById('reg-pin2').value.trim();
    if (password !== password2) { this.ui.showToast('Passwords do not match', 'error'); return; }
    if (pin !== pin2) { this.ui.showToast('Wallet PINs do not match', 'error'); return; }
    const res = await this.storage.createAccount({ username, password, pin });
    if (res.ok) {
      this.ui.showToast(`Account created! Lifetime wallet ${res.account.lifetimeAddr}`, 'success');
      audio.play('click');
      this.afterAuth();
    } else {
      this.ui.showToast(res.error, 'error');
    }
  }

  async handleSecuritySave() {
    const current = document.getElementById('sec-current-pass').value;
    if (!(await this.storage.verifyPassword(current))) {
      this.ui.showToast('Current password is wrong', 'error');
      return;
    }
    const res = await this.storage.changeAccount({
      newUsername: document.getElementById('sec-new-username').value.trim(),
      newPassword: document.getElementById('sec-new-pass').value,
      newPin: document.getElementById('sec-new-pin').value.trim()
    });
    if (res.ok) {
      this.ui.showToast('Security settings updated!', 'success');
      this.ui.showModal('security-modal', false);
      document.getElementById('sec-current-pass').value = '';
      document.getElementById('sec-new-username').value = '';
      document.getElementById('sec-new-pass').value = '';
      document.getElementById('sec-new-pin').value = '';
      this.ui.renderLobby();
    } else {
      this.ui.showToast(res.error, 'error');
    }
  }

  handleLogout() {
    this.multiplayer.destroy();
    this.engine.state = null;
    this.storage.logout();
    this.ui.showModal('menu-modal', false);
    this.ui.showModal('end-game-modal', false);
    this.ui.showAuthScreen(true);
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

    // ---- Auth (PR3: username + password + wallet PIN) ----
    document.getElementById('auth-tab-login')?.addEventListener('click', () => this.ui.setAuthTab('login'));
    document.getElementById('auth-tab-register')?.addEventListener('click', () => this.ui.setAuthTab('register'));
    document.getElementById('btn-login')?.addEventListener('click', () => this.handleLogin());
    document.getElementById('login-password')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleLogin(); });
    document.getElementById('btn-register')?.addEventListener('click', () => this.handleRegister());
    document.getElementById('btn-logout')?.addEventListener('click', () => this.handleLogout());

    // ---- Security (change username / password / PIN) ----
    document.getElementById('btn-security')?.addEventListener('click', () => this.ui.showModal('security-modal'));

    // ---- PR4 ATM: lifetime → lifetime transfer to any account ----
    document.getElementById('btn-atm')?.addEventListener('click', () => this.openAtm());
    document.getElementById('btn-close-atm')?.addEventListener('click', () => this.ui.showModal('atm-modal', false));
    document.getElementById('btn-atm-send')?.addEventListener('click', () => this.atmSendMoney());
    document.getElementById('atm-to-addr')?.addEventListener('input', () => this.atmLookupRecipient());

    // ---- PR5: reveal masked lifetime balance with the wallet PIN (owner only) ----
    document.getElementById('btn-reveal-wallet')?.addEventListener('click', () => this.ui.showModal('wallet-reveal-modal'));
    document.getElementById('btn-close-reveal')?.addEventListener('click', () => this.ui.showModal('wallet-reveal-modal', false));
    document.getElementById('btn-reveal-confirm')?.addEventListener('click', () => this.handleWalletReveal());
    document.getElementById('reveal-pin')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleWalletReveal(); });
    document.getElementById('btn-close-security')?.addEventListener('click', () => this.ui.showModal('security-modal', false));
    document.getElementById('btn-save-security')?.addEventListener('click', () => this.handleSecuritySave());

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

    // ---- In-Game Bank (transfer LIFETIME → GAME wallet, PIN-protected) ----
    document.getElementById('btn-bank')?.addEventListener('click', () => {
      this.ui.renderBank();
      this.ui.showModal('bank-modal');
    });
    document.getElementById('btn-close-bank')?.addEventListener('click', () => this.ui.showModal('bank-modal', false));
    document.getElementById('btn-bank-transfer')?.addEventListener('click', () => this.handleBankTransfer());
    document.getElementById('bank-pin')?.addEventListener('input', async (e) => {
      const pin = e.target.value.trim();
      const ok = pin.length >= 4 && await this.storage.verifyPin(pin);
      this.ui.setBankPinState(ok);
    });

    // ---- End Game (PR3: bank incomes, delete the temporary game wallet) ----
    document.getElementById('btn-end-game')?.addEventListener('click', () => this.ui.showModal('end-game-modal'));
    document.getElementById('btn-end-game-confirm')?.addEventListener('click', () => this.endGameNow());
    document.getElementById('btn-close-end-game')?.addEventListener('click', () => this.ui.showModal('end-game-modal', false));

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
      this.pendingRoom = room;
      return true;
    }
    return false;
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
      case 'bankTransfer': {
        // PR3: money moved from the player's LIFETIME wallet into the game wallet.
        // Added to game money only — it is deleted with the game at the end.
        if (this.engine.adjustMoney(action.playerId, action.amount, 'Transferred from lifetime wallet')) {
          audio.play('money');
        }
        break;
      }
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

  /** PR3 In-Game Bank — transfer money from the LIFETIME wallet into the temporary
   *  GAME wallet. PIN-protected. Transferred money is spent inside this game and is
   *  DELETED with the game wallet at the end — it never returns to the lifetime wallet. */
  handleBankTransfer() {
    const amount = parseInt(document.getElementById('bank-amount').value);
    const pin = document.getElementById('bank-pin').value.trim();
    const state = this.engine.getState();
    if (!state) { this.ui.showToast('Start a game first!', 'error'); return; }
    if (!amount || amount <= 0) { this.ui.showToast('Enter a valid amount', 'error'); return; }
    if (pin.length < 4) { this.ui.showToast('Enter your wallet PIN', 'error'); return; }
    (async () => {
      if (!(await this.storage.verifyPin(pin))) {
        this.ui.showToast('Wrong wallet PIN', 'error');
        return;
      }
      const lifetime = this.storage.getLifetime();
      if (amount > lifetime.balance) {
        this.ui.showToast(`Not enough lifetime balance ($${lifetime.balance.toLocaleString()})`, 'error');
        return;
      }
      await this.storage.debitLifetime(amount);
      this.dispatch({ type: 'bankTransfer', playerId: this.myPlayerId, amount });
      this.ui.showToast(`💵 $${amount.toLocaleString()} transferred into this game`, 'success');
      this.ui.renderBank();
      audio.play('money');
    })();
  }

  /** PR5: unlock the masked lifetime balance on the main page with the wallet PIN */
  handleWalletReveal() {
    const pin = document.getElementById('reveal-pin')?.value.trim();
    if (pin.length < 4) { this.ui.showToast('Enter your wallet PIN', 'error'); return; }
    (async () => {
      if (!(await this.storage.verifyPin(pin))) {
        this.ui.showToast('Wrong wallet PIN', 'error');
        return;
      }
      this.ui._walletRevealed = true;
      this.ui.showModal('wallet-reveal-modal', false);
      this.ui.renderLobby();
      this.ui.showToast('🔓 Lifetime balance unlocked', 'success');
      audio.play('click');
    })();
  }

  /** PR4 ATM — open the lifetime transfer modal and fill in the sender's details */
  openAtm() {
    const addrEl = document.getElementById('atm-my-addr');
    const balEl = document.getElementById('atm-my-balance');
    const toEl = document.getElementById('atm-to-addr');
    const amtEl = document.getElementById('atm-amount');
    const pinEl = document.getElementById('atm-pin');
    const infoEl = document.getElementById('atm-recipient-info');
    const lifetime = this.storage.getLifetime();
    if (addrEl) addrEl.textContent = this.storage.getWalletAddress() || '—';
    if (balEl) balEl.textContent = '$' + lifetime.balance.toLocaleString();
    if (toEl) toEl.value = '';
    if (amtEl) amtEl.value = '';
    if (pinEl) pinEl.value = '';
    if (infoEl) { infoEl.style.display = 'none'; infoEl.textContent = ''; }
    this.ui.showModal('atm-modal');
  }

  /** PR4 ATM — preview who the recipient is when an LIF address is typed */
  async atmLookupRecipient() {
    const addr = document.getElementById('atm-to-addr')?.value.trim();
    const infoEl = document.getElementById('atm-recipient-info');
    if (!infoEl) return;
    if (!addr) { infoEl.style.display = 'none'; return; }
    const recipient = await this.storage.findAccountByLifetimeAddr(addr);
    if (recipient) {
      // PR5: only the OWNER sees their lifetime cash — never show another
      // account's balance to the sender.
      infoEl.textContent = `✓ ${recipient.displayName || recipient.username}`;
      infoEl.className = 'info ok';
      infoEl.style.display = '';
    } else {
      infoEl.textContent = '✗ No account has that lifetime address';
      infoEl.className = 'info err';
      infoEl.style.display = '';
    }
  }

  /** PR4 ATM — send lifetime money to any other account's lifetime wallet */
  async atmSendMoney() {
    const addr = document.getElementById('atm-to-addr')?.value.trim();
    const amount = parseInt(document.getElementById('atm-amount')?.value);
    const pin = document.getElementById('atm-pin')?.value.trim();
    if (!addr) { this.ui.showToast('Enter the recipient lifetime address', 'error'); return; }
    if (!amount || amount <= 0) { this.ui.showToast('Enter a valid amount', 'error'); return; }
    if (pin.length < 4) { this.ui.showToast('Enter your wallet PIN', 'error'); return; }
    const res = await this.storage.atmSend(addr, amount, pin);
    if (!res.ok) { this.ui.showToast(res.error, 'error'); return; }
    const name = res.recipient.displayName || res.recipient.username;
    this.ui.showToast(`💸 Sent $${amount.toLocaleString()} to ${name}'s lifetime wallet`, 'success');
    audio.play('money');
    this.ui.showModal('atm-modal', false);
    this.ui.renderLobby();
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

  /** PR3/PR5: When a game ends (or you quit), the GAME wallet ($1500 start, transfers,
   *  everything spent, ALL properties) is DELETED. Only the player's accumulated
   *  INCOME — all rent, GO salaries and Chance/Community Chest rewards — is banked
   *  into the LIFETIME wallet. Each game can only be banked once. */
  _bankLifetime(me) {
    const state = this.engine.getState();
    const stateId = state?.id;
    if (!me || stateId == null || this.storage.isBanked(stateId)) return null;
    const total = Math.floor(state.lifetime?.[me.id] || 0);
    const income = Math.max(0, total - this._incomeBanked(stateId));
    if (income > 0) {
      return this.storage.bankGameToLifetime(stateId, income);
    }
    return null;
  }

  /** How much of this game's income was already banked live (mgv_income_<gameId>) */
  _incomeBanked(stateId) {
    return Math.max(0, Math.floor(Number(CookieStore.get('mgv_income_' + stateId) || 0)));
  }

  /** PR4: bank the human player's income LIVE the moment it is earned (rent, GO,
   *  Chance & Community Chest) so it is never lost — even if the game never ends
   *  normally (crash, closed tab, host left, etc.). Each game's income is deduped
   *  via the mgv_income_<gameId> offset cookie, so end-of-game banking only banks
   *  whatever is still unbanked and nothing is ever double-counted. */
  _liveBankIncome(state) {
    if (!state || !state.lifetime || this.storage.isBanked(state.id)) return;
    const me = state.players.find(p => p.id === this.myPlayerId);
    if (!me) return;
    const total = Math.floor(state.lifetime[me.id] || 0);
    if (total <= 0) return;
    const delta = total - this._incomeBanked(state.id);
    if (delta <= 0) return;
    this.storage.addLifetime(delta);
    CookieStore.set('mgv_income_' + state.id, String(total));
  }

  /** Auto-bank before the tab is closed/reloaded so nothing is ever lost */
  _installBeforeUnloadBank() {
    window.addEventListener('beforeunload', () => {
      const state = this.engine.getState();
      if (!state || state.phase === 'finished') return;
      const me = state.players.find(p => p.id === this.myPlayerId);
      if (!me || me.bankrupt) return;
      this._bankLifetime(me);
    });
  }

  checkGameEnd(state) {
    if (!state || state.phase !== 'finished') return;
    if (this.lastFinishedId === state.id) return;
    this.lastFinishedId = state.id;
    const me = state.players.find(p => p.id === this.myPlayerId);
    if (!me) return;
    const banked = this._bankLifetime(me);
    if (banked) {
      this.ui.showToast(
        `💾 $${banked.income.toLocaleString()} income saved to your lifetime wallet!`,
        'success'
      );
    }
  }

  /** PR3/PR5: End Game button — bank lifetime income, delete the temporary game
   *  wallet (money AND properties), leave the room and return to the lobby. */
  endGameNow() {
    const state = this.engine.getState();
    if (state && state.phase !== 'finished') {
      const me = state.players.find(p => p.id === this.myPlayerId);
      if (me && !me.bankrupt) {
        const banked = this._bankLifetime(me);
        if (banked) {
          this.ui.showToast(
            `💾 $${banked.income.toLocaleString()} income saved to your lifetime wallet!`,
            'success'
          );
        }
      }
    }
    this.multiplayer.destroy();
    this.ui.showModal('end-game-modal', false);
    this.ui.showModal('menu-modal', false);
    this.ui.showScreen('lobby-screen');
    this.ui.renderLobby();
  }

  /** Quit to lobby — bank any lifetime income first so nothing is lost */
  quitToLobby() {
    const state = this.engine.getState();
    if (state && state.phase !== 'finished') {
      const me = state.players.find(p => p.id === this.myPlayerId);
      if (me && !me.bankrupt) {
        const banked = this._bankLifetime(me);
        if (banked) {
          this.ui.showToast(
            `💾 $${banked.income.toLocaleString()} income saved to your lifetime wallet!`,
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

  /** PR3: temporary GAME wallet address for a player (public in-game). The permanent
   *  LIFETIME wallet address is NOT shown to other players. */
  gameWalletAddressOf(player) {
    const state = this.engine.getState();
    return state?.walletAddrs?.[player?.id] || 'GMV-········';
  }

  /** Lifetime wallet address of the current player (private — shown only on main page) */
  lifetimeAddressOf() {
    return this.storage.getWalletAddress();
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


