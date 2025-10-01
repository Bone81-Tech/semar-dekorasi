const CACHE_NAME = 'semar-dekorasi-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/favicon_io/android-chrome-192x192.png',
  '/images/favicon_io/android-chrome-512x512.png',
  '/images/logo.webp',
  '/images/gambar-dekorasi/gbr-1.webp',
  '/images/gambar-dekorasi/gbr-2.webp',
  '/images/gambar-dekorasi/gbr-3.webp',
  '/images/gambar-dekorasi/gbr-4.webp',
  '/images/gambar-dekorasi/gbr-5.webp',
  '/images/gambar-dekorasi/gbr-6.webp'
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});