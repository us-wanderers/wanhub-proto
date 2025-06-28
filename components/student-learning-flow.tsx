"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  BookOpen,
  FileText,
  Video,
  Download,
  Share2,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Target,
  TrendingUp,
  Lightbulb,
  Brain,
  Zap,
  Trophy,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Home,
  Settings,
  Bell,
} from "lucide-react"

interface LearningModule {
  id: string
  title: string
  description: string
  type: "video" | "reading" | "quiz" | "assignment" | "interactive"
  duration: number
  isCompleted: boolean
  isLocked: boolean
  content?: {
    videoUrl?: string
    readingContent?: string
    quizQuestions?: QuizQuestion[]
    interactiveElements?: any[]
  }
  resources: {
    name: string
    type: string
    url: string
  }[]
  notes: string
  bookmarks: number[]
}

interface QuizQuestion {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "short-answer" | "essay"
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  points: number
}

interface StudySession {
  id: string
  courseId: string
  startTime: string
  endTime?: string
  modulesStudied: string[]
  notesCreated: number
  quizzesTaken: number
  timeSpent: number
  focusScore: number
}

interface LearningGoal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  milestones: {
    id: string
    title: string
    completed: boolean
    completedDate?: string
  }[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
}

export function StudentLearningFlow() {
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState("")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [studyStreak, setStudyStreak] = useState(7)
  const [focusTime, setFocusTime] = useState(0)
  const [currentGoals, setCurrentGoals] = useState<LearningGoal[]>([])
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([])

  const learningModules: LearningModule[] = [
    {
      id: "1",
      title: "Introduction to React Components",
      description: "Learn the fundamentals of React components and JSX syntax",
      type: "video",
      duration: 1200, // 20 minutes
      isCompleted: true,
      isLocked: false,
      content: {
        videoUrl: "/placeholder-video.mp4",
      },
      resources: [
        { name: "React Documentation", type: "link", url: "https://react.dev" },
        { name: "Component Examples", type: "code", url: "/examples/components.js" },
        { name: "Practice Exercises", type: "pdf", url: "/exercises/react-basics.pdf" },
      ],
      notes: "Remember: Components are the building blocks of React applications",
      bookmarks: [300, 600, 900],
    },
    {
      id: "2",
      title: "Understanding Props and State",
      description: "Deep dive into React props and state management",
      type: "interactive",
      duration: 1800, // 30 minutes
      isCompleted: false,
      isLocked: false,
      content: {
        interactiveElements: [
          { type: "code-editor", content: "function Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}" },
          { type: "live-preview", content: "<Welcome name='World' />" },
        ],
      },
      resources: [
        { name: "Props vs State Guide", type: "article", url: "/guides/props-state.html" },
        { name: "Interactive Examples", type: "sandbox", url: "/sandbox/props-state" },
      ],
      notes: "",
      bookmarks: [],
    },
    {
      id: "3",
      title: "React Hooks Fundamentals",
      description: "Master useState, useEffect, and other essential hooks",
      type: "video",
      duration: 2400, // 40 minutes
      isCompleted: false,
      isLocked: false,
      content: {
        videoUrl: "/placeholder-video-2.mp4",
      },
      resources: [
        { name: "Hooks API Reference", type: "docs", url: "/docs/hooks-api" },
        { name: "Custom Hooks Examples", type: "code", url: "/examples/custom-hooks.js" },
      ],
      notes: "",
      bookmarks: [],
    },
    {
      id: "4",
      title: "Knowledge Check: React Basics",
      description: "Test your understanding of React fundamentals",
      type: "quiz",
      duration: 900, // 15 minutes
      isCompleted: false,
      isLocked: false,
      content: {
        quizQuestions: [
          {
            id: "q1",
            question: "What is JSX?",
            type: "multiple-choice",
            options: [
              "A JavaScript library",
              "A syntax extension for JavaScript",
              "A CSS framework",
              "A database query language",
            ],
            correctAnswer: "A syntax extension for JavaScript",
            explanation:
              "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
            points: 10,
          },
          {
            id: "q2",
            question: "React components must return a single parent element.",
            type: "true-false",
            correctAnswer: "false",
            explanation:
              "React components can return multiple elements using React.Fragment or the shorthand <> syntax.",
            points: 5,
          },
          {
            id: "q3",
            question: "Explain the difference between props and state in React.",
            type: "short-answer",
            points: 15,
          },
        ],
      },
      resources: [],
      notes: "",
      bookmarks: [],
    },
    {
      id: "5",
      title: "Building Your First React App",
      description: "Create a complete React application from scratch",
      type: "assignment",
      duration: 3600, // 60 minutes
      isCompleted: false,
      isLocked: true,
      resources: [
        { name: "Project Requirements", type: "pdf", url: "/assignments/first-app-requirements.pdf" },
        { name: "Starter Template", type: "zip", url: "/templates/react-starter.zip" },
        { name: "Submission Guidelines", type: "doc", url: "/guidelines/submission.docx" },
      ],
      notes: "",
      bookmarks: [],
    },
  ]

  const studySessions: StudySession[] = [
    {
      id: "1",
      courseId: "react-fundamentals",
      startTime: "2024-01-28T09:00:00",
      endTime: "2024-01-28T10:30:00",
      modulesStudied: ["1", "2"],
      notesCreated: 3,
      quizzesTaken: 1,
      timeSpent: 90,
      focusScore: 85,
    },
    {
      id: "2",
      courseId: "react-fundamentals",
      startTime: "2024-01-27T14:00:00",
      endTime: "2024-01-27T15:45:00",
      modulesStudied: ["1"],
      notesCreated: 2,
      quizzesTaken: 0,
      timeSpent: 105,
      focusScore: 92,
    },
  ]

  const goals: LearningGoal[] = [
    {
      id: "1",
      title: "Complete React Fundamentals Course",
      description: "Finish all modules and pass the final assessment",
      targetDate: "2024-02-15",
      progress: 60,
      milestones: [
        { id: "m1", title: "Complete first 3 modules", completed: true, completedDate: "2024-01-25" },
        { id: "m2", title: "Pass knowledge check quiz", completed: false },
        { id: "m3", title: "Submit final project", completed: false },
        { id: "m4", title: "Achieve 85% overall grade", completed: false },
      ],
    },
    {
      id: "2",
      title: "Build Portfolio Project",
      description: "Create a personal portfolio website using React",
      targetDate: "2024-03-01",
      progress: 25,
      milestones: [
        { id: "m5", title: "Design wireframes", completed: true, completedDate: "2024-01-20" },
        { id: "m6", title: "Set up development environment", completed: false },
        { id: "m7", title: "Implement core components", completed: false },
        { id: "m8", title: "Deploy to production", completed: false },
      ],
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Completed your first learning module",
      icon: "🎯",
      earnedDate: "2024-01-25",
      points: 100,
      rarity: "common",
      category: "Progress",
    },
    {
      id: "2",
      title: "Speed Learner",
      description: "Completed 3 modules in one day",
      icon: "⚡",
      earnedDate: "2024-01-26",
      points: 250,
      rarity: "rare",
      category: "Efficiency",
    },
    {
      id: "3",
      title: "Perfect Score",
      description: "Achieved 100% on a quiz",
      icon: "🏆",
      earnedDate: "2024-01-27",
      points: 500,
      rarity: "epic",
      category: "Excellence",
    },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleModuleComplete = (moduleId: string) => {
    // Mark module as completed and unlock next module
    console.log("Completing module:", moduleId)
  }

  const handleQuizSubmit = (moduleId: string) => {
    // Submit quiz answers and show results
    console.log("Submitting quiz for module:", moduleId, quizAnswers)
  }

  const handleNotesSave = (moduleId: string, noteContent: string) => {
    // Save notes for the module
    console.log("Saving notes for module:", moduleId, noteContent)
  }

  const handleBookmarkAdd = (moduleId: string, timestamp: number) => {
    // Add bookmark at current timestamp
    console.log("Adding bookmark for module:", moduleId, "at", timestamp)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Home className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">React Fundamentals</h1>
                <p className="text-sm text-muted-foreground">Module 2 of 5 • 60% Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {studyStreak} day streak
              </Badge>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Module */}
            {currentModule && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {currentModule.type === "video" && <Video className="w-5 h-5" />}
                        {currentModule.type === "reading" && <BookOpen className="w-5 h-5" />}
                        {currentModule.type === "quiz" && <Brain className="w-5 h-5" />}
                        {currentModule.type === "assignment" && <FileText className="w-5 h-5" />}
                        {currentModule.type === "interactive" && <Lightbulb className="w-5 h-5" />}
                        {currentModule.title}
                      </CardTitle>
                      <CardDescription>{currentModule.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmarkAdd(currentModule.id, currentTime)}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setShowNotes(!showNotes)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Video Player */}
                  {currentModule.type === "video" && (
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Video Player Placeholder</p>
                            <p className="text-sm opacity-75">Duration: {formatTime(currentModule.duration)}</p>
                          </div>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="space-y-2">
                            <Progress value={(currentTime / duration) * 100} className="h-1" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-white hover:bg-white/20"
                                  onClick={() => setIsPlaying(!isPlaying)}
                                >
                                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                  <SkipBack className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                  <SkipForward className="w-4 h-4" />
                                </Button>
                                <div className="flex items-center gap-2 text-white text-sm">
                                  <Volume2 className="w-4 h-4" />
                                  <div className="w-16 h-1 bg-white/30 rounded">
                                    <div className="h-full bg-white rounded" style={{ width: `${volume * 100}%` }} />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Select
                                  value={playbackSpeed.toString()}
                                  onValueChange={(value) => setPlaybackSpeed(Number.parseFloat(value))}
                                >
                                  <SelectTrigger className="w-20 h-8 text-white border-white/30">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0.5">0.5x</SelectItem>
                                    <SelectItem value="0.75">0.75x</SelectItem>
                                    <SelectItem value="1">1x</SelectItem>
                                    <SelectItem value="1.25">1.25x</SelectItem>
                                    <SelectItem value="1.5">1.5x</SelectItem>
                                    <SelectItem value="2">2x</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                  <Maximize className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bookmarks */}
                      {currentModule.bookmarks.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Bookmarks</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentModule.bookmarks.map((bookmark, index) => (
                              <Button key={index} variant="outline" size="sm" onClick={() => setCurrentTime(bookmark)}>
                                {formatTime(bookmark)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Content */}
                  {currentModule.type === "interactive" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Code Editor</h4>
                          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                            <pre>{currentModule.content?.interactiveElements?.[0]?.content}</pre>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Live Preview</h4>
                          <div className="bg-gray-50 p-4 rounded-lg border">
                            <div className="text-center">
                              <h1 className="text-2xl font-bold">Hello, World!</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Run Code
                      </Button>
                    </div>
                  )}

                  {/* Quiz Content */}
                  {currentModule.type === "quiz" && currentModule.content?.quizQuestions && (
                    <div className="space-y-6">
                      {currentModule.content.quizQuestions.map((question, index) => (
                        <Card key={question.id}>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Question {index + 1} ({question.points} points)
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="font-medium">{question.question}</p>

                            {question.type === "multiple-choice" && question.options && (
                              <RadioGroup
                                value={quizAnswers[question.id] || ""}
                                onValueChange={(value) => setQuizAnswers((prev) => ({ ...prev, [question.id]: value }))}
                              >
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                                    <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}

                            {question.type === "true-false" && (
                              <RadioGroup
                                value={quizAnswers[question.id] || ""}
                                onValueChange={(value) => setQuizAnswers((prev) => ({ ...prev, [question.id]: value }))}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="true" id={`${question.id}-true`} />
                                  <Label htmlFor={`${question.id}-true`}>True</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="false" id={`${question.id}-false`} />
                                  <Label htmlFor={`${question.id}-false`}>False</Label>
                                </div>
                              </RadioGroup>
                            )}

                            {question.type === "short-answer" && (
                              <Textarea
                                placeholder="Enter your answer..."
                                value={quizAnswers[question.id] || ""}
                                onChange={(e) => setQuizAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                                rows={3}
                              />
                            )}

                            {question.type === "essay" && (
                              <Textarea
                                placeholder="Write your essay response..."
                                value={quizAnswers[question.id] || ""}
                                onChange={(e) => setQuizAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                                rows={8}
                              />
                            )}
                          </CardContent>
                        </Card>
                      ))}

                      <div className="flex justify-between">
                        <Button variant="outline">Save Draft</Button>
                        <Button onClick={() => handleQuizSubmit(currentModule.id)}>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Quiz
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {currentModule.resources.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Resources</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {currentModule.resources.map((resource, index) => (
                          <Button key={index} variant="outline" className="justify-start bg-transparent">
                            <Download className="w-4 h-4 mr-2" />
                            {resource.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={() => handleModuleComplete(currentModule.id)}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes Section */}
            {showNotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Take notes while learning..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => handleNotesSave(currentModule?.id || "", notes)}>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Completed</div>
                    <div className="font-medium">3 of 5 modules</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Time Spent</div>
                    <div className="font-medium">4.5 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {learningModules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentModule?.id === module.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                    } ${module.isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => !module.isLocked && setCurrentModule(module)}
                  >
                    <div className="flex-shrink-0">
                      {module.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : module.isLocked ? (
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{module.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {Math.ceil(module.duration / 60)} min
                        {module.type === "video" && <Video className="w-3 h-3" />}
                        {module.type === "reading" && <BookOpen className="w-3 h-3" />}
                        {module.type === "quiz" && <Brain className="w-3 h-3" />}
                        {module.type === "assignment" && <FileText className="w-3 h-3" />}
                        {module.type === "interactive" && <Lightbulb className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {goals.slice(0, 2).map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{goal.title}</span>
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-1" />
                    <div className="text-xs text-muted-foreground">
                      Due: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Goals
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{achievement.points}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Study Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Study Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Streak</div>
                    <div className="font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      {studyStreak} days
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Focus Time</div>
                    <div className="font-medium">{focusTime}h today</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg. Score</div>
                    <div className="font-medium">87%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Rank</div>
                    <div className="font-medium">#23</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
