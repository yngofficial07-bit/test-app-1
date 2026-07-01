"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, WifiOff, Trash2 } from "lucide-react"
import { getDownloads, removeDownload, type DownloadedItem } from "@/lib/downloads"

function OfflinePlayerInner() {
  const router = useRouter()
  const params = useSearchParams()
  const id = Number(params.get("id") || 0)
  const [item, setItem] = useState<DownloadedItem | null>(null)

  useEffect(() => {
    const match = getDownloads().find((d) => d.id === id)
    setItem(match || null)
  }, [id])

  const handleRemove = () => {
    if (!item) return
    removeDownload(item.id)
    router.back()
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-white/90 text-sm font-medium truncate">
          {item?.title || "Downloaded title"}
        </span>
      </div>

      <div className="w-full aspect-video bg-neutral-950 flex flex-col items-center justify-center text-center px-6">
        {/*
          This is where the locally-saved video file should play once the
          download mechanism (saving the actual video data for offline use)
          is wired up. Right now this only stores a reference to the title,
          not the video itself, so there's nothing to play from disk yet.
        */}
        <WifiOff className="h-8 w-8 text-gray-600 mb-3" />
        <p className="text-gray-400 text-sm max-w-sm">
          Offline playback will appear here once the download step saves the
          actual video file on-device.
        </p>
      </div>

      {item && (
        <div className="px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-semibold">{item.title}</h1>
            <p className="text-white/50 text-xs mt-1 capitalize">{item.mediaType} · downloaded</p>
          </div>
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default function OfflinePlayerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <OfflinePlayerInner />
    </Suspense>
  )
}
