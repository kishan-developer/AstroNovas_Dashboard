'use client';

import React, { use } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail, Phone, Calendar, BookOpen, Award, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function DynamicStudentIdDetailsPage({ params }: { params: Promise<{ studentid: string }> }) {
  const resolvedParams = use(params);
  const studentid = resolvedParams.studentid || '1';

  const student = {
    id: studentid.startsWith('STU-') ? studentid : `STU-100${studentid}`,
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    joined: 'Jan 15, 2026',
    status: 'Active',
    bio: 'Passionate physics undergraduate specializing in stellar spectroscopy and optical telescope instrumentation.',
    courses: [
      { id: 1, title: 'Astrophysics & Cosmology 101', progress: 100, status: 'Completed', grade: '96%' },
      { id: 2, title: 'Orbital Mechanics Masterclass', progress: 85, status: 'In Progress', grade: '90%' },
      { id: 3, title: 'Deep Sky Astrophotography', progress: 40, status: 'In Progress', grade: '88%' },
    ],
    certificates: [
      { title: 'Astrophysics & Cosmology Specialist', issueDate: 'Feb 10, 2026', code: 'CERT-AST-9821' },
    ],
  };

  return (
    <DashboardLayout title="Student Details" breadcrumb={['Students', student.id]} activeItem="Student Details" role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/students">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> Back to Students
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-500 text-sm">ID: <span className="font-mono font-semibold">{student.id}</span> • Registered Student</p>
            </div>
          </div>
          <Button variant="outline" className="text-gray-700">
            <Download size={16} className="mr-2" /> Export Student Report
          </Button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 p-6 space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-700 text-white font-extrabold text-3xl rounded-full flex items-center justify-center mx-auto shadow-lg">
                {student.name.charAt(0)}
              </div>
              <h2 className="mt-4 font-bold text-lg text-gray-900">{student.name}</h2>
              <Badge variant="success" className="mt-1">{student.status}</Badge>
            </div>

            <div className="space-y-3 text-sm pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-[#7C3AED]" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="text-[#7C3AED]" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={16} className="text-[#7C3AED]" />
                <span>Joined {student.joined}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bio</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{student.bio}</p>
            </div>
          </Card>

          {/* Enrolled Courses & Certifications */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
                <CardTitle>Enrolled Courses ({student.courses.length})</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {student.courses.map((c) => (
                  <div key={c.id} className="p-4 bg-gray-50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-violet-100 text-violet-700 rounded-xl flex items-center justify-center font-bold">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{c.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Grade: <span className="font-semibold text-gray-700">{c.grade}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#7C3AED] h-full" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                      <Badge variant={c.status === 'Completed' ? 'success' : 'warning'}>{c.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
                <CardTitle>Earned Certificates</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {student.certificates.map((cert) => (
                  <div key={cert.code} className="p-4 border border-violet-100 bg-violet-50/50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="text-violet-600" size={24} />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{cert.title}</h4>
                        <p className="text-xs text-gray-500">Issued: {cert.issueDate} • ID: {cert.code}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#7C3AED] hover:bg-violet-100">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
