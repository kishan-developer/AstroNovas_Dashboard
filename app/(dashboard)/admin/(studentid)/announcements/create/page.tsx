'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Bell, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateAnnouncementPage() {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('All Users');
  const [content, setContent] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="Create Announcement" breadcrumb={['Announcements', 'Create Announcement']} activeItem="Create Announcement" role="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/announcements">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Broadcast Announcement</h1>
            <p className="text-gray-500 text-sm">Send a notice or banner alert to learners and mentors</p>
          </div>
        </div>

        {submitted ? (
          <Card className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Announcement Broadcasted!</h2>
            <p className="text-gray-500 text-sm">
              Your announcement "<span className="font-semibold text-gray-800">{title}</span>" is now published for {audience}.
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <Button onClick={() => setSubmitted(false)} variant="outline">Create Another</Button>
              <Link href="/admin/announcements">
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">View All Announcements</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Headline</label>
                <Input
                  placeholder="e.g. System Maintenance Notice or New Course Release"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                >
                  <option value="All Users">All Users (Students, Mentors, Admins)</option>
                  <option value="Enrolled Students Only">Enrolled Students Only</option>
                  <option value="Mentors Only">Mentors & Instructors Only</option>
                  <option value="Astrophysics 101 Cohort">Astrophysics 101 Cohort</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message Body</label>
                <textarea
                  rows={5}
                  placeholder="Write announcement details here..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl border border-violet-100">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmail}
                  onChange={e => setSendEmail(e.target.checked)}
                  className="w-4 h-4 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
                />
                <label htmlFor="sendEmail" className="text-sm font-medium text-violet-900 cursor-pointer">
                  Send immediate email notification push to target audience
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Link href="/admin/announcements">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                  <Send size={16} className="mr-2" /> Broadcast Announcement
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
