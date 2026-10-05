'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ClipboardCheck, Clock, CheckCircle } from 'lucide-react';

const studentQuizzes = [
  { id: 'QZ-01', title: 'Stellar Evolution & Redshift Quiz', course: 'Astrophysics 101', questions: 15, duration: '20 mins', status: 'Completed', score: '96%' },
  { id: 'QZ-02', title: 'Hohmann Transfer Trajectory Assessment', course: 'Orbital Mechanics', questions: 10, duration: '15 mins', status: 'Available', dueDate: 'Sep 02, 2026' },
  { id: 'QZ-03', title: 'Narrowband Calibration Exam', course: 'Astrophotography', questions: 20, duration: '30 mins', status: 'Completed', score: '88%' },
];

export default function StudentQuizzesPage() {
  return (
    <DashboardLayout title="My Quizzes" breadcrumb={['Student', 'Quizzes']} activeItem="Quizzes" role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quizzes & Assessments</h1>
          <p className="text-gray-500 text-sm">Test your knowledge and track score performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentQuizzes.map(q => (
            <Card key={q.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{q.course}</Badge>
                <Badge variant={q.status === 'Completed' ? 'success' : 'warning'}>{q.status}</Badge>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{q.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{q.questions} Questions • {q.duration}</p>
              </div>

              {q.score ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
                  <span>Score Achieved:</span>
                  <span className="text-sm font-bold">{q.score}</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-semibold">
                  Due: {q.dueDate}
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <Button size="sm" className={q.status === 'Completed' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'}>
                  {q.status === 'Completed' ? 'Review Quiz' : 'Take Quiz Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
