/* Monopoly Global Village — offline cache service worker */
/* NOTE: bump CACHE version whenever assets change, so users get the new files. */
const CACHE = 'mgv-v19';
const ASSETS = [
  './',
  './index.html',
  './admin.html',
  './css/styles.css',
  './css/fonts.css',
  './js/game.js',
  './manifest.json',
  './fonts/nunito.woff2',
  './vendor/peerjs.min.js',
  './assets/img/poke-ball.png',
  './assets/img/dice-1.png',
  './assets/img/dice-2.png',
  './assets/img/dice-3.png',
  './assets/img/dice-4.png',
  './assets/img/dice-5.png',
  './assets/img/dice-6.png',
  './assets/audio/diceRoll.mp3',
  './assets/audio/money.mp3',
  './assets/audio/buy.mp3',
  './assets/audio/jail.mp3',
  './assets/audio/win.mp3',
  './assets/audio/card.mp3',
  './assets/audio/click.mp3',
  './assets/audio/bgMusic.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;
  // db.json API must NEVER be served from the cache — it is the live database.
  if (e.request.url.includes('/api/')) return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});