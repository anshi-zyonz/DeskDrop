// Service Worker for DeskDrop — Offline First Shell & Assets
const CACHE_NAME = 'deskdrop-offline-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './peerjs.min.js',
  './manifest.json',
  './icons/favicon.png',
  './icons/icon_128x128.png',
  './icons/icon_256x256.png',
  './icons/icon_512x512.png',
  './icons/DeskDrop_Text Logo.png',
  './emojis/smile.png',
  './emojis/joy.png',
  './emojis/rofl.png',
  './emojis/heart_eyes.png',
  './emojis/party.png',
  './emojis/sunglasses.png',
  './emojis/star_struck.png',
  './emojis/wink.png',
  './emojis/kiss.png',
  './emojis/thinking.png',
  './emojis/mind_blown.png',
  './emojis/heart.png',
  './emojis/hundred.png',
  './emojis/alien.png',
  './emojis/robot.png',
  './emojis/ghost.png',
  './emojis/zany.png',
  './emojis/salute.png',
  './emojis/thumbs_up.png',
  './emojis/clap.png',
  './emojis/raised_hands.png',
  './emojis/love_you.png',
  './emojis/victory.png',
  './emojis/rocket.png',
  './emojis/party_popper.png',
  './emojis/game.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Internet-only dynamic features: AI generation, Giphy search, link previews
  if (url.origin !== location.origin || url.hostname.includes('giphy.com') || url.hostname.includes('pollinations.ai') || url.hostname.includes('peerjs.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ offline: true, error: 'Internet feature requires online connection' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Cache-First strategy for all app shell, icons, and bundled Microsoft animated emojis
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return immediately from local cache, update in background if online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

// Background Notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

self.addEventListener('push', (event) => {
  let data = { title: 'DeskDrop', body: 'New message received', icon: 'icons/icon_128x128.png' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'DeskDrop', {
      body: data.body || 'New message received',
      icon: data.icon || 'icons/icon_128x128.png',
      badge: 'icons/favicon.png',
      vibrate: [100, 50, 100]
    })
  );
});
