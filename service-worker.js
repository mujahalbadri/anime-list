const CACHE_NAME = 'animepwa-v1';
const urlsToCache = [
  'nav.html',
  'index.html',
  'pages/home.html',
  'pages/about.html',
  'pages/anime-list.html',
  'pages/manga-list.html',
  'css/materialize.min.css',
  'css/style.css',
  'js/materialize.min.js',
  'js/nav.js',
  'img/anime-1.jpg',
  'img/anime-2.jpg',
  'img/anime-3.jpg',
  'img/manga-1.jpg',
  'img/manga-2.jpg',
  'img/manga-3.jpg',
  'img/sorry.jpg',
  'img/icon.png',
  'icon-192x192.png',
  'icon-512x512.png',
  'manifest.json',
  'js/register-service-worker.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url,
        );
        return fetch(event.request);
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log(`ServiceWorker: cache${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
        return true;
      }),
    )),
  );
});
