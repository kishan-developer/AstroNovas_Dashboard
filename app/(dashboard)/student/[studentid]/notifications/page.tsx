'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, CheckCircle, Clock } from 'lucide-react';

const studentNotifications = [
  { id: 1, title: 'Assignment Graded: Spectroscopic Analysis', text: 'Dr. Robert Lang graded your report: 95/100.', time: '2 hours ago', unread: true },
  { id: 2, title: 'New Lesson Uploaded in Astrophysics 101', text: 'Lesson 3.2 General Relativity is now available.', time: '1 day ago', unread: false },
  { id: 3, title: 'Quiz Due Tomorrow', text: 'Hohmann Transfer Trajectory Assessment due Sep 02.', time: '2 days ago', unread: false },
];

export default function StudentNotificationsPage() {
  return (
    <DashboardLayout title="Notifications" breadcrumb={['Student', 'Notifications']} activeItem="Notifications" role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications Inbox</h1>
          <p className="text-gray-500 text-sm">Stay updated on course announcements, feedback, and reminders</p>
        </div>

        <div className="space-y-3">
          {studentNotifications.map(n => (
            <Card key={n.id} className={`p-4 flex items-start gap-4 ${n.unread ? 'bg-violet-50/60 border-violet-200' : 'bg-white'}`}>
              <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 text-sm">{n.title}</h4>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{n.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
