'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BookOpen, PlayCircle, Award, Flame, Clock, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import { dashboardService } from '@/lib/api';
import { use } from 'react';

export default function StudentDashboardPage({ params }: { params?: Promise<{ studentid?: string }> }) {
  const resolvedParams = params ? use(params) : {};
  const studentid = resolvedParams?.studentid || '1';

  const [dashboardData, setDashboardData] = React.useState<any>(null);

  React.useEffect(() => {
    async function loadStudentData() {
      try {
        const data = await dashboardService.getStudentDashboardData(studentid);
        setDashboardData(data);
      } catch (err) {
        console.warn('Failed to load student dashboard data from API:', err);
      }
    }
    loadStudentData();
  }, [studentid]);

  const activeCourse = {
    title: dashboardData?.activeCourse?.title || 'Astrophysics & Cosmology 101',
    nextLesson: dashboardData?.activeCourse?.nextLesson || 'Lesson 3.2: General Relativity & Space-Time Curvature',
    progress: dashboardData?.activeCourse?.progress || 75,
    instructor: 'Dr. Robert Lang',
  };

  const upcomingDeadlines = [
    { title: 'Spectroscopic Redshift Analysis Report', type: 'Assignment', due: 'Tomorrow at 11:59 PM', course: 'Astrophysics 101' },
    { title: 'Hohmann Transfer Trajectory Assessment', type: 'Quiz', due: 'Sep 02, 2026', course: 'Orbital Mechanics' },
  ];

  return (
    <DashboardLayout title="Student Dashboard" breadcrumb={['Student', 'Dashboard']} activeItem="Dashboard" role="student">
      <div className="space-y-8">
        {/* Welcome Banner with Streak */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-purple-700 text-white p-6 sm:p-8 rounded-md shadow-sm">
          <div className="space-y-2">
            <Badge className="bg-white text-purple-700 font-semibold border-0">
              <Flame size={14} className="mr-1 fill-current text-purple-700" /> 14 Day Learning Streak!
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome back, Aarav!</h1>
            <p className="text-purple-100 text-sm sm:text-base font-normal">You are 75% through your astrophysics specialization this week.</p>
          </div>
          <Link href="/student/1/learn">
            <Button className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 border-0">
              <PlayCircle size={20} className="mr-2" /> Resume Learning
            </Button>
          </Link>
        </div>

        {/* Continue Learning Widget */}
        <Card className="p-6 border-l-4 border-l-purple-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Continue Where You Left Off</span>
              <h3 className="text-xl font-semibold text-black">{activeCourse.title}</h3>
              <p className="text-sm text-gray-700 flex items-center gap-1.5 font-normal">
                <PlayCircle size={16} className="text-purple-700" /> {activeCourse.nextLesson}
              </p>
              <div className="pt-2 max-w-md">
                <ProgressBar value={activeCourse.progress} label="Overall Completion" />
              </div>
            </div>
            <Link href="/student/1/learn">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                Play Lesson
              </Button>
            </Link>
          </div>
        </Card>

        {/* Learning Stats & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
                <CardTitle>My Active Courses</CardTitle>
                <Link href="/student/1/courses">
                  <span className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center">View All <ArrowRight size={12} className="ml-1" /></span>
                </Link>
              </CardHeader>
              <div className="space-y-4">
                {[
                  { title: 'Astrophysics & Cosmology 101', category: 'Astronomy', progress: 75, lessonsLeft: '3 lessons remaining' },
                  { title: 'Orbital Mechanics Masterclass', category: 'Engineering', progress: 40, lessonsLeft: '12 lessons remaining' },
                ].map((c, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-1">{c.category}</Badge>
                      <h4 className="font-bold text-gray-900">{c.title}</h4>
                      <p className="text-xs text-gray-500">{c.lessonsLeft}</p>
                    </div>
                    <div className="w-full sm:w-36">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#7C3AED] h-full" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 space-y-4">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {upcomingDeadlines.map((d, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <Badge variant="warning">{d.type}</Badge>
                      <span className="text-[11px] text-amber-700 font-semibold">{d.due}</span>
                    </div>
                    <h5 className="font-semibold text-gray-900 text-xs">{d.title}</h5>
                    <p className="text-[11px] text-gray-500">{d.course}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
