import { storage } from './storage.js';

const STUN_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
];

/** WebRTC P2P multiplayer — frontend-only, no backend server required.
 *  Host is authoritative: guests send actions, the host executes them and
 *  re-broadcasts the full game state to everyone. */
export class MultiplayerManager {
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

export const multiplayer = new MultiplayerManager();
