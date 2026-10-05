'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, PlayCircle, Award, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const myCourses = [
  { id: 1, title: 'Astrophysics & Cosmology 101', category: 'Astronomy', progress: 75, status: 'In Progress', lessons: 24, instructor: 'Dr. Vikram Sarabhai' },
  { id: 2, title: 'Orbital Mechanics Masterclass', category: 'Space Engineering', progress: 40, status: 'In Progress', lessons: 32, instructor: 'Prof. Sujata Sen' },
  { id: 3, title: 'Deep Sky Astrophotography', category: 'Astrophotography', progress: 100, status: 'Completed', lessons: 18, instructor: 'Dr. Ananya Roy' },
  { id: 4, title: 'Exoplanet Detection & Habitability', category: 'Astronomy', progress: 0, status: 'Wishlist', lessons: 15, instructor: 'Pandit Shastri' },
];

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = myCourses.filter(c => {
    if (activeTab === 'In Progress') return c.status === 'In Progress';
    if (activeTab === 'Completed') return c.status === 'Completed';
    if (activeTab === 'Wishlist') return c.status === 'Wishlist';
    return true;
  });

  return (
    <DashboardLayout title="My Courses" breadcrumb={['Student', 'Courses']} activeItem="Courses" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h1>
            <p className="text-gray-500 text-sm">Access your active learning materials, completed credentials, and wishlist</p>
          </div>
          <div className="flex items-center gap-2">
            {['All', 'In Progress', 'Completed', 'Wishlist'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === tab ? 'bg-[#7C3AED] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <Card key={course.id} className="flex flex-col justify-between p-6 space-y-4 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant={course.status === 'Completed' ? 'success' : course.status === 'In Progress' ? 'warning' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-500">Instructor: {course.instructor}</p>
                {course.status !== 'Wishlist' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#7C3AED] h-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">{course.lessons} Lessons</span>
                <Link href="/student/1/learn">
                  <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs">
                    {course.status === 'Completed' ? 'Review Course' : 'Continue Course'}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
