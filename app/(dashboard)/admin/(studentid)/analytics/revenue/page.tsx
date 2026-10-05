'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { DonutChart } from '@/components/dashboard/charts/DonutChart';
import { DollarSign, CreditCard, TrendingUp, RefreshCw } from 'lucide-react';

const revenueHistory = [
  { name: 'Jan', value: 240000 },
  { name: 'Feb', value: 310000 },
  { name: 'Mar', value: 380000 },
  { name: 'Apr', value: 420000 },
  { name: 'May', value: 460000 },
  { name: 'Jun', value: 482500 },
];

const paymentBreakdown = [
  { name: 'UPI (GPay / PhonePe / Paytm)', value: 72, color: '#7C3AED' },
  { name: 'Credit / Debit Card', value: 18, color: '#3B82F6' },
  { name: 'Netbanking', value: 7, color: '#10B981' },
  { name: 'EMI Options', value: 3, color: '#F59E0B' },
];

export default function RevenueAnalyticsPage() {
  return (
    <DashboardLayout title="Revenue Analytics" breadcrumb={['Analytics', 'Revenue Analytics']} activeItem="Revenue Analytics" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-black">Revenue & Financial Growth</h1>
          <p className="text-gray-500 text-sm font-normal">Monthly recurring revenue, gross sales, and Indian payment method statistics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Monthly Revenue (MRR)" value="₹4,82,500" change={{ value: 18.4, isPositive: true }} icon={<DollarSign className="text-purple-700" size={24} />} />
          <StatCard title="Total Annual Revenue" value="₹27,48,000" change={{ value: 24.1, isPositive: true }} icon={<TrendingUp className="text-purple-700" size={24} />} />
          <StatCard title="Avg. Order Value" value="₹4,999" change={{ value: 5.2, isPositive: true }} icon={<CreditCard className="text-purple-700" size={24} />} />
          <StatCard title="Refund Rate" value="0.8%" change={{ value: -0.3, isPositive: true }} icon={<RefreshCw className="text-black" size={24} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AreaChart title="Monthly Revenue Growth (₹ INR)" data={revenueHistory} color="#7E22CE" />
          </div>
          <div>
            <DonutChart title="Indian Payment Methods" data={paymentBreakdown} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
