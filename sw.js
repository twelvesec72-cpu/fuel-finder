const CACHE = 'fuel-finder-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for Google Maps API (needs live data)
  if (e.request.url.includes('googleapis.com') || e.request.url.includes('maps.gstatic.com')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Cache-first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      // Cache any new resources we fetched
      if (resp.status === 200) {
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
      }
      return resp;
    }))
  );
});
