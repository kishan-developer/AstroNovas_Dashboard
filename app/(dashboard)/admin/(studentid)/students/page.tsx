'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Users, Plus, Search, Filter, Mail, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { studentService } from '@/lib/api';

export default function StudentsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [students, setStudents] = useState<any[]>([
    { id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav.sharma@example.in', enrolledCourses: 4, progress: 88, status: 'Active', joined: 'Jan 15, 2026' },
    { id: 'STU-1002', name: 'Ananya Patel', email: 'ananya.p@example.in', enrolledCourses: 2, progress: 45, status: 'Active', joined: 'Jan 20, 2026' },
    { id: 'STU-1003', name: 'Rohan Gupta', email: 'rohan.g@example.in', enrolledCourses: 5, progress: 96, status: 'Active', joined: 'Dec 10, 2025' },
    { id: 'STU-1004', name: 'Priya Verma', email: 'priya.v@example.in', enrolledCourses: 1, progress: 12, status: 'Inactive', joined: 'Feb 01, 2026' },
    { id: 'STU-1005', name: 'Aditya Kumar', email: 'aditya.k@example.in', enrolledCourses: 3, progress: 70, status: 'Active', joined: 'Jan 05, 2026' },
  ]);

  React.useEffect(() => {
    async function fetchStudentsFromApi() {
      try {
        const data = await studentService.getStudents('student');
        if (data && Array.isArray(data) && data.length > 0) {
          setStudents(data);
        }
      } catch (err) {
        console.warn('Failed to load students from backend API:', err);
      }
    }
    fetchStudentsFromApi();
  }, []);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Students" breadcrumb={['Students', 'All Students']} activeItem="Students" role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students Directory</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage and monitor all enrolled students in the platform</p>
          </div>
          <Link href="/admin/students/add">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              <Plus size={18} className="mr-2" /> Add New Student
            </Button>
          </Link>
        </div>

        {/* Filter Controls */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by student name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">Status:</span>
              {['All', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === status
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Students Table */}
        <Card className="overflow-hidden border border-gray-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-6 font-bold">Student</th>
                  <th className="py-3.5 px-6 font-bold">Student ID</th>
                  <th className="py-3.5 px-6 font-bold">Courses</th>
                  <th className="py-3.5 px-6 font-bold">Avg. Progress</th>
                  <th className="py-3.5 px-6 font-bold">Status</th>
                  <th className="py-3.5 px-6 font-bold">Joined</th>
                  <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-600 font-medium">{student.id}</td>
                    <td className="py-4 px-6 font-medium text-gray-700">{student.enrolledCourses} Courses</td>
                    <td className="py-4 px-6">
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{student.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#7C3AED] h-full rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={student.status === 'Active' ? 'success' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-xs">{student.joined}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link href={`/admin/students/${student.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-[#7C3AED]">
                          <Eye size={16} />
                        </Button>
                      </Link>
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
