'use client';

import React, { use, useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { assessmentService } from '@/lib/api';
import {
  ClipboardCheck,
  ArrowLeft,
  Edit,
  Clock,
  Users,
  Plus,
  Trash2,
  HelpCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

interface QuestionItem {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  type: string;
  category: string;
  difficulty: string;
  points: number;
}

export default function DynamicQuizDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.id || '1';

  const [quiz, setQuiz] = useState<any>({
    id: quizId.startsWith('QZ-') ? quizId : `QZ-0${quizId}`,
    title: 'Stellar Evolution & Redshift Quiz',
    course: 'Astrophysics & Cosmology 101',
    questionsCount: 3,
    duration: '20 mins',
    passRate: '88%',
    attempts: 1240,
    passingScore: 70,
    questions: [
      { id: 'Q-901', question: 'What equation models the critical mass density required for a flat universe?', options: ['Friedmann Equation', 'Hubble Law', 'Kepler 3rd Law', 'Schrödinger Wave'], correctAnswer: 'Friedmann Equation', type: 'Multiple Choice', category: 'Cosmology', difficulty: 'Hard', points: 10 },
      { id: 'Q-902', question: 'True or False: A Hohmann transfer orbit requires minimum delta-v for co-planar circular orbit transfers.', options: ['True', 'False'], correctAnswer: 'True', type: 'True / False', category: 'Orbital Mechanics', difficulty: 'Medium', points: 5 },
      { id: 'Q-903', question: 'Calculate the wavelength shift of H-alpha radiation at z = 0.5.', options: ['984 nm', '656 nm', '720 nm', '512 nm'], correctAnswer: '984 nm', type: 'Numeric Input', category: 'Astrophysics', difficulty: 'Hard', points: 10 },
    ],
  });

  const [loading, setLoading] = useState(true);

  // Add Question Modal state
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<QuestionItem | null>(null);

  // Question Form State
  const [questionData, setQuestionData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    type: 'Multiple Choice',
    category: 'Cosmology',
    difficulty: 'Medium',
    points: 5,
  });

  // Fetch Quiz Data from API
  useEffect(() => {
    async function loadQuiz() {
      try {
        const data = await assessmentService.getQuizById(quizId);
        if (data) {
          setQuiz(data);
        }
      } catch (err) {
        console.warn('Failed to load quiz details from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [quizId]);

  // Open Create Question Modal
  const handleOpenAddQuestion = () => {
    setQuestionData({
      question: '',
      optionA: 'Option A',
      optionB: 'Option B',
      optionC: 'Option C',
      optionD: 'Option D',
      correctAnswer: 'Option A',
      type: 'Multiple Choice',
      category: 'Cosmology',
      difficulty: 'Medium',
      points: 5,
    });
    setIsAddQuestionModalOpen(true);
  };

  // Save Question to Quiz
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingQuestion) {
      const updatedList = quiz.questions.map((q: QuestionItem) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              question: questionData.question,
              type: questionData.type,
              difficulty: questionData.difficulty,
              points: Number(questionData.points),
              options: [questionData.optionA, questionData.optionB, questionData.optionC, questionData.optionD],
              correctAnswer: questionData.correctAnswer,
            }
          : q
      );

      setQuiz({ ...quiz, questions: updatedList });
      setEditingQuestion(null);
    } else {
      const newQuestion: QuestionItem = {
        id: `Q-${Math.floor(900 + Math.random() * 100)}`,
        question: questionData.question,
        options: [questionData.optionA, questionData.optionB, questionData.optionC, questionData.optionD],
        correctAnswer: questionData.correctAnswer,
        type: questionData.type,
        category: questionData.category,
        difficulty: questionData.difficulty,
        points: Number(questionData.points),
      };

      setQuiz({
        ...quiz,
        questionsCount: quiz.questions.length + 1,
        questions: [...quiz.questions, newQuestion],
      });
      setIsAddQuestionModalOpen(false);
    }
  };

  // Confirm Delete Question
  const handleConfirmDeleteQuestion = () => {
    if (!deletingQuestion) return;
    setQuiz({
      ...quiz,
      questionsCount: Math.max(0, quiz.questions.length - 1),
      questions: quiz.questions.filter((q: QuestionItem) => q.id !== deletingQuestion.id),
    });
    setDeletingQuestion(null);
  };

  return (
    <DashboardLayout title={`Quiz: ${quiz.id}`} breadcrumb={['Assessments', 'Quizzes', quiz.id]} activeItem="Quizzes" role="admin">
      <div className="space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/assessments/quizzes">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft size={16} className="mr-1" /> Back to Quizzes
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-black">{quiz.title}</h1>
              <p className="text-gray-500 text-sm font-normal">ID: <span className="font-mono font-semibold text-purple-700">{quiz.id}</span> • {quiz.course}</p>
            </div>
          </div>

          <Button onClick={handleOpenAddQuestion} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
            <Plus size={16} className="mr-1" /> Add Question to Quiz
          </Button>
        </div>

        {/* Quiz Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Total Attempts</p>
              <p className="text-lg font-semibold text-black">{quiz.attempts}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center font-semibold border border-purple-200">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Pass Percentage</p>
              <p className="text-lg font-semibold text-purple-700">{quiz.passRate}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Time Duration</p>
              <p className="text-lg font-semibold text-black">{quiz.duration} • {quiz.questions?.length || 0} Questions</p>
            </div>
          </Card>
        </div>

        {/* Questions Builder & Question List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">Questions in this Assessment ({quiz.questions?.length || 0})</h2>
          </div>

          <div className="space-y-3">
            {quiz.questions?.map((q: QuestionItem, index: number) => (
              <Card key={q.id} className="p-4 space-y-3 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-700 text-white rounded-full text-xs font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <Badge variant="primary" className="font-semibold">{q.type}</Badge>
                    <Badge variant="warning" className="font-semibold">{q.difficulty}</Badge>
                    <span className="text-xs text-purple-700 font-semibold">{q.points} Points</span>
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setEditingQuestion(q);
                        setQuestionData({
                          question: q.question,
                          optionA: q.options?.[0] || '',
                          optionB: q.options?.[1] || '',
                          optionC: q.options?.[2] || '',
                          optionD: q.options?.[3] || '',
                          correctAnswer: q.correctAnswer || '',
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
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-black text-base">{q.question}</h4>
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-md text-xs font-normal border ${
                            opt === q.correctAnswer
                              ? 'bg-purple-50 border-purple-300 text-purple-900 font-semibold'
                              : 'bg-gray-50 border-gray-200 text-gray-700'
                          }`}
                        >
                          <span className="font-semibold mr-1.5">{String.fromCharCode(65 + idx)}:</span> {opt}
                          {opt === q.correctAnswer && <span className="ml-2 text-purple-700 font-semibold">(Correct)</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Add / Edit Question Modal */}
        <Modal
          isOpen={isAddQuestionModalOpen || !!editingQuestion}
          onClose={() => {
            setIsAddQuestionModalOpen(false);
            setEditingQuestion(null);
          }}
          title={editingQuestion ? `Edit Question: ${editingQuestion.id}` : 'Add New Question to Quiz'}
          size="md"
        >
          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Question Prompt</label>
              <Input
                value={questionData.question}
                onChange={e => setQuestionData({ ...questionData, question: e.target.value })}
                placeholder="Enter question statement..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Option A</label>
                <Input
                  value={questionData.optionA}
                  onChange={e => setQuestionData({ ...questionData, optionA: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Option B</label>
                <Input
                  value={questionData.optionB}
                  onChange={e => setQuestionData({ ...questionData, optionB: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Option C</label>
                <Input
                  value={questionData.optionC}
                  onChange={e => setQuestionData({ ...questionData, optionC: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Option D</label>
                <Input
                  value={questionData.optionD}
                  onChange={e => setQuestionData({ ...questionData, optionD: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Correct Answer</label>
                <Input
                  value={questionData.correctAnswer}
                  onChange={e => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                  placeholder="Exact string matching option"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Points Allocated</label>
                <Input
                  type="number"
                  value={questionData.points}
                  onChange={e => setQuestionData({ ...questionData, points: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => { setIsAddQuestionModalOpen(false); setEditingQuestion(null); }}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {editingQuestion ? 'Update Question' : 'Save Question'}
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
                Remove this question from the quiz?
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setDeletingQuestion(null)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDeleteQuestion} className="bg-black hover:bg-gray-900 text-white font-semibold">
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
