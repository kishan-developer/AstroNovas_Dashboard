'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileCheck, Upload, CheckCircle, Clock } from 'lucide-react';

const studentAssignments = [
  { id: 'ASN-01', title: 'Spectroscopic Redshift Analysis Report', course: 'Astrophysics 101', dueDate: 'Tomorrow at 11:59 PM', status: 'Pending Submission' },
  { id: 'ASN-02', title: 'Delta-V Orbital Transfer Computation Lab', course: 'Orbital Mechanics', dueDate: 'Sep 10, 2026', status: 'Graded', score: '95/100', feedback: 'Great precision on calculating perigee burn velocity.' },
];

export default function StudentAssignmentsPage() {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  return (
    <DashboardLayout title="My Assignments" breadcrumb={['Student', 'Assignments']} activeItem="Assignments" role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Assignments</h1>
          <p className="text-gray-500 text-sm">Upload homework lab reports and review instructor grades</p>
        </div>

        <div className="space-y-4">
          {studentAssignments.map(a => (
            <Card key={a.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{a.course}</Badge>
                  <Badge variant={a.status === 'Graded' ? 'success' : 'warning'}>{a.status}</Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-base">{a.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> Due: {a.dueDate}
                </p>
                {a.feedback && (
                  <p className="text-xs text-violet-700 bg-violet-50 p-2.5 rounded-xl border border-violet-100 italic">
                    Feedback: "{a.feedback}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {a.status === 'Graded' ? (
                  <span className="font-extrabold text-lg text-emerald-600">{a.score}</span>
                ) : submittedId === a.id ? (
                  <Badge variant="success">
                    <CheckCircle size={14} className="mr-1" /> Submitted
                  </Badge>
                ) : (
                  <Button onClick={() => setSubmittedId(a.id)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs">
                    <Upload size={14} className="mr-1" /> Submit File
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
