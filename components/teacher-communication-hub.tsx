"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  MessageSquare,
  Send,
  Search,
  Users,
  Calendar,
  Video,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Plus,
  Paperclip,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  recipientId: string
  recipientName: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  priority: "low" | "normal" | "high"
  category: "question" | "feedback" | "assignment" | "general"
  hasAttachments: boolean
}

interface Announcement {
  id: string
  title: string
  content: string
  courseId: string
  courseName: string
  createdAt: string
  priority: "low" | "normal" | "high"
  targetAudience: "all" | "specific"
  recipients: string[]
  isScheduled: boolean
  scheduledDate?: string
}

interface ForumPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  title: string
  content: string
  courseId: string
  courseName: string
  createdAt: string
  replies: number
  isAnswered: boolean
  isPinned: boolean
  tags: string[]
}

export function TeacherCommunicationHub() {
  const [selectedTab, setSelectedTab] = useState("messages")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", content: "" })

  const messages: Message[] = [
    {
      id: "1",
      senderId: "s1",
      senderName: "Sarah Johnson",
      recipientId: "t1",
      recipientName: "Dr. Smith",
      subject: "Question about React Hooks assignment",
      content: "Hi Dr. Smith, I'm having trouble understanding the useEffect hook in the assignment. Could you help?",
      timestamp: "2024-01-28T10:30:00Z",
      isRead: false,
      priority: "normal",
      category: "question",
      hasAttachments: false,
    },
    {
      id: "2",
      senderId: "s2",
      senderName: "Mike Chen",
      recipientId: "t1",
      recipientName: "Dr. Smith",
      subject: "Thank you for the feedback",
      content:
        "Thank you for the detailed feedback on my database project. It really helped me understand the concepts better.",
      timestamp: "2024-01-27T15:45:00Z",
      isRead: true,
      priority: "low",
      category: "feedback",
      hasAttachments: false,
    },
    {
      id: "3",
      senderId: "s3",
      senderName: "Emily Davis",
      recipientId: "t1",
      recipientName: "Dr. Smith",
      subject: "Extension request for final project",
      content:
        "I'm writing to request a 2-day extension for the final project due to medical reasons. I have documentation available.",
      timestamp: "2024-01-26T09:20:00Z",
      isRead: false,
      priority: "high",
      category: "assignment",
      hasAttachments: true,
    },
  ]

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Midterm Exam Schedule Updated",
      content: "The midterm exam has been rescheduled to next Friday at 2:00 PM in the main auditorium.",
      courseId: "c1",
      courseName: "Advanced React Development",
      createdAt: "2024-01-28T08:00:00Z",
      priority: "high",
      targetAudience: "all",
      recipients: [],
      isScheduled: false,
    },
    {
      id: "2",
      title: "New Reading Materials Available",
      content:
        "I've uploaded additional reading materials for next week's topics. Please check the course materials section.",
      courseId: "c2",
      courseName: "Data Structures",
      createdAt: "2024-01-27T16:30:00Z",
      priority: "normal",
      targetAudience: "all",
      recipients: [],
      isScheduled: false,
    },
  ]

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      authorId: "s1",
      authorName: "Sarah Johnson",
      title: "How to handle state in nested components?",
      content:
        "I'm working on the React assignment and struggling with passing state between deeply nested components...",
      courseId: "c1",
      courseName: "Advanced React Development",
      createdAt: "2024-01-28T14:20:00Z",
      replies: 3,
      isAnswered: false,
      isPinned: false,
      tags: ["react", "state-management", "props"],
    },
    {
      id: "2",
      authorId: "s4",
      authorName: "Alex Rodriguez",
      title: "Database normalization best practices",
      content: "Can someone explain when to use 3NF vs BCNF in database design?",
      courseId: "c2",
      courseName: "Database Systems",
      createdAt: "2024-01-27T11:15:00Z",
      replies: 5,
      isAnswered: true,
      isPinned: true,
      tags: ["database", "normalization", "design"],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question":
        return <MessageSquare className="w-4 h-4 text-blue-600" />
      case "feedback":
        return <Star className="w-4 h-4 text-yellow-600" />
      case "assignment":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Communication Hub</h2>
          <p className="text-muted-foreground">Manage messages, announcements, and forum discussions</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription>Send a message to students or colleagues</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recipient Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Individual Student</SelectItem>
                        <SelectItem value="course">Entire Course</SelectItem>
                        <SelectItem value="group">Student Group</SelectItem>
                        <SelectItem value="colleague">Colleague</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s1">Sarah Johnson</SelectItem>
                      <SelectItem value="s2">Mike Chen</SelectItem>
                      <SelectItem value="s3">Emily Davis</SelectItem>
                      <SelectItem value="course1">Advanced React Course (45 students)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    placeholder="Enter message subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    placeholder="Type your message here..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="schedule" />
                  <Label htmlFor="schedule">Schedule for later</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach Files
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="questions">Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedMessage === message.id ? "ring-2 ring-blue-500" : ""
                  } ${!message.isRead ? "border-l-4 border-l-blue-500" : ""}`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">{message.senderName}</p>
                          {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <p className="text-sm font-medium truncate mb-1">{message.subject}</p>
                        <p className="text-xs text-muted-foreground truncate mb-2">{message.content}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(message.priority)} size="sm">
                            {message.priority}
                          </Badge>
                          {getCategoryIcon(message.category)}
                          {message.hasAttachments && <Paperclip className="w-3 h-3 text-muted-foreground" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {messages
                              .find((m) => m.id === selectedMessage)
                              ?.senderName.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {messages.find((m) => m.id === selectedMessage)?.subject}
                          </CardTitle>
                          <CardDescription>
                            From: {messages.find((m) => m.id === selectedMessage)?.senderName} •{" "}
                            {new Date(
                              messages.find((m) => m.id === selectedMessage)?.timestamp || "",
                            ).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getPriorityColor(
                            messages.find((m) => m.id === selectedMessage)?.priority || "normal",
                          )}
                        >
                          {messages.find((m) => m.id === selectedMessage)?.priority}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose max-w-none">
                      <p>{messages.find((m) => m.id === selectedMessage)?.content}</p>
                    </div>

                    <div className="border-t pt-4">
                      <Label>Reply</Label>
                      <Textarea placeholder="Type your reply..." className="mt-2" />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Paperclip className="w-4 h-4 mr-2" />
                            Attach
                          </Button>
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                        </div>
                        <Button>
                          <Send className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a message</h3>
                      <p className="text-muted-foreground">Choose a message from the list to view its content</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Course Announcements</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>Share important information with your students</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Course</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="c1">Advanced React Development</SelectItem>
                          <SelectItem value="c2">Data Structures</SelectItem>
                          <SelectItem value="all">All Courses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Announcement title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea placeholder="Announcement content..." className="min-h-[120px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="schedule-announcement" />
                    <Label htmlFor="schedule-announcement">Schedule for later</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Save Draft</Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{announcement.title}</h4>
                      <p className="text-muted-foreground mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{announcement.courseName}</span>
                        <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Discussion Forums</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="c1">Advanced React</SelectItem>
                  <SelectItem value="c2">Data Structures</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.authorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{post.title}</h4>
                        {post.isPinned && <Badge variant="outline">Pinned</Badge>}
                        {post.isAnswered && <Badge className="bg-green-100 text-green-800">Answered</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>By {post.authorName}</span>
                        <span>{post.courseName}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      {!post.isAnswered && <Button size="sm">Answer</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Meetings & Office Hours</h3>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Office Hours</p>
                    <p className="text-xs text-muted-foreground">Today, 2:00 PM - 4:00 PM</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Student Meeting - Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 bg-transparent">
                  <Video className="w-4 h-4" />
                  <span className="text-xs">Start Video Call</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 bg-transparent">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 bg-transparent">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Group Meeting</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 bg-transparent">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">Send Invite</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
