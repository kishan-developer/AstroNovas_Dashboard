'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Video, Upload, GripVertical, Plus, Trash2, CheckCircle, FileText, Link as LinkIcon } from 'lucide-react';

export default function LessonManagementPage() {
  const [selectedCourse, setSelectedCourse] = useState('CRS-01');
  const [lessonsSequence, setLessonsSequence] = useState([
    { id: 1, title: 'Lesson 1.1: Cosmic Background Radiation', duration: '28m', type: 'Video', videoUrl: 's3://astro/lessons/cbr.mp4' },
    { id: 2, title: 'Lesson 1.2: General Relativity & Space-Time', duration: '42m', type: 'Video', videoUrl: 's3://astro/lessons/gr.mp4' },
    { id: 3, title: 'Lesson 1.3: Lab Work & Spectroscopy Data Sheet', duration: '15m', type: 'PDF Resource', videoUrl: '' },
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...lessonsSequence];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    setLessonsSequence(items);
  };

  const moveDown = (index: number) => {
    if (index === lessonsSequence.length - 1) return;
    const items = [...lessonsSequence];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    setLessonsSequence(items);
  };

  return (
    <DashboardLayout title="Lesson Management" breadcrumb={['Lessons', 'Lesson Management']} activeItem="Lesson Management" role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lesson Management Studio</h1>
            <p className="text-gray-500 text-sm">Reorder lesson sequences, upload video assets, and attach resources</p>
          </div>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
            <Plus size={18} className="mr-2" /> Add Lesson to Module
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Select Course:</label>
            <select
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            >
              <option value="CRS-01">Astrophysics & Cosmology 101</option>
              <option value="CRS-02">Orbital Mechanics Masterclass</option>
              <option value="CRS-03">Deep Sky Astrophotography</option>
            </select>
          </div>
        </Card>

        {/* Studio Drag and Reorder List */}
        <Card className="p-6 space-y-4">
          <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
            <CardTitle>Lesson Sequencing & Media Upload</CardTitle>
            <Badge variant="secondary">Drag / Shift Reorder</Badge>
          </CardHeader>

          <div className="space-y-3">
            {lessonsSequence.map((item, idx) => (
              <div key={item.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveUp(idx)} className="text-gray-400 hover:text-[#7C3AED] text-xs font-bold">▲</button>
                    <button onClick={() => moveDown(idx)} className="text-gray-400 hover:text-[#7C3AED] text-xs font-bold">▼</button>
                  </div>
                  <div className="w-10 h-10 bg-violet-100 text-violet-700 rounded-xl flex items-center justify-center font-bold">
                    {item.type === 'Video' ? <Video size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.duration} • {item.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.videoUrl ? (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle size={12} className="mr-1" /> Media Attached
                    </Badge>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs">
                      <Upload size={14} className="mr-1" /> Upload Video
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
