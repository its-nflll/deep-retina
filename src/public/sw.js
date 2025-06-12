// Service Worker for DeepRetina PWA
const CACHE_NAME = 'deepretina-v1';

// Check if we're in production mode before enabling caching
const isProduction = self.location.hostname !== 'localhost' && 
                    !self.location.hostname.includes('127.0.0.1') && 
                    !self.location.hostname.includes('192.168.');

const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/images/logo.png',
  '/app.bundle.js',
  '/styles.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache assets only in production
self.addEventListener('install', (event) => {
  // Skip caching in development mode
  if (!isProduction) {
    console.log('Development mode: skipping cache');
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
  
  // Force activation immediately instead of waiting
  self.skipWaiting();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  // Skip caching in development mode
  if (!isProduction) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        
        // Not in cache - return the result from the live server
        // and cache it for later
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response as it's a stream and can only be consumed once
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  // Take control immediately
  self.clients.claim();
  
  // In dev mode, clean all caches
  if (!isProduction) {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
    return;
  }
  
  // In production, only clean up old versions
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
