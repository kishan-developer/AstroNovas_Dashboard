'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, CheckCircle, ArrowLeft, Star, Send } from 'lucide-react';
import Link from 'next/link';

export default function GradingStudioPage() {
  const [score, setScore] = useState('92');
  const [feedback, setFeedback] = useState('Excellent work on calculating the Doppler shift parameter z. The error margins in table 2 are well derived.');
  const [isSaved, setIsSaved] = useState(false);

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  return (
    <DashboardLayout title="Grading Studio" breadcrumb={['Assignments', 'Grading']} activeItem="Grading" role="admin">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/assignments/submissions">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Grading & Review Studio</h1>
            <p className="text-gray-500 text-sm">Evaluating submission for Sarah Jenkins</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Preview Panel */}
          <Card className="lg:col-span-2 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">Spectroscopic Redshift Analysis Report</h3>
                <p className="text-xs text-gray-500">Submitted by Sarah Jenkins • Sep 28, 2026</p>
              </div>
              <Button size="sm" variant="outline">
                <Download size={14} className="mr-1" /> Download .pdf
              </Button>
            </div>

            {/* Document Viewer Box */}
            <div className="bg-gray-900 text-gray-200 p-6 rounded-2xl font-mono text-xs space-y-3 min-h-[300px]">
              <div className="text-emerald-400 border-b border-gray-800 pb-2">
                === ASTROPHYSICS LAB REPORT: REDSHIFT MEASUREMENTS ===
              </div>
              <p>Student ID: STU-1001</p>
              <p>Target Object: NGC 4151 (Seyfert Galaxy)</p>
              <p>Observed H-alpha Wavelength: 686.2 nm</p>
              <p>Rest Wavelength: 656.3 nm</p>
              <p className="text-amber-300">Computed Redshift z = (686.2 - 656.3) / 656.3 = 0.04556</p>
              <p className="text-gray-400">Recession Velocity v = z * c = 13,660 km/s</p>
              <p className="pt-4 text-gray-500 border-t border-gray-800">[End of Student Document Stream]</p>
            </div>
          </Card>

          {/* Grading Input Panel */}
          <Card className="p-6">
            {isSaved ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-bold text-gray-900">Grade Submitted!</h3>
                <p className="text-xs text-gray-500">Score of {score}/100 recorded. Notification sent to student.</p>
                <Button onClick={() => setIsSaved(false)} variant="outline" size="sm">
                  Edit Grade
                </Button>
              </div>
            ) : (
              <form onSubmit={handleGrade} className="space-y-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Assign Score</CardTitle>
                </CardHeader>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Score (Out of 100)</label>
                  <Input
                    type="number"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    required
                    className="font-extrabold text-lg text-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Instructor Feedback</label>
                  <textarea
                    rows={5}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    placeholder="Enter feedback for student..."
                  />
                </div>

                <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                  <Send size={16} className="mr-2" /> Save & Send Grade
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
