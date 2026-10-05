'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings, Save, CheckCircle } from 'lucide-react';

export default function GeneralSettingsPage() {
  const [appName, setAppName] = useState('AstroNovas LMS');
  const [supportEmail, setSupportEmail] = useState('support@astronovas.com');
  const [currency, setCurrency] = useState('INR (₹)');
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout title="General Settings" breadcrumb={['Settings', 'General']} activeItem="General" role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Platform Settings</h1>
          <p className="text-gray-500 text-sm">Configure site metadata, branding, and system defaults</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} /> Settings saved successfully!
          </div>
        )}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Name</label>
              <Input value={appName} onChange={e => setAppName(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Support & Admin Email</label>
              <Input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee (Default)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Maintenance Mode</h4>
                <p className="text-xs text-gray-500">Temporarily restrict access for non-admin users during updates</p>
              </div>
              <input
                type="checkbox"
                checked={maintenance}
                onChange={e => setMaintenance(e.target.checked)}
                className="w-5 h-5 text-[#7C3AED] rounded focus:ring-[#7C3AED]"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
