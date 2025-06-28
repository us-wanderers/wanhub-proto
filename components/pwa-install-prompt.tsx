"use client"

import { useState } from "react"
import { usePWA } from "@/hooks/use-pwa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, X, Smartphone, Monitor, Zap, Wifi } from "lucide-react"

export function PWAInstallPrompt() {
  const { canInstall, isStandalone, installApp, shareApp } = usePWA()
  const [isVisible, setIsVisible] = useState(true)
  const [isInstalling, setIsInstalling] = useState(false)

  if (!canInstall || !isVisible || isStandalone) return null

  const handleInstall = async () => {
    setIsInstalling(true)
    const success = await installApp()
    if (success) {
      setIsVisible(false)
    }
    setIsInstalling(false)
  }

  const handleShare = async () => {
    const success = await shareApp()
    if (!success) {
      // Fallback to copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin)
        // You could show a toast here
      } catch (error) {
        console.error("Failed to copy to clipboard:", error)
      }
    }
  }

  return (
    <Card className="mx-4 my-4 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Install WanHub</CardTitle>
              <CardDescription className="text-sm">Get the full app experience</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Smartphone className="w-3 h-3 text-blue-600" />
            <span>Native app feel</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Wifi className="w-3 h-3 text-blue-600" />
            <span>Works offline</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Zap className="w-3 h-3 text-blue-600" />
            <span>Faster loading</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Monitor className="w-3 h-3 text-blue-600" />
            <span>Desktop & mobile</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleInstall} disabled={isInstalling} className="flex-1 h-9">
            {isInstalling ? <Download className="w-4 h-4 mr-2 animate-pulse" /> : <Download className="w-4 h-4 mr-2" />}
            {isInstalling ? "Installing..." : "Install App"}
          </Button>
          <Button variant="outline" onClick={handleShare} className="h-9 px-3 bg-transparent">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            Free
          </Badge>
          <span>•</span>
          <span>No app store required</span>
        </div>
      </CardContent>
    </Card>
  )
}
