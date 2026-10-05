'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileCheck, Plus, Clock, Users, CheckCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const assignments = [
  { id: 'ASN-01', title: 'Spectroscopic Redshift Analysis Report', course: 'Astrophysics 101', dueDate: 'Sep 05, 2026', totalSubmissions: 42, pendingGrading: 12 },
  { id: 'ASN-02', title: 'Delta-V Orbital Transfer Computation Lab', course: 'Orbital Mechanics', dueDate: 'Sep 10, 2026', totalSubmissions: 28, pendingGrading: 5 },
  { id: 'ASN-03', title: 'Deep Sky Stack Noise Reduction Project', course: 'Astrophotography', dueDate: 'Sep 15, 2026', totalSubmissions: 15, pendingGrading: 0 },
];

export default function AllAssignmentsPage() {
  return (
    <DashboardLayout title="All Assignments" breadcrumb={['Assignments', 'All Assignments']} activeItem="All Assignments" role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments & Projects</h1>
            <p className="text-gray-500 text-sm">Course coursework, file submission requirements, and grading status</p>
          </div>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
            <Plus size={18} className="mr-2" /> Create Assignment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assignments.map(a => (
            <Card key={a.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{a.course}</Badge>
                <span className="text-xs text-gray-400 font-mono">{a.id}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{a.title}</h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock size={12} /> Due: {a.dueDate}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl text-xs">
                <div>
                  <span className="text-gray-400">Submissions:</span>
                  <p className="font-bold text-gray-900 text-sm">{a.totalSubmissions}</p>
                </div>
                <div>
                  <span className="text-gray-400">Pending Review:</span>
                  <p className="font-bold text-amber-600 text-sm">{a.pendingGrading}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Link href="/admin/assignments/grading">
                  <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs">
                    Grade Submissions ({a.pendingGrading})
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
