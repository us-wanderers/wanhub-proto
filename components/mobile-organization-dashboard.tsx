'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  BookOpen,
  DollarSign,
  Building2,
  GraduationCap,
  UserPlus,
  Settings,
  BarChart3,
  Bell,
  Search,
  Plus,
  Home,
} from 'lucide-react';
import { useState } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { offlineManager } from '@/lib/offline-manager';
import { OfflineIndicator } from './offline-indicator';
import { OfflineBanner } from './offline-banner';
import { PWAInstallPrompt } from './pwa-install-prompt';
import { PWAUpdatePrompt } from './pwa-update-prompt';
import { PWAStatusIndicator } from './pwa-status-indicator';

export function MobileOrganizationDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const { isOnline } = useOffline();

  // Get cached data
  const orgData = offlineManager.get('organization_data') || {
    profile: { name: 'TechEdu University' },
    users: [],
    courses: [],
    departments: [],
    analytics: { totalStudents: 0, activeTeachers: 0, totalCourses: 0, revenue: 0 },
  };

  return (
    <div className='min-h-screen bg-background pb-20'>
      {/* Mobile Header with Offline Indicator */}
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-bold'>TechEdu</h2>
            <p className='text-sm text-muted-foreground'>Organization</p>
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
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <Settings className='w-4 h-4' />
            </Button>
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
            {/* Key Metrics - Use cached analytics */}
            <div className='grid grid-cols-2 gap-3'>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='h-4 w-4 text-blue-600' />
                  <div>
                    <p className='text-lg font-bold'>{orgData.analytics.totalStudents.toLocaleString()}</p>
                    <p className='text-xs text-muted-foreground'>Students</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-green-600' />
                  <div>
                    <p className='text-lg font-bold'>{orgData.analytics.activeTeachers}</p>
                    <p className='text-xs text-muted-foreground'>Teachers</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-purple-600' />
                  <div>
                    <p className='text-lg font-bold'>{orgData.analytics.totalCourses}</p>
                    <p className='text-xs text-muted-foreground'>Courses</p>
                  </div>
                </div>
              </Card>
              <Card className='p-3'>
                <div className='flex items-center gap-2'>
                  <DollarSign className='h-4 w-4 text-yellow-600' />
                  <div>
                    <p className='text-lg font-bold'>${(orgData.analytics.revenue / 1000).toFixed(0)}K</p>
                    <p className='text-xs text-muted-foreground'>Revenue</p>
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
                  <UserPlus className='w-4 h-4' />
                  <span className='text-xs'>Add User</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <BookOpen className='w-4 h-4' />
                  <span className='text-xs'>Manage Courses</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <BarChart3 className='w-4 h-4' />
                  <span className='text-xs'>View Analytics</span>
                </Button>
                <Button variant='outline' className='h-auto py-3 flex flex-col gap-1 bg-transparent'>
                  <Settings className='w-4 h-4' />
                  <span className='text-xs'>Settings</span>
                </Button>
              </CardContent>
            </Card>

            {/* Department Overview */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Department Performance</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <BookOpen className='w-4 h-4 text-blue-600' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Computer Science</p>
                      <p className='text-xs text-muted-foreground'>1,234 students</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs font-medium'>87%</p>
                    <Progress value={87} className='w-16 h-1 mt-1' />
                  </div>
                </div>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                      <BarChart3 className='w-4 h-4 text-green-600' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Business Admin</p>
                      <p className='text-xs text-muted-foreground'>856 students</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs font-medium'>82%</p>
                    <Progress value={82} className='w-16 h-1 mt-1' />
                  </div>
                </div>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                      <Building2 className='w-4 h-4 text-purple-600' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Engineering</p>
                      <p className='text-xs text-muted-foreground'>967 students</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs font-medium'>79%</p>
                    <Progress value={79} className='w-16 h-1 mt-1' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-start gap-3 p-3 border rounded-lg'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <UserPlus className='w-4 h-4 text-green-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium'>New teacher registered</p>
                    <p className='text-xs text-muted-foreground'>Dr. Sarah Wilson joined CS dept.</p>
                    <p className='text-xs text-muted-foreground'>2h ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-3 border rounded-lg'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <BookOpen className='w-4 h-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium'>New course published</p>
                    <p className='text-xs text-muted-foreground'>Advanced ML by Prof. Johnson</p>
                    <p className='text-xs text-muted-foreground'>4h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'users' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>User Management</h3>
              <Button size='sm'>
                <Plus className='w-4 h-4 mr-1' />
                Add
              </Button>
            </div>
            <div className='space-y-3'>
              {[
                { name: 'Dr. Sarah Johnson', role: 'Teacher', dept: 'Computer Science' },
                { name: 'Mike Kim', role: 'Student', dept: 'Computer Science' },
                { name: 'Emily Chen', role: 'Admin', dept: 'System Admin' },
                { name: 'Prof. David Wilson', role: 'Teacher', dept: 'Engineering' },
              ].map((user, index) => (
                <Card key={index}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='w-10 h-10'>
                        <AvatarFallback className='text-xs'>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <p className='font-medium text-sm'>{user.name}</p>
                        <p className='text-xs text-muted-foreground'>{user.dept}</p>
                      </div>
                      <Badge
                        variant={
                          user.role === 'Admin' ? 'destructive' : user.role === 'Teacher' ? 'default' : 'secondary'
                        }
                        className='text-xs'
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Analytics</h3>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Enrollment Trends</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>This Month</span>
                  <span className='text-sm font-medium'>+234 students</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Last Month</span>
                  <span className='text-sm font-medium'>+189 students</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Growth Rate</span>
                  <span className='text-sm font-medium text-green-600'>+24%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>This Quarter</span>
                  <span className='text-sm font-medium'>$284,000</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Last Quarter</span>
                  <span className='text-sm font-medium'>$241,000</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Growth</span>
                  <span className='text-sm font-medium text-green-600'>+18%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Top Performing Courses</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm font-medium'>React Development</p>
                    <p className='text-xs text-muted-foreground'>234 students</p>
                  </div>
                  <Badge variant='secondary'>95%</Badge>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm font-medium'>Data Science Basics</p>
                    <p className='text-xs text-muted-foreground'>189 students</p>
                  </div>
                  <Badge variant='secondary'>92%</Badge>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm font-medium'>UI/UX Design</p>
                    <p className='text-xs text-muted-foreground'>156 students</p>
                  </div>
                  <Badge variant='secondary'>89%</Badge>
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
                <AvatarFallback className='text-lg'>TE</AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold'>TechEdu University</h3>
              <p className='text-sm text-muted-foreground'>Educational Institution</p>
            </div>

            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Organization Type</span>
                  <span className='text-sm text-muted-foreground'>University</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Established</span>
                  <span className='text-sm text-muted-foreground'>1995</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Location</span>
                  <span className='text-sm text-muted-foreground'>San Francisco, CA</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>System Health</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Server Uptime</span>
                  <Badge variant='outline' className='text-green-600 text-xs'>
                    99.9%
                  </Badge>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Database Performance</span>
                  <Badge variant='outline' className='text-green-600 text-xs'>
                    Optimal
                  </Badge>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Storage Usage</span>
                  <Badge variant='outline' className='text-xs'>
                    67%
                  </Badge>
                </div>
              </CardContent>
            </Card>
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
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('users')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <Users className='w-4 h-4' />
            <span className='text-xs'>Users</span>
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('analytics')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <BarChart3 className='w-4 h-4' />
            <span className='text-xs'>Analytics</span>
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setActiveTab('profile')}
            className='flex flex-col items-center gap-1 h-auto py-2'
          >
            <Building2 className='w-4 h-4' />
            <span className='text-xs'>Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
