const CACHE = "app-shell-v1"
const SHELL_URLS = ["/", "/player", "/offline-player"]

self.addEventListener("install", (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(SHELL_URLS).catch(() => {
        // Some routes may fail to precache in dev mode — that's fine,
        // they'll get cached on first visit instead.
      })
    )
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {})
        return response
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  )
})
