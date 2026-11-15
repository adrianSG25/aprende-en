const CACHE_NAME = 'uk-street-v21';
const NAV_TIMEOUT_MS = 3000;

self.addEventListener('install', (_event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

const fetchWithTimeout = (request, options, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(request, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
};

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // No interceptar peticiones externas (APIs IA, TVMaze, fuentes) para evitar bloqueos y caches ajenos
  if (url.origin !== self.location.origin) return;

  // Navegación HTML: red con límite de 3s y fallback inmediato a caché local
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetchWithTimeout(event.request.url, { cache: 'no-cache', credentials: 'same-origin' }, NAV_TIMEOUT_MS)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./')))
    );
    return;
  }

  // Assets estáticos propios: devolver caché al instante y actualizar en segundo plano si falta o cambia
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkPromise = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkPromise;
    })
  );
});
