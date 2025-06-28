'use client';

import { useEffect, useState } from 'react';
import { MobileOrganizationDashboard } from './mobile-organization-dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Building2,
  GraduationCap,
  UserPlus,
  Settings,
  BarChart3,
  Bell,
  Search,
  Plus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrganizationUserManagement } from './organization-user-management';

export function OrganizationDashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileOrganizationDashboard />;
  }

  // Desktop version (existing code continues...)
  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>TechEdu University</h2>
          <p className='text-muted-foreground'>Organization Management Dashboard</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <Input placeholder='Search users, courses...' className='pl-10 w-64' />
          </div>
          <Button>
            <Plus className='w-4 h-4 mr-2' />
            Add User
          </Button>
          <Button variant='ghost' size='icon'>
            <Bell className='w-5 h-5' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Settings className='w-5 h-5' />
          </Button>
          <Avatar>
            <AvatarImage src='/placeholder.svg?height=32&width=32' />
            <AvatarFallback>TE</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Students</CardTitle>
            <GraduationCap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,847</div>
            <p className='text-xs text-muted-foreground'>+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Teachers</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>89</div>
            <p className='text-xs text-muted-foreground'>+3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Courses</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>156</div>
            <p className='text-xs text-muted-foreground'>8 new this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$284K</div>
            <p className='text-xs text-muted-foreground'>+18% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Completion Rate</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>84%</div>
            <p className='text-xs text-muted-foreground'>+5% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='users'>User Management</TabsTrigger>
          <TabsTrigger value='courses'>Course Management</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Overview of all departments</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <BookOpen className='w-6 h-6 text-blue-600' />
                      </div>
                      <div>
                        <h4 className='font-semibold'>Computer Science</h4>
                        <p className='text-sm text-muted-foreground'>45 courses • 1,234 students</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>87% completion</p>
                      <Progress value={87} className='w-24 mt-1' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                        <BarChart3 className='w-6 h-6 text-green-600' />
                      </div>
                      <div>
                        <h4 className='font-semibold'>Business Administration</h4>
                        <p className='text-sm text-muted-foreground'>32 courses • 856 students</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>82% completion</p>
                      <Progress value={82} className='w-24 mt-1' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                        <Building2 className='w-6 h-6 text-purple-600' />
                      </div>
                      <div>
                        <h4 className='font-semibold'>Engineering</h4>
                        <p className='text-sm text-muted-foreground'>38 courses • 967 students</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>79% completion</p>
                      <Progress value={79} className='w-24 mt-1' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities and updates</CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center gap-3 p-3 border rounded-lg'>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <UserPlus className='w-4 h-4 text-green-600' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>New teacher registered</p>
                      <p className='text-xs text-muted-foreground'>Dr. Sarah Wilson joined Computer Science dept.</p>
                    </div>
                    <span className='text-xs text-muted-foreground'>2h ago</span>
                  </div>
                  <div className='flex items-center gap-3 p-3 border rounded-lg'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-4 h-4 text-blue-600' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>New course published</p>
                      <p className='text-xs text-muted-foreground'>Advanced Machine Learning by Prof. Johnson</p>
                    </div>
                    <span className='text-xs text-muted-foreground'>4h ago</span>
                  </div>
                  <div className='flex items-center gap-3 p-3 border rounded-lg'>
                    <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                      <TrendingUp className='w-4 h-4 text-yellow-600' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>Monthly report generated</p>
                      <p className='text-xs text-muted-foreground'>Student performance analytics ready</p>
                    </div>
                    <span className='text-xs text-muted-foreground'>1d ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Active Sessions</span>
                    <span className='text-sm font-medium'>1,247</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>New Enrollments</span>
                    <span className='text-sm font-medium'>89 today</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Course Completions</span>
                    <span className='text-sm font-medium'>156 this week</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Support Tickets</span>
                    <span className='text-sm font-medium'>12 open</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Server Uptime</span>
                    <Badge variant='outline' className='text-green-600'>
                      99.9%
                    </Badge>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Database Performance</span>
                    <Badge variant='outline' className='text-green-600'>
                      Optimal
                    </Badge>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Storage Usage</span>
                    <Badge variant='outline'>67%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='users' className='space-y-4'>
          <OrganizationUserManagement />
        </TabsContent>

        <TabsContent value='courses' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Oversee all courses across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    name: 'Advanced React Development',
                    department: 'Computer Science',
                    students: 234,
                    teacher: 'Dr. Johnson',
                  },
                  { name: 'Business Strategy', department: 'Business', students: 189, teacher: 'Prof. Smith' },
                  {
                    name: 'Mechanical Engineering Basics',
                    department: 'Engineering',
                    students: 156,
                    teacher: 'Dr. Wilson',
                  },
                ].map((course, index) => (
                  <div key={index} className='flex items-center justify-between p-4 border rounded-lg'>
                    <div>
                      <h4 className='font-semibold'>{course.name}</h4>
                      <p className='text-sm text-muted-foreground'>
                        {course.department} • {course.teacher}
                      </p>
                      <p className='text-xs text-muted-foreground'>{course.students} enrolled students</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge variant='outline'>Active</Badge>
                      <Button variant='ghost' size='sm'>
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
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
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='settings' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Email Notifications</p>
                  <p className='text-sm text-muted-foreground'>Send system notifications via email</p>
                </div>
                <Button variant='outline' size='sm'>
                  Configure
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>User Registration</p>
                  <p className='text-sm text-muted-foreground'>Allow new user self-registration</p>
                </div>
                <Button variant='outline' size='sm'>
                  Configure
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Data Backup</p>
                  <p className='text-sm text-muted-foreground'>Automated daily backups</p>
                </div>
                <Button variant='outline' size='sm'>
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
