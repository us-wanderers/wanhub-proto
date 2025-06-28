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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  UserPlus,
  Search,
  Upload,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  MoreHorizontal,
  BookOpen,
  BarChart3,
  Settings,
  Check,
  X,
  Plus,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin" | "staff"
  department: string
  status: "active" | "inactive" | "pending" | "suspended"
  joinDate: string
  lastActive: string
  coursesEnrolled?: number
  coursesTeaching?: number
  avatar?: string
  permissions: string[]
}

interface Department {
  id: string
  name: string
  head: string
  totalUsers: number
  activeUsers: number
  courses: number
  budget: number
}

interface BulkAction {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  action: (selectedUsers: string[]) => void
}

export function OrganizationUserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false)

  const users: User[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "teacher",
      department: "Computer Science",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2024-01-28",
      coursesTeaching: 3,
      permissions: ["create_course", "grade_students", "manage_content"],
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@university.edu",
      role: "student",
      department: "Computer Science",
      status: "active",
      joinDate: "2023-09-01",
      lastActive: "2024-01-28",
      coursesEnrolled: 5,
      permissions: ["view_courses", "submit_assignments"],
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      role: "admin",
      department: "Administration",
      status: "active",
      joinDate: "2022-08-15",
      lastActive: "2024-01-28",
      permissions: ["manage_users", "system_admin", "view_analytics"],
    },
    {
      id: "4",
      name: "Prof. David Wilson",
      email: "david.wilson@university.edu",
      role: "teacher",
      department: "Engineering",
      status: "active",
      joinDate: "2021-02-10",
      lastActive: "2024-01-27",
      coursesTeaching: 2,
      permissions: ["create_course", "grade_students", "manage_content"],
    },
    {
      id: "5",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@university.edu",
      role: "student",
      department: "Business",
      status: "pending",
      joinDate: "2024-01-20",
      lastActive: "2024-01-20",
      coursesEnrolled: 0,
      permissions: [],
    },
  ]

  const departments: Department[] = [
    {
      id: "1",
      name: "Computer Science",
      head: "Dr. Sarah Johnson",
      totalUsers: 1247,
      activeUsers: 1189,
      courses: 45,
      budget: 450000,
    },
    {
      id: "2",
      name: "Engineering",
      head: "Prof. David Wilson",
      totalUsers: 967,
      activeUsers: 923,
      courses: 38,
      budget: 380000,
    },
    {
      id: "3",
      name: "Business Administration",
      head: "Dr. Lisa Chen",
      totalUsers: 856,
      activeUsers: 812,
      courses: 32,
      budget: 320000,
    },
  ]

  const bulkActions: BulkAction[] = [
    {
      id: "activate",
      name: "Activate Users",
      description: "Activate selected users",
      icon: <Check className="w-4 h-4" />,
      action: (users) => console.log("Activating users:", users),
    },
    {
      id: "deactivate",
      name: "Deactivate Users",
      description: "Deactivate selected users",
      icon: <X className="w-4 h-4" />,
      action: (users) => console.log("Deactivating users:", users),
    },
    {
      id: "reset_password",
      name: "Reset Passwords",
      description: "Send password reset emails",
      icon: <Lock className="w-4 h-4" />,
      action: (users) => console.log("Resetting passwords for:", users),
    },
    {
      id: "send_message",
      name: "Send Message",
      description: "Send bulk message to users",
      icon: <Mail className="w-4 h-4" />,
      action: (users) => console.log("Sending message to:", users),
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "teacher":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-green-100 text-green-800"
      case "staff":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || user.department === filterDepartment

    return matchesSearch && matchesRole && matchesStatus && matchesDepartment
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions across the organization</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Import Users</DialogTitle>
                <DialogDescription>Upload a CSV file to import multiple users at once</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop your CSV file here or click to browse</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Choose File
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>CSV should include columns: name, email, role, department</p>
                  <p>Download our template to get started</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Download Template</Button>
                <Button>Import Users</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user to the organization</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="user@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business Administration</SelectItem>
                      <SelectItem value="arts">Liberal Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Employee/Student ID</Label>
                  <Input placeholder="Enter ID number" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm1" />
                      <Label htmlFor="perm1" className="text-sm">
                        Create Courses
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm2" />
                      <Label htmlFor="perm2" className="text-sm">
                        Grade Students
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm3" />
                      <Label htmlFor="perm3" className="text-sm">
                        Manage Content
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm4" />
                      <Label htmlFor="perm4" className="text-sm">
                        View Analytics
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-welcome" defaultChecked />
                  <Label htmlFor="send-welcome" className="text-sm">
                    Send welcome email with login instructions
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setIsCreateUserOpen(false)}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
                  </span>
                  <div className="flex gap-2">
                    {bulkActions.map((action) => (
                      <Button key={action.id} variant="outline" size="sm" onClick={() => action.action(selectedUsers)}>
                        {action.icon}
                        <span className="ml-2">{action.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.role === "student" && user.coursesEnrolled !== undefined && (
                        <span>{user.coursesEnrolled} enrolled</span>
                      )}
                      {user.role === "teacher" && user.coursesTeaching !== undefined && (
                        <span>{user.coursesTeaching} teaching</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Actions - {user.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="justify-start bg-transparent">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Profile
                            </Button>
                            <Button variant="outline" className="justify-start bg-transparent">
                              <Lock className="w-4 h-4 mr-2" />
                              Reset Password
                            </Button>
                            <Button variant="outline" className="justify-start bg-transparent">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                            <Button variant="outline" className="justify-start bg-transparent">
                              <BookOpen className="w-4 h-4 mr-2" />
                              View Courses
                            </Button>
                            <Button variant="outline" className="justify-start bg-transparent">
                              {user.status === "active" ? (
                                <Lock className="w-4 h-4 mr-2" />
                              ) : (
                                <Unlock className="w-4 h-4 mr-2" />
                              )}
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="justify-start text-red-600 bg-transparent">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete User
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {user.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Department Management</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Department
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => (
              <Card key={department.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <CardDescription>Head: {department.head}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{department.totalUsers}</div>
                      <div className="text-muted-foreground">Total Users</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{department.courses}</div>
                      <div className="text-muted-foreground">Courses</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span>
                        {department.activeUsers}/{department.totalUsers}
                      </span>
                    </div>
                    <Progress value={(department.activeUsers / department.totalUsers) * 100} className="h-2" />
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Budget: </span>
                    <span className="font-medium">${department.budget.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      <Users className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Permission Management</h3>
            <Button>Create Permission Group</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Role-Based Permissions</CardTitle>
                <CardDescription>Default permissions for each role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: "Admin", permissions: ["Full System Access", "User Management", "Analytics"] },
                  { role: "Teacher", permissions: ["Course Management", "Grade Students", "View Analytics"] },
                  { role: "Student", permissions: ["View Courses", "Submit Assignments", "Access Forums"] },
                  { role: "Staff", permissions: ["Limited Admin Access", "Support Functions"] },
                ].map((roleGroup) => (
                  <div key={roleGroup.role} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getRoleColor(roleGroup.role.toLowerCase())}>{roleGroup.role}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {roleGroup.permissions.map((permission) => (
                        <div key={permission} className="text-sm text-muted-foreground">
                          • {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custom Permission Groups</CardTitle>
                <CardDescription>Special permission groups for specific use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Course Coordinators",
                    users: 8,
                    permissions: ["Advanced Course Management", "Multi-Course Analytics"],
                  },
                  { name: "Research Assistants", users: 12, permissions: ["Research Data Access", "Limited Grading"] },
                  {
                    name: "Guest Lecturers",
                    users: 5,
                    permissions: ["Temporary Course Access", "Basic Content Management"],
                  },
                ].map((group) => (
                  <div key={group.name} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{group.name}</h4>
                      <span className="text-sm text-muted-foreground">{group.users} users</span>
                    </div>
                    <div className="space-y-1">
                      {group.permissions.map((permission) => (
                        <div key={permission} className="text-sm text-muted-foreground">
                          • {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,070</div>
                <p className="text-xs text-muted-foreground">+15 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,924</div>
                <p className="text-xs text-muted-foreground">95.2% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">New Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Requires action</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">User Distribution by Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Students</span>
                    <span className="text-sm font-medium">2,847 (92.7%)</span>
                  </div>
                  <Progress value={92.7} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Teachers</span>
                    <span className="text-sm font-medium">89 (2.9%)</span>
                  </div>
                  <Progress value={2.9} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Administrators</span>
                    <span className="text-sm font-medium">45 (1.5%)</span>
                  </div>
                  <Progress value={1.5} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Staff</span>
                    <span className="text-sm font-medium">89 (2.9%)</span>
                  </div>
                  <Progress value={2.9} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">User Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="text-sm font-medium">1,856</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Active Users</span>
                    <span className="text-sm font-medium">2,654</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Active Users</span>
                    <span className="text-sm font-medium">2,924</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Session Time</span>
                    <span className="text-sm font-medium">45 minutes</span>
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
