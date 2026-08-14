import { COOKIE_MAX_AGE_DAYS, RANKS, propertyValue } from './constants.js';

const DB_NAME = 'MonopolyGlobalVillage';
const DB_VERSION = 1;

/** Long-lived cookie storage (2-year expiry like Google login sessions).
 *  Mirrors every value into localStorage so data survives even where
 *  cookies are blocked (file://, some browsers). */
export class CookieStore {
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
export class GameDatabase {
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

/** Unified storage manager — cookies for identity, IndexedDB for game data */
export class StorageManager {
  constructor() {
    this.db = new GameDatabase();
    this.playerId = null;
  }

  async init() {
    await this.db.init();
    this.playerId = CookieStore.get('mgv_player_id');
    if (!this.playerId) {
      this.playerId = 'player_' + crypto.randomUUID().slice(0, 8);
      CookieStore.set('mgv_player_id', this.playerId);
    }
    if (!CookieStore.get('mgv_session')) {
      CookieStore.set('mgv_session', crypto.randomUUID());
    }
    return this.playerId;
  }

  getPlayerProfile() {
    const wallet = this.getWalletData();
    return {
      id: this.playerId,
      name: CookieStore.get('mgv_player_name') || 'Trainer',
      session: CookieStore.get('mgv_session'),
      avatar: CookieStore.get('mgv_avatar') || '🔴',
      wallet: wallet.balance,
      walletProperties: wallet.properties,
      walletAddress: this.getWalletAddress(),
      createdAt: CookieStore.get('mgv_created') || new Date().toISOString()
    };
  }

  /** Persistent wallet — balance + owned properties, saved in cookie */
  getWalletData() {
    const w = CookieStore.get('mgv_wallet');
    if (w && typeof w === 'object' && w.balance !== undefined) {
      return { balance: Math.max(0, Math.floor(w.balance)) || 0, properties: Array.isArray(w.properties) ? w.properties : [] };
    }
    return { balance: Number(w) || 0, properties: [] };
  }

  getWallet() {
    return this.getWalletData().balance;
  }

  setWalletData(data) {
    CookieStore.set('mgv_wallet', {
      balance: Math.max(0, Math.floor(data.balance || 0)),
      properties: Array.isArray(data.properties) ? data.properties : []
    });
  }

  setWallet(amount) {
    const d = this.getWalletData();
    d.balance = Math.max(0, Math.floor(amount));
    this.setWalletData(d);
  }

  addWallet(amount) {
    const d = this.getWalletData();
    d.balance += Math.floor(amount);
    this.setWalletData(d);
  }

  saveWalletProperties(properties) {
    const d = this.getWalletData();
    d.properties = Array.isArray(properties) ? properties : [];
    this.setWalletData(d);
  }

  /** Net worth = wallet cash + total purchase value of wallet properties */
  computeNetWorth() {
    const w = this.getWalletData();
    const props = (w.properties || []).reduce((sum, sid) => sum + propertyValue(sid), 0);
    return w.balance + props;
  }

  /** Current rank tier + progress toward the next one */
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

  /** Merge earned cash + property ids into the wallet (game finish / quit).
   *  Passing 0 cash banks nothing; ids are merged (never duplicated). */
  bankToWallet(cash, propertyIds) {
    const d = this.getWalletData();
    d.balance += Math.max(0, Math.floor(cash || 0));
    const merged = new Set([...(d.properties || []), ...(propertyIds || [])]);
    d.properties = [...merged];
    this.setWalletData(d);
    return d;
  }

  /** Each game can only be banked once (prevents repeat banking of the same
   *  earnings when the page is reloaded or the tab closed more than once). */
  isBanked(gameId) {
    return !!CookieStore.get('mgv_banked_' + gameId);
  }

  markBanked(gameId) {
    CookieStore.set('mgv_banked_' + gameId, '1');
  }

  /** Unique wallet address derived from the player id (MGV-XXXXXXXX) */
  getWalletAddress(playerId = this.playerId) {
    const clean = String(playerId || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    return 'MGV-' + (clean || 'UNKNOWN');
  }

  setPlayerName(name) {
    CookieStore.set('mgv_player_name', name);
    if (!CookieStore.get('mgv_created')) CookieStore.set('mgv_created', new Date().toISOString());
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
      version: '1.2',
      exportedAt: new Date().toISOString(),
      profile,
      wallet: this.getWalletData(),
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

export const storage = new StorageManager();
