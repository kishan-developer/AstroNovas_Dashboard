'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CheckCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enrolledCourse: 'Astrophysics 101',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="Add Student" breadcrumb={['Students', 'Add Student']} activeItem="Add Student" role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/students">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
            <p className="text-gray-500 text-sm">Fill in the details to enroll a new student</p>
          </div>
        </div>

        {submitted ? (
          <Card className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Student Enrolled Successfully!</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              An invitation email has been sent to <span className="font-semibold text-gray-800">{formData.email}</span> with login credentials.
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <Button onClick={() => setSubmitted(false)} variant="outline">Add Another Student</Button>
              <Link href="/admin/students">
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">View All Students</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">First Name *</label>
                  <Input
                    required
                    placeholder="e.g. Sarah"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Last Name *</label>
                  <Input
                    required
                    placeholder="e.g. Jenkins"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="sarah.j@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Phone Number</label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Initial Course Enrollment</label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  value={formData.enrolledCourse}
                  onChange={(e) => setFormData({ ...formData, enrolledCourse: e.target.value })}
                >
                  <option value="Astrophysics 101">Astrophysics & Cosmology 101</option>
                  <option value="Orbital Mechanics">Orbital Mechanics Masterclass</option>
                  <option value="Astrophotography">Deep Sky Astrophotography</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Link href="/admin/students">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                  <UserPlus size={16} className="mr-2" /> Submit & Enroll
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
