'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { DonutChart } from '@/components/dashboard/charts/DonutChart';
import { BookOpen, Star, Award, CheckCircle } from 'lucide-react';

const topCoursesData = [
  { name: 'Astrophysics 101', value: 1420 },
  { name: 'Orbital Mech.', value: 890 },
  { name: 'Astrophotography', value: 640 },
  { name: 'JWST Data', value: 410 },
  { name: 'Exoplanets', value: 290 },
];

const ratingDistribution = [
  { name: '5 Stars', value: 72, color: '#10B981' },
  { name: '4 Stars', value: 22, color: '#3B82F6' },
  { name: '3 Stars', value: 5, color: '#F59E0B' },
  { name: '1-2 Stars', value: 1, color: '#EF4444' },
];

export default function CourseAnalyticsPage() {
  return (
    <DashboardLayout title="Course Analytics" breadcrumb={['Analytics', 'Course Analytics']} activeItem="Course Analytics" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Performance & Popularity</h1>
          <p className="text-gray-500 text-sm">Course popularity, ratings breakdown, and student satisfaction</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Courses" value="128" change={{ value: 4.2, isPositive: true }} icon={<BookOpen className="text-[#7C3AED]" size={24} />} />
          <StatCard title="Avg. Course Rating" value="4.85 / 5.0" change={{ value: 0.2, isPositive: true }} icon={<Star className="text-amber-500" size={24} />} />
          <StatCard title="Course Completion" value="89.4%" change={{ value: 2.1, isPositive: true }} icon={<CheckCircle className="text-emerald-500" size={24} />} />
          <StatCard title="Certificates Issued" value="4,820" change={{ value: 12.0, isPositive: true }} icon={<Award className="text-blue-500" size={24} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BarChart title="Top Enrolled Courses (Students)" data={topCoursesData} color="#7C3AED" />
          </div>
          <div>
            <DonutChart title="Course Rating Distribution" data={ratingDistribution} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
