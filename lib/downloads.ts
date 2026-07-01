"use client"

// ============================================================
// DOWNLOADS
// ------------------------------------------------------------
// This is a lightweight stub. It keeps track of which titles the
// user has "downloaded" (for now, just a saved reference to the
// title + its YouTube video id) so the offline screen has
// something to show. The actual file-download / offline-video-
// caching logic can be wired in later — this just gives it a
// place to plug into (see `addDownload` below).
// ============================================================

export interface DownloadedItem {
  id: number
  tmdbId: number
  title: string
  imageUrl: string
  videoId: string
  mediaType: "movie" | "tv"
  downloadedAt: number
}

const KEY = "downloaded_titles"

export function getDownloads(): DownloadedItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

export function isDownloaded(id: number): boolean {
  return getDownloads().some((d) => d.id === id)
}

export function addDownload(item: DownloadedItem) {
  const current = getDownloads()
  if (current.some((d) => d.id === item.id)) return
  const next = [...current, item]
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("downloads-changed"))
}

export function removeDownload(id: number) {
  const next = getDownloads().filter((d) => d.id !== id)
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("downloads-changed"))
}
