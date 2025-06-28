"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, FileText, Upload, Download, CheckCircle, XCircle, Eye, Edit, Send } from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  course: string
  instructor: string
  dueDate: string
  submittedDate?: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: number
  maxGrade: number
  feedback?: string
  attachments: string[]
  submissionType: "text" | "file" | "both"
  allowLateSubmission: boolean
  attempts: number
  maxAttempts: number
  timeLimit?: number
  instructions: string[]
  rubric?: {
    criteria: string
    points: number
    description: string
  }[]
}

interface Submission {
  id: string
  assignmentId: string
  content?: string
  files: {
    name: string
    size: string
    type: string
    url: string
  }[]
  submittedAt: string
  attempt: number
}

export function StudentAssignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionContent, setSubmissionContent] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "React Component Library Project",
      description: "Build a reusable component library with TypeScript and Storybook",
      course: "Advanced React Development",
      instructor: "Dr. Sarah Johnson",
      dueDate: "2024-02-15T23:59:00",
      status: "pending",
      maxGrade: 100,
      attachments: ["project-requirements.pdf", "starter-template.zip"],
      submissionType: "both",
      allowLateSubmission: true,
      attempts: 0,
      maxAttempts: 3,
      instructions: [
        "Create at least 5 reusable components",
        "Include TypeScript definitions",
        "Add Storybook documentation",
        "Write unit tests for each component",
        "Deploy to npm registry",
      ],
      rubric: [
        { criteria: "Code Quality", points: 30, description: "Clean, readable, and well-structured code" },
        { criteria: "Functionality", points: 25, description: "Components work as expected" },
        { criteria: "Documentation", points: 20, description: "Clear documentation and examples" },
        { criteria: "Testing", points: 15, description: "Comprehensive test coverage" },
        { criteria: "Deployment", points: 10, description: "Successfully deployed to npm" },
      ],
    },
    {
      id: "2",
      title: "Algorithm Analysis Report",
      description: "Analyze time and space complexity of sorting algorithms",
      course: "Data Structures & Algorithms",
      instructor: "Prof. Michael Chen",
      dueDate: "2024-02-10T23:59:00",
      submittedDate: "2024-02-08T15:30:00",
      status: "graded",
      grade: 92,
      maxGrade: 100,
      feedback:
        "Excellent analysis! Your comparison of different sorting algorithms was thorough and well-presented. Minor deduction for missing edge case analysis in quicksort.",
      attachments: ["algorithm-templates.docx"],
      submissionType: "file",
      allowLateSubmission: false,
      attempts: 1,
      maxAttempts: 1,
      instructions: [
        "Compare at least 5 sorting algorithms",
        "Include Big O notation analysis",
        "Provide code implementations",
        "Create performance benchmarks",
        "Submit as PDF document",
      ],
    },
    {
      id: "3",
      title: "Weekly Quiz: JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics and ES6 features",
      course: "JavaScript Mastery",
      instructor: "Emily Rodriguez",
      dueDate: "2024-02-05T23:59:00",
      status: "overdue",
      maxGrade: 50,
      attachments: [],
      submissionType: "text",
      allowLateSubmission: true,
      attempts: 0,
      maxAttempts: 2,
      timeLimit: 60,
      instructions: [
        "Answer all 25 multiple choice questions",
        "Complete within 60 minutes",
        "No external resources allowed",
        "Submit before deadline for full credit",
      ],
    },
    {
      id: "4",
      title: "Portfolio Website Design",
      description: "Create a personal portfolio website showcasing your projects",
      course: "UI/UX Design Fundamentals",
      instructor: "David Kim",
      dueDate: "2024-02-20T23:59:00",
      submittedDate: "2024-02-18T10:15:00",
      status: "submitted",
      maxGrade: 100,
      attachments: ["design-guidelines.pdf", "color-palette.png"],
      submissionType: "both",
      allowLateSubmission: true,
      attempts: 1,
      maxAttempts: 2,
      instructions: [
        "Design responsive portfolio website",
        "Include at least 3 project showcases",
        "Follow accessibility guidelines",
        "Submit Figma design file and live URL",
      ],
    },
  ]

  const submissions: Submission[] = [
    {
      id: "1",
      assignmentId: "2",
      content:
        "Detailed analysis of sorting algorithms including bubble sort, merge sort, quick sort, heap sort, and radix sort...",
      files: [
        { name: "algorithm-analysis.pdf", size: "2.4 MB", type: "application/pdf", url: "#" },
        { name: "benchmark-results.xlsx", size: "156 KB", type: "application/vnd.ms-excel", url: "#" },
      ],
      submittedAt: "2024-02-08T15:30:00",
      attempt: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "graded":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "submitted":
        return <Upload className="w-4 h-4" />
      case "graded":
        return <CheckCircle className="w-4 h-4" />
      case "overdue":
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmission = (assignmentId: string) => {
    // Handle assignment submission
    console.log("Submitting assignment:", assignmentId, {
      content: submissionContent,
      files: selectedFiles,
    })
    setSubmissionContent("")
    setSelectedFiles([])
    setSelectedAssignment(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Assignments</h2>
        <p className="text-muted-foreground">Manage your coursework and track submission deadlines</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate)
              const isOverdue = daysUntilDue < 0 && assignment.status === "pending"

              return (
                <Card key={assignment.id} className={`${isOverdue ? "border-red-200" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-1">{assignment.course}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(assignment.status)}
                          {assignment.status}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{assignment.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Due Date</span>
                        </div>
                        <div className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</div>
                        {daysUntilDue >= 0 ? (
                          <div className="text-xs text-muted-foreground">
                            {daysUntilDue === 0 ? "Due today" : `${daysUntilDue} days left`}
                          </div>
                        ) : (
                          <div className="text-xs text-red-600">{Math.abs(daysUntilDue)} days overdue</div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          <span>Grade</span>
                        </div>
                        <div className="font-medium">
                          {assignment.grade ? `${assignment.grade}/${assignment.maxGrade}` : `—/${assignment.maxGrade}`}
                        </div>
                        {assignment.grade && (
                          <div className="text-xs text-muted-foreground">
                            {Math.round((assignment.grade / assignment.maxGrade) * 100)}%
                          </div>
                        )}
                      </div>
                    </div>

                    {assignment.status === "graded" && assignment.grade && (
                      <div className="space-y-2">
                        <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-2" />
                        {assignment.feedback && (
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-1">Instructor Feedback:</p>
                            <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAssignment(assignment)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedAssignment && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedAssignment.title}</DialogTitle>
                                <DialogDescription>
                                  {selectedAssignment.course} • {selectedAssignment.instructor}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-2">Assignment Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Due Date:</span>
                                        <span>{new Date(selectedAssignment.dueDate).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Max Grade:</span>
                                        <span>{selectedAssignment.maxGrade} points</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Attempts:</span>
                                        <span>
                                          {selectedAssignment.attempts}/{selectedAssignment.maxAttempts}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Submission Type:</span>
                                        <span className="capitalize">{selectedAssignment.submissionType}</span>
                                      </div>
                                      {selectedAssignment.timeLimit && (
                                        <div className="flex justify-between">
                                          <span>Time Limit:</span>
                                          <span>{selectedAssignment.timeLimit} minutes</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Instructions</h4>
                                    <ul className="space-y-1">
                                      {selectedAssignment.instructions.map((instruction, index) => (
                                        <li key={index} className="text-sm text-muted-foreground">
                                          {index + 1}. {instruction}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {selectedAssignment.rubric && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Grading Rubric</h4>
                                    <div className="border rounded-lg overflow-hidden">
                                      <table className="w-full">
                                        <thead className="bg-muted">
                                          <tr>
                                            <th className="text-left p-3 text-sm font-medium">Criteria</th>
                                            <th className="text-left p-3 text-sm font-medium">Points</th>
                                            <th className="text-left p-3 text-sm font-medium">Description</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {selectedAssignment.rubric.map((item, index) => (
                                            <tr key={index} className="border-t">
                                              <td className="p-3 text-sm font-medium">{item.criteria}</td>
                                              <td className="p-3 text-sm">{item.points}</td>
                                              <td className="p-3 text-sm text-muted-foreground">{item.description}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {selectedAssignment.attachments.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Attachments</h4>
                                    <div className="space-y-2">
                                      {selectedAssignment.attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                                          <FileText className="w-4 h-4" />
                                          <span className="text-sm flex-1">{attachment}</span>
                                          <Button size="sm" variant="ghost">
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {selectedAssignment.status === "pending" && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Submit Assignment</h4>
                                    <div className="space-y-4">
                                      {(selectedAssignment.submissionType === "text" ||
                                        selectedAssignment.submissionType === "both") && (
                                        <div>
                                          <Label htmlFor="submission-content">Written Response</Label>
                                          <Textarea
                                            id="submission-content"
                                            placeholder="Enter your response here..."
                                            value={submissionContent}
                                            onChange={(e) => setSubmissionContent(e.target.value)}
                                            rows={6}
                                          />
                                        </div>
                                      )}

                                      {(selectedAssignment.submissionType === "file" ||
                                        selectedAssignment.submissionType === "both") && (
                                        <div>
                                          <Label htmlFor="file-upload">File Upload</Label>
                                          <div className="space-y-2">
                                            <Input id="file-upload" type="file" multiple onChange={handleFileUpload} />
                                            {selectedFiles.length > 0 && (
                                              <div className="space-y-1">
                                                {selectedFiles.map((file, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-center gap-2 p-2 border rounded"
                                                  >
                                                    <FileText className="w-4 h-4" />
                                                    <span className="text-sm flex-1">{file.name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                    <Button size="sm" variant="ghost" onClick={() => removeFile(index)}>
                                                      <XCircle className="w-4 h-4" />
                                                    </Button>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <DialogFooter>
                                {selectedAssignment.status === "pending" && (
                                  <Button onClick={() => handleSubmission(selectedAssignment.id)}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Assignment
                                  </Button>
                                )}
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>

                      {assignment.status === "pending" && (
                        <Button size="sm" onClick={() => setSelectedAssignment(assignment)}>
                          <Edit className="w-4 h-4 mr-1" />
                          {assignment.attempts > 0 ? "Resubmit" : "Submit"}
                        </Button>
                      )}

                      {assignment.status === "graded" && assignment.grade && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments
              .filter((assignment) => assignment.status === "pending")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium">Due: {new Date(assignment.dueDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">{getDaysUntilDue(assignment.dueDate)} days left</div>
                      </div>
                      <Button size="sm">Submit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments
              .filter((assignment) => assignment.status === "submitted")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium">
                          Submitted:{" "}
                          {assignment.submittedDate && new Date(assignment.submittedDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted-foreground">Awaiting grade</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments
              .filter((assignment) => assignment.status === "graded")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium">
                          Grade: {assignment.grade}/{assignment.maxGrade}
                        </div>
                        <div className="text-muted-foreground">
                          {assignment.grade && Math.round((assignment.grade / assignment.maxGrade) * 100)}%
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Graded</Badge>
                    </div>
                    {assignment.grade && (
                      <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-2" />
                    )}
                    {assignment.feedback && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{assignment.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
