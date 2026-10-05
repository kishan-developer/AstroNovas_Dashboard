'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, CheckCircle, Lock } from 'lucide-react';

export default function StudentSettingsPage() {
  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@example.com');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout title="Account Settings" breadcrumb={['Student', 'Settings']} activeItem="Settings" role="student">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Account Settings</h1>
          <p className="text-gray-500 text-sm">Update personal preferences, password, and notification settings</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} /> Settings saved successfully!
          </div>
        )}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Email Reminders for Deadlines</h4>
                <p className="text-xs text-gray-500">Receive email alerts 24 hours before quiz & assignment deadlines</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <Save size={16} className="mr-2" /> Save Account Settings
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
