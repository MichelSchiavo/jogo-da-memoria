// Service Worker para cache e funcionamento offline
const CACHE_NAME = 'memory-game-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/capture-ball.svg',
  '/game-preview.png',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto');
      return cache.addAll(urlsToCache);
    }),
  );
});

// Estratégia de cache: Network First, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta for válida, clona ela e armazena em cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tenta recuperar do cache
        return caches.match(event.request);
      }),
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
