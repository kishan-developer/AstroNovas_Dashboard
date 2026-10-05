'use client';

import React, { use, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, CheckCircle, Video, Download, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudentDynamicLearnPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id || '1';
  const [isPlaying, setIsPlaying] = useState(true);

  const lesson = {
    id: lessonId,
    title: `Lesson ${lessonId}: Advanced Cosmic Expansion & Spectroscopic Physics`,
    courseTitle: 'Astrophysics & Cosmology 101',
    duration: '42:10',
  };

  return (
    <DashboardLayout title={`Learn: ${lesson.id}`} breadcrumb={['Student', 'Learn', lesson.id]} activeItem="Learn" role="student">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/student/1/courses">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft size={16} className="mr-1" /> Back to My Courses
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-xs text-gray-500">{lesson.courseTitle}</p>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="bg-slate-950 rounded-3xl overflow-hidden aspect-video flex flex-col justify-between p-6 relative border border-violet-500/20 shadow-2xl">
          <div className="flex justify-between items-center text-white z-10">
            <Badge variant="secondary" className="bg-white/10 text-white border-0">{lesson.courseTitle}</Badge>
            <span className="text-xs text-gray-300">HD 1080p</span>
          </div>
          <div className="text-center space-y-3 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all scale-105 hover:scale-110"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            <h3 className="text-white font-bold text-lg sm:text-xl">{lesson.title}</h3>
          </div>
          <div className="space-y-2 z-10">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7C3AED] h-full" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>25:10 / {lesson.duration}</span>
              <span>HD Stereo Audio</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
