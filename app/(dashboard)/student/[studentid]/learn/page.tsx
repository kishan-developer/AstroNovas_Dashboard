'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, CheckCircle, Video, FileText, Download, MessageSquare, ChevronRight } from 'lucide-react';

export default function StudentLearnPage() {
  const [activeLessonId, setActiveLessonId] = useState(2);
  const [isPlaying, setIsPlaying] = useState(true);

  const lessons = [
    { id: 1, title: '1.1 Cosmic Microwave Background Overview', duration: '28:15', completed: true },
    { id: 2, title: '1.2 General Relativity & Space-Time Curvature', duration: '42:10', completed: false },
    { id: 3, title: '1.3 Black Hole Event Horizon Thermodynamics', duration: '35:00', completed: false },
    { id: 4, title: '1.4 Laboratory Spectroscopy Exercise', duration: '20:45', completed: false },
  ];

  return (
    <DashboardLayout title="Learning Player" breadcrumb={['Student', 'Learn']} activeItem="Learn" role="student">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video & Content Area */}
          <div className="flex-1 space-y-4">
            {/* Video Player Box */}
            <div className="bg-slate-950 rounded-3xl overflow-hidden aspect-video flex flex-col justify-between p-6 relative border border-violet-500/20 shadow-2xl">
              <div className="flex justify-between items-center text-white z-10">
                <Badge variant="secondary" className="bg-white/10 text-white border-0">Astrophysics 101</Badge>
                <span className="text-xs text-gray-300">HD 1080p</span>
              </div>
              <div className="text-center space-y-3 z-10">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all scale-105 hover:scale-110"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </button>
                <h3 className="text-white font-bold text-lg sm:text-xl">1.2 General Relativity & Space-Time Curvature</h3>
              </div>
              <div className="space-y-2 z-10">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7C3AED] h-full" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>18:55 / 42:10</span>
                  <span>Auto-next enabled</span>
                </div>
              </div>
            </div>

            {/* Lesson Resources & Notes */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Lesson Resources & Lecture Notes</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                In this lecture, Dr. Robert Lang details the Einstein Field Equations and spacetime curvature metrics. Make sure to complete the attached PDF problem set prior to starting Lesson 1.3.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="text-xs">
                  <Download size={14} className="mr-1" /> Lecture Notes (.pdf)
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Download size={14} className="mr-1" /> Python Code (.ipynb)
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar Lesson Playlist */}
          <div className="w-full lg:w-96 space-y-4">
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Course Curriculum</h3>
              <div className="space-y-2">
                {lessons.map(les => (
                  <div
                    key={les.id}
                    onClick={() => setActiveLessonId(les.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      activeLessonId === les.id
                        ? 'border-[#7C3AED] bg-violet-50 text-[#7C3AED] font-semibold'
                        : 'border-gray-100 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {les.completed ? (
                        <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                      ) : (
                        <Video size={18} className={activeLessonId === les.id ? 'text-[#7C3AED]' : 'text-gray-400'} />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{les.title}</p>
                        <span className="text-[10px] text-gray-400">{les.duration}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
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
