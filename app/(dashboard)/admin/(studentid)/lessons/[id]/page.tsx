'use client';

import React, { use } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, ArrowLeft, Edit, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DynamicLessonDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id || '1';

  const lesson = {
    id: lessonId.startsWith('LES-') ? lessonId : `LES-10${lessonId}`,
    title: 'General Relativity & Space-Time Curvature',
    course: 'Astrophysics & Cosmology 101',
    module: 'Module 3: Black Holes & Relativity',
    duration: '42 mins',
    type: 'Video Lecture',
    status: 'Published',
    videoUrl: 'https://cdn.astronovas.com/videos/gr-lecture.mp4',
  };

  return (
    <DashboardLayout title={`Lesson: ${lesson.id}`} breadcrumb={['Lessons', lesson.id]} activeItem="All Lessons" role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/lessons">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> Back to Lessons
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-500 text-sm">ID: <span className="font-mono font-semibold">{lesson.id}</span> • {lesson.course}</p>
            </div>
          </div>
          <Link href="/admin/lessons/management">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              <Edit size={16} className="mr-2" /> Edit in Studio
            </Button>
          </Link>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="secondary">{lesson.module}</Badge>
            <Badge variant="success">{lesson.status}</Badge>
          </div>

          <div className="bg-slate-950 text-white rounded-2xl aspect-video flex items-center justify-center p-8 text-center border border-gray-800">
            <div className="space-y-2">
              <Video className="text-[#7C3AED] mx-auto" size={48} />
              <p className="font-semibold text-sm">Video Stream: {lesson.videoUrl}</p>
              <p className="text-xs text-gray-400">Duration: {lesson.duration}</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
