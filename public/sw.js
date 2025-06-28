const CACHE_NAME = "wanhub-v2"
const STATIC_CACHE = "wanhub-static-v2"
const DYNAMIC_CACHE = "wanhub-dynamic-v2"

const staticAssets = ["/", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png", "/offline.html"]

const dynamicAssets = ["/api/", "/student", "/teacher", "/organization"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(staticAssets)
      }),
      caches.open(DYNAMIC_CACHE),
    ]),
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                return caches.delete(cacheName)
              }
            }),
          )
        }),
      // Take control of all clients
      self.clients.claim(),
    ]),
  )
})

// Fetch event with advanced caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle different types of requests
  if (request.method === "GET") {
    // Static assets - Cache First
    if (staticAssets.some((asset) => url.pathname.includes(asset))) {
      event.respondWith(cacheFirst(request))
    }
    // API requests - Network First
    else if (url.pathname.startsWith("/api/")) {
      event.respondWith(networkFirst(request))
    }
    // Navigation requests - Network First with offline fallback
    else if (request.mode === "navigate") {
      event.respondWith(navigationHandler(request))
    }
    // Other requests - Stale While Revalidate
    else {
      event.respondWith(staleWhileRevalidate(request))
    }
  }
})

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log("Cache first failed:", error)
    return new Response("Offline", { status: 503 })
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    return new Response(JSON.stringify({ error: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Navigation Handler
async function navigationHandler(request) {
  try {
    const networkResponse = await fetch(request)
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match("/")
    if (cachedResponse) {
      return cachedResponse
    }
    return caches.match("/offline.html")
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)

  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })
    .catch(() => null)

  return cachedResponse || (await networkResponsePromise) || new Response("Offline", { status: 503 })
}

// Background Sync
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log("Background sync triggered")
}

// Push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: "open",
          title: "Open App",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"))
  }
})

// Handle messages from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
