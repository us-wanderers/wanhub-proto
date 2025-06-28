"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, Star, Clock, Users, BookOpen, Play, Heart, Share2, Award, ChevronRight } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar?: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  lessons: number
  students: number
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  thumbnail: string
  tags: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  isEnrolled: boolean
  isFavorite: boolean
  progress?: number
  lastAccessed?: string
  certificate: boolean
  language: string
  subtitles: string[]
  level: string
}

interface Review {
  id: string
  studentName: string
  studentAvatar?: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export function StudentCourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const courses: Course[] = [
    {
      id: "1",
      title: "Complete React Development Bootcamp",
      description: "Master React from basics to advanced concepts with hands-on projects",
      instructor: "Dr. Sarah Johnson",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Frontend Development",
      difficulty: "intermediate",
      duration: "12 weeks",
      lessons: 45,
      students: 2847,
      rating: 4.8,
      reviews: 1234,
      price: 89.99,
      originalPrice: 149.99,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
      prerequisites: ["Basic JavaScript", "HTML/CSS"],
      learningOutcomes: [
        "Build modern React applications",
        "Master React Hooks and Context",
        "Implement state management",
        "Deploy React apps to production",
      ],
      isEnrolled: false,
      isFavorite: false,
      certificate: true,
      language: "English",
      subtitles: ["English", "Spanish", "French"],
      level: "Intermediate",
    },
    {
      id: "2",
      title: "Data Structures & Algorithms Masterclass",
      description: "Comprehensive guide to DSA with coding interview preparation",
      instructor: "Prof. Michael Chen",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Computer Science",
      difficulty: "advanced",
      duration: "16 weeks",
      lessons: 60,
      students: 1923,
      rating: 4.9,
      reviews: 856,
      price: 129.99,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Algorithms", "Data Structures", "Interview Prep", "Python"],
      prerequisites: ["Programming fundamentals", "Basic mathematics"],
      learningOutcomes: [
        "Master essential data structures",
        "Solve complex algorithmic problems",
        "Ace technical interviews",
        "Optimize code performance",
      ],
      isEnrolled: true,
      isFavorite: true,
      progress: 65,
      lastAccessed: "2024-01-28",
      certificate: true,
      language: "English",
      subtitles: ["English", "Mandarin"],
      level: "Advanced",
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      description: "Learn design principles and create stunning user interfaces",
      instructor: "Emily Rodriguez",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Design",
      difficulty: "beginner",
      duration: "8 weeks",
      lessons: 32,
      students: 3456,
      rating: 4.7,
      reviews: 2103,
      price: 69.99,
      originalPrice: 99.99,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["UI Design", "UX Design", "Figma", "Prototyping"],
      prerequisites: ["None"],
      learningOutcomes: [
        "Understand design principles",
        "Create wireframes and prototypes",
        "Master design tools",
        "Build a design portfolio",
      ],
      isEnrolled: false,
      isFavorite: true,
      certificate: true,
      language: "English",
      subtitles: ["English", "Spanish"],
      level: "Beginner",
    },
  ]

  const reviews: Review[] = [
    {
      id: "1",
      studentName: "Alex Thompson",
      studentAvatar: "/placeholder.svg?height=32&width=32",
      rating: 5,
      comment:
        "Excellent course! The instructor explains complex concepts clearly and the projects are very practical.",
      date: "2024-01-25",
      helpful: 23,
    },
    {
      id: "2",
      studentName: "Maria Garcia",
      studentAvatar: "/placeholder.svg?height=32&width=32",
      rating: 4,
      comment: "Great content and well-structured lessons. Would recommend to anyone starting with React.",
      date: "2024-01-20",
      helpful: 18,
    },
  ]

  const categories = [
    "All",
    "Frontend Development",
    "Backend Development",
    "Computer Science",
    "Design",
    "Data Science",
    "Mobile Development",
    "DevOps",
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.lastAccessed || "2024-01-01").getTime() - new Date(a.lastAccessed || "2024-01-01").getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

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

  const handleEnroll = (courseId: string) => {
    // Handle course enrollment
    console.log("Enrolling in course:", courseId)
  }

  const toggleFavorite = (courseId: string) => {
    // Handle favorite toggle
    console.log("Toggling favorite for course:", courseId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Course Catalog</h2>
          <p className="text-muted-foreground">Discover and enroll in courses to advance your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.isEnrolled && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-600">Enrolled</Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(course.id)}
                    >
                      <Heart className={`w-4 h-4 ${course.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {course.progress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <div className="flex items-center justify-between text-white text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-muted-foreground">({course.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course)}>
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedCourse && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedCourse.title}</DialogTitle>
                                <DialogDescription>{selectedCourse.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <img
                                  src={selectedCourse.thumbnail || "/placeholder.svg"}
                                  alt={selectedCourse.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">What you'll learn</h4>
                                      <ul className="space-y-1">
                                        {selectedCourse.learningOutcomes.map((outcome, index) => (
                                          <li key={index} className="flex items-start gap-2 text-sm">
                                            <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            {outcome}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Prerequisites</h4>
                                      <ul className="space-y-1">
                                        {selectedCourse.prerequisites.map((prereq, index) => (
                                          <li key={index} className="text-sm text-muted-foreground">
                                            • {prereq}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Duration:</span>
                                        <div className="font-medium">{selectedCourse.duration}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Lessons:</span>
                                        <div className="font-medium">{selectedCourse.lessons}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Level:</span>
                                        <div className="font-medium capitalize">{selectedCourse.difficulty}</div>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Language:</span>
                                        <div className="font-medium">{selectedCourse.language}</div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Instructor</h4>
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={selectedCourse.instructorAvatar || "/placeholder.svg"} />
                                          <AvatarFallback>
                                            {selectedCourse.instructor
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{selectedCourse.instructor}</div>
                                          <div className="text-sm text-muted-foreground">
                                            {selectedCourse.students.toLocaleString()} students
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Student Reviews</h4>
                                  <div className="space-y-4">
                                    {reviews.map((review) => (
                                      <div key={review.id} className="border rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                          <Avatar className="w-8 h-8">
                                            <AvatarImage src={review.studentAvatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                              {review.studentName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="font-medium text-sm">{review.studentName}</span>
                                              <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                  <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${
                                                      i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                                  />
                                                ))}
                                              </div>
                                              <span className="text-xs text-muted-foreground">
                                                {new Date(review.date).toLocaleDateString()}
                                              </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                              <span>Helpful ({review.helpful})</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">${selectedCourse.price}</span>
                                    {selectedCourse.originalPrice && (
                                      <span className="text-lg text-muted-foreground line-through">
                                        ${selectedCourse.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline">Add to Wishlist</Button>
                                    <Button onClick={() => handleEnroll(selectedCourse.id)}>
                                      {selectedCourse.isEnrolled ? "Continue Learning" : "Enroll Now"}
                                    </Button>
                                  </div>
                                </div>
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>

                      {course.isEnrolled ? (
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Continue
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleEnroll(course.id)}>
                          Enroll
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses
              .filter((course) => course.isEnrolled)
              .map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <div className="flex items-center justify-between text-white text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      Last accessed: {course.lastAccessed && new Date(course.lastAccessed).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses
              .filter((course) => course.isFavorite)
              .map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => toggleFavorite(course.id)}
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${course.price}</span>
                      <Button size="sm" onClick={() => handleEnroll(course.id)}>
                        {course.isEnrolled ? "Continue" : "Enroll"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No completed courses yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete your first course to earn a certificate and unlock achievements!
            </p>
            <Button>Browse Courses</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
