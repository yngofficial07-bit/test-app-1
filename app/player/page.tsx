"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Check } from "lucide-react"
import { getVideoId } from "@/lib/video-map"
import { addDownload, isDownloaded } from "@/lib/downloads"

const API_KEY = "51e8f6fa27967e18cd00a4e246cb4b6b"
const IMG = "https://image.tmdb.org/t/p/w300"

interface ShowInfo {
  title: string
  imageUrl: string
  mediaType: "movie" | "tv"
}

function PlayerInner() {
  const router = useRouter()
  const params = useSearchParams()
  const tmdbId = params.get("id") || ""
  const type = (params.get("type") as "movie" | "tv") || "movie"

  const [info, setInfo] = useState<ShowInfo | null>(null)
  const [saved, setSaved] = useState(false)
  const videoId = getVideoId(tmdbId)

  useEffect(() => {
    if (!tmdbId) return
    setSaved(isDownloaded(Number(tmdbId)))

    const url =
      type === "movie"
        ? `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${API_KEY}`

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setInfo({
          title: d.title || d.name || "Untitled",
          imageUrl: d.poster_path ? `${IMG}${d.poster_path}` : "",
          mediaType: type,
        })
      })
      .catch(() => setInfo({ title: "Untitled", imageUrl: "", mediaType: type }))
  }, [tmdbId, type])

  const handleSaveOffline = () => {
    if (!info || !tmdbId) return
    addDownload({
      id: Number(tmdbId),
      tmdbId: Number(tmdbId),
      title: info.title,
      imageUrl: info.imageUrl,
      videoId,
      mediaType: type,
      downloadedAt: Date.now(),
    })
    setSaved(true)
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
          {info?.title || "Loading…"}
        </span>
      </div>

      <div className="w-full aspect-video bg-neutral-950">
        <iframe
          key={videoId}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={info?.title || "Player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="px-4 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-white text-lg font-semibold">{info?.title}</h1>
          <p className="text-white/50 text-xs mt-1 capitalize">{type}</p>
        </div>

        <button
          onClick={handleSaveOffline}
          disabled={saved}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors disabled:opacity-60"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Downloaded
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Download for offline
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PlayerInner />
    </Suspense>
  )
}
