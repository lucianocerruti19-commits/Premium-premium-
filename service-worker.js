const CACHE_NAME = "tutto-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./menu.html",
  "./login.html",
  "./waiter.html",
  "./kitchen.html",
  "./admin.html",
  "./styles.css",
  "./firebase.js",
  "./auth.js",
  "./ding.mp3",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./logo.jpg",
  "./hero.jpg",
  "./burger1.jpg",
  "./burger2.jpg",
  "./pizza1.jpg",
  "./pizza2.jpg"
];

// ✅ Instalar cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// ✅ Servir offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});