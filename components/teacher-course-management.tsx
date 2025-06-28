"use client"

import type React from "react"

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
import {
  Users,
  FileText,
  Video,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  MessageSquare,
  Settings,
  Calendar,
  ListChecks,
  Mail,
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  status: "draft" | "published" | "archived"
  enrolledStudents: number
  totalLessons: number
  completedLessons: number
  averageProgress: number
  averageGrade: number
  createdAt: string
  lastUpdated: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  type: "video" | "text" | "quiz" | "assignment"
  duration: number
  order: number
  isPublished: boolean
  completionRate: number
}

interface Student {
  id: string
  name: string
  email: string
  enrolledDate: string
  progress: number
  lastActivity: string
  grade: number
  status: "active" | "inactive" | "completed"
  avatar?: string
}

interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: string
  totalSubmissions: number
  gradedSubmissions: number
  averageGrade: number
  status: "active" | "closed" | "draft"
}

export function TeacherCourseManagement() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [courseCreationStep, setCourseCreationStep] = useState(1)
  const [newCourseData, setNewCourseData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
  })

  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced React Development",
      description: "Master modern React patterns and best practices",
      status: "published",
      enrolledStudents: 45,
      totalLessons: 24,
      completedLessons: 18,
      averageProgress: 75,
      averageGrade: 87,
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-28",
      category: "Frontend Development",
      difficulty: "advanced",
    },
    {
      id: "2",
      title: "Data Structures Fundamentals",
      description: "Learn essential data structures and algorithms",
      status: "published",
      enrolledStudents: 38,
      totalLessons: 16,
      completedLessons: 12,
      averageProgress: 65,
      averageGrade: 82,
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-25",
      category: "Computer Science",
      difficulty: "intermediate",
    },
    {
      id: "3",
      title: "Web Design Principles",
      description: "Create beautiful and functional web interfaces",
      status: "draft",
      enrolledStudents: 0,
      totalLessons: 20,
      completedLessons: 8,
      averageProgress: 0,
      averageGrade: 0,
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-28",
      category: "Design",
      difficulty: "beginner",
    },
  ]

  const lessons: Lesson[] = [
    {
      id: "1",
      courseId: "1",
      title: "Introduction to React Hooks",
      description: "Learn the fundamentals of React Hooks",
      type: "video",
      duration: 45,
      order: 1,
      isPublished: true,
      completionRate: 92,
    },
    {
      id: "2",
      courseId: "1",
      title: "State Management with Context",
      description: "Managing application state effectively",
      type: "video",
      duration: 60,
      order: 2,
      isPublished: true,
      completionRate: 85,
    },
    {
      id: "3",
      courseId: "1",
      title: "React Hooks Quiz",
      description: "Test your understanding of React Hooks",
      type: "quiz",
      duration: 20,
      order: 3,
      isPublished: true,
      completionRate: 78,
    },
  ]

  const students: Student[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      enrolledDate: "2024-01-15",
      progress: 85,
      lastActivity: "2024-01-28",
      grade: 92,
      status: "active",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.c@email.com",
      enrolledDate: "2024-01-16",
      progress: 72,
      lastActivity: "2024-01-27",
      grade: 88,
      status: "active",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.d@email.com",
      enrolledDate: "2024-01-18",
      progress: 95,
      lastActivity: "2024-01-28",
      grade: 96,
      status: "active",
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      courseId: "1",
      title: "Build a Todo App with React Hooks",
      description: "Create a functional todo application using React Hooks",
      dueDate: "2024-02-05",
      totalSubmissions: 42,
      gradedSubmissions: 38,
      averageGrade: 87,
      status: "active",
    },
    {
      id: "2",
      courseId: "1",
      title: "Context API Implementation",
      description: "Implement a theme switcher using Context API",
      dueDate: "2024-02-12",
      totalSubmissions: 35,
      gradedSubmissions: 20,
      averageGrade: 84,
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const handleCreateCourse = () => {
    // Implement course creation logic here
    console.log("Creating course with data:", newCourseData)
    setIsCreateDialogOpen(false)
    setCourseCreationStep(1)
    setNewCourseData({ title: "", description: "", category: "", difficulty: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCourseData({ ...newCourseData, [e.target.id]: e.target.value })
  }

  const handleSelectChange = (e: string, name: string) => {
    setNewCourseData({ ...newCourseData, [name]: e })
  }

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-muted-foreground">Manage your courses, lessons, and students</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Add a new course to your teaching portfolio</DialogDescription>
            </DialogHeader>
            {courseCreationStep === 1 && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={newCourseData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Course description"
                    value={newCourseData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(e) => handleSelectChange(e, "category")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                      <SelectItem value="Backend Development">Backend Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select onValueChange={(e) => handleSelectChange(e, "difficulty")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              {courseCreationStep === 1 && (
                <Button type="submit" onClick={handleCreateCourse}>
                  Create Course
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-1">{course.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrolledStudents} students
                </span>
                <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <Progress value={(course.completedLessons / course.totalLessons) * 100} className="h-2" />
              </div>

              {course.status === "published" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{course.averageProgress}%</div>
                    <div className="text-muted-foreground">Avg Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{course.averageGrade}%</div>
                    <div className="text-muted-foreground">Avg Grade</div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => setSelectedCourse(course.id)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Manage
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Course Management */}
      {selectedCourse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{courses.find((c) => c.id === selectedCourse)?.title} - Detailed Management</CardTitle>
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lessons" className="space-y-4">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="grading">Grading</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Course Lessons</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
                <div className="space-y-3">
                  {lessons
                    .filter((lesson) => lesson.courseId === selectedCourse)
                    .map((lesson) => (
                      <div key={lesson.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">#{lesson.order}</span>
                              {lesson.type === "video" && <Video className="w-4 h-4 text-blue-600" />}
                              {lesson.type === "quiz" && <FileText className="w-4 h-4 text-green-600" />}
                              {lesson.type === "assignment" && <Upload className="w-4 h-4 text-orange-600" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={lesson.isPublished ? "default" : "secondary"}>
                              {lesson.isPublished ? "Published" : "Draft"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{lesson.duration} minutes</span>
                          <span>{lesson.completionRate}% completion rate</span>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Enrolled Students</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message All
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">{student.progress}% complete</div>
                            <div className="text-sm text-muted-foreground">Grade: {student.grade}%</div>
                          </div>
                          <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={student.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}</span>
                        <span>Last active: {new Date(student.lastActivity).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Assignments</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
                <div className="space-y-3">
                  {assignments
                    .filter((assignment) => assignment.courseId === selectedCourse)
                    .map((assignment) => (
                      <div key={assignment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          </div>
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{assignment.totalSubmissions}</div>
                            <div className="text-muted-foreground">Submissions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{assignment.gradedSubmissions}</div>
                            <div className="text-muted-foreground">Graded</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{assignment.averageGrade}%</div>
                            <div className="text-muted-foreground">Avg Grade</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="grading" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Grading and Assessment</h3>
                  <Button size="sm">
                    <ListChecks className="w-4 h-4 mr-2" />
                    Manage Grades
                  </Button>
                </div>
                <p className="text-muted-foreground">Manage student grades and assessment criteria.</p>
                {/* Add grading and assessment tools here */}
              </TabsContent>

              <TabsContent value="communication" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Student Communication</h3>
                  <Button size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
                <p className="text-muted-foreground">Communicate with students and manage announcements.</p>
                {/* Add communication features here */}
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Content Management</h3>
                  <Button size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
                <p className="text-muted-foreground">Manage course content and upload files.</p>
                {/* Add content creation tools here */}
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Calendar Scheduling</h3>
                  <Button size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Event
                  </Button>
                </div>
                <p className="text-muted-foreground">Schedule course events and manage deadlines.</p>
                {/* Add calendar integration here */}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Student Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Daily Active Students</span>
                          <span className="text-sm font-medium">32/45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Weekly Active Students</span>
                          <span className="text-sm font-medium">43/45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average Session Time</span>
                          <span className="text-sm font-medium">45 min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Completion Rate</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average Quiz Score</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Assignment Submission Rate</span>
                          <span className="text-sm font-medium">93%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Student Satisfaction</span>
                          <span className="text-sm font-medium">4.6/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Course Rating</span>
                          <span className="text-sm font-medium">4.8/5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Advanced Analytics and Reporting</h3>
                  <p className="text-muted-foreground">Detailed insights into course performance.</p>
                  {/* Add advanced analytics and reporting here */}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
