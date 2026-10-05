'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, FileText, Clock, Search, Filter, Plus, Edit, Trash2, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const lessonsList = [
  { id: 'LES-101', title: 'Introduction to Black Hole Thermodynamics', course: 'Astrophysics & Cosmology 101', module: 'Module 3', duration: '45 mins', type: 'Video', status: 'Published' },
  { id: 'LES-102', title: 'Keplerian Orbits & Gravity Assist Calculations', course: 'Orbital Mechanics Masterclass', module: 'Module 1', duration: '30 mins', type: 'Interactive Lab', status: 'Published' },
  { id: 'LES-103', title: 'Narrowband H-Alpha Stacking Workflow', course: 'Deep Sky Astrophotography', module: 'Module 2', duration: '55 mins', type: 'Video', status: 'Published' },
  { id: 'LES-104', title: 'Photometric Data Processing in Python', course: 'James Webb Telescope Analysis', module: 'Module 1', duration: '25 mins', type: 'Reading', status: 'Draft' },
];

export default function AllLessonsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = lessonsList.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.course.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <DashboardLayout title="All Lessons" breadcrumb={['Lessons', 'All Lessons']} activeItem="All Lessons" role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lessons Repository</h1>
            <p className="text-gray-500 text-sm">Browse, filter, and edit all course content modules</p>
          </div>
          <Link href="/admin/lessons/management">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              <Plus size={18} className="mr-2" /> Lesson Studio & Studio Manager
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by lesson or course title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>
        </Card>

        {/* Lessons List Table */}
        <Card className="overflow-hidden border-0 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Lesson Title</th>
                  <th className="py-4 px-6">Course & Module</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Content Type</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filtered.map(les => (
                  <tr key={les.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                          {les.type === 'Video' ? <Video size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{les.title}</p>
                          <p className="text-xs text-gray-400 font-mono">{les.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-800 text-xs">{les.course}</p>
                      <span className="text-[11px] text-gray-500">{les.module}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-xs font-medium">{les.duration}</td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary">{les.type}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={les.status === 'Published' ? 'success' : 'warning'}>{les.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-[#7C3AED]">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
