"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Pin, Flag, Search, Plus, Clock, Eye, Users } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorAvatar?: string
  authorRole: "student" | "instructor" | "ta"
  course: string
  category: string
  createdAt: string
  updatedAt?: string
  views: number
  replies: number
  likes: number
  dislikes: number
  isPinned: boolean
  isSolved: boolean
  tags: string[]
  hasUserLiked: boolean
  hasUserDisliked: boolean
}

interface PostReply {
  id: string
  postId: string
  content: string
  author: string
  authorAvatar?: string
  authorRole: "student" | "instructor" | "ta"
  createdAt: string
  likes: number
  dislikes: number
  hasUserLiked: boolean
  hasUserDisliked: boolean
  isAcceptedAnswer: boolean
}

export function StudentDiscussionForums() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newReplyContent, setNewReplyContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "How to handle state management in large React applications?",
      content:
        "I'm working on a large React project and struggling with state management. Should I use Redux, Context API, or something else? What are the best practices?",
      author: "Alex Thompson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "student",
      course: "Advanced React Development",
      category: "General Discussion",
      createdAt: "2024-01-28T10:30:00",
      views: 156,
      replies: 8,
      likes: 23,
      dislikes: 2,
      isPinned: false,
      isSolved: true,
      tags: ["React", "State Management", "Redux", "Context API"],
      hasUserLiked: false,
      hasUserDisliked: false,
    },
    {
      id: "2",
      title: "Assignment 3: Binary Tree Implementation Help",
      content:
        "I'm having trouble with the binary tree traversal methods. Can someone explain the difference between inorder, preorder, and postorder traversal?",
      author: "Maria Garcia",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "student",
      course: "Data Structures & Algorithms",
      category: "Assignment Help",
      createdAt: "2024-01-27T15:45:00",
      views: 89,
      replies: 12,
      likes: 15,
      dislikes: 0,
      isPinned: false,
      isSolved: false,
      tags: ["Binary Trees", "Traversal", "Assignment"],
      hasUserLiked: true,
      hasUserDisliked: false,
    },
    {
      id: "3",
      title: "📌 Course Schedule Update - Week 5",
      content:
        "Important update: Due to the holiday, our Week 5 lecture will be moved to Thursday. Please check the updated schedule in the course materials.",
      author: "Dr. Sarah Johnson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "instructor",
      course: "Advanced React Development",
      category: "Announcements",
      createdAt: "2024-01-26T09:00:00",
      views: 234,
      replies: 3,
      likes: 45,
      dislikes: 0,
      isPinned: true,
      isSolved: false,
      tags: ["Schedule", "Important"],
      hasUserLiked: false,
      hasUserDisliked: false,
    },
    {
      id: "4",
      title: "Best resources for learning design patterns?",
      content:
        "Can anyone recommend good books, videos, or online courses for learning software design patterns? I want to improve my code architecture skills.",
      author: "David Kim",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "student",
      course: "Software Engineering",
      category: "Resources",
      createdAt: "2024-01-25T14:20:00",
      views: 67,
      replies: 6,
      likes: 12,
      dislikes: 1,
      isPinned: false,
      isSolved: false,
      tags: ["Design Patterns", "Resources", "Books"],
      hasUserLiked: false,
      hasUserDisliked: false,
    },
  ]

  const replies: PostReply[] = [
    {
      id: "1",
      postId: "1",
      content:
        "For large applications, I'd recommend Redux Toolkit with RTK Query. It provides excellent developer experience and handles most edge cases. Context API is great for smaller apps but can become unwieldy at scale.",
      author: "Dr. Sarah Johnson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "instructor",
      createdAt: "2024-01-28T11:15:00",
      likes: 18,
      dislikes: 0,
      hasUserLiked: false,
      hasUserDisliked: false,
      isAcceptedAnswer: true,
    },
    {
      id: "2",
      postId: "1",
      content:
        "I've been using Zustand lately and it's been great! Much simpler than Redux but still powerful enough for complex state management.",
      author: "Emily Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorRole: "student",
      createdAt: "2024-01-28T12:30:00",
      likes: 8,
      dislikes: 1,
      hasUserLiked: true,
      hasUserDisliked: false,
      isAcceptedAnswer: false,
    },
  ]

  const categories = [
    "All",
    "General Discussion",
    "Assignment Help",
    "Announcements",
    "Resources",
    "Technical Issues",
    "Study Groups",
  ]

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "instructor":
        return "bg-purple-100 text-purple-800"
      case "ta":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleLike = (postId: string, isReply = false) => {
    // Handle like functionality
    console.log("Liking post/reply:", postId, isReply)
  }

  const handleDislike = (postId: string, isReply = false) => {
    // Handle dislike functionality
    console.log("Disliking post/reply:", postId, isReply)
  }

  const handleCreatePost = () => {
    // Handle new post creation
    console.log("Creating new post:", { title: newPostTitle, content: newPostContent })
    setNewPostTitle("")
    setNewPostContent("")
  }

  const handleReply = (postId: string) => {
    // Handle reply creation
    console.log("Creating reply for post:", postId, newReplyContent)
    setNewReplyContent("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Discussion Forums</h2>
          <p className="text-muted-foreground">Connect with classmates and instructors</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Start a New Discussion</DialogTitle>
                <DialogDescription>Ask a question or start a conversation with your classmates</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter discussion title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Describe your question or topic..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreatePost}>Post Discussion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category.toLowerCase().replace(" ", "-") ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.toLowerCase().replace(" ", "-"))}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <Card key={post.id} className={`${post.isPinned ? "border-yellow-200 bg-yellow-50/50" : ""}`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {post.isPinned && <Pin className="w-4 h-4 text-yellow-600" />}
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            {post.isSolved && <Badge className="bg-green-100 text-green-800">Solved</Badge>}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">{post.author}</span>
                            <Badge className={getRoleColor(post.authorRole)}>{post.authorRole}</Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.course}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-muted-foreground">{post.content}</p>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={post.hasUserLiked ? "text-blue-600" : ""}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDislike(post.id)}
                        className={post.hasUserDisliked ? "text-red-600" : ""}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>
                            <Reply className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedPost && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedPost.title}</DialogTitle>
                                <DialogDescription>
                                  {selectedPost.course} • {selectedPost.category}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                {/* Original Post */}
                                <div className="p-4 border rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <Avatar>
                                      <AvatarImage src={selectedPost.authorAvatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {selectedPost.author
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium">{selectedPost.author}</span>
                                        <Badge className={getRoleColor(selectedPost.authorRole)}>
                                          {selectedPost.authorRole}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                          {new Date(selectedPost.createdAt).toLocaleString()}
                                        </span>
                                      </div>
                                      <p className="text-muted-foreground">{selectedPost.content}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Replies */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Replies ({selectedPost.replies})</h4>
                                  {replies
                                    .filter((reply) => reply.postId === selectedPost.id)
                                    .map((reply) => (
                                      <div
                                        key={reply.id}
                                        className={`p-4 border rounded-lg ${reply.isAcceptedAnswer ? "border-green-200 bg-green-50" : ""}`}
                                      >
                                        <div className="flex items-start gap-3">
                                          <Avatar className="w-8 h-8">
                                            <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                              {reply.author
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                              <span className="font-medium text-sm">{reply.author}</span>
                                              <Badge className={getRoleColor(reply.authorRole)} size="sm">
                                                {reply.authorRole}
                                              </Badge>
                                              {reply.isAcceptedAnswer && (
                                                <Badge className="bg-green-100 text-green-800" size="sm">
                                                  ✓ Accepted Answer
                                                </Badge>
                                              )}
                                              <span className="text-xs text-muted-foreground">
                                                {new Date(reply.createdAt).toLocaleString()}
                                              </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{reply.content}</p>
                                            <div className="flex items-center gap-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleLike(reply.id, true)}
                                                className={reply.hasUserLiked ? "text-blue-600" : ""}
                                              >
                                                <ThumbsUp className="w-3 h-3 mr-1" />
                                                {reply.likes}
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDislike(reply.id, true)}
                                                className={reply.hasUserDisliked ? "text-red-600" : ""}
                                              >
                                                <ThumbsDown className="w-3 h-3 mr-1" />
                                                {reply.dislikes}
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>

                                {/* Reply Form */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Add a Reply</h4>
                                  <Textarea
                                    placeholder="Write your reply..."
                                    value={newReplyContent}
                                    onChange={(e) => setNewReplyContent(e.target.value)}
                                    rows={4}
                                  />
                                </div>
                              </div>

                              <DialogFooter>
                                <Button onClick={() => handleReply(selectedPost.id)}>Post Reply</Button>
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-posts" className="space-y-4">
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Start a discussion to connect with your classmates</p>
            <Button>Create Your First Post</Button>
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No followed discussions</h3>
            <p className="text-muted-foreground mb-4">Follow discussions to get notified of new replies</p>
            <Button>Browse Discussions</Button>
          </div>
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          <div className="space-y-4">
            {sortedPosts
              .filter((post) => !post.isSolved && post.replies === 0)
              .map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium">{post.author}</span>
                          <Badge className={getRoleColor(post.authorRole)}>{post.authorRole}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.course}</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{post.content}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="text-orange-600">
                          Needs Answer
                        </Badge>
                      </div>
                      <Button size="sm">
                        <Reply className="w-4 h-4 mr-1" />
                        Answer
                      </Button>
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
