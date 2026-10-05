'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, X, Clock } from 'lucide-react';

const pending = [
  { id: 'PEN-901', student: 'Emily Watson', email: 'emily.w@example.com', course: 'Deep Sky Astrophotography', requestedOn: 'Today at 09:40 AM', plan: 'Scholarship Grant Request' },
  { id: 'PEN-902', student: 'Carlos Sainz', email: 'carlos.s@example.com', course: 'Orbital Mechanics Masterclass', requestedOn: 'Yesterday', plan: 'Bank Wire Verification' },
];

export default function PendingEnrollmentsPage() {
  return (
    <DashboardLayout title="Pending Enrollments" breadcrumb={['Enrollments', 'Pending Enrollments']} activeItem="Pending Enrollments" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals Queue</h1>
          <p className="text-gray-500 text-sm">Review manual payment approvals, wire transfers, and student grant applications</p>
        </div>

        <div className="space-y-4">
          {pending.map(p => (
            <Card key={p.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Approval Required</Badge>
                  <span className="text-xs text-gray-400 font-mono">{p.id}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base">{p.student} <span className="text-xs font-normal text-gray-500">({p.email})</span></h4>
                <p className="text-xs text-gray-600">Course: <span className="font-semibold text-gray-800">{p.course}</span> • Reason: <span className="font-semibold text-violet-700">{p.plan}</span></p>
                <p className="text-[11px] text-gray-400">Requested: {p.requestedOn}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-xs">
                  <X size={14} className="mr-1" /> Reject
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                  <Check size={14} className="mr-1" /> Approve Enrollment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
