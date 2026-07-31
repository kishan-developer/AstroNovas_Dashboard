'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  GraduationCap,
  UserCheck
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Sample data
const enrollmentData = [
  { month: 'Jan', enrollments: 120 },
  { month: 'Feb', enrollments: 150 },
  { month: 'Mar', enrollments: 180 },
  { month: 'Apr', enrollments: 220 },
  { month: 'May', enrollments: 260 },
  { month: 'Jun', enrollment: 310 },
];

const attendanceData = [
  { month: 'Jan', attendance: 85 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 82 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 87 },
  { month: 'Jun', attendance: 92 },
];

const courseProgressData = [
  { course: 'Vedic Astrology', progress: 75 },
  { course: 'Numerology', progress: 60 },
  { course: 'Vastu Shastra', progress: 45 },
  { course: 'Palmistry', progress: 80 },
];

export default function ManagerDashboard() {
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
          title="Total Students"
          value="1,234"
          change="+8.2%"
          changeType="positive"
          icon={GraduationCap}
          color="purple"
        />
        <StatCard
          title="Active Courses"
          value="45"
          change="+12.5%"
          changeType="positive"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Active Mentors"
          value="28"
          change="+5.4%"
          changeType="positive"
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Attendance Rate"
          value="87.5%"
          change="+2.1%"
          changeType="positive"
          icon={Calendar}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={enrollmentData}
          title="Enrollment Trends"
          dataKey="enrollments"
          xAxisKey="month"
          color="#7C3AED"
        />
        <AreaChart
          data={attendanceData}
          title="Attendance Overview"
          dataKey="attendance"
          xAxisKey="month"
          color="#3B82F6"
        />
      </div>

      {/* Course Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseProgressData.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{course.course}</span>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#7C3AED] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F5F3FF] rounded-xl flex items-center justify-center">
                <GraduationCap size={24} className="text-[#7C3AED]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">View Students</h3>
                <p className="text-sm text-gray-500">Manage enrollments</p>
              </div>
              <Button variant="primary" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar size={24} className="text-blue-600" />
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

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Review Courses</h3>
                <p className="text-sm text-gray-500">Check progress</p>
              </div>
              <Button variant="primary" size="sm">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
