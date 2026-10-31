// 30 Day Challenge service worker: keeps the app working offline.
// Change VERSION whenever any file changes, so phones pick up the new copy.
const VERSION = '30day-v1.10.0';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-32.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-512-maskable.png',
  'icons/apple-touch-icon.png',
  'images/exercises/crunch.webp',
  'images/exercises/sit-up.webp',
  'images/exercises/dead-bug.webp',
  'images/exercises/leg-raise.webp',
  'images/exercises/reverse-crunch.webp',
  'images/exercises/bicycle-crunch.webp',
  'images/exercises/russian-twist.webp',
  'images/exercises/knee-tuck.webp',
  'images/exercises/plank.webp',
  'images/exercises/double-ds.webp',
  'images/exercises/spiderman-plank.webp',
  'images/exercises/plank-step-up.webp',
  'images/exercises/plank-shoulder-tap.webp',
  'images/exercises/side-plank.webp',
  'images/exercises/mountain-climber.webp',
  'images/exercises/v-sit.webp',
  'images/exercises/hollow-hold.webp',
  'images/exercises/flutter-kicks.webp',
  'images/exercises/heel-touch.webp',
  'images/exercises/press-up.webp',
  'images/exercises/squat-thrust.webp',
  'images/exercises/star-jump.webp',
  'images/exercises/leg-swing.webp',
  'images/exercises/side-step-bounce.webp',
  'images/exercises/forward-back-bounce.webp',
  'images/exercises/corner-bounce.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

// Pages: try the network first (so updates arrive), fall back to the saved copy offline.
// Everything else: saved copy first, then network.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
