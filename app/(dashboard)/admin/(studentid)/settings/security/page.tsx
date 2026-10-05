'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Lock, Save, CheckCircle } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(true);
  const [saved, setSaved] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout title="Security Settings" breadcrumb={['Settings', 'Security']} activeItem="Security" role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Authentication</h1>
          <p className="text-gray-500 text-sm">Update password, two-factor authentication, and login sessions</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} /> Password updated successfully!
          </div>
        )}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <h3 className="font-bold text-gray-900 text-base">Change Password</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-violet-50 rounded-2xl border border-violet-100 mt-6">
              <div>
                <h4 className="font-semibold text-violet-900 text-sm">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-violet-700">Require authenticator app verification code on admin login</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={e => setTwoFactor(e.target.checked)}
                className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <ShieldCheck size={16} className="mr-2" /> Update Security Credentials
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
