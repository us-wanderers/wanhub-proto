"use client"

import { useEffect, useState } from "react"
import { MobileStudentDashboard } from "./mobile-student-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  PlayCircle,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Target,
  Zap,
  Award,
  Users,
  Play,
  AlertCircle,
  Download,
  Settings,
  Home,
  BarChart3,
  CalendarIcon,
  MessageCircle,
  GraduationCap,
  Map,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import all the comprehensive components
import { StudentProgressTracker } from "./student-progress-tracker"
import { StudentCourseCatalog } from "./student-course-catalog"
import { StudentAssignments } from "./student-assignments"
import { StudentDiscussionForums } from "./student-discussion-forums"
import { StudentCertificates } from "./student-certificates"
import { StudentLearningFlow } from "./student-learning-flow"
import { StudentLearningPath } from "./student-learning-path"

export function StudentDashboard() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentView, setCurrentView] = useState("overview")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return <MobileStudentDashboard />
  }

  // Show learning flow if user is actively learning
  if (currentView === "learning") {
    return <StudentLearningFlow />
  }

  // Desktop version with comprehensive learning experience
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentView("overview")}>
                <Home className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Welcome back, Alex!</h1>
                <p className="text-sm text-muted-foreground">Continue your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search courses..." className="pl-10 w-64" />
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />7 day streak
              </Badge>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">50% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Catalog
            </TabsTrigger>
            <TabsTrigger value="paths" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5" />
                      Continue Learning
                    </CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Play className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">React Development Fundamentals</h4>
                        <p className="text-sm text-muted-foreground">Chapter 5: State Management with Hooks</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={75} className="flex-1" />
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Last accessed: 2 hours ago</span>
                          <span>15 min remaining</span>
                        </div>
                      </div>
                      <Button onClick={() => setCurrentView("learning")}>Continue</Button>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Data Structures & Algorithms</h4>
                        <p className="text-sm text-muted-foreground">Module 3: Binary Trees and Traversal</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={45} className="flex-1" />
                          <span className="text-sm text-muted-foreground">45%</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Last accessed: 1 day ago</span>
                          <span>Quiz pending</span>
                        </div>
                      </div>
                      <Button variant="outline">Resume</Button>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">UI/UX Design Principles</h4>
                        <p className="text-sm text-muted-foreground">Lesson 8: Color Theory and Psychology</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={60} className="flex-1" />
                          <span className="text-sm text-muted-foreground">60%</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Last accessed: 3 days ago</span>
                          <span>Assignment due tomorrow</span>
                        </div>
                      </div>
                      <Button variant="outline">Continue</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Learning Goals
                    </CardTitle>
                    <CardDescription>Track your progress towards your objectives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Complete React Fundamentals Course</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                      <div className="text-sm text-muted-foreground">Due: February 15, 2024</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Build Portfolio Project</span>
                        <span className="text-sm text-muted-foreground">30%</span>
                      </div>
                      <Progress value={30} />
                      <div className="text-sm text-muted-foreground">Due: March 1, 2024</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Master JavaScript ES6+</span>
                        <span className="text-sm text-muted-foreground">90%</span>
                      </div>
                      <Progress value={90} />
                      <div className="text-sm text-muted-foreground">Due: January 30, 2024</div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Target className="w-4 h-4 mr-2" />
                      Set New Goal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">React Project Submission</p>
                        <p className="text-xs text-muted-foreground">Advanced React Development</p>
                        <p className="text-xs text-red-600">Due in 2 days</p>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Algorithm Quiz</p>
                        <p className="text-xs text-muted-foreground">Data Structures & Algorithms</p>
                        <p className="text-xs text-yellow-600">Due in 5 days</p>
                      </div>
                      <Badge variant="secondary">Medium</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Design Portfolio Review</p>
                        <p className="text-xs text-muted-foreground">UI/UX Design Principles</p>
                        <p className="text-xs text-muted-foreground">Due in 1 week</p>
                      </div>
                      <Badge variant="outline">Low</Badge>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Assignments
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <p className="font-medium text-sm">Perfect Score</p>
                        <p className="text-xs text-muted-foreground">Achieved 100% on JavaScript Quiz</p>
                        <p className="text-xs text-muted-foreground">+500 points</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-lg">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <p className="font-medium text-sm">Speed Learner</p>
                        <p className="text-xs text-muted-foreground">Completed 3 lessons in one day</p>
                        <p className="text-xs text-muted-foreground">+250 points</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-lg">
                      <div className="text-2xl">🔥</div>
                      <div>
                        <p className="font-medium text-sm">7-Day Streak</p>
                        <p className="text-xs text-muted-foreground">Studied for 7 consecutive days</p>
                        <p className="text-xs text-muted-foreground">+100 points</p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>

                {/* Study Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Study Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold text-lg">24h</div>
                        <div className="text-muted-foreground">This Week</div>
                      </div>
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold text-lg">87%</div>
                        <div className="text-muted-foreground">Avg Score</div>
                      </div>
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold text-lg">#23</div>
                        <div className="text-muted-foreground">Class Rank</div>
                      </div>
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold text-lg">12</div>
                        <div className="text-muted-foreground">Certificates</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask a Question
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Join Study Group
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Study Time
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-4">
            <StudentCourseCatalog />
          </TabsContent>

          <TabsContent value="paths" className="space-y-4">
            <StudentLearningPath />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <StudentProgressTracker />
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <StudentAssignments />
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            <StudentDiscussionForums />
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <StudentCertificates />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Study Schedule</h3>
              <p className="text-muted-foreground mb-4">Plan your study sessions and track your learning schedule</p>
              <Button>Create Study Schedule</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
