'use client';

import { PWAInstallPrompt } from './pwa-install-prompt';
import { PWAUpdatePrompt } from './pwa-update-prompt';
import { PWAStatusIndicator } from './pwa-status-indicator';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  PlayCircle,
  Bell,
  Search,
  Home,
  User,
  BarChart3,
  Zap,
  Target,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { offlineManager } from '@/lib/offline-manager';
import { OfflineIndicator } from './offline-indicator';
import { OfflineBanner } from './offline-banner';

export function MobileStudentDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const { isOnline } = useOffline();

  // Get cached data or use fallback
  const [studentData, setStudentData] = useState({
    profile: { name: 'Alex Smith', email: 'alex@example.com' },
    courses: [],
    assignments: [],
    progress: { coursesEnrolled: 0, completed: 0, studyHours: 0, achievements: 0 },
    activities: [],
  });

  useEffect(() => {
    offlineManager.get('student_data').then(({ data }: any) => {
      if (data) {
        setStudentData(data);
      }
    });
  }, []);

  return (
    <div className='min-h-screen bg-background pb-20'>
      {/* Mobile Header with Offline Indicator */}
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-bold'>Hi, {studentData.profile.name.split(' ')[0]}!</h2>
            <p className='text-sm text-muted-foreground'>Keep learning</p>
          </div>
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
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='px-4 py-4 space-y-4'>
        <OfflineBanner />
        <PWAInstallPrompt />
        <PWAUpdatePrompt />

        {activeTab === 'home' && (
          <>
            {/* Quick Stats - Use cached data */}
            <div className='grid grid-cols-2 gap-3'>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-blue-600' />
                  <div>
                    <p className='text-lg font-bold'>{studentData.progress.coursesEnrolled}</p>
                    <p className='text-xs text-muted-foreground'>Courses</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <Trophy className='h-4 w-4 text-yellow-600' />
                  <div>
                    <p className='text-lg font-bold'>{studentData.progress.completed}</p>
                    <p className='text-xs text-muted-foreground'>Completed</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-green-600' />
                  <div>
                    <p className='text-lg font-bold'>{studentData.progress.studyHours}h</p>
                    <p className='text-xs text-muted-foreground'>This week</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='h-4 w-4 text-purple-600' />
                  <div>
                    <p className='text-lg font-bold'>{studentData.progress.achievements}</p>
                    <p className='text-xs text-muted-foreground'>Badges</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Continue Learning - Use cached courses */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {studentData.courses.map((course, index) => (
                  <div key={course.id || index} className='flex items-center space-x-3 p-3 border rounded-lg'>
                    <div
                      className={`w-10 h-10 bg-${course.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <PlayCircle className={`w-5 h-5 text-${course.color}-600`} />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-sm truncate'>{course.name}</h4>
                      <p className='text-xs text-muted-foreground truncate'>
                        Chapter {Math.floor(course.progress / 10)}
                      </p>
                      <Progress value={course.progress} className='mt-1 h-1' />
                    </div>
                    <Button size='sm' className='text-xs px-3' disabled={!isOnline}>
                      Continue
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines - Use cached assignments */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {studentData.assignments.map((assignment, index) => (
                  <div key={assignment.id || index} className='flex items-center justify-between p-3 border rounded-lg'>
                    <div className='flex-1'>
                      <p className='font-medium text-sm'>{assignment.title}</p>
                      <p className='text-xs text-muted-foreground'>Due in {assignment.due}</p>
                    </div>
                    <Badge variant={assignment.priority === 'high' ? 'destructive' : 'secondary'} className='text-xs'>
                      {assignment.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'courses' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>My Courses</h3>
            <div className='space-y-3'>
              {[
                { name: 'React Development Fundamentals', progress: 75, color: 'blue' },
                { name: 'Data Structures & Algorithms', progress: 45, color: 'green' },
                { name: 'UI/UX Design Principles', progress: 60, color: 'purple' },
              ].map((course, index) => (
                <Card key={index}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className={`w-12 h-12 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                        <BookOpen className={`w-6 h-6 text-${course.color}-600`} />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm'>{course.name}</h4>
                        <div className='flex items-center gap-2 mt-2'>
                          <Progress value={course.progress} className='flex-1 h-2' />
                          <span className='text-xs text-muted-foreground'>{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Button className='w-full mt-3' size='sm'>
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Learning Progress</h3>

            {/* Learning Goals */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Target className='w-4 h-4' />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='p-3 border rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium text-sm'>Complete React Fundamentals</h4>
                    <Badge variant='outline'>75%</Badge>
                  </div>
                  <Progress value={75} className='h-2 mb-2' />
                  <p className='text-xs text-muted-foreground'>Due: Feb 15, 2024</p>
                </div>
                <div className='p-3 border rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium text-sm'>Master JavaScript ES6+</h4>
                    <Badge variant='outline'>90%</Badge>
                  </div>
                  <Progress value={90} className='h-2 mb-2' />
                  <p className='text-xs text-muted-foreground'>Due: Jan 30, 2024</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Trophy className='w-4 h-4' />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center gap-3 p-3 border rounded-lg'>
                  <div className='text-2xl'>🏆</div>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>Perfect Score</p>
                    <p className='text-xs text-muted-foreground'>Achieved 100% on React Quiz</p>
                  </div>
                  <Badge className='bg-yellow-100 text-yellow-800'>Epic</Badge>
                </div>
                <div className='flex items-center gap-3 p-3 border rounded-lg'>
                  <div className='text-2xl'>⚡</div>
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>Speed Learner</p>
                    <p className='text-xs text-muted-foreground'>Completed 5 lessons in one day</p>
                  </div>
                  <Badge className='bg-blue-100 text-blue-800'>Rare</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Zap className='w-4 h-4' />
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-center py-4'>
                  <div className='text-3xl font-bold text-orange-600'>6</div>
                  <p className='text-sm text-muted-foreground'>Days in a row</p>
                  <p className='text-xs text-muted-foreground mt-2'>Keep it up! You're doing great!</p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>This Week's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Study Time</span>
                    <span className='text-sm font-medium'>8.5 hours</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Lessons Completed</span>
                    <span className='text-sm font-medium'>12</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Quizzes Passed</span>
                    <span className='text-sm font-medium'>5</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Average Score</span>
                    <span className='text-sm font-medium'>91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className='space-y-4'>
            <div className='text-center py-6'>
              <Avatar className='w-20 h-20 mx-auto mb-4'>
                <AvatarImage src='/placeholder.svg?height=80&width=80' />
                <AvatarFallback className='text-lg'>AS</AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold'>Alex Smith</h3>
              <p className='text-sm text-muted-foreground'>Computer Science Student</p>
            </div>

            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Email</span>
                  <span className='text-sm text-muted-foreground'>alex@example.com</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Student ID</span>
                  <span className='text-sm text-muted-foreground'>CS2024001</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Enrollment Date</span>
                  <span className='text-sm text-muted-foreground'>Jan 2024</span>
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
            variant={activeTab === 'progress' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('progress')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <BarChart3 className='w-4 h-4' />
            <span className='text-xs'>Progress</span>
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
