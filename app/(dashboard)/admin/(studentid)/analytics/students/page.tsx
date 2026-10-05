'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { Users, GraduationCap, Clock, Award } from 'lucide-react';

const studentGrowthData = [
  { name: 'Jan', value: 8200 },
  { name: 'Feb', value: 9500 },
  { name: 'Mar', value: 11200 },
  { name: 'Apr', value: 12400 },
  { name: 'May', value: 13100 },
  { name: 'Jun', value: 14280 },
];

const studentEngagementData = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 680 },
  { name: 'Wed', value: 850 },
  { name: 'Thu', value: 790 },
  { name: 'Fri', value: 910 },
  { name: 'Sat', value: 1150 },
  { name: 'Sun', value: 1040 },
];

export default function StudentAnalyticsPage() {
  return (
    <DashboardLayout title="Student Analytics" breadcrumb={['Analytics', 'Student Analytics']} activeItem="Student Analytics" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Analytics & Engagement</h1>
          <p className="text-gray-500 text-sm">Track active learners, retention rates, and study time metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Enrolled Students" value="14,280" change={{ value: 14.2, isPositive: true }} icon={<GraduationCap className="text-[#7C3AED]" size={24} />} />
          <StatCard title="Daily Active Learners" value="1,150" change={{ value: 8.5, isPositive: true }} icon={<Users className="text-blue-500" size={24} />} />
          <StatCard title="Avg. Weekly Study Time" value="4.8 Hours" change={{ value: 3.1, isPositive: true }} icon={<Clock className="text-emerald-500" size={24} />} />
          <StatCard title="Student Retention" value="94.2%" change={{ value: 1.8, isPositive: true }} icon={<Award className="text-amber-500" size={24} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AreaChart title="Student Growth Curve (2026)" data={studentGrowthData} color="#7C3AED" />
          <BarChart title="Daily Active Study Sessions" data={studentEngagementData} color="#3B82F6" />
        </div>
      </div>
    </DashboardLayout>
  );
}
