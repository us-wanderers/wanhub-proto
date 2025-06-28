"use client"

import { useEffect, useState } from "react"
import { MobileTeacherDashboard } from "./mobile-teacher-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, TrendingUp, FileText, Plus, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the new course management component at the top
import { TeacherCourseManagement } from "./teacher-course-management"
import { TeacherGradingSystem } from "./teacher-grading-system"
import { TeacherCommunicationHub } from "./teacher-communication-hub"

export function TeacherDashboard() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return <MobileTeacherDashboard />
  }

  // Desktop version (existing code continues...)
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Good morning, Dr. Smith!</h2>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search students, courses..." className="pl-10 w-64" />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 new this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last term</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="grading">Grading Center</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <TeacherCourseManagement />
        </TabsContent>

        <TabsContent value="grading" className="space-y-4">
          <TeacherGradingSystem />
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <TeacherCommunicationHub />
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>Monitor student progress and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", course: "Advanced React", progress: 85, grade: "A" },
                  { name: "Mike Kim", course: "Data Structures", progress: 72, grade: "B+" },
                  { name: "Emily Chen", course: "Web Design", progress: 94, grade: "A+" },
                  { name: "David Wilson", course: "Advanced React", progress: 68, grade: "B" },
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.progress}% Complete</p>
                        <Progress value={student.progress} className="w-24" />
                      </div>
                      <Badge variant="outline">{student.grade}</Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
              <CardDescription>Review and grade student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "React Component Project",
                    course: "Advanced React",
                    submitted: 42,
                    total: 45,
                    due: "2 days ago",
                  },
                  {
                    title: "Binary Tree Implementation",
                    course: "Data Structures",
                    submitted: 35,
                    total: 38,
                    due: "1 day ago",
                  },
                  { title: "Portfolio Website", course: "Web Design", submitted: 48, total: 52, due: "Today" },
                ].map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.due}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {assignment.submitted}/{assignment.total} submitted
                        </p>
                        <Progress value={(assignment.submitted / assignment.total) * 100} className="w-24" />
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Advanced React</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Structures</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Web Design</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Forum Posts</span>
                    <span className="text-sm font-medium">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assignment Submissions</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Students</span>
                    <span className="text-sm font-medium">142/156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
