"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  isStandalone: boolean
  canInstall: boolean
  installPrompt: BeforeInstallPromptEvent | null
}

export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isStandalone: false,
    canInstall: false,
    installPrompt: null,
  })

  useEffect(() => {
    // Check if app is running in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

    // Check if app is already installed
    const isInstalled =
      isStandalone ||
      document.referrer.includes("android-app://") ||
      window.location.search.includes("utm_source=homescreen")

    setState((prev) => ({
      ...prev,
      isStandalone,
      isInstalled,
    }))

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const installEvent = e as BeforeInstallPromptEvent

      setState((prev) => ({
        ...prev,
        isInstallable: true,
        canInstall: !prev.isInstalled,
        installPrompt: installEvent,
      }))
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setState((prev) => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
        installPrompt: null,
      }))
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const installApp = async (): Promise<boolean> => {
    if (!state.installPrompt) return false

    try {
      await state.installPrompt.prompt()
      const choiceResult = await state.installPrompt.userChoice

      if (choiceResult.outcome === "accepted") {
        setState((prev) => ({
          ...prev,
          isInstalled: true,
          canInstall: false,
          installPrompt: null,
        }))
        return true
      }
      return false
    } catch (error) {
      console.error("Error installing app:", error)
      return false
    }
  }

  const shareApp = async (): Promise<boolean> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "WanHub - Educational Platform",
          text: "Check out WanHub, the comprehensive educational platform for students, teachers, and organizations!",
          url: window.location.origin,
        })
        return true
      } catch (error) {
        console.error("Error sharing app:", error)
        return false
      }
    }
    return false
  }

  return {
    ...state,
    installApp,
    shareApp,
  }
}
