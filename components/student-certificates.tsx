"use client"

import { TabsContent } from "@/components/ui/tabs"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Download, Share2, CheckCircle, Star, Trophy, Medal, Target } from "lucide-react"

interface Certificate {
  id: string
  title: string
  course: string
  instructor: string
  completedDate: string
  issueDate: string
  certificateNumber: string
  grade: number
  creditsEarned: number
  validUntil?: string
  skills: string[]
  verificationUrl: string
  downloadUrl: string
  shareUrl: string
  thumbnail: string
  type: "completion" | "achievement" | "specialization"
  isVerified: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  totalCourses: number
  completedCourses: number
  certificates: number
  estimatedTime: string
  progress: number
  nextCourse?: string
}

export function StudentCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Advanced React Development Certificate",
      course: "Advanced React Development",
      instructor: "Dr. Sarah Johnson",
      completedDate: "2024-01-25",
      issueDate: "2024-01-26",
      certificateNumber: "WH-REACT-2024-001234",
      grade: 92,
      creditsEarned: 3,
      skills: ["React", "TypeScript", "State Management", "Testing", "Performance Optimization"],
      verificationUrl: "https://wanhub.edu/verify/WH-REACT-2024-001234",
      downloadUrl: "#",
      shareUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      type: "completion",
      isVerified: true,
    },
    {
      id: "2",
      title: "JavaScript Fundamentals Achievement",
      course: "JavaScript Mastery",
      instructor: "Emily Rodriguez",
      completedDate: "2024-01-15",
      issueDate: "2024-01-16",
      certificateNumber: "WH-JS-2024-005678",
      grade: 88,
      creditsEarned: 2,
      skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
      verificationUrl: "https://wanhub.edu/verify/WH-JS-2024-005678",
      downloadUrl: "#",
      shareUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      type: "achievement",
      isVerified: true,
    },
    {
      id: "3",
      title: "Frontend Development Specialization",
      course: "Frontend Development Track",
      instructor: "Multiple Instructors",
      completedDate: "2024-01-30",
      issueDate: "2024-01-31",
      certificateNumber: "WH-FE-SPEC-2024-009876",
      grade: 90,
      creditsEarned: 8,
      validUntil: "2027-01-31",
      skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Responsive Design", "Web Performance"],
      verificationUrl: "https://wanhub.edu/verify/WH-FE-SPEC-2024-009876",
      downloadUrl: "#",
      shareUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      type: "specialization",
      isVerified: true,
    },
  ]

  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Frontend Developer",
      description: "Master modern frontend development",
      totalCourses: 8,
      completedCourses: 6,
      certificates: 2,
      estimatedTime: "6 months",
      progress: 75,
      nextCourse: "Advanced CSS & Animations",
    },
    {
      id: "2",
      title: "Full Stack JavaScript",
      description: "Complete JavaScript development stack",
      totalCourses: 12,
      completedCourses: 4,
      certificates: 1,
      estimatedTime: "9 months",
      progress: 33,
      nextCourse: "Node.js Fundamentals",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getCertificateTypeIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <Award className="w-5 h-5" />
      case "achievement":
        return <Medal className="w-5 h-5" />
      case "specialization":
        return <Trophy className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
    }
  }

  const handleDownload = (certificateId: string) => {
    console.log("Downloading certificate:", certificateId)
  }

  const handleShare = (certificateId: string) => {
    console.log("Sharing certificate:", certificateId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Certificates & Achievements</h2>
        <p className="text-muted-foreground">Track your learning accomplishments and showcase your skills</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.reduce((sum, cert) => sum + cert.creditsEarned, 0)}</div>
            <p className="text-xs text-muted-foreground">Academic credits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total points earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={certificate.thumbnail || "/placeholder.svg"}
                    alt={certificate.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-white/90 text-gray-800 border border-gray-300 px-2 py-1 rounded">
                      <div className="flex items-center gap-1">
                        {getCertificateTypeIcon(certificate.type)}
                        {certificate.type}
                      </div>
                    </div>
                  </div>
                  {certificate.isVerified && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-green-600 text-white border border-green-600 px-2 py-1 rounded">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{certificate.title}</CardTitle>
                  <CardDescription>{certificate.course}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <div className="font-medium">{new Date(certificate.completedDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Grade:</span>
                      <div className="font-medium">{certificate.grade}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Credits:</span>
                      <div className="font-medium">{certificate.creditsEarned}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Instructor:</span>
                      <div className="font-medium text-xs">{certificate.instructor}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <div key={skill} className="bg-gray-100 text-gray-800 border border-gray-300 px-2 py-1 rounded">
                        {skill}
                      </div>
                    ))}
                    {certificate.skills.length > 3 && (
                      <div className="bg-gray-100 text-gray-800 border border-gray-300 px-2 py-1 rounded">
                        +{certificate.skills.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div
                      className="bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      View Details
                    </div>

                    <div
                      className="bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleDownload(certificate.id)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </div>
                    <div
                      className="bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleShare(certificate.id)}
                    >
                      <Share2 className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{/* No badges data available */}</div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {path.title}
                  </CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <div className="font-medium">
                        {path.completedCourses}/{path.totalCourses} courses
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Certificates:</span>
                      <div className="font-medium">{path.certificates}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Time:</span>
                      <div className="font-medium">{path.estimatedTime}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completion:</span>
                      <div className="font-medium">{path.progress}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg">
                      <div className="h-2 bg-blue-600 w-[75%]"></div>
                    </div>
                  </div>

                  {path.nextCourse && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium">Next Course:</div>
                      <div className="text-sm text-muted-foreground">{path.nextCourse}</div>
                    </div>
                  )}

                  <div
                    className="bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 w-full"
                    onClick={() => console.log("Continue Learning Path")}
                  >
                    Continue Learning Path
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>Skills verified through completed courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["React", "JavaScript", "TypeScript", "CSS", "HTML"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 rounded-lg">
                          <div className="h-2 bg-blue-600 w-[75%]"></div>
                        </div>
                        <div className="bg-gray-100 text-gray-800 border border-gray-300 px-2 py-1 rounded">
                          Verified
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soft Skills</CardTitle>
                <CardDescription>Skills developed through coursework and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Time Management"].map(
                    (skill) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 rounded-lg">
                            <div className="h-2 bg-blue-600 w-[85%]"></div>
                          </div>
                          <div className="bg-gray-100 text-gray-800 border border-gray-300 px-2 py-1 rounded">
                            Developing
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
