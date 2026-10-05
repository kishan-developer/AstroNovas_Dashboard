'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { assessmentService } from '@/lib/api';
import {
  ClipboardCheck,
  Plus,
  CheckCircle,
  Clock,
  Users,
  Edit,
  Trash2,
  Search,
  Eye,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface QuizItem {
  id: string;
  title: string;
  course: string;
  questionsCount: number;
  duration: string;
  passRate: string;
  attempts: number;
  status: 'Published' | 'Draft';
}

const DEFAULT_QUIZZES: QuizItem[] = [
  { id: 'QZ-01', title: 'Stellar Evolution & Redshift Quiz', course: 'Astrophysics & Cosmology 101', questionsCount: 15, duration: '20 mins', passRate: '88%', attempts: 1240, status: 'Published' },
  { id: 'QZ-02', title: 'Hohmann Transfer Trajectory Assessment', course: 'Orbital Mechanics Masterclass', questionsCount: 10, duration: '15 mins', passRate: '92%', attempts: 810, status: 'Published' },
  { id: 'QZ-03', title: 'Narrowband Imaging Calibration Exam', course: 'Deep Sky Astrophotography', questionsCount: 20, duration: '30 mins', passRate: '79%', attempts: 520, status: 'Published' },
  { id: 'QZ-04', title: 'James Webb Telescope Data Science Test', course: 'James Webb Telescope Data Analysis', questionsCount: 12, duration: '25 mins', passRate: '94%', attempts: 340, status: 'Draft' },
];

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(DEFAULT_QUIZZES);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Published' | 'Draft'>('All');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizItem | null>(null);
  const [deletingQuiz, setDeletingQuiz] = useState<QuizItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    course: 'Astrophysics & Cosmology 101',
    questionsCount: 10,
    duration: '20 mins',
    status: 'Published' as 'Published' | 'Draft',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Quizzes from API
  useEffect(() => {
    async function loadQuizzes() {
      try {
        const data = await assessmentService.getQuizzes();
        if (data && Array.isArray(data) && data.length > 0) {
          setQuizzes(data);
        }
      } catch (err) {
        console.warn('Failed to load quizzes from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuizzes();
  }, []);

  // Filtered Quizzes
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(q => {
      const matchesSearch =
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.course.toLowerCase().includes(search.toLowerCase()) ||
        q.id.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'All' || q.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [quizzes, search, activeTab]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setFormData({
      title: '',
      course: 'Astrophysics & Cosmology 101',
      questionsCount: 10,
      duration: '20 mins',
      status: 'Published',
    });
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (quiz: QuizItem) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      course: quiz.course,
      questionsCount: quiz.questionsCount,
      duration: quiz.duration,
      status: quiz.status,
    });
  };

  // Save Quiz (Create or Edit)
  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingQuiz) {
      const updated: QuizItem = {
        ...editingQuiz,
        title: formData.title,
        course: formData.course,
        questionsCount: Number(formData.questionsCount),
        duration: formData.duration,
        status: formData.status,
      };

      try {
        await assessmentService.updateQuiz(editingQuiz.id, updated);
      } catch (err) {
        console.warn('API quiz update failed:', err);
      }

      setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? updated : q));
      setEditingQuiz(null);
    } else {
      const newQuiz: QuizItem = {
        id: `QZ-0${quizzes.length + 1}`,
        title: formData.title,
        course: formData.course,
        questionsCount: Number(formData.questionsCount),
        duration: formData.duration,
        passRate: '90%',
        attempts: 0,
        status: formData.status,
      };

      try {
        await assessmentService.createQuiz(newQuiz);
      } catch (err) {
        console.warn('API quiz create failed:', err);
      }

      setQuizzes(prev => [newQuiz, ...prev]);
      setIsCreateModalOpen(false);
    }

    setIsSubmitting(false);
  };

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deletingQuiz) return;

    try {
      await assessmentService.deleteQuiz(deletingQuiz.id);
    } catch (err) {
      console.warn('API quiz delete failed:', err);
    }

    setQuizzes(prev => prev.filter(q => q.id !== deletingQuiz.id));
    setDeletingQuiz(null);
  };

  return (
    <DashboardLayout title="Quizzes & Assessments" breadcrumb={['Assessments', 'Quizzes']} activeItem="Quizzes" role="admin">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Quizzes & Assessment Studio</h1>
            <p className="text-gray-500 text-sm font-normal">Manage automated testing suites, course quizzes, and evaluation metrics</p>
          </div>
          <Button onClick={handleOpenCreateModal} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
            <Plus size={18} className="mr-1.5" /> Create New Quiz
          </Button>
        </div>

        {/* Toolbar & Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search quiz title, course, or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {(['All', 'Published', 'Draft'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
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

        {/* Quizzes Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuizzes.map(q => (
            <Card key={q.id} className="p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <Badge variant="primary" className="font-semibold">{q.course}</Badge>
                  <span className="font-mono text-gray-500 text-xs">{q.id}</span>
                </div>

                <div>
                  <h3 className="font-semibold text-black text-base leading-snug">{q.title}</h3>
                  <p className="text-xs text-gray-500 font-normal mt-1 flex items-center gap-2">
                    <Clock size={14} className="text-purple-700" /> {q.duration} • {q.questionsCount} Questions
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-purple-50 rounded-md border border-purple-200 text-xs">
                  <div>
                    <span className="text-purple-900 font-normal">Total Attempts</span>
                    <p className="font-semibold text-black text-sm">{q.attempts}</p>
                  </div>
                  <div>
                    <span className="text-purple-900 font-normal">Pass Rate</span>
                    <p className="font-semibold text-purple-700 text-sm">{q.passRate}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Link href={`/admin/assessments/quizzes/${q.id}`}>
                  <Button size="sm" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs">
                    <Eye size={14} className="mr-1" /> View & Build Quiz
                  </Button>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(q)}
                    className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                    title="Edit Quiz Attributes"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setDeletingQuiz(q)}
                    className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                    title="Delete Quiz"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create / Edit Quiz Modal */}
        <Modal
          isOpen={isCreateModalOpen || !!editingQuiz}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingQuiz(null);
          }}
          title={editingQuiz ? `Edit Quiz: ${editingQuiz.id}` : 'Create New Assessment Quiz'}
          size="md"
        >
          <form onSubmit={handleSaveQuiz} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Quiz Title</label>
              <Input
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Stellar Evolution & Redshift Quiz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Associated Course</label>
              <select
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="Astrophysics & Cosmology 101">Astrophysics & Cosmology 101</option>
                <option value="Orbital Mechanics Masterclass">Orbital Mechanics Masterclass</option>
                <option value="Deep Sky Astrophotography">Deep Sky Astrophotography</option>
                <option value="James Webb Telescope Data Analysis">James Webb Telescope Data Analysis</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Questions Count</label>
                <Input
                  type="number"
                  value={formData.questionsCount}
                  onChange={e => setFormData({ ...formData, questionsCount: Number(e.target.value) })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Time Duration</label>
                <Input
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 20 mins"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Publishing Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => { setIsCreateModalOpen(false); setEditingQuiz(null); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {isSubmitting ? 'Saving...' : editingQuiz ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deletingQuiz}
          onClose={() => setDeletingQuiz(null)}
          title="Delete Assessment Quiz"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-md border border-purple-200">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="text-xs text-purple-900 font-normal">
                Are you sure you want to delete <span className="font-semibold">{deletingQuiz?.title}</span>?
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setDeletingQuiz(null)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-black hover:bg-gray-900 text-white font-semibold">
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
