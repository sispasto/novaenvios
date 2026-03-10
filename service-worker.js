const CACHE_NAME = 'app-cache-v1.0';

self.addEventListener('install', function(e) {
  console.log('Service Worker: Installed');
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './css/home.css',
        './css/loader.css',
        './js/main.js',
        './componentes/index.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('Service Worker: Activated');

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('app-cache-v') && name !== CACHE_NAME)
          .map(name => {
            console.log('Service Worker: Deleting old cache', name);
            return caches.delete(name);
          })
      );
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
