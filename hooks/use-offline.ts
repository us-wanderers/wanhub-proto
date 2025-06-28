"use client"

import { useState, useEffect } from "react"
import { offlineManager } from "@/lib/offline-manager"

interface OfflineState {
  isOnline: boolean
  isLoading: boolean
  lastSync: Date | null
  cacheSize: number
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    isLoading: false,
    lastSync: null,
    cacheSize: 0,
  })

  useEffect(() => {
    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOnline: true }))
      syncData()
    }

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOnline: false }))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial cache size
    setState((prev) => ({ ...prev, cacheSize: offlineManager.getSize() }))

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const syncData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API sync
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastSync: new Date(),
        cacheSize: offlineManager.getSize(),
      }))
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      console.error("Sync failed:", error)
    }
  }

  const clearCache = () => {
    offlineManager.clear()
    setState((prev) => ({ ...prev, cacheSize: 0 }))
  }

  const preloadData = async (userType: "student" | "teacher" | "organization") => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await offlineManager.preloadEssentialData(userType)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        cacheSize: offlineManager.getSize(),
      }))
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      console.error("Preload failed:", error)
    }
  }

  return {
    ...state,
    syncData,
    clearCache,
    preloadData,
  }
}
