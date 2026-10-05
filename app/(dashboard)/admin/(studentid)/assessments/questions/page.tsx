'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { assessmentService } from '@/lib/api';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  HelpCircle,
  AlertTriangle,
  Filter,
  CheckCircle
} from 'lucide-react';

interface BankQuestion {
  id: string;
  question: string;
  type: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

const DEFAULT_BANK: BankQuestion[] = [
  { id: 'Q-901', question: 'What equation models the critical mass density required for a flat universe?', type: 'Multiple Choice', category: 'Cosmology', difficulty: 'Hard', points: 10 },
  { id: 'Q-902', question: 'True or False: A Hohmann transfer orbit requires minimum delta-v for co-planar circular orbit transfers.', type: 'True / False', category: 'Orbital Mechanics', difficulty: 'Medium', points: 5 },
  { id: 'Q-903', question: 'Calculate the wavelength shift of H-alpha radiation at z = 0.5.', type: 'Numeric Input', category: 'Astrophysics', difficulty: 'Hard', points: 10 },
  { id: 'Q-904', question: 'Identify the primary cause of chromatic aberration in refractor telescope lenses.', type: 'Multiple Choice', category: 'Astrophotography', difficulty: 'Easy', points: 5 },
  { id: 'Q-905', question: 'Determine the orbital velocity at Low Earth Orbit altitude of 400km.', type: 'Numeric Input', category: 'Space Engineering', difficulty: 'Medium', points: 8 },
];

export default function QuestionsBankPage() {
  const [questions, setQuestions] = useState<BankQuestion[]>(DEFAULT_BANK);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<BankQuestion | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<BankQuestion | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    question: '',
    type: 'Multiple Choice',
    category: 'Cosmology',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    points: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Questions from API
  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await assessmentService.getQuestionsBank();
        if (data && Array.isArray(data) && data.length > 0) {
          setQuestions(data);
        }
      } catch (err) {
        console.warn('Failed to load questions bank from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  // Filtered Questions via useMemo
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch =
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.category.toLowerCase().includes(search.toLowerCase()) ||
        q.id.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [questions, search, selectedDifficulty, selectedCategory]);

  // Handle Save (Create / Edit)
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingQuestion) {
      const updated: BankQuestion = {
        ...editingQuestion,
        question: formData.question,
        type: formData.type,
        category: formData.category,
        difficulty: formData.difficulty,
        points: Number(formData.points),
      };

      setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? updated : q));
      setEditingQuestion(null);
    } else {
      const newQ: BankQuestion = {
        id: `Q-${Math.floor(900 + Math.random() * 100)}`,
        question: formData.question,
        type: formData.type,
        category: formData.category,
        difficulty: formData.difficulty,
        points: Number(formData.points),
      };

      try {
        await assessmentService.createQuestion(newQ);
      } catch (err) {
        console.warn('API question create failed:', err);
      }

      setQuestions(prev => [newQ, ...prev]);
      setIsAddModalOpen(false);
    }

    setIsSubmitting(false);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingQuestion) return;

    try {
      await assessmentService.deleteQuestion(deletingQuestion.id);
    } catch (err) {
      console.warn('API question delete failed:', err);
    }

    setQuestions(prev => prev.filter(q => q.id !== deletingQuestion.id));
    setDeletingQuestion(null);
  };

  return (
    <DashboardLayout title="Questions Bank" breadcrumb={['Assessments', 'Questions Bank']} activeItem="Questions" role="admin">
      <div className="space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Question Bank Repository</h1>
            <p className="text-gray-500 text-sm font-normal">Centralized question bank tagged by subject category and difficulty</p>
          </div>
          <Button
            onClick={() => {
              setFormData({ question: '', type: 'Multiple Choice', category: 'Cosmology', difficulty: 'Medium', points: 5 });
              setIsAddModalOpen(true);
            }}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold"
          >
            <Plus size={18} className="mr-1.5" /> Add New Question
          </Button>
        </div>

        {/* Toolbar & Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search question text or category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-xs font-semibold text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-xs font-semibold text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="All">All Categories</option>
                <option value="Cosmology">Cosmology</option>
                <option value="Orbital Mechanics">Orbital Mechanics</option>
                <option value="Astrophysics">Astrophysics</option>
                <option value="Astrophotography">Astrophotography</option>
                <option value="Space Engineering">Space Engineering</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.map(q => (
            <Card key={q.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="primary" className="font-semibold">{q.type}</Badge>
                    <Badge variant="secondary" className="font-semibold">{q.category}</Badge>
                    <Badge variant={q.difficulty === 'Hard' ? 'danger' : 'warning'} className="font-semibold">{q.difficulty}</Badge>
                    <span className="text-xs text-purple-700 font-semibold">{q.points} Points</span>
                    <span className="text-xs text-gray-500 font-mono">{q.id}</span>
                  </div>
                  <h4 className="font-semibold text-black text-base leading-snug">{q.question}</h4>
                </div>
              </div>

              <div className="flex items-center gap-1 self-end sm:self-center">
                <button
                  onClick={() => {
                    setEditingQuestion(q);
                    setFormData({
                      question: q.question,
                      type: q.type,
                      category: q.category,
                      difficulty: q.difficulty,
                      points: q.points,
                    });
                  }}
                  className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                  title="Edit Question"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setDeletingQuestion(q)}
                  className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                  title="Delete Question"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add / Edit Question Modal */}
        <Modal
          isOpen={isAddModalOpen || !!editingQuestion}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingQuestion(null);
          }}
          title={editingQuestion ? `Edit Question: ${editingQuestion.id}` : 'Add New Question to Bank'}
          size="md"
        >
          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Question Prompt</label>
              <Input
                value={formData.question}
                onChange={e => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter question text..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Question Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="True / False">True / False</option>
                  <option value="Numeric Input">Numeric Input</option>
                  <option value="Lab Code Task">Lab Code Task</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="Cosmology">Cosmology</option>
                  <option value="Orbital Mechanics">Orbital Mechanics</option>
                  <option value="Astrophysics">Astrophysics</option>
                  <option value="Astrophotography">Astrophotography</option>
                  <option value="Space Engineering">Space Engineering</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value as any })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Points</label>
                <Input
                  type="number"
                  value={formData.points}
                  onChange={e => setFormData({ ...formData, points: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => { setIsAddModalOpen(false); setEditingQuestion(null); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {isSubmitting ? 'Saving...' : editingQuestion ? 'Update Question' : 'Add Question'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deletingQuestion}
          onClose={() => setDeletingQuestion(null)}
          title="Delete Question"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-md border border-purple-200">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="text-xs text-purple-900 font-normal">
                Delete this question from the Question Bank?
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setDeletingQuestion(null)}>
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
