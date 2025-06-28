"use client"

import { useOffline } from "@/hooks/use-offline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, RefreshCw, Download, Trash2, Database, Clock } from "lucide-react"
import { useState } from "react"

interface OfflineIndicatorProps {
  userType: "student" | "teacher" | "organization"
}

export function OfflineIndicator({ userType }: OfflineIndicatorProps) {
  const { isOnline, isLoading, lastSync, cacheSize, syncData, clearCache, preloadData } = useOffline()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isOnline ? "Online" : "Offline"}
        </Badge>

        <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="h-6 px-2 text-xs">
          <Database className="w-3 h-3 mr-1" />
          {cacheSize}
        </Button>
      </div>

      {/* Offline Details Panel */}
      {showDetails && (
        <Card className="mt-2 border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Offline Mode
            </CardTitle>
            <CardDescription className="text-xs">
              {isOnline ? "You're online. Data will sync automatically." : "You're offline. Using cached data."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Cache Info */}
            <div className="flex justify-between items-center text-xs">
              <span>Cached Items:</span>
              <span className="font-medium">{cacheSize}</span>
            </div>

            {lastSync && (
              <div className="flex justify-between items-center text-xs">
                <span>Last Sync:</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lastSync.toLocaleTimeString()}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => preloadData(userType)}
                disabled={isLoading}
                className="flex-1 h-8 text-xs"
              >
                {isLoading ? (
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Download className="w-3 h-3 mr-1" />
                )}
                Cache Data
              </Button>

              {isOnline && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={syncData}
                  disabled={isLoading}
                  className="flex-1 h-8 text-xs bg-transparent"
                >
                  {isLoading ? (
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3 mr-1" />
                  )}
                  Sync
                </Button>
              )}

              <Button size="sm" variant="outline" onClick={clearCache} className="h-8 px-2 bg-transparent">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
