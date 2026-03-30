const APP_VERSION = "1.1";
const CACHE_NAME = `app-cache-v${APP_VERSION}`;

self.addEventListener("install", (e) => {
  console.log("SW instalado - versión", APP_VERSION);

  // NO usar skipWaiting aquí para permitir que quede en estado waiting
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
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request)
        .then((networkRes) => {
          if (
            !networkRes ||
            networkRes.status !== 200 ||
            networkRes.type === "opaque"
          ) {
            return networkRes;
          }
          const responseClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
          return networkRes;
        })
        .catch(() => cachedResponse); // fallback offline

      return cachedResponse || fetchPromise;
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "GET_VERSION") {
    event.source.postMessage({
      type: "VERSION",
      version: APP_VERSION,
    });
  }

  if (event.data?.action === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
