'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Calendar, BookOpen, Award } from 'lucide-react';

export default function StudentProfilePage() {
  const student = {
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    joined: 'Jan 15, 2026',
    bio: 'Physics & Astronomy student exploring stellar spectroscopy, exoplanet detection, and deep space astrophotography.',
    enrolledCount: 3,
    certificatesCount: 1,
  };

  return (
    <DashboardLayout title="My Profile" breadcrumb={['Student', 'Profile']} activeItem="Profile" role="student">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-500 text-sm">Public student card and academic summary</p>
        </div>

        <Card className="p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white font-extrabold text-4xl rounded-full flex items-center justify-center mx-auto shadow-lg">
            {student.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-xs text-gray-500 mt-1">{student.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-gray-50 rounded-2xl">
            <div>
              <span className="text-xs text-gray-400">Enrolled Courses</span>
              <p className="text-lg font-bold text-gray-900">{student.enrolledCount}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Certificates</span>
              <p className="text-lg font-bold text-[#7C3AED]">{student.certificatesCount}</p>
            </div>
          </div>

          <div className="text-left pt-4 border-t border-gray-100 space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">About Me</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{student.bio}</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
