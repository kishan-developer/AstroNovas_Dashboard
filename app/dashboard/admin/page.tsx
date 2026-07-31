'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  CreditCard,
  ArrowUpRight,
  BookOpen,
  Calendar,
  GraduationCap
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { DonutChart } from '@/components/dashboard/charts/DonutChart';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 2800 },
  { month: 'May', users: 3200 },
  { month: 'Jun', users: 3800 },
];

const courseData = [
  { month: 'Jan', courses: 15 },
  { month: 'Feb', courses: 22 },
  { month: 'Mar', courses: 18 },
  { month: 'Apr', courses: 28 },
  { month: 'May', courses: 25 },
  { month: 'Jun', courses: 35 },
];

const categoryData = [
  { name: 'Vedic Astrology', value: 35, color: '#7C3AED' },
  { name: 'Numerology', value: 25, color: '#3B82F6' },
  { name: 'Vastu Shastra', value: 20, color: '#10B981' },
  { name: 'Palmistry', value: 20, color: '#F59E0B' },
];

const recentEnrollments = [
  { id: 'ENR-001', student: 'John Doe', course: 'Vedic Astrology', amount: '$299.00', status: 'Completed', date: '2024-01-15' },
  { id: 'ENR-002', student: 'Jane Smith', course: 'Numerology', amount: '$199.00', status: 'Pending', date: '2024-01-14' },
  { id: 'ENR-003', student: 'Bob Johnson', course: 'Vastu Shastra', amount: '$349.00', status: 'Completed', date: '2024-01-14' },
  { id: 'ENR-004', student: 'Alice Brown', course: 'Palmistry', amount: '$149.00', status: 'Processing', date: '2024-01-13' },
  { id: 'ENR-005', student: 'Charlie Wilson', course: 'Vedic Astrology', amount: '$299.00', status: 'Completed', date: '2024-01-13' },
];

const statusColors = {
  'Completed': 'success',
  'Pending': 'warning',
  'Processing': 'info',
  'Cancelled': 'danger',
} as const;

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-4">
        <StatCard
          title="Total Revenue"
          value="$284,500"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Total Students"
          value="15,234"
          change="+8.2%"
          changeType="positive"
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Active Courses"
          value="2,847"
          change="+15.3%"
          changeType="positive"
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Growth Rate"
          value="24.8%"
          change="+5.4%"
          changeType="positive"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={revenueData}
          title="Revenue Overview"
          dataKey="revenue"
          xAxisKey="month"
          color="#7C3AED"
        />
        <AreaChart
          data={userGrowthData}
          title="Student Growth"
          dataKey="users"
          xAxisKey="month"
          color="#3B82F6"
        />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BarChart
            data={courseData}
            title="Course Enrollments"
            dataKey="courses"
            xAxisKey="month"
            color="#10B981"
          />
        </div>
        <DonutChart
          data={categoryData}
          title="Course Categories"
        />
      </div>

      {/* Recent Enrollments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Enrollments</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        {/* <CardContent> */}
          <DataTable
            columns={[
              { key: 'id', header: 'Enrollment ID', sortable: true },
              { key: 'student', header: 'Student', sortable: true },
              { key: 'course', header: 'Course', sortable: true },
              { key: 'amount', header: 'Amount', sortable: true },
              { 
                key: 'status', 
                header: 'Status',
                render: (item) => (
                  <Badge variant={statusColors[item.status as keyof typeof statusColors] || 'default'}>
                    {item.status}
                  </Badge>
                )
              },
              { key: 'date', header: 'Date', sortable: true },
            ]}
            data={recentEnrollments}
            pageSize={5}
            actions={(item) => (
              <Button variant="ghost" size="sm">
                <ArrowUpRight size={16} />
              </Button>
            )}
          />
        {/* </CardContent> */}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F5F3FF] rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-[#7C3AED]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Add Course</h3>
                <p className="text-sm text-gray-500">Create new course</p>
              </div>
              <Button variant="primary" size="sm">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <GraduationCap size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Add Student</h3>
                <p className="text-sm text-gray-500">Register new student</p>
              </div>
              <Button variant="primary" size="sm">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Schedule Class</h3>
                <p className="text-sm text-gray-500">Create live session</p>
              </div>
              <Button variant="primary" size="sm">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
