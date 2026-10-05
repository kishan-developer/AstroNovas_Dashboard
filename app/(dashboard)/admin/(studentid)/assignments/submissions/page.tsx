'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const submissions = [
  { id: 'SUB-101', student: 'Sarah Jenkins', assignment: 'Spectroscopic Redshift Analysis', file: 'redshift_lab_jenkins.pdf', submittedAt: '2 hours ago', status: 'Pending Review' },
  { id: 'SUB-102', student: 'Alex Rivera', assignment: 'Delta-V Orbital Computation', file: 'deltav_calc_rivera.py', submittedAt: '5 hours ago', status: 'Graded', score: '95/100' },
  { id: 'SUB-103', student: 'Michael Chen', assignment: 'Deep Sky Noise Reduction', file: 'm31_stacked_chen.fits', submittedAt: '1 day ago', status: 'Graded', score: '98/100' },
];

export default function SubmissionsPage() {
  return (
    <DashboardLayout title="Submissions" breadcrumb={['Assignments', 'Submissions']} activeItem="Submissions" role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Submissions Queue</h1>
          <p className="text-gray-500 text-sm">Review uploaded files, scripts, and lab reports</p>
        </div>

        <Card className="overflow-hidden border-0 shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Assignment</th>
                <th className="py-4 px-6">Submitted File</th>
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">{sub.student}</td>
                  <td className="py-4 px-6 text-gray-700">{sub.assignment}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg text-xs font-medium border border-violet-100">
                      <FileText size={14} /> {sub.file}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-xs">{sub.submittedAt}</td>
                  <td className="py-4 px-6">
                    <Badge variant={sub.status === 'Graded' ? 'success' : 'warning'}>
                      {sub.status} {sub.score ? `(${sub.score})` : ''}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href="/admin/assignments/grading">
                      <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs">
                        Grade
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
