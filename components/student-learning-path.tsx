"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Circle,
  Lock,
  Play,
  BookOpen,
  Award,
  Clock,
  Users,
  Star,
  ArrowRight,
  Trophy,
  Brain,
  Lightbulb,
  Rocket,
  Flag,
} from "lucide-react"

interface LearningPathStep {
  id: string
  title: string
  description: string
  type: "course" | "project" | "assessment" | "milestone"
  status: "completed" | "current" | "locked" | "available"
  estimatedTime: string
  difficulty: "beginner" | "intermediate" | "advanced"
  prerequisites: string[]
  skills: string[]
  resources: {
    name: string
    type: string
    url: string
  }[]
  completedDate?: string
  grade?: number
  certificate?: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  estimatedDuration: string
  totalSteps: number
  completedSteps: number
  progress: number
  skills: string[]
  outcomes: string[]
  prerequisites: string[]
  steps: LearningPathStep[]
  instructor: {
    name: string
    avatar: string
    title: string
  }
  rating: number
  reviews: number
  enrolled: number
  price: number
  certificate: boolean
}

export function StudentLearningPath() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [currentStep, setCurrentStep] = useState<LearningPathStep | null>(null)

  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Frontend Developer Mastery",
      description: "Complete learning path to become a professional frontend developer",
      category: "Web Development",
      level: "intermediate",
      estimatedDuration: "6 months",
      totalSteps: 12,
      completedSteps: 7,
      progress: 58,
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Testing", "Deployment"],
      outcomes: [
        "Build responsive web applications",
        "Master modern JavaScript frameworks",
        "Implement best practices for performance",
        "Deploy applications to production",
        "Work with APIs and databases",
      ],
      prerequisites: ["Basic programming knowledge", "Computer literacy"],
      instructor: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Senior Frontend Engineer",
      },
      rating: 4.8,
      reviews: 1234,
      enrolled: 5678,
      price: 299,
      certificate: true,
      steps: [
        {
          id: "step1",
          title: "HTML & CSS Fundamentals",
          description: "Master the building blocks of web development",
          type: "course",
          status: "completed",
          estimatedTime: "2 weeks",
          difficulty: "beginner",
          prerequisites: [],
          skills: ["HTML5", "CSS3", "Responsive Design"],
          resources: [
            { name: "HTML Reference", type: "documentation", url: "/docs/html" },
            { name: "CSS Grid Guide", type: "tutorial", url: "/tutorials/css-grid" },
          ],
          completedDate: "2024-01-15",
          grade: 95,
          certificate: true,
        },
        {
          id: "step2",
          title: "JavaScript Essentials",
          description: "Learn modern JavaScript programming",
          type: "course",
          status: "completed",
          estimatedTime: "3 weeks",
          difficulty: "beginner",
          prerequisites: ["HTML & CSS Fundamentals"],
          skills: ["ES6+", "DOM Manipulation", "Async Programming"],
          resources: [
            { name: "JavaScript Guide", type: "documentation", url: "/docs/javascript" },
            { name: "Practice Exercises", type: "interactive", url: "/exercises/js" },
          ],
          completedDate: "2024-01-28",
          grade: 88,
          certificate: true,
        },
        {
          id: "step3",
          title: "React Fundamentals",
          description: "Build dynamic user interfaces with React",
          type: "course",
          status: "current",
          estimatedTime: "4 weeks",
          difficulty: "intermediate",
          prerequisites: ["JavaScript Essentials"],
          skills: ["React", "JSX", "Components", "State Management"],
          resources: [
            { name: "React Documentation", type: "documentation", url: "/docs/react" },
            { name: "Component Library", type: "examples", url: "/examples/react" },
          ],
        },
        {
          id: "step4",
          title: "Portfolio Project",
          description: "Build a personal portfolio website",
          type: "project",
          status: "available",
          estimatedTime: "2 weeks",
          difficulty: "intermediate",
          prerequisites: ["React Fundamentals"],
          skills: ["Project Planning", "Design Implementation", "Deployment"],
          resources: [
            { name: "Project Requirements", type: "document", url: "/projects/portfolio" },
            { name: "Design Templates", type: "assets", url: "/templates/portfolio" },
          ],
        },
        {
          id: "step5",
          title: "Advanced React Patterns",
          description: "Learn advanced React concepts and patterns",
          type: "course",
          status: "locked",
          estimatedTime: "3 weeks",
          difficulty: "advanced",
          prerequisites: ["Portfolio Project"],
          skills: ["Context API", "Custom Hooks", "Performance Optimization"],
          resources: [],
        },
        {
          id: "step6",
          title: "TypeScript Integration",
          description: "Add type safety to your React applications",
          type: "course",
          status: "locked",
          estimatedTime: "2 weeks",
          difficulty: "intermediate",
          prerequisites: ["Advanced React Patterns"],
          skills: ["TypeScript", "Type Definitions", "Generic Types"],
          resources: [],
        },
        {
          id: "step7",
          title: "Testing & Quality Assurance",
          description: "Write tests for your React applications",
          type: "course",
          status: "locked",
          estimatedTime: "2 weeks",
          difficulty: "intermediate",
          prerequisites: ["TypeScript Integration"],
          skills: ["Unit Testing", "Integration Testing", "Test-Driven Development"],
          resources: [],
        },
        {
          id: "step8",
          title: "Final Capstone Project",
          description: "Build a complete full-stack application",
          type: "project",
          status: "locked",
          estimatedTime: "4 weeks",
          difficulty: "advanced",
          prerequisites: ["Testing & Quality Assurance"],
          skills: ["Full-Stack Development", "API Integration", "Database Design"],
          resources: [],
        },
        {
          id: "step9",
          title: "Professional Assessment",
          description: "Demonstrate your frontend development skills",
          type: "assessment",
          status: "locked",
          estimatedTime: "1 week",
          difficulty: "advanced",
          prerequisites: ["Final Capstone Project"],
          skills: ["Problem Solving", "Code Review", "Technical Communication"],
          resources: [],
        },
        {
          id: "step10",
          title: "Career Preparation",
          description: "Prepare for frontend developer job interviews",
          type: "milestone",
          status: "locked",
          estimatedTime: "1 week",
          difficulty: "intermediate",
          prerequisites: ["Professional Assessment"],
          skills: ["Interview Skills", "Portfolio Presentation", "Technical Questions"],
          resources: [],
        },
      ],
    },
    {
      id: "2",
      title: "Data Science Fundamentals",
      description: "Learn the essentials of data science and machine learning",
      category: "Data Science",
      level: "beginner",
      estimatedDuration: "4 months",
      totalSteps: 8,
      completedSteps: 2,
      progress: 25,
      skills: ["Python", "Statistics", "Data Analysis", "Machine Learning", "Visualization"],
      outcomes: [
        "Analyze complex datasets",
        "Build predictive models",
        "Create data visualizations",
        "Apply statistical methods",
        "Present data insights",
      ],
      prerequisites: ["Basic mathematics", "Programming fundamentals"],
      instructor: {
        name: "Prof. Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Data Science Lead",
      },
      rating: 4.9,
      reviews: 856,
      enrolled: 3421,
      price: 399,
      certificate: true,
      steps: [
        {
          id: "ds1",
          title: "Python for Data Science",
          description: "Learn Python programming for data analysis",
          type: "course",
          status: "completed",
          estimatedTime: "3 weeks",
          difficulty: "beginner",
          prerequisites: [],
          skills: ["Python", "NumPy", "Pandas"],
          resources: [],
          completedDate: "2024-01-20",
          grade: 92,
        },
        {
          id: "ds2",
          title: "Statistics & Probability",
          description: "Master statistical concepts for data science",
          type: "course",
          status: "current",
          estimatedTime: "2 weeks",
          difficulty: "intermediate",
          prerequisites: ["Python for Data Science"],
          skills: ["Statistics", "Probability", "Hypothesis Testing"],
          resources: [],
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "current":
        return <Play className="w-5 h-5 text-blue-600" />
      case "available":
        return <Circle className="w-5 h-5 text-gray-400" />
      case "locked":
        return <Lock className="w-5 h-5 text-gray-300" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "project":
        return <Rocket className="w-4 h-4" />
      case "assessment":
        return <Brain className="w-4 h-4" />
      case "milestone":
        return <Flag className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStartStep = (step: LearningPathStep) => {
    setCurrentStep(step)
    console.log("Starting step:", step.title)
  }

  const handleEnrollPath = (pathId: string) => {
    console.log("Enrolling in path:", pathId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Learning Paths</h2>
        <p className="text-muted-foreground">Structured journeys to master new skills</p>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">My Paths</TabsTrigger>
          <TabsTrigger value="available">Available Paths</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommendations">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <Badge className={getDifficultyColor(path.level)}>{path.level}</Badge>
                      {path.certificate && <Award className="w-4 h-4 text-yellow-600" />}
                    </div>
                    <CardDescription className="text-base mb-3">{path.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {path.estimatedDuration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {path.enrolled.toLocaleString()} enrolled
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {path.rating} ({path.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${path.price}</div>
                    <div className="text-sm text-muted-foreground">one-time payment</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress Overview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {path.completedSteps} of {path.totalSteps} steps completed
                    </span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                  <div className="text-sm text-muted-foreground">{path.progress}% complete</div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h4 className="font-medium">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Path Steps */}
                <div className="space-y-3">
                  <h4 className="font-medium">Learning Path</h4>
                  <div className="space-y-3">
                    {path.steps.slice(0, 5).map((step, index) => (
                      <div key={step.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeIcon(step.type)}
                            <span className="font-medium">{step.title}</span>
                            <Badge className={getDifficultyColor(step.difficulty)} variant="outline">
                              {step.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.estimatedTime}
                            </div>
                            {step.completedDate && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                Completed {new Date(step.completedDate).toLocaleDateString()}
                              </div>
                            )}
                            {step.grade && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-600" />
                                {step.grade}%
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {step.status === "current" && (
                            <Button size="sm" onClick={() => handleStartStep(step)}>
                              Continue
                            </Button>
                          )}
                          {step.status === "available" && (
                            <Button size="sm" variant="outline" onClick={() => handleStartStep(step)}>
                              Start
                            </Button>
                          )}
                          {step.status === "completed" && (
                            <Button size="sm" variant="ghost">
                              Review
                            </Button>
                          )}
                          {step.status === "locked" && (
                            <Button size="sm" variant="ghost" disabled>
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {path.steps.length > 5 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => setSelectedPath(path)}
                          >
                            View All {path.totalSteps} Steps
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedPath && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedPath.title}</DialogTitle>
                                <DialogDescription>{selectedPath.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                                      <ul className="space-y-1">
                                        {selectedPath.outcomes.map((outcome, index) => (
                                          <li key={index} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            {outcome}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Prerequisites</h4>
                                      <ul className="space-y-1">
                                        {selectedPath.prerequisites.map((prereq, index) => (
                                          <li key={index} className="text-sm text-muted-foreground">
                                            • {prereq}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Instructor</h4>
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={selectedPath.instructor.avatar || "/placeholder.svg"} />
                                          <AvatarFallback>
                                            {selectedPath.instructor.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{selectedPath.instructor.name}</div>
                                          <div className="text-sm text-muted-foreground">
                                            {selectedPath.instructor.title}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Duration:</span>
                                        <div className="font-medium">{selectedPath.estimatedDuration}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Level:</span>
                                        <div className="font-medium capitalize">{selectedPath.level}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Steps:</span>
                                        <div className="font-medium">{selectedPath.totalSteps}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Certificate:</span>
                                        <div className="font-medium">{selectedPath.certificate ? "Yes" : "No"}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-semibold">Complete Learning Path</h4>
                                  <div className="space-y-2">
                                    {selectedPath.steps.map((step, index) => (
                                      <div key={step.id} className="flex items-center gap-3 p-3 border rounded">
                                        <div className="flex-shrink-0 text-sm font-medium w-8">{index + 1}</div>
                                        <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            {getTypeIcon(step.type)}
                                            <span className="font-medium">{step.title}</span>
                                            <Badge className={getDifficultyColor(step.difficulty)} variant="outline">
                                              {step.difficulty}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 text-sm text-muted-foreground">
                                          {step.estimatedTime}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">Continue Learning</Button>
                  <Button variant="outline">View Certificate</Button>
                  <Button variant="outline">Share Progress</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription className="mt-1">{path.category}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(path.level)}>{path.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{path.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium">{path.estimatedDuration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Steps:</span>
                      <div className="font-medium">{path.totalSteps}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{path.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{path.enrolled.toLocaleString()}</span>
                    </div>
                    {path.certificate && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold">${path.price}</div>
                    <Button onClick={() => handleEnrollPath(path.id)}>Enroll Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No completed paths yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete your first learning path to earn certificates and showcase your skills
            </p>
            <Button>Browse Learning Paths</Button>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-muted-foreground mb-4">
              Based on your learning history and goals, we'll recommend the best paths for you
            </p>
            <Button>Get Recommendations</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
