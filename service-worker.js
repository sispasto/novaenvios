const APP_VERSION = "1.1.0";
const CACHE_NAME = `app-cache-v${APP_VERSION}`;

self.addEventListener("install", (e) => {
  console.log("SW instalado - versión", APP_VERSION);

  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./css/home.css",
        "./css/loader.css",
        "./js/main.js",
        "./componentes/index.js",
      ]);
    }),
  );
});

self.addEventListener("activate", (e) => {
  console.log("SW activado - versión", APP_VERSION);

  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      const fetchPromise = fetch(e.request).then((networkRes) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, networkRes.clone());
        });
        return networkRes;
      });

      return response || fetchPromise;
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.action === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
