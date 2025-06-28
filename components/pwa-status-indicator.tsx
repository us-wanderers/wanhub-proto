"use client"

import { usePWA } from "@/hooks/use-pwa"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, Download, Share2 } from "lucide-react"

export function PWAStatusIndicator() {
  const { isStandalone, canInstall, installApp, shareApp } = usePWA()

  if (isStandalone) {
    return (
      <Badge variant="default" className="flex items-center gap-1 text-xs">
        <Smartphone className="w-3 h-3" />
        App Mode
      </Badge>
    )
  }

  if (canInstall) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={installApp} className="h-6 px-2 text-xs">
          <Download className="w-3 h-3 mr-1" />
          Install
        </Button>
        <Button variant="ghost" size="sm" onClick={shareApp} className="h-6 px-1">
          <Share2 className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1 text-xs">
      <Monitor className="w-3 h-3" />
      Web
    </Badge>
  )
}
