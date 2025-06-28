import { indexedDBManager } from './indexdb-manager';

interface CacheItem<T> {
  key: string;
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface OfflineData {
  student: StudentData;
  teacher: TeacherData;
  organization: OrganizationData;
}

interface StudentData {
  profile: any;
  courses: any[];
  assignments: any[];
  progress: any;
  activities: any[];
}

interface TeacherData {
  profile: any;
  courses: any[];
  students: any[];
  assignments: any[];
  analytics: any;
}

interface OrganizationData {
  profile: any;
  users: any[];
  courses: any[];
  departments: any[];
  analytics: any;
}

interface SyncQueueItem {
  id?: number;
  action: 'create' | 'update' | 'delete';
  resource: string;
  data: any;
  timestamp: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  retryCount: number;
}

class OfflineManager {
  private static instance: OfflineManager;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_RETRY_COUNT = 3;
  private isInitialized = false;

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await indexedDBManager.init();
      this.isInitialized = true;
      await this.cleanExpiredCache();
      console.log('OfflineManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize OfflineManager:', error);
      throw error;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }
  }

  async set<T>(key: string, data: T, customTTL?: number): Promise<void> {
    await this.ensureInitialized();

    const ttl = customTTL || this.CACHE_DURATION;
    const item: CacheItem<T> = {
      key,
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    };

    try {
      await indexedDBManager.set('cache', key, item);
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    await this.ensureInitialized();

    try {
      const result = await indexedDBManager.get<CacheItem<T>>('cache', key);
      if (!result) return null;

      if (Date.now() > result.expiresAt) {
        await indexedDBManager.delete('cache', key);
        return null;
      }

      return result.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  async has(key: string): Promise<boolean> {
    await this.ensureInitialized();

    try {
      const result = await indexedDBManager.get<CacheItem<any>>('cache', key);
      if (!result) return false;

      if (Date.now() > result.expiresAt) {
        await indexedDBManager.delete('cache', key);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('Failed to check cache:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    await this.ensureInitialized();

    try {
      await indexedDBManager.clear('cache');
      await indexedDBManager.clear('userData');
      await indexedDBManager.clear('courseData');
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  async getSize(): Promise<number> {
    await this.ensureInitialized();

    try {
      const cacheCount = await indexedDBManager.count('cache');
      const userDataCount = await indexedDBManager.count('userData');
      const courseDataCount = await indexedDBManager.count('courseData');
      return cacheCount + userDataCount + courseDataCount;
    } catch (error) {
      console.warn('Failed to get cache size:', error);
      return 0;
    }
  }

  async getCacheInfo(): Promise<{ size: number; keys: string[] }> {
    await this.ensureInitialized();

    try {
      const size = await this.getSize();
      const keys = await indexedDBManager.getAllKeys('cache');
      return { size, keys };
    } catch (error) {
      console.warn('Failed to get cache info:', error);
      return { size: 0, keys: [] };
    }
  }

  private async cleanExpiredCache(): Promise<void> {
    try {
      const allItems = await indexedDBManager.getAll<CacheItem<any>>('cache');
      const now = Date.now();

      for (const item of allItems) {
        if (now > item.expiresAt) {
          await indexedDBManager.delete('cache', item.key);
        }
      }
    } catch (error) {
      console.warn('Failed to clean expired cache:', error);
    }
  }

  // Sync queue management
  async addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'status' | 'retryCount'>): Promise<void> {
    await this.ensureInitialized();

    const syncItem: SyncQueueItem = {
      ...item,
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0,
    };

    try {
      await indexedDBManager.set('syncQueue', `sync_${Date.now()}_${Math.random()}`, syncItem);
    } catch (error) {
      console.warn('Failed to add item to sync queue:', error);
    }
  }

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    await this.ensureInitialized();

    try {
      return await indexedDBManager.getAll<SyncQueueItem>('syncQueue');
    } catch (error) {
      console.warn('Failed to get sync queue:', error);
      return [];
    }
  }

  async updateSyncQueueItem(id: string, updates: Partial<SyncQueueItem>): Promise<void> {
    await this.ensureInitialized();

    try {
      const existing = await indexedDBManager.get<SyncQueueItem>('syncQueue', id);
      if (existing) {
        const updated = { ...existing, ...updates };
        await indexedDBManager.set('syncQueue', id, updated);
      }
    } catch (error) {
      console.warn('Failed to update sync queue item:', error);
    }
  }

  async removeSyncQueueItem(id: string): Promise<void> {
    await this.ensureInitialized();

    try {
      await indexedDBManager.delete('syncQueue', id);
    } catch (error) {
      console.warn('Failed to remove sync queue item:', error);
    }
  }

  // Preload essential data for offline use
  async preloadEssentialData(userType: 'student' | 'teacher' | 'organization'): Promise<void> {
    await this.ensureInitialized();

    try {
      switch (userType) {
        case 'student':
          await this.preloadStudentData();
          break;
        case 'teacher':
          await this.preloadTeacherData();
          break;
        case 'organization':
          await this.preloadOrganizationData();
          break;
      }
    } catch (error) {
      console.warn('Failed to preload data:', error);
    }
  }

  private async preloadStudentData(): Promise<void> {
    const studentData: StudentData = {
      profile: {
        name: 'Alex Smith',
        email: 'alex@example.com',
        studentId: 'CS2024001',
        enrollmentDate: 'Jan 2024',
      },
      courses: [
        { id: 1, name: 'React Development Fundamentals', progress: 75, color: 'blue' },
        { id: 2, name: 'Data Structures & Algorithms', progress: 45, color: 'green' },
        { id: 3, name: 'UI/UX Design Principles', progress: 60, color: 'purple' },
      ],
      assignments: [
        { id: 1, title: 'React Project', course: 'React Development', due: '2 days', priority: 'high' },
        { id: 2, title: 'Algorithm Quiz', course: 'Data Structures', due: '5 days', priority: 'medium' },
      ],
      progress: {
        coursesEnrolled: 6,
        completed: 3,
        studyHours: 24,
        achievements: 12,
      },
      activities: [
        { id: 1, type: 'message', content: 'New message from Prof. Johnson', time: '2 hours ago' },
        { id: 2, type: 'grade', content: 'Assignment graded: React Basics', time: '1 day ago' },
      ],
    };

    await this.set('student_data', studentData);
    await indexedDBManager.set('userData', 'student_data', {
      key: 'student_data',
      userType: 'student',
      data: studentData,
      timestamp: Date.now(),
    });
  }

  private async preloadTeacherData(): Promise<void> {
    const teacherData: TeacherData = {
      profile: {
        name: 'Dr. Sarah Smith',
        email: 'dr.smith@university.edu',
        department: 'Computer Science',
        employeeId: 'FAC2024001',
      },
      courses: [
        { id: 1, name: 'Advanced React Development', students: 45, progress: 80, color: 'blue' },
        { id: 2, name: 'Data Structures Fundamentals', students: 38, progress: 65, color: 'green' },
        { id: 3, name: 'Web Design Principles', students: 52, progress: 90, color: 'purple' },
      ],
      students: [
        { id: 1, name: 'Sarah Johnson', course: 'Advanced React', progress: 85, grade: 'A' },
        { id: 2, name: 'Mike Kim', course: 'Data Structures', progress: 72, grade: 'B+' },
        { id: 3, name: 'Emily Chen', course: 'Web Design', progress: 94, grade: 'A+' },
      ],
      assignments: [
        { id: 1, title: 'React Component Project', course: 'Advanced React', submitted: 42, total: 45 },
        { id: 2, title: 'Binary Tree Implementation', course: 'Data Structures', submitted: 35, total: 38 },
      ],
      analytics: {
        activeCourses: 4,
        totalStudents: 156,
        pendingReviews: 23,
        avgPerformance: 87,
      },
    };

    await this.set('teacher_data', teacherData);
    await indexedDBManager.set('userData', 'teacher_data', {
      key: 'teacher_data',
      userType: 'teacher',
      data: teacherData,
      timestamp: Date.now(),
    });
  }

  private async preloadOrganizationData(): Promise<void> {
    const organizationData: OrganizationData = {
      profile: {
        name: 'TechEdu University',
        type: 'University',
        established: '1995',
        location: 'San Francisco, CA',
      },
      users: [
        { id: 1, name: 'Dr. Sarah Johnson', role: 'Teacher', department: 'Computer Science' },
        { id: 2, name: 'Mike Kim', role: 'Student', department: 'Computer Science' },
        { id: 3, name: 'Emily Chen', role: 'Admin', department: 'System Admin' },
      ],
      courses: [
        { id: 1, name: 'Advanced React Development', department: 'Computer Science', students: 234 },
        { id: 2, name: 'Business Strategy', department: 'Business', students: 189 },
        { id: 3, name: 'Mechanical Engineering Basics', department: 'Engineering', students: 156 },
      ],
      departments: [
        { id: 1, name: 'Computer Science', courses: 45, students: 1234, completion: 87 },
        { id: 2, name: 'Business Administration', courses: 32, students: 856, completion: 82 },
        { id: 3, name: 'Engineering', courses: 38, students: 967, completion: 79 },
      ],
      analytics: {
        totalStudents: 2847,
        activeTeachers: 89,
        totalCourses: 156,
        revenue: 284000,
        completionRate: 84,
      },
    };

    await this.set('organization_data', organizationData);
    await indexedDBManager.set('userData', 'organization_data', {
      key: 'organization_data',
      userType: 'organization',
      data: organizationData,
      timestamp: Date.now(),
    });
  }

  // Background sync functionality
  async processSync(): Promise<void> {
    await this.ensureInitialized();

    const syncQueue = await this.getSyncQueue();
    const pendingItems = syncQueue.filter((item) => item.status === 'pending' || item.status === 'failed');

    for (const item of pendingItems) {
      if (item.retryCount >= this.MAX_RETRY_COUNT) {
        continue; // Skip items that have exceeded retry limit
      }

      try {
        await this.updateSyncQueueItem(item.id!.toString(), { status: 'syncing' });

        // Simulate API call
        await this.syncItemToServer(item);

        await this.removeSyncQueueItem(item.id!.toString());
      } catch (error) {
        console.warn('Sync failed for item:', item, error);
        await this.updateSyncQueueItem(item.id!.toString(), {
          status: 'failed',
          retryCount: item.retryCount + 1,
        });
      }
    }
  }

  private async syncItemToServer(item: SyncQueueItem): Promise<void> {
    // This would be replaced with actual API calls
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Synced item to server:', item);
        resolve();
      }, 1000);
    });
  }
}

export const offlineManager = OfflineManager.getInstance();
