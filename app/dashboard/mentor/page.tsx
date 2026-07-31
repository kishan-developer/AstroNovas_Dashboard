'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileCheck,
  MessageSquare
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Sample data
const studentProgressData = [
  { month: 'Jan', students: 45 },
  { month: 'Feb', students: 52 },
  { month: 'Mar', students: 48 },
  { month: 'Apr', students: 58 },
  { month: 'May', students: 62 },
  { month: 'Jun', students: 70 },
];

const classData = [
  { month: 'Jan', classes: 8 },
  { month: 'Feb', classes: 10 },
  { month: 'Mar', classes: 9 },
  { month: 'Apr', classes: 12 },
  { month: 'May', classes: 11 },
  { month: 'Jun', classes: 14 },
];

const upcomingClasses = [
  { title: 'Vedic Astrology Basics', date: 'Today, 3:00 PM', students: 25 },
  { title: 'Numerology Advanced', date: 'Tomorrow, 10:00 AM', students: 18 },
  { title: 'Palmistry Workshop', date: 'Wed, 2:00 PM', students: 30 },
];

export default function MentorDashboard() {
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
          title="My Students"
          value="156"
          change="+12.5%"
          changeType="positive"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="My Courses"
          value="8"
          change="+0%"
          changeType="neutral"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Classes This Month"
          value="24"
          change="+8.2%"
          changeType="positive"
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Pending Reviews"
          value="12"
          change="-5.4%"
          changeType="positive"
          icon={FileCheck}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={studentProgressData}
          title="Student Growth"
          dataKey="students"
          xAxisKey="month"
          color="#7C3AED"
        />
        <AreaChart
          data={classData}
          title="Class Activity"
          dataKey="classes"
          xAxisKey="month"
          color="#3B82F6"
        />
      </div>

      {/* Upcoming Classes */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Classes</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F5F3FF] rounded-xl flex items-center justify-center">
                    <Calendar size={24} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{classItem.title}</h4>
                    <p className="text-sm text-gray-500">{classItem.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">{classItem.students}</span>
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
                <BookOpen size={24} className="text-[#7C3AED]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Create Assignment</h3>
                <p className="text-sm text-gray-500">Add new assignment</p>
              </div>
              <Button variant="primary" size="sm">
                Create
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <MessageSquare size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Student Chat</h3>
                <p className="text-sm text-gray-500">Reply to messages</p>
              </div>
              <Button variant="primary" size="sm">
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FileCheck size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Review Submissions</h3>
                <p className="text-sm text-gray-500">Grade assignments</p>
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
