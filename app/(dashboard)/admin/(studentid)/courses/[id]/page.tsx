'use client';

import React, { use } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Users, Star, ArrowLeft, Edit, Video, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DynamicCourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id || '1';

  const course = {
    id: courseId.startsWith('CRS-') ? courseId : `CRS-0${courseId}`,
    title: 'Astrophysics & Cosmology 101',
    category: 'Astronomy & Physics',
    price: '₹4,999',
    studentsCount: 1420,
    rating: 4.9,
    status: 'Published',
    description: 'Master the fundamental laws of cosmology, dark matter theory, stellar evolution, and gravitational wave physics.',
    modules: [
      { title: 'Module 1: Cosmic Expansion & Redshift', lessonsCount: 6 },
      { title: 'Module 2: Stellar Structure & Fusion Cycles', lessonsCount: 8 },
      { title: 'Module 3: General Relativity & Black Holes', lessonsCount: 10 },
    ],
  };

  return (
    <DashboardLayout title={`Course: ${course.id}`} breadcrumb={['Courses', course.id]} activeItem="All Courses" role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/courses">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> Back to Courses
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-500 text-sm">Course ID: <span className="font-mono font-semibold">{course.id}</span></p>
            </div>
          </div>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
            <Edit size={16} className="mr-2" /> Edit Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="success">{course.status}</Badge>
            </div>
            <div>
              <span className="text-xs text-gray-400">Price</span>
              <h2 className="text-2xl font-extrabold text-[#7C3AED]">{course.price}</h2>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
              <span className="flex items-center gap-1"><Users size={14} /> {course.studentsCount} Students</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold"><Star size={14} fill="currentColor" /> {course.rating}</span>
            </div>
          </Card>

          <Card className="md:col-span-2 p-6 space-y-4">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Course Overview & Modules</CardTitle>
            </CardHeader>
            <p className="text-xs text-gray-600 leading-relaxed">{course.description}</p>
            <div className="space-y-3 pt-2">
              {course.modules.map((m, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center text-xs font-semibold text-gray-800">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="text-[#7C3AED]" /> {m.title}
                  </span>
                  <Badge variant="default">{m.lessonsCount} Lessons</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
