"use client"

import { useOffline } from "@/hooks/use-offline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw } from "lucide-react"

export function OfflineBanner() {
  const { isOnline, isLoading, syncData } = useOffline()

  if (isOnline) return null

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <WifiOff className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-orange-800">You're offline. Some features may be limited. Using cached data.</span>
        <Button
          size="sm"
          variant="outline"
          onClick={syncData}
          disabled={isLoading}
          className="ml-2 h-7 text-xs border-orange-300 bg-transparent"
        >
          {isLoading ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1" />}
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  )
}
