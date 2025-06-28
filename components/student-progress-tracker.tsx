"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Trophy, Target, Star, Zap, Brain, Timer } from "lucide-react"

interface LearningGoal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  status: "active" | "completed" | "overdue"
  category: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface StudySession {
  id: string
  courseId: string
  courseName: string
  duration: number
  completedAt: string
  topicsStudied: string[]
  score?: number
}

interface LearningPath {
  id: string
  title: string
  description: string
  totalCourses: number
  completedCourses: number
  estimatedTime: string
  difficulty: "beginner" | "intermediate" | "advanced"
  progress: number
}

export function StudentProgressTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  const learningGoals: LearningGoal[] = [
    {
      id: "1",
      title: "Complete React Fundamentals",
      description: "Finish all modules and pass the final assessment",
      targetDate: "2024-02-15",
      progress: 75,
      status: "active",
      category: "Course Completion",
    },
    {
      id: "2",
      title: "Master JavaScript ES6+",
      description: "Complete advanced JavaScript concepts",
      targetDate: "2024-01-30",
      progress: 90,
      status: "active",
      category: "Skill Development",
    },
    {
      id: "3",
      title: "Build Portfolio Project",
      description: "Create a full-stack web application",
      targetDate: "2024-03-01",
      progress: 45,
      status: "active",
      category: "Project",
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Completed your first course",
      icon: "🎯",
      earnedDate: "2024-01-10",
      points: 100,
      rarity: "common",
    },
    {
      id: "2",
      title: "Speed Learner",
      description: "Completed 5 lessons in one day",
      icon: "⚡",
      earnedDate: "2024-01-15",
      points: 250,
      rarity: "rare",
    },
    {
      id: "3",
      title: "Perfect Score",
      description: "Achieved 100% on a quiz",
      icon: "🏆",
      earnedDate: "2024-01-20",
      points: 500,
      rarity: "epic",
    },
    {
      id: "4",
      title: "Consistency Master",
      description: "Studied for 7 consecutive days",
      icon: "🔥",
      earnedDate: "2024-01-25",
      points: 750,
      rarity: "legendary",
    },
  ]

  const studySessions: StudySession[] = [
    {
      id: "1",
      courseId: "react-101",
      courseName: "React Fundamentals",
      duration: 120,
      completedAt: "2024-01-28T14:30:00",
      topicsStudied: ["Components", "Props", "State"],
      score: 95,
    },
    {
      id: "2",
      courseId: "js-advanced",
      courseName: "Advanced JavaScript",
      duration: 90,
      completedAt: "2024-01-28T10:00:00",
      topicsStudied: ["Promises", "Async/Await"],
      score: 88,
    },
    {
      id: "3",
      courseId: "css-grid",
      courseName: "CSS Grid Layout",
      duration: 75,
      completedAt: "2024-01-27T16:15:00",
      topicsStudied: ["Grid Container", "Grid Items"],
      score: 92,
    },
  ]

  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Frontend Developer",
      description: "Master modern frontend development",
      totalCourses: 8,
      completedCourses: 5,
      estimatedTime: "6 months",
      difficulty: "intermediate",
      progress: 62,
    },
    {
      id: "2",
      title: "Full Stack JavaScript",
      description: "Complete JavaScript development stack",
      totalCourses: 12,
      completedCourses: 3,
      estimatedTime: "9 months",
      difficulty: "advanced",
      progress: 25,
    },
  ]

  const weeklyStats = {
    studyTime: 8.5,
    lessonsCompleted: 12,
    quizzesPassed: 5,
    streakDays: 6,
    averageScore: 91,
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.studyTime}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.lessonsCompleted}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Last 10 quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.streakDays}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Goals
              </CardTitle>
              <CardDescription>Track your progress towards your learning objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningGoals.map((goal) => (
                <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    <span>{goal.category}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-transparent" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription>Your learning milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Earned: {new Date(achievement.earnedDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {achievement.points} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Study Sessions
              </CardTitle>
              <CardDescription>Your recent learning activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studySessions.map((session) => (
                <div key={session.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{session.courseName}</h4>
                    <div className="flex items-center gap-2">
                      {session.score && (
                        <Badge variant="outline" className="text-green-600">
                          {session.score}%
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(session.duration / 60)}h {session.duration % 60}m
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {session.topicsStudied.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(session.completedAt).toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Learning Paths
              </CardTitle>
              <CardDescription>Structured learning journeys to master skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge variant="outline">{path.difficulty}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {path.completedCourses} of {path.totalCourses} courses
                      </span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. time: {path.estimatedTime}</span>
                    <Button size="sm">Continue Path</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={80} className="w-20 h-2" />
                      <span className="text-sm">2.5h</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tuesday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-20 h-2" />
                      <span className="text-sm">1.8h</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wednesday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20 h-2" />
                      <span className="text-sm">3.0h</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Thursday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={40} className="w-20 h-2" />
                      <span className="text-sm">1.2h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">JavaScript</span>
                    <div className="flex items-center gap-2">
                      <Progress value={95} className="w-20 h-2" />
                      <span className="text-sm">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">React</span>
                    <div className="flex items-center gap-2">
                      <Progress value={88} className="w-20 h-2" />
                      <span className="text-sm">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CSS</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Node.js</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20 h-2" />
                      <span className="text-sm">75%</span>
                    </div>
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
