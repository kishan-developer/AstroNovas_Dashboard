'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Bell, Plus, Users, Calendar, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

const announcements = [
  { id: 'ANC-01', title: 'New Masterclass Released: James Webb Spectral Data Analysis', audience: 'All Students & Instructors', sentDate: 'Aug 26, 2026', views: 4890, status: 'Published' },
  { id: 'ANC-02', title: 'Scheduled Platform System Maintenance on Sunday 02:00 UTC', audience: 'All Users', sentDate: 'Aug 20, 2026', views: 12400, status: 'Published' },
  { id: 'ANC-03', title: 'Astrophysics 101 Live Q&A Webinar Session Reminder', audience: 'Enrolled in Astrophysics 101', sentDate: 'Aug 14, 2026', views: 1420, status: 'Published' },
];

export default function AllAnnouncementsPage() {
  return (
    <DashboardLayout title="All Announcements" breadcrumb={['Announcements', 'All Announcements']} activeItem="All Announcements" role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Announcements</h1>
            <p className="text-gray-500 text-sm">Send platform-wide broadcast notifications and messages</p>
          </div>
          <Link href="/admin/announcements/create">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              <Plus size={18} className="mr-2" /> New Announcement
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {announcements.map(anc => (
            <Card key={anc.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 text-violet-700 rounded-2xl flex items-center justify-center font-bold shrink-0">
                  <Bell size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary"><Users size={12} className="mr-1" /> {anc.audience}</Badge>
                    <span className="text-xs text-gray-400 font-mono">{anc.id}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">{anc.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                    <Calendar size={12} /> {anc.sentDate} • {anc.views} Total Views
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
