// sw.js - SPOTMOBI OFFLINE PWA 2026
const CACHE_NAME = 'spotmobi-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/js/planos.js',
  '/js/biblioteca.js'
];

// INSTALL
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// FETCH (Cache First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response || fetch(e.request))
  );
});

// UPDATE
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});
