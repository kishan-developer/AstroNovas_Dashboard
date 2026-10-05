'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Save, CheckCircle } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [name, setName] = useState('Kishan Kumar Ray');
  const [email, setEmail] = useState('kishan@example.com');
  const [role, setRole] = useState('System Administrator');
  const [bio, setBio] = useState('Lead platform administrator & curriculum developer at AstroNovas.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout title="Profile Settings" breadcrumb={['Settings', 'Profile']} activeItem="Profile" role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-500 text-sm">Manage personal account details and public administrator info</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} /> Profile updated!
          </div>
        )}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white font-bold text-2xl rounded-full flex items-center justify-center shadow-md">
                {name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role Title</label>
              <Input value={role} onChange={e => setRole(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Notes</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <Save size={16} className="mr-2" /> Save Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
