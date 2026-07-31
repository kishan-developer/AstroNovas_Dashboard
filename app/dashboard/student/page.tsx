'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  Award,
  PlayCircle
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Sample data
const learningProgressData = [
  { month: 'Jan', hours: 12 },
  { month: 'Feb', hours: 18 },
  { month: 'Mar', hours: 15 },
  { month: 'Apr', hours: 22 },
  { month: 'May', hours: 25 },
  { month: 'Jun', hours: 30 },
];

const quizScoresData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
];

const enrolledCourses = [
  { title: 'Vedic Astrology', progress: 75, nextLesson: 'Planetary Alignment', image: '/api/placeholder/300/200' },
  { title: 'Numerology', progress: 45, nextLesson: 'Life Path Numbers', image: '/api/placeholder/300/200' },
  { title: 'Palmistry', progress: 20, nextLesson: 'Hand Lines Basics', image: '/api/placeholder/300/200' },
];

export default function StudentDashboard() {
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
          title="Enrolled Courses"
          value="5"
          change="+1"
          changeType="positive"
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Learning Hours"
          value="128"
          change="+12.5%"
          changeType="positive"
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Certificates"
          value="2"
          change="+0%"
          changeType="neutral"
          icon={Award}
          color="green"
        />
        <StatCard
          title="Avg Quiz Score"
          value="85%"
          change="+5.4%"
          changeType="positive"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={learningProgressData}
          title="Learning Progress"
          dataKey="hours"
          xAxisKey="month"
          color="#7C3AED"
        />
        <AreaChart
          data={quizScoresData}
          title="Quiz Performance"
          dataKey="score"
          xAxisKey="month"
          color="#3B82F6"
        />
      </div>

      {/* Continue Learning */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Continue Learning</CardTitle>
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="aspect-video bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-lg mb-4 flex items-center justify-center">
                  <PlayCircle size={48} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#7C3AED] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Next: {course.nextLesson}</p>
                </div>
                <Button variant="primary" size="sm" className="w-full mt-4">
                  Continue
                </Button>
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
                <h3 className="font-semibold text-gray-900">Browse Courses</h3>
                <p className="text-sm text-gray-500">Explore new topics</p>
              </div>
              <Button variant="primary" size="sm">
                Browse
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
                <h3 className="font-semibold text-gray-900">My Schedule</h3>
                <p className="text-sm text-gray-500">View upcoming classes</p>
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
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">My Certificates</h3>
                <p className="text-sm text-gray-500">View achievements</p>
              </div>
              <Button variant="primary" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
