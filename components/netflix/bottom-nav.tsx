"use client"

import { Home, Download, Settings, Info } from "lucide-react"
import { useSettings } from "./settings-context"

interface BottomNavProps {
  active: "home" | "downloads" | "info"
  onSelect: (tab: "home" | "downloads" | "info") => void
}

export function BottomNav({ active, onSelect }: BottomNavProps) {
  const { setIsSettingsOpen } = useSettings()

  const items = [
    { key: "home" as const, label: "Home", icon: Home, action: () => onSelect("home") },
    { key: "downloads" as const, label: "Downloads", icon: Download, action: () => onSelect("downloads") },
    { key: "settings" as const, label: "Settings", icon: Settings, action: () => setIsSettingsOpen(true) },
    { key: "info" as const, label: "Info", icon: Info, action: () => onSelect("info") },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map(({ key, label, icon: Icon, action }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={action}
              className="flex flex-col items-center gap-1 py-2.5 px-4 flex-1 transition-colors"
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? "#e50914" : "#9ca3af"}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? "#e50914" : "#9ca3af" }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
