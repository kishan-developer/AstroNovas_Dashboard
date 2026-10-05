'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Save, CheckCircle } from 'lucide-react';

export default function NotificationSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [newEnrollments, setNewEnrollments] = useState(true);
  const [quizSubmissions, setQuizSubmissions] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout title="Notification Settings" breadcrumb={['Settings', 'Notifications']} activeItem="Notifications" role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
          <p className="text-gray-500 text-sm">Control admin alert channels and email notifications</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} /> Notification preferences updated!
          </div>
        )}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">System Email Digest</h4>
                  <p className="text-xs text-gray-500">Receive daily summary of student enrollments and site activity</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={e => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Instant New Enrollment Alerts</h4>
                  <p className="text-xs text-gray-500">Get notified immediately when a new student purchases a course</p>
                </div>
                <input
                  type="checkbox"
                  checked={newEnrollments}
                  onChange={e => setNewEnrollments(e.target.checked)}
                  className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Assignment Submission Notifications</h4>
                  <p className="text-xs text-gray-500">Receive alerts when lab reports are submitted for grading</p>
                </div>
                <input
                  type="checkbox"
                  checked={quizSubmissions}
                  onChange={e => setQuizSubmissions(e.target.checked)}
                  className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <Save size={16} className="mr-2" /> Save Preferences
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
