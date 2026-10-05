'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { DonutChart } from '@/components/dashboard/charts/DonutChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, GraduationCap, BookOpen, DollarSign, ArrowUpRight, Plus, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const revenueData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 5800 },
  { name: 'Mar', value: 7200 },
  { name: 'Apr', value: 8900 },
  { name: 'May', value: 11400 },
  { name: 'Jun', value: 14800 },
  { name: 'Jul', value: 18200 },
];

const enrollmentData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 210 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 340 },
  { name: 'Fri', value: 290 },
  { name: 'Sat', value: 410 },
  { name: 'Sun', value: 380 },
];

const categoryDistribution = [
  { name: 'Astrology', value: 38, color: '#7C3AED' },
  { name: 'Numerology', value: 22, color: '#3B82F6' },
  { name: 'Vastu Shastra', value: 18, color: '#10B981' },
  { name: 'Tarot', value: 14, color: '#F59E0B' },
  { name: 'Palmistry', value: 8, color: '#EC4899' },
];

const recentActivities = [
  { id: 1, user: 'Aarav Sharma', action: 'enrolled in', target: 'Vedic Astrology Foundation', time: '10 mins ago', type: 'enrollment' },
  { id: 2, user: 'Pandit Aryan Upadhyay', action: 'published new course', target: 'Advanced Horoscope Reading', time: '1 hour ago', type: 'course' },
  { id: 3, user: 'Ananya Patel', action: 'completed quiz', target: 'KP Astrology System', time: '2 hours ago', type: 'assessment' },
  { id: 4, user: 'Rohan Gupta', action: 'registered for workshop', target: 'Tarot for Intuitive Healing', time: '3 hours ago', type: 'workshop' },
];

import { dashboardService } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadApiData() {
      try {
        const data = await dashboardService.getAdminStats();
        setStats(data);
      } catch (err) {
        console.warn('Failed to load admin stats from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadApiData();
  }, []);

  return (
    <DashboardLayout title="Admin Overview" breadcrumb={['Admin', 'Overview']} activeItem="Dashboard" role="admin">
      <div className="space-y-8">
        {/* Header Action Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-700 text-white p-6 sm:p-8 rounded-md shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome back, Admin</h1>
            <p className="text-purple-100 mt-1 text-sm sm:text-base font-normal">Here is what is happening across AstroNovas learning platform today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/courses/create">
              <Button className="bg-white text-purple-700 hover:bg-purple-50 font-semibold border-0">
                <Plus size={18} className="mr-1.5" /> Create Course
              </Button>
            </Link>
            <Link href="/admin/students/add">
              <Button variant="outline" className="border-white text-white hover:bg-purple-800">
                <Users size={18} className="mr-1.5" /> Add Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value="14,280"
            change={{ value: 12.5, isPositive: true }}
            icon={<GraduationCap className="text-[#7C3AED]" size={24} />}
          />
          <StatCard
            title="Active Courses"
            value="128"
            change={{ value: 4.2, isPositive: true }}
            icon={<BookOpen className="text-[#3B82F6]" size={24} />}
          />
          <StatCard
            title="Monthly Revenue"
            value="₹4,82,500"
            change={{ value: 18.4, isPositive: true }}
            icon={<DollarSign className="text-[#10B981]" size={24} />}
          />
          <StatCard
            title="Completion Rate"
            value="89.4%"
            change={{ value: 2.1, isPositive: true }}
            icon={<CheckCircle className="text-[#F59E0B]" size={24} />}
          />
        </div>

        {/* Analytics Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AreaChart title="Revenue Overview (₹ INR)" data={revenueData} color="#7C3AED" />
          </div>
          <div>
            <DonutChart title="Course Categories" data={categoryDistribution} />
          </div>
        </div>

        {/* Activity & Weekly Enrollments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BarChart title="Daily Enrollments (This Week)" data={enrollmentData} color="#3B82F6" />
          </div>
          <div>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recent Activity</CardTitle>
                <Badge variant="secondary">Live</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{act.user}</p>
                      <p className="text-xs text-gray-500">
                        {act.action} <span className="font-medium text-gray-800">{act.target}</span>
                      </p>
                      <span className="text-[11px] text-gray-400 mt-1 inline-block">{act.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
