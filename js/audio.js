import { MEDIA } from './constants.js';
import { storage } from './storage.js';

export class AudioManager {
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

export const audio = new AudioManager();
