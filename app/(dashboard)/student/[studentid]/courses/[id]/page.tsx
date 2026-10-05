'use client';

import React, { use } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, PlayCircle, ArrowLeft, Star, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function StudentDynamicCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id || '1';

  const course = {
    id: courseId,
    title: 'Astrophysics & Cosmology 101',
    category: 'Astronomy',
    progress: 75,
    instructor: 'Dr. Robert Lang',
    lessonsCount: 24,
    description: 'Master cosmic expansion, stellar dynamics, dark energy, and quantum astrophysical phenomena.',
  };

  return (
    <DashboardLayout title={`Course: ${course.title}`} breadcrumb={['Student', 'Courses', course.id]} activeItem="Courses" role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/student/1/courses">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> My Courses
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-500 text-sm">Instructor: {course.instructor}</p>
            </div>
          </div>
          <Link href={`/student/1/learn/${course.id}`}>
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              <PlayCircle size={18} className="mr-2" /> Resume Learning
            </Button>
          </Link>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="secondary">{course.category}</Badge>
            <span className="text-xs font-semibold text-gray-500">{course.lessonsCount} Lessons</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{course.description}</p>

          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Overall Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#7C3AED] h-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
