"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WifiOff } from "lucide-react"
import { getDownloads, type DownloadedItem } from "@/lib/downloads"

export function OfflineScreen() {
  const router = useRouter()
  const [items, setItems] = useState<DownloadedItem[]>([])

  useEffect(() => {
    setItems(getDownloads())
    const refresh = () => setItems(getDownloads())
    window.addEventListener("downloads-changed", refresh)
    return () => window.removeEventListener("downloads-changed", refresh)
  }, [])

  return (
    <main className="min-h-screen bg-black pt-14 pb-24 px-4">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-6 mt-4">
        <WifiOff className="h-4 w-4 text-gray-400 shrink-0" />
        <p className="text-gray-300 text-sm">You're offline — showing your downloaded titles.</p>
      </div>

      <h1 className="text-white text-xl font-bold mb-4">Downloaded</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <WifiOff className="w-9 h-9 text-gray-600" />
          </div>
          <p className="text-white text-lg font-semibold">Nothing downloaded yet</p>
          <p className="text-gray-500 mt-2 text-sm max-w-xs">
            Titles you download will show up here so you can watch them without a connection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => router.push(`/offline-player?id=${item.id}`)}
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                    No image
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs md:text-sm text-gray-300 truncate">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
