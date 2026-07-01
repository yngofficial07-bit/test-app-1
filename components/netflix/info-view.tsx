"use client"

import { Info, Film, WifiOff, Download, Settings } from "lucide-react"

export function InfoView() {
  const rows = [
    {
      icon: Film,
      title: "Content",
      body: "Everything on this app is original content.",
    },
    {
      icon: WifiOff,
      title: "Offline mode",
      body: "When you lose connection, the home screen automatically switches to show only your downloaded titles.",
    },
    {
      icon: Download,
      title: "Downloads",
      body: "Save a title from its player screen to watch it later without a connection.",
    },
    {
      icon: Settings,
      title: "Settings",
      body: "Customize the look of the app — accent color, card style, animation speed, and more.",
    },
  ]

  return (
    <div className="pt-24 md:pt-28 px-4 md:px-8 lg:px-12 pb-12 max-w-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-6 w-6 text-white" />
        <h1 className="text-xl md:text-3xl font-bold text-white">About this app</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">Version 1.0</p>

      <div className="space-y-6">
        {rows.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-gray-300" />
            </div>
            <div>
              <h2 className="text-white font-semibold">{title}</h2>
              <p className="text-gray-500 text-sm mt-1">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
