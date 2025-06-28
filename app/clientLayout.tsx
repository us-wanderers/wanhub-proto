"use client"

import { useState, useEffect } from "react"
import { StudentDashboard } from "@/components/student-dashboard"
import { TeacherDashboard } from "@/components/teacher-dashboard"
import { OrganizationDashboard } from "@/components/organization-dashboard"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Building2 } from "lucide-react"
import { offlineManager } from "@/lib/offline-manager"

type UserType = "student" | "teacher" | "organization"

export default function WanHubDashboards() {
  const [activeUser, setActiveUser] = useState<UserType>("student")

  // Register service worker and preload data
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // Preload essential data for offline use
    offlineManager.preloadEssentialData(activeUser)
  }, [activeUser])

  const renderDashboard = () => {
    switch (activeUser) {
      case "student":
        return <StudentDashboard />
      case "teacher":
        return <TeacherDashboard />
      case "organization":
        return <OrganizationDashboard />
      default:
        return <StudentDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-Optimized User Type Selector */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold">WanHub</h1>
            </div>
            {/* Mobile dropdown for user type selection */}
            <div className="md:hidden">
              <select
                value={activeUser}
                onChange={(e) => setActiveUser(e.target.value as UserType)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="organization">Organization</option>
              </select>
            </div>
            {/* Desktop buttons */}
            <div className="hidden md:flex gap-2">
              <Button
                variant={activeUser === "student" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveUser("student")}
                className="flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </Button>
              <Button
                variant={activeUser === "teacher" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveUser("teacher")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Teacher
              </Button>
              <Button
                variant={activeUser === "organization" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveUser("organization")}
                className="flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Organization
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {renderDashboard()}
    </div>
  )
}
