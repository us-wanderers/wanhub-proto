interface CacheItem<T> {
  data: T
  timestamp: number
  expiresAt: number
}

interface OfflineData {
  student: StudentData
  teacher: TeacherData
  organization: OrganizationData
}

interface StudentData {
  profile: any
  courses: any[]
  assignments: any[]
  progress: any
  activities: any[]
}

interface TeacherData {
  profile: any
  courses: any[]
  students: any[]
  assignments: any[]
  analytics: any
}

interface OrganizationData {
  profile: any
  users: any[]
  courses: any[]
  departments: any[]
  analytics: any
}

class OfflineManager {
  private static instance: OfflineManager
  private cache: Map<string, CacheItem<any>> = new Map()
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
  private readonly STORAGE_KEY = "wanhub_offline_cache"

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager()
    }
    return OfflineManager.instance
  }

  constructor() {
    this.loadFromStorage()
    this.setupStorageListener()
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        this.cache = new Map(Object.entries(data))
      }
    } catch (error) {
      console.warn("Failed to load offline cache:", error)
    }
  }

  private saveToStorage(): void {
    try {
      const data = Object.fromEntries(this.cache)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.warn("Failed to save offline cache:", error)
    }
  }

  private setupStorageListener(): void {
    // Save to storage whenever cache is updated
    setInterval(() => {
      this.saveToStorage()
    }, 5000) // Save every 5 seconds
  }

  set<T>(key: string, data: T, customTTL?: number): void {
    const ttl = customTTL || this.CACHE_DURATION
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    }
    this.cache.set(key, item)
    this.saveToStorage()
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      this.saveToStorage()
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      this.saveToStorage()
      return false
    }

    return true
  }

  clear(): void {
    this.cache.clear()
    localStorage.removeItem(this.STORAGE_KEY)
  }

  getSize(): number {
    return this.cache.size
  }

  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }

  // Preload essential data for offline use
  async preloadEssentialData(userType: "student" | "teacher" | "organization"): Promise<void> {
    try {
      switch (userType) {
        case "student":
          await this.preloadStudentData()
          break
        case "teacher":
          await this.preloadTeacherData()
          break
        case "organization":
          await this.preloadOrganizationData()
          break
      }
    } catch (error) {
      console.warn("Failed to preload data:", error)
    }
  }

  private async preloadStudentData(): Promise<void> {
    const studentData: StudentData = {
      profile: {
        name: "Alex Smith",
        email: "alex@example.com",
        studentId: "CS2024001",
        enrollmentDate: "Jan 2024",
      },
      courses: [
        { id: 1, name: "React Development Fundamentals", progress: 75, color: "blue" },
        { id: 2, name: "Data Structures & Algorithms", progress: 45, color: "green" },
        { id: 3, name: "UI/UX Design Principles", progress: 60, color: "purple" },
      ],
      assignments: [
        { id: 1, title: "React Project", course: "React Development", due: "2 days", priority: "high" },
        { id: 2, title: "Algorithm Quiz", course: "Data Structures", due: "5 days", priority: "medium" },
      ],
      progress: {
        coursesEnrolled: 6,
        completed: 3,
        studyHours: 24,
        achievements: 12,
      },
      activities: [
        { id: 1, type: "message", content: "New message from Prof. Johnson", time: "2 hours ago" },
        { id: 2, type: "grade", content: "Assignment graded: React Basics", time: "1 day ago" },
      ],
    }

    this.set("student_data", studentData)
  }

  private async preloadTeacherData(): Promise<void> {
    const teacherData: TeacherData = {
      profile: {
        name: "Dr. Sarah Smith",
        email: "dr.smith@university.edu",
        department: "Computer Science",
        employeeId: "FAC2024001",
      },
      courses: [
        { id: 1, name: "Advanced React Development", students: 45, progress: 80, color: "blue" },
        { id: 2, name: "Data Structures Fundamentals", students: 38, progress: 65, color: "green" },
        { id: 3, name: "Web Design Principles", students: 52, progress: 90, color: "purple" },
      ],
      students: [
        { id: 1, name: "Sarah Johnson", course: "Advanced React", progress: 85, grade: "A" },
        { id: 2, name: "Mike Kim", course: "Data Structures", progress: 72, grade: "B+" },
        { id: 3, name: "Emily Chen", course: "Web Design", progress: 94, grade: "A+" },
      ],
      assignments: [
        { id: 1, title: "React Component Project", course: "Advanced React", submitted: 42, total: 45 },
        { id: 2, title: "Binary Tree Implementation", course: "Data Structures", submitted: 35, total: 38 },
      ],
      analytics: {
        activeCourses: 4,
        totalStudents: 156,
        pendingReviews: 23,
        avgPerformance: 87,
      },
    }

    this.set("teacher_data", teacherData)
  }

  private async preloadOrganizationData(): Promise<void> {
    const organizationData: OrganizationData = {
      profile: {
        name: "TechEdu University",
        type: "University",
        established: "1995",
        location: "San Francisco, CA",
      },
      users: [
        { id: 1, name: "Dr. Sarah Johnson", role: "Teacher", department: "Computer Science" },
        { id: 2, name: "Mike Kim", role: "Student", department: "Computer Science" },
        { id: 3, name: "Emily Chen", role: "Admin", department: "System Admin" },
      ],
      courses: [
        { id: 1, name: "Advanced React Development", department: "Computer Science", students: 234 },
        { id: 2, name: "Business Strategy", department: "Business", students: 189 },
        { id: 3, name: "Mechanical Engineering Basics", department: "Engineering", students: 156 },
      ],
      departments: [
        { id: 1, name: "Computer Science", courses: 45, students: 1234, completion: 87 },
        { id: 2, name: "Business Administration", courses: 32, students: 856, completion: 82 },
        { id: 3, name: "Engineering", courses: 38, students: 967, completion: 79 },
      ],
      analytics: {
        totalStudents: 2847,
        activeTeachers: 89,
        totalCourses: 156,
        revenue: 284000,
        completionRate: 84,
      },
    }

    this.set("organization_data", organizationData)
  }
}

export const offlineManager = OfflineManager.getInstance()
