const CACHE_NAME = 'wanhub-v3';
const STATIC_CACHE = 'wanhub-static-v3';
const DYNAMIC_CACHE = 'wanhub-dynamic-v3';

const staticAssets = ['/', '/manifest.json', '/icons/icon-192x192.png', '/icons/icon-512x512.png', '/offline.html'];

const dynamicAssets = ['/api/', '/student', '/teacher', '/organization'];

// IndexedDB helper functions for service worker
class ServiceWorkerDB {
  constructor() {
    this.dbName = 'WanHubServiceWorkerDB';
    this.version = 1;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create stores for service worker data
        if (!db.objectStoreNames.contains('apiCache')) {
          const apiStore = db.createObjectStore('apiCache', { keyPath: 'url' });
          apiStore.createIndex('timestamp', 'timestamp');
          apiStore.createIndex('expiresAt', 'expiresAt');
        }

        if (!db.objectStoreNames.contains('backgroundSync')) {
          const syncStore = db.createObjectStore('backgroundSync', { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('timestamp', 'timestamp');
          syncStore.createIndex('status', 'status');
        }
      };
    });
  }

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async set(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }
}

const swDB = new ServiceWorkerDB();

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(staticAssets);
      }),
      caches.open(DYNAMIC_CACHE),
      swDB.init(),
    ])
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim(),
      // Initialize IndexedDB
      swDB.init(),
    ])
  );
});

// Fetch event with IndexedDB integration
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets - Cache First
    if (staticAssets.some((asset) => url.pathname.includes(asset))) {
      event.respondWith(cacheFirst(request));
    }
    // API requests - Network First with IndexedDB fallback
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirstWithIndexedDB(request));
    }
    // Navigation requests - Network First with offline fallback
    else if (request.mode === 'navigate') {
      event.respondWith(navigationHandler(request));
    }
    // Other requests - Stale While Revalidate
    else {
      event.respondWith(staleWhileRevalidate(request));
    }
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First with IndexedDB Strategy
async function networkFirstWithIndexedDB(request) {
  const url = request.url;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache in both HTTP cache and IndexedDB
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());

      // Store in IndexedDB for more persistent storage
      const responseData = await networkResponse.clone().json();
      await swDB.set('apiCache', {
        url: url,
        data: responseData,
        timestamp: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    }
    return networkResponse;
  } catch (error) {
    // Try HTTP cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to IndexedDB
    try {
      const indexedDBData = await swDB.get('apiCache', url);
      if (indexedDBData && Date.now() < indexedDBData.expiresAt) {
        return new Response(JSON.stringify(indexedDBData.data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (dbError) {
      console.log('IndexedDB fallback failed:', dbError);
    }

    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Navigation Handler
async function navigationHandler(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match('/');
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match('/offline.html');
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);

  return cachedResponse || (await networkResponsePromise) || new Response('Offline', { status: 503 });
}

// Background Sync with IndexedDB
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    const syncItems = await swDB.getAll('backgroundSync');
    const pendingItems = syncItems.filter((item) => item.status === 'pending');

    for (const item of pendingItems) {
      try {
        // Update status to syncing
        await swDB.set('backgroundSync', { ...item, status: 'syncing' });

        // Perform the sync operation
        const response = await fetch(item.url, {
          method: item.method,
          headers: item.headers,
          body: item.body,
        });

        if (response.ok) {
          // Remove successful sync items
          await swDB.delete('backgroundSync', item.id);
        } else {
          // Mark as failed
          await swDB.set('backgroundSync', { ...item, status: 'failed' });
        }
      } catch (error) {
        console.log('Background sync failed for item:', item, error);
        await swDB.set('backgroundSync', { ...item, status: 'failed' });
      }
    }
  } catch (error) {
    console.log('Background sync process failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'Open App',
        },
        {
          action: 'close',
          title: 'Close',
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'ADD_TO_SYNC_QUEUE') {
    // Add item to background sync queue
    swDB.set('backgroundSync', {
      ...event.data.payload,
      timestamp: Date.now(),
      status: 'pending',
    });
  }
});

// Periodic background sync cleanup
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup') {
    event.waitUntil(cleanupExpiredData());
  }
});

async function cleanupExpiredData() {
  try {
    // Clean up expired API cache
    const apiCacheItems = await swDB.getAll('apiCache');
    const now = Date.now();

    for (const item of apiCacheItems) {
      if (now > item.expiresAt) {
        await swDB.delete('apiCache', item.url);
      }
    }

    // Clean up old failed sync items (older than 7 days)
    const syncItems = await swDB.getAll('backgroundSync');
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    for (const item of syncItems) {
      if (item.status === 'failed' && item.timestamp < weekAgo) {
        await swDB.delete('backgroundSync', item.id);
      }
    }
  } catch (error) {
    console.log('Cleanup failed:', error);
  }
}
