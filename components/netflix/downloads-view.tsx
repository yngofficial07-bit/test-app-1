"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Download } from "lucide-react"
import { getDownloads, type DownloadedItem } from "@/lib/downloads"

export function DownloadsView() {
  const router = useRouter()
  const [items, setItems] = useState<DownloadedItem[]>([])

  useEffect(() => {
    setItems(getDownloads())
    const refresh = () => setItems(getDownloads())
    window.addEventListener("downloads-changed", refresh)
    return () => window.removeEventListener("downloads-changed", refresh)
  }, [])

  return (
    <div className="pt-24 md:pt-28 px-4 md:px-8 lg:px-12 pb-12">
      <h1 className="text-xl md:text-3xl font-bold text-white mb-2">Downloads</h1>
      <p className="text-gray-500 text-sm mb-6">{items.length} title{items.length === 1 ? "" : "s"} saved for offline</p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Download className="w-9 h-9 text-gray-600" />
          </div>
          <p className="text-white text-lg font-semibold">No downloads yet</p>
          <p className="text-gray-500 mt-2 text-sm max-w-xs">
            Open any title's player and tap "Download for offline" to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group"
              onClick={() => router.push(`/offline-player?id=${item.id}`)}
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                    No image
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs md:text-sm text-gray-400 truncate group-hover:text-white transition-colors">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
