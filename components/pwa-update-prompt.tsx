"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, X } from "lucide-react"

export function PWAUpdatePrompt() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true)
      })

      // Check for updates periodically
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.update()
          }
        })
      }

      // Check for updates every 30 minutes
      const interval = setInterval(checkForUpdates, 30 * 60 * 1000)

      return () => clearInterval(interval)
    }
  }, [])

  const handleUpdate = async () => {
    setIsUpdating(true)

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" })
        }
      }

      // Reload the page to get the new version
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Error updating app:", error)
      setIsUpdating(false)
    }
  }

  if (!updateAvailable) return null

  return (
    <Card className="mx-4 my-4 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Update Available</CardTitle>
              <CardDescription className="text-sm">A new version of WanHub is ready</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setUpdateAvailable(false)} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button onClick={handleUpdate} disabled={isUpdating} className="flex-1 h-9">
            {isUpdating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {isUpdating ? "Updating..." : "Update Now"}
          </Button>
          <Button variant="outline" onClick={() => setUpdateAvailable(false)} className="h-9 bg-transparent">
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
