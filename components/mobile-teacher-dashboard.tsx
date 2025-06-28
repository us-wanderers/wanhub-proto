'use client';

import { PWAInstallPrompt } from './pwa-install-prompt';
import { PWAUpdatePrompt } from './pwa-update-prompt';
import { PWAStatusIndicator } from './pwa-status-indicator';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  FileText,
  Plus,
  Bell,
  Search,
  Clock,
  Home,
  User,
  BarChart3,
  Eye,
  Edit,
  Upload,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { offlineManager } from '@/lib/offline-manager';
import { OfflineIndicator } from './offline-indicator';
import { OfflineBanner } from './offline-banner';

export function MobileTeacherDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const { isOnline } = useOffline();

  // Get cached data
  const [teacherData, setTeacherData] = useState({
    profile: { name: 'Dr. Sarah Smith' },
    courses: [],
    students: [],
    assignments: [],
    analytics: { activeCourses: 0, totalStudents: 0, pendingReviews: 0, avgPerformance: 0 },
  });

  useEffect(() => {
    offlineManager.get('teacher_data').then(({ data }: any) => {
      if (data) {
        setTeacherData(data);
      }
    });
  }, []);

  return (
    <div className='min-h-screen bg-background pb-20'>
      {/* Mobile Header with Offline Indicator */}
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-bold'>{teacherData.profile.name.split(' ')[1]}</h2>
            <p className='text-sm text-muted-foreground'>Teacher Dashboard</p>
          </div>
          {/* In the header section, add PWAStatusIndicator next to OfflineIndicator: */}
          <div className='flex items-center gap-2'>
            <OfflineIndicator />
            <PWAStatusIndicator />
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <Search className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <Bell className='w-4 h-4' />
            </Button>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/placeholder.svg?height=32&width=32' />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Content */}
      {/* In the content section, add PWA prompts after OfflineBanner: */}
      <div className='px-4 py-4 space-y-4'>
        <OfflineBanner />
        <PWAInstallPrompt />
        <PWAUpdatePrompt />

        {activeTab === 'home' && (
          <>
            {/* Quick Stats - Use cached analytics */}
            <div className='grid grid-cols-2 gap-3'>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-blue-600' />
                  <div>
                    <p className='text-lg font-bold'>{teacherData.analytics.activeCourses}</p>
                    <p className='text-xs text-muted-foreground'>Active Courses</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-green-600' />
                  <div>
                    <p className='text-lg font-bold'>{teacherData.analytics.totalStudents}</p>
                    <p className='text-xs text-muted-foreground'>Students</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <FileText className='h-4 w-4 text-orange-600' />
                  <div>
                    <p className='text-lg font-bold'>{teacherData.analytics.pendingReviews}</p>
                    <p className='text-xs text-muted-foreground'>To Review</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='h-4 w-4 text-purple-600' />
                  <div>
                    <p className='text-lg font-bold'>{teacherData.analytics.avgPerformance}%</p>
                    <p className='text-xs text-muted-foreground'>Avg Score</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-2 gap-3'>
                <Button className='h-auto py-3 flex flex-col gap-1'>
                  <Plus className='w-4 h-4' />
                  <span className='text-xs'>Create Course</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <FileText className='w-4 h-4' />
                  <span className='text-xs'>Grade Assignments</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='text-xs'>Messages</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <BarChart3 className='w-4 h-4' />
                  <span className='text-xs'>Analytics</span>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-start gap-3 p-3 border rounded-lg'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <FileText className='w-4 h-4 text-green-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium'>New assignment submitted</p>
                    <p className='text-xs text-muted-foreground'>React Project - Sarah Johnson</p>
                    <p className='text-xs text-muted-foreground'>5 minutes ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-3 border rounded-lg'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <MessageSquare className='w-4 h-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium'>Student question posted</p>
                    <p className='text-xs text-muted-foreground'>Data Structures Forum</p>
                    <p className='text-xs text-muted-foreground'>1 hour ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Reviews */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>React Component Project</p>
                    <p className='text-xs text-muted-foreground'>42/45 submitted</p>
                  </div>
                  <Button size='sm' className='text-xs'>
                    Review
                  </Button>
                </div>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>Binary Tree Implementation</p>
                    <p className='text-xs text-muted-foreground'>35/38 submitted</p>
                  </div>
                  <Button size='sm' className='text-xs'>
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'courses' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>My Courses</h3>
              <Button size='sm'>
                <Plus className='w-4 h-4 mr-1' />
                Add
              </Button>
            </div>

            <div className='space-y-3'>
              {[
                {
                  name: 'Advanced React Development',
                  students: 45,
                  progress: 80,
                  color: 'blue',
                  status: 'published',
                  avgGrade: 87,
                  lessons: '18/24',
                },
                {
                  name: 'Data Structures Fundamentals',
                  students: 38,
                  progress: 65,
                  color: 'green',
                  status: 'published',
                  avgGrade: 82,
                  lessons: '12/16',
                },
                {
                  name: 'Web Design Principles',
                  students: 0,
                  progress: 40,
                  color: 'purple',
                  status: 'draft',
                  avgGrade: 0,
                  lessons: '8/20',
                },
              ].map((course, index) => (
                <Card key={index}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className={`w-10 h-10 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                        <BookOpen className={`w-5 h-5 text-${course.color}-600`} />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium text-sm'>{course.name}</h4>
                          <Badge variant={course.status === 'published' ? 'default' : 'secondary'} className='text-xs'>
                            {course.status}
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          {course.students} students • {course.lessons} lessons
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3 mb-3 text-xs'>
                      <div className='text-center p-2 bg-gray-50 rounded'>
                        <div className='font-medium'>{course.progress}%</div>
                        <div className='text-muted-foreground'>Course Progress</div>
                      </div>
                      <div className='text-center p-2 bg-gray-50 rounded'>
                        <div className='font-medium'>{course.avgGrade > 0 ? `${course.avgGrade}%` : 'N/A'}</div>
                        <div className='text-muted-foreground'>Avg Grade</div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 mb-3'>
                      <Progress value={course.progress} className='flex-1 h-2' />
                      <span className='text-xs text-muted-foreground'>{course.progress}%</span>
                    </div>

                    <div className='flex gap-2'>
                      <Button className='flex-1 bg-transparent' size='sm' variant='outline'>
                        <Eye className='w-4 h-4 mr-1' />
                        Manage
                      </Button>
                      <Button size='sm' variant='outline'>
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button size='sm' variant='outline'>
                        <BarChart3 className='w-4 h-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-2 gap-3'>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <Plus className='w-4 h-4' />
                  <span className='text-xs'>Add Lesson</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <FileText className='w-4 h-4' />
                  <span className='text-xs'>Create Quiz</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <Upload className='w-4 h-4' />
                  <span className='text-xs'>Upload Content</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='text-xs'>Message Students</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'students' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Students</h3>
            <div className='space-y-3'>
              {[
                { name: 'Sarah Johnson', course: 'Advanced React', progress: 85, grade: 'A' },
                { name: 'Mike Kim', course: 'Data Structures', progress: 72, grade: 'B+' },
                { name: 'Emily Chen', course: 'Web Design', progress: 94, grade: 'A+' },
                { name: 'David Wilson', course: 'Advanced React', progress: 68, grade: 'B' },
              ].map((student, index) => (
                <Card key={index}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Avatar className='w-10 h-10'>
                        <AvatarFallback className='text-xs'>
                          {student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <p className='font-medium text-sm'>{student.name}</p>
                        <p className='text-xs text-muted-foreground'>{student.course}</p>
                      </div>
                      <Badge variant='outline' className='text-xs'>
                        {student.grade}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Progress value={student.progress} className='flex-1 h-2' />
                      <span className='text-xs text-muted-foreground'>{student.progress}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className='space-y-4'>
            <div className='text-center py-6'>
              <Avatar className='w-20 h-20 mx-auto mb-4'>
                <AvatarImage src='/placeholder.svg?height=80&width=80' />
                <AvatarFallback className='text-lg'>DS</AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold'>Dr. Sarah Smith</h3>
              <p className='text-sm text-muted-foreground'>Computer Science Professor</p>
            </div>

            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Email</span>
                  <span className='text-sm text-muted-foreground'>dr.smith@university.edu</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Department</span>
                  <span className='text-sm text-muted-foreground'>Computer Science</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Employee ID</span>
                  <span className='text-sm text-muted-foreground'>FAC2024001</span>
                </div>
              </CardContent>
            </Card>

            <Button className='w-full'>Edit Profile</Button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className='fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-2'>
        <div className='flex justify-around'>
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('home')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <Home className='w-4 h-4' />
            <span className='text-xs'>Home</span>
          </Button>
          <Button
            variant={activeTab === 'courses' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('courses')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <BookOpen className='w-4 h-4' />
            <span className='text-xs'>Courses</span>
          </Button>
          <Button
            variant={activeTab === 'students' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('students')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <Users className='w-4 h-4' />
            <span className='text-xs'>Students</span>
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('profile')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <User className='w-4 h-4' />
            <span className='text-xs'>Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
