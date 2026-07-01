"use client"

import { useEffect, useState } from "react"

export function useOnlineStatus() {
  // Default to true on the server / first paint to avoid a flash of the
  // offline screen before the browser tells us the real status.
  const [isOnline, setIsOnline] = useState(true)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    setChecked(true)

    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener("online", goOnline)
    window.addEventListener("offline", goOffline)
    return () => {
      window.removeEventListener("online", goOnline)
      window.removeEventListener("offline", goOffline)
    }
  }, [])

  return { isOnline, checked }
}
