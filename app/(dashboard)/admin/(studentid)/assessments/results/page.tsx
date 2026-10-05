'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { assessmentService } from '@/lib/api';
import {
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Clock,
  Award,
  Users,
  FileText
} from 'lucide-react';

interface ResultRecord {
  id: string;
  studentId: string;
  student: string;
  quiz: string;
  score: string;
  result: 'Passed' | 'Failed';
  date: string;
  timeTaken?: string;
  correctAnswers?: string;
}

const DEFAULT_RESULTS: ResultRecord[] = [
  { id: 'ATT-8801', studentId: 'STU-1001', student: 'Aarav Sharma', quiz: 'Stellar Evolution & Redshift Quiz', score: '96%', result: 'Passed', date: '10 mins ago', timeTaken: '14 mins', correctAnswers: '14/15' },
  { id: 'ATT-8802', studentId: 'STU-1002', student: 'Ananya Patel', quiz: 'Hohmann Transfer Trajectory Assessment', score: '92%', result: 'Passed', date: '45 mins ago', timeTaken: '11 mins', correctAnswers: '9/10' },
  { id: 'ATT-8803', studentId: 'STU-1003', student: 'Rohan Gupta', quiz: 'Narrowband Imaging Calibration Exam', score: '88%', result: 'Passed', date: '2 hours ago', timeTaken: '24 mins', correctAnswers: '18/20' },
  { id: 'ATT-8804', studentId: 'STU-1004', student: 'Priya Verma', quiz: 'Stellar Evolution & Redshift Quiz', score: '55%', result: 'Failed', date: '3 hours ago', timeTaken: '19 mins', correctAnswers: '8/15' },
  { id: 'ATT-8805', studentId: 'STU-1005', student: 'Aditya Kumar', quiz: 'James Webb Telescope Data Science Test', score: '94%', result: 'Passed', date: '5 hours ago', timeTaken: '20 mins', correctAnswers: '11/12' },
];

export default function AssessmentResultsPage() {
  const [results, setResults] = useState<ResultRecord[]>(DEFAULT_RESULTS);
  const [search, setSearch] = useState('');
  const [activeOutcomeTab, setActiveOutcomeTab] = useState<'All' | 'Passed' | 'Failed'>('All');
  const [selectedResult, setSelectedResult] = useState<ResultRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Assessment Results from API
  useEffect(() => {
    async function loadResults() {
      try {
        const data = await assessmentService.getAssessmentResults();
        if (data && Array.isArray(data) && data.length > 0) {
          setResults(data);
        }
      } catch (err) {
        console.warn('Failed to load assessment results from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  // Filtered Results via useMemo
  const filteredResults = useMemo(() => {
    return results.filter(r => {
      const matchesSearch =
        r.student.toLowerCase().includes(search.toLowerCase()) ||
        r.quiz.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeOutcomeTab === 'All' || r.result === activeOutcomeTab;
      return matchesSearch && matchesTab;
    });
  }, [results, search, activeOutcomeTab]);

  // Statistics counters
  const stats = useMemo(() => {
    const total = results.length;
    const passed = results.filter(r => r.result === 'Passed').length;
    const failed = results.filter(r => r.result === 'Failed').length;
    const passPercentage = total > 0 ? `${Math.round((passed / total) * 100)}%` : '0%';
    return { total, passed, failed, passPercentage };
  }, [results]);

  return (
    <DashboardLayout title="Assessment Results" breadcrumb={['Assessments', 'Results & Attempt Log']} activeItem="Results" role="admin">
      <div className="space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Assessment Results & Attempt Metrics</h1>
            <p className="text-gray-500 text-sm font-normal">Real-time student score history, attempt diagnostics, and pass rates</p>
          </div>
        </div>

        {/* Stats Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Total Attempts</p>
              <p className="text-lg font-semibold text-black">{stats.total}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center font-semibold border border-purple-200">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Passed Attempts</p>
              <p className="text-lg font-semibold text-purple-700">{stats.passed}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Global Pass Rate</p>
              <p className="text-lg font-semibold text-black">{stats.passPercentage}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-semibold">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Failed Attempts</p>
              <p className="text-lg font-semibold text-gray-700">{stats.failed}</p>
            </div>
          </Card>
        </div>

        {/* Toolbar & Filter Tabs */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search student, quiz title, or attempt ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {(['All', 'Passed', 'Failed'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveOutcomeTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeOutcomeTab === tab
                      ? 'bg-purple-700 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Results Table */}
        <Card className="overflow-hidden p-0 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-black uppercase tracking-wider">
                  <th className="py-3 px-4">Attempt ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Assessment Quiz</th>
                  <th className="py-3 px-4">Score & Correct Answers</th>
                  <th className="py-3 px-4">Outcome</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm font-normal text-black">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-purple-700">{r.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-black">{r.student}</td>
                    <td className="py-3.5 px-4 text-gray-700 font-normal">{r.quiz}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-black text-sm">{r.score}</span>
                      <span className="text-xs text-gray-500 font-normal ml-2">({r.correctAnswers || 'N/A'})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={r.result === 'Passed' ? 'primary' : 'danger'}
                        className="font-semibold"
                      >
                        {r.result}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs font-normal">{r.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => setSelectedResult(r)}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs"
                      >
                        <Eye size={14} className="mr-1" /> View Attempt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* View Attempt Breakdown Modal */}
        <Modal
          isOpen={!!selectedResult}
          onClose={() => setSelectedResult(null)}
          title={`Attempt Breakdown: ${selectedResult?.id || ''}`}
          size="md"
        >
          {selectedResult && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-md border border-purple-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-900 font-normal">Student: <span className="font-semibold">{selectedResult.student}</span></span>
                  <span className="font-mono text-purple-700 font-semibold">{selectedResult.id}</span>
                </div>
                <h3 className="font-semibold text-black text-base">{selectedResult.quiz}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 border rounded-md">
                  <p className="text-gray-500 font-normal">Score Achieved</p>
                  <p className="text-lg font-semibold text-purple-700">{selectedResult.score}</p>
                </div>

                <div className="p-3 bg-gray-50 border rounded-md">
                  <p className="text-gray-500 font-normal">Correct Answers</p>
                  <p className="text-lg font-semibold text-black">{selectedResult.correctAnswers || 'N/A'}</p>
                </div>

                <div className="p-3 bg-gray-50 border rounded-md">
                  <p className="text-gray-500 font-normal">Time Taken</p>
                  <p className="text-sm font-semibold text-black">{selectedResult.timeTaken || '15 mins'}</p>
                </div>

                <div className="p-3 bg-gray-50 border rounded-md">
                  <p className="text-gray-500 font-normal">Outcome Result</p>
                  <Badge variant={selectedResult.result === 'Passed' ? 'primary' : 'danger'} className="mt-1 font-semibold">
                    {selectedResult.result}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <Button variant="outline" onClick={() => setSelectedResult(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
