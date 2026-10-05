'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { CheckCircle, Award, Clock, AlertTriangle } from 'lucide-react';

const completionByCategory = [
  { name: 'Astronomy', value: 92 },
  { name: 'Space Eng.', value: 86 },
  { name: 'Astrophoto', value: 78 },
  { name: 'Data Science', value: 84 },
];

export default function CompletionAnalyticsPage() {
  return (
    <DashboardLayout title="Completion Analytics" breadcrumb={['Analytics', 'Completion Analytics']} activeItem="Completion Analytics" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Completion Analytics</h1>
          <p className="text-gray-500 text-sm">Analyze drop-off points, milestone completions, and pass rates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Overall Completion" value="89.4%" change={{ value: 2.1, isPositive: true }} icon={<CheckCircle className="text-emerald-500" size={24} />} />
          <StatCard title="Graduation Rate" value="91.2%" change={{ value: 1.5, isPositive: true }} icon={<Award className="text-[#7C3AED]" size={24} />} />
          <StatCard title="Avg. Days to Complete" value="28 Days" change={{ value: -2.0, isPositive: true }} icon={<Clock className="text-blue-500" size={24} />} />
          <StatCard title="Course Drop-off Rate" value="6.4%" change={{ value: -1.2, isPositive: true }} icon={<AlertTriangle className="text-amber-500" size={24} />} />
        </div>

        <BarChart title="Completion Percentage by Category (%)" data={completionByCategory} color="#10B981" />
      </div>
    </DashboardLayout>
  );
}
