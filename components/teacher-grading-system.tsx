"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import {
  FileText,
  Download,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Send,
} from "lucide-react"

interface Submission {
  id: string
  studentId: string
  studentName: string
  studentAvatar?: string
  assignmentId: string
  assignmentTitle: string
  submittedAt: string
  status: "submitted" | "graded" | "late" | "missing"
  grade?: number
  feedback?: string
  files: SubmissionFile[]
  attempt: number
  timeSpent: number
}

interface SubmissionFile {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface RubricCriteria {
  id: string
  name: string
  description: string
  points: number
  levels: RubricLevel[]
}

interface RubricLevel {
  id: string
  name: string
  description: string
  points: number
}

interface GradingSession {
  id: string
  assignmentId: string
  assignmentTitle: string
  totalSubmissions: number
  gradedSubmissions: number
  averageGrade: number
  timeRemaining: string
}

export function TeacherGradingSystem() {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [currentGrade, setCurrentGrade] = useState<number>(0)
  const [feedback, setFeedback] = useState("")
  const [selectedTab, setSelectedTab] = useState("queue")
  const [isGradingMode, setIsGradingMode] = useState(false)

  const submissions: Submission[] = [
    {
      id: "1",
      studentId: "s1",
      studentName: "Sarah Johnson",
      assignmentId: "a1",
      assignmentTitle: "React Component Architecture",
      submittedAt: "2024-01-28T10:30:00Z",
      status: "submitted",
      files: [
        { id: "f1", name: "components.zip", type: "zip", size: 2048000, url: "/files/components.zip" },
        { id: "f2", name: "README.md", type: "md", size: 5120, url: "/files/readme.md" },
      ],
      attempt: 1,
      timeSpent: 240,
    },
    {
      id: "2",
      studentId: "s2",
      studentName: "Mike Chen",
      assignmentId: "a1",
      assignmentTitle: "React Component Architecture",
      submittedAt: "2024-01-27T15:45:00Z",
      status: "graded",
      grade: 88,
      feedback: "Excellent work on component separation. Consider using custom hooks for state management.",
      files: [{ id: "f3", name: "project.zip", type: "zip", size: 1536000, url: "/files/project.zip" }],
      attempt: 1,
      timeSpent: 180,
    },
    {
      id: "3",
      studentId: "s3",
      studentName: "Emily Davis",
      assignmentId: "a2",
      assignmentTitle: "Database Design Project",
      submittedAt: "2024-01-26T09:20:00Z",
      status: "late",
      files: [
        { id: "f4", name: "database-schema.sql", type: "sql", size: 10240, url: "/files/schema.sql" },
        { id: "f5", name: "design-document.pdf", type: "pdf", size: 512000, url: "/files/design.pdf" },
      ],
      attempt: 1,
      timeSpent: 320,
    },
  ]

  const rubricCriteria: RubricCriteria[] = [
    {
      id: "1",
      name: "Code Quality",
      description: "Clean, readable, and well-structured code",
      points: 25,
      levels: [
        { id: "1a", name: "Excellent", description: "Clean, efficient, well-documented", points: 25 },
        { id: "1b", name: "Good", description: "Generally clean with minor issues", points: 20 },
        { id: "1c", name: "Satisfactory", description: "Functional but needs improvement", points: 15 },
        { id: "1d", name: "Needs Work", description: "Significant issues present", points: 10 },
      ],
    },
    {
      id: "2",
      name: "Functionality",
      description: "Does the solution meet all requirements?",
      points: 30,
      levels: [
        { id: "2a", name: "Excellent", description: "All requirements met perfectly", points: 30 },
        { id: "2b", name: "Good", description: "Most requirements met", points: 24 },
        { id: "2c", name: "Satisfactory", description: "Basic requirements met", points: 18 },
        { id: "2d", name: "Needs Work", description: "Missing key requirements", points: 12 },
      ],
    },
  ]

  const gradingSessions: GradingSession[] = [
    {
      id: "1",
      assignmentId: "a1",
      assignmentTitle: "React Component Architecture",
      totalSubmissions: 45,
      gradedSubmissions: 32,
      averageGrade: 86.5,
      timeRemaining: "2 days",
    },
    {
      id: "2",
      assignmentId: "a2",
      assignmentTitle: "Database Design Project",
      totalSubmissions: 38,
      gradedSubmissions: 15,
      averageGrade: 82.1,
      timeRemaining: "5 days",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "graded":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "late":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "missing":
        return <XCircle className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800"
      case "graded":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-red-100 text-red-800"
      case "missing":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleGradeSubmission = (submissionId: string, grade: number, feedbackText: string) => {
    // Implementation for grading submission
    console.log("Grading submission:", { submissionId, grade, feedbackText })
    setSelectedSubmission(null)
    setCurrentGrade(0)
    setFeedback("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Grading Center</h2>
          <p className="text-muted-foreground">Review and grade student submissions</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Grades
          </Button>
        </div>
      </div>

      {/* Grading Sessions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradingSessions.map((session) => (
          <Card key={session.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{session.assignmentTitle}</CardTitle>
              <CardDescription>Grading progress and statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">
                  {session.gradedSubmissions}/{session.totalSubmissions}
                </span>
              </div>
              <Progress value={(session.gradedSubmissions / session.totalSubmissions) * 100} className="h-2" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{session.averageGrade.toFixed(1)}%</div>
                  <div className="text-muted-foreground">Average Grade</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{session.timeRemaining}</div>
                  <div className="text-muted-foreground">Time Left</div>
                </div>
              </div>

              <Button className="w-full" onClick={() => setIsGradingMode(true)}>
                Continue Grading
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Grading Queue</TabsTrigger>
          <TabsTrigger value="graded">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="rubrics">Rubrics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pending Submissions</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignments</SelectItem>
                  <SelectItem value="a1">React Components</SelectItem>
                  <SelectItem value="a2">Database Design</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="submitted">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {submissions
              .filter((s) => s.status === "submitted" || s.status === "late")
              .map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={submission.studentAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {submission.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{submission.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{submission.assignmentTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                            {new Date(submission.submittedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1">{submission.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Files submitted: {submission.files.length}</span>
                        <span>Time spent: {submission.timeSpent} minutes</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {submission.files.map((file) => (
                          <div key={file.id} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex-1" onClick={() => setSelectedSubmission(submission.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Grade Submission
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Grade Submission - {submission.studentName}</DialogTitle>
                              <DialogDescription>
                                {submission.assignmentTitle} • Submitted{" "}
                                {new Date(submission.submittedAt).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Submission Files</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    {submission.files.map((file) => (
                                      <div
                                        key={file.id}
                                        className="flex items-center justify-between p-2 border rounded"
                                      >
                                        <div className="flex items-center gap-2">
                                          <FileText className="w-4 h-4" />
                                          <div>
                                            <p className="text-sm font-medium">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                          </div>
                                        </div>
                                        <div className="flex gap-1">
                                          <Button size="sm" variant="ghost">
                                            <Eye className="w-4 h-4" />
                                          </Button>
                                          <Button size="sm" variant="ghost">
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Quick Grade</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Grade ({currentGrade}/100)</Label>
                                      <Slider
                                        value={[currentGrade]}
                                        onValueChange={(value) => setCurrentGrade(value[0])}
                                        max={100}
                                        step={1}
                                        className="w-full"
                                      />
                                      <Input
                                        type="number"
                                        value={currentGrade}
                                        onChange={(e) => setCurrentGrade(Number(e.target.value))}
                                        max={100}
                                        min={0}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Quick Feedback</Label>
                                      <div className="grid grid-cols-2 gap-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            setFeedback(
                                              "Excellent work! You've demonstrated a strong understanding of the concepts.",
                                            )
                                          }
                                        >
                                          Excellent
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            setFeedback(
                                              "Good work overall. Consider improving error handling and documentation.",
                                            )
                                          }
                                        >
                                          Good
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            setFeedback(
                                              "Satisfactory work. Please review the requirements and make necessary improvements.",
                                            )
                                          }
                                        >
                                          Satisfactory
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            setFeedback(
                                              "This submission needs significant improvement. Please schedule office hours to discuss.",
                                            )
                                          }
                                        >
                                          Needs Work
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="space-y-4">
                                <Label>Detailed Feedback</Label>
                                <Textarea
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Provide detailed feedback for the student..."
                                  className="min-h-[120px]"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Grade Letter</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select grade letter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="A+">A+ (97-100)</SelectItem>
                                      <SelectItem value="A">A (93-96)</SelectItem>
                                      <SelectItem value="A-">A- (90-92)</SelectItem>
                                      <SelectItem value="B+">B+ (87-89)</SelectItem>
                                      <SelectItem value="B">B (83-86)</SelectItem>
                                      <SelectItem value="B-">B- (80-82)</SelectItem>
                                      <SelectItem value="C+">C+ (77-79)</SelectItem>
                                      <SelectItem value="C">C (73-76)</SelectItem>
                                      <SelectItem value="C-">C- (70-72)</SelectItem>
                                      <SelectItem value="F">F (0-69)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Return Method</Label>
                                  <Select defaultValue="email">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="email">Email notification</SelectItem>
                                      <SelectItem value="dashboard">Dashboard only</SelectItem>
                                      <SelectItem value="both">Email + Dashboard</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="gap-2">
                              <Button variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message Student
                              </Button>
                              <Button
                                onClick={() => handleGradeSubmission(submission.id, currentGrade, feedback)}
                                disabled={currentGrade === 0 || feedback.trim() === ""}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Submit Grade
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Graded Submissions</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Grades
            </Button>
          </div>

          <div className="space-y-3">
            {submissions
              .filter((s) => s.status === "graded")
              .map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {submission.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{submission.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{submission.assignmentTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-lg">{submission.grade}%</div>
                          <div className="text-sm text-muted-foreground">
                            {submission.grade! >= 90
                              ? "A"
                              : submission.grade! >= 80
                                ? "B"
                                : submission.grade! >= 70
                                  ? "C"
                                  : "F"}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">A (90-100%)</span>
                    <span className="text-sm font-medium">12 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">B (80-89%)</span>
                    <span className="text-sm font-medium">18 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">C (70-79%)</span>
                    <span className="text-sm font-medium">8 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">F (0-69%)</span>
                    <span className="text-sm font-medium">2 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grading Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Grade</span>
                    <span className="text-sm font-medium">84.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Median Grade</span>
                    <span className="text-sm font-medium">86%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Submission Rate</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time Rate</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grading Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Graded Today</span>
                    <span className="text-sm font-medium">8 submissions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Time per Grade</span>
                    <span className="text-sm font-medium">12 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Review</span>
                    <span className="text-sm font-medium">15 submissions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Graded</span>
                    <span className="text-sm font-medium">47 submissions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rubrics" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Grading Rubrics</h3>
            <Button>Create Rubric</Button>
          </div>

          <div className="space-y-4">
            {rubricCriteria.map((criteria) => (
              <Card key={criteria.id}>
                <CardHeader>
                  <CardTitle className="text-base">{criteria.name}</CardTitle>
                  <CardDescription>{criteria.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {criteria.levels.map((level) => (
                      <div key={level.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{level.name}</h4>
                          <Badge variant="outline">{level.points} pts</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
