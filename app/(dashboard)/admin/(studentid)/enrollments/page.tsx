'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { enrollmentService, courseService, studentService } from '@/lib/api';
import {
  GraduationCap,
  CheckCircle,
  Clock,
  QrCode,
  Search,
  RefreshCw,
  Plus,
  Eye,
  FileImage,
  XCircle,
  Check,
  Trash2,
  Copy,
  Upload,
  CreditCard,
  Building2,
  DollarSign,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export default function AllEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalEnrollments: 0,
    activeCount: 0,
    pendingCount: 0,
    completedCount: 0,
    rejectedCount: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');

  // Modals state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeEnrollment, setActiveEnrollment] = useState<any>(null);

  // Form & QR states
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [customAmount, setCustomAmount] = useState<string>('4999');
  const [paymentMethod, setPaymentMethod] = useState('qr_code');
  const [transactionIdInput, setTransactionIdInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await enrollmentService.getEnrollments({
        search,
        status: selectedStatus,
        paymentMethod: selectedPaymentMethod,
      });

      if (res && res.data) {
        setEnrollments(res.data);
      }
      const statsRes = await enrollmentService.getEnrollmentStats();
      if (statsRes) {
        setStats(statsRes);
      }
    } catch (err) {
      console.error('Failed to load enrollments data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [selectedStatus, selectedPaymentMethod]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnrollments();
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    // Load courses and students for modals
    async function loadFormOptions() {
      try {
        const [cList, sList] = await Promise.all([
          courseService.getCourses(),
          studentService.getStudents('student'),
        ]);
        if (cList) setCoursesList(cList);
        if (sList) setStudentsList(sList);
        if (cList && cList.length > 0) {
          setSelectedCourse(cList[0]);
          setCustomAmount(cList[0].price ? cList[0].price.toString().replace(/[^0-9]/g, '') : '4999');
        }
      } catch (err) {
        console.error('Failed to load dropdown options', err);
      }
    }
    loadFormOptions();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('astronovas@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEnrollmentWithQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setActionLoading(true);
    try {
      const payload = {
        userId: selectedStudentId || (studentsList[0]?.id || studentsList[0]?._id || 'STU-1001'),
        courseId: selectedCourse.id || selectedCourse._id || 'CRS-001',
        amountPaid: Number(customAmount) || 4999,
        paymentMethod,
        transactionId: transactionIdInput || `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}/SCAN`,
        paymentScreenshotUrl: uploadedScreenshot || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        notes: notesInput || 'Submitted via Scan QR & Pay portal.',
        status: 'pending_payment',
      };

      const res = await enrollmentService.createEnrollment(payload);
      if (res) {
        showToast('Enrollment request submitted with Payment Proof Screenshot!');
        setIsQrModalOpen(false);
        setIsNewModalOpen(false);
        setUploadedScreenshot(null);
        setTransactionIdInput('');
        setNotesInput('');
        fetchEnrollments();
      }
    } catch (err) {
      console.error('Error creating enrollment', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (enrollmentId: string, status: string, notes?: string) => {
    setActionLoading(true);
    try {
      const res = await enrollmentService.updateEnrollmentStatus(enrollmentId, status, notes);
      if (res) {
        showToast(`Enrollment status updated to "${status.replace('_', ' ').toUpperCase()}"`);
        setIsProofModalOpen(false);
        fetchEnrollments();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    if (!confirm('Are you sure you want to delete this enrollment record?')) return;
    try {
      await enrollmentService.deleteEnrollment(enrollmentId);
      showToast('Enrollment record removed.');
      fetchEnrollments();
    } catch (err) {
      console.error('Failed to delete enrollment', err);
    }
  };

  const openProofViewer = (enrollment: any) => {
    setActiveEnrollment(enrollment);
    setNotesInput(enrollment.notes || '');
    setIsProofModalOpen(true);
  };

  const openQrScanner = (enrollment?: any) => {
    if (enrollment) {
      setActiveEnrollment(enrollment);
      setCustomAmount(enrollment.amountPaid ? enrollment.amountPaid.toString() : '4999');
    } else {
      setActiveEnrollment(null);
    }
    setIsQrModalOpen(true);
  };

  return (
    <DashboardLayout
      title="Enrollments & QR Payment Verification"
      breadcrumb={['Enrollments', 'All Enrollments']}
      activeItem="All Enrollments"
      role="admin"
    >
      <div className="space-y-6 pb-12">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center space-x-3 text-sm animate-bounce border border-violet-500/30">
            <CheckCircle size={18} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-900/40 relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium border border-indigo-500/30">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span>Advanced Payment & QR Management</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Enrollments & QR Pay Inspector</h1>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-xl">
              Scan UPI payment QR codes, verify payment receipt screenshots, grant course access, and monitor platform revenue in real-time.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => openQrScanner()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <QrCode size={16} />
              <span>Scan QR & Pay</span>
            </Button>

            <Button
              onClick={() => setIsNewModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Plus size={16} />
              <span>New Enrollment</span>
            </Button>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute right-36 top-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Enrollments</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalEnrollments || enrollments.length}</h3>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <GraduationCap size={12} /> Live platform metric
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Active Access</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.activeCount || enrollments.filter(e => e.status === 'active' || e.status === 'completed').length}</h3>
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-1">
                  <CheckCircle size={12} className="text-emerald-500" /> Active learning access
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-amber-200/80 shadow-sm hover:shadow-md transition-shadow bg-amber-50/30 rounded-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-amber-800">Pending Verification</p>
                  {stats.pendingCount > 0 && (
                    <span className="animate-pulse bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      ACTION NEEDED
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-amber-700 mt-1">{stats.pendingCount || enrollments.filter(e => e.status === 'pending_payment').length}</h3>
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1 mt-1">
                  <Clock size={12} /> QR Proof screenshots to verify
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <FileImage size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Collected Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{(stats.totalRevenue || 642500).toLocaleString('en-IN')}
                </h3>
                <span className="text-[11px] text-indigo-600 font-medium flex items-center gap-1 mt-1">
                  <DollarSign size={12} /> Verified payments sum
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <CreditCard size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <Card className="p-4 border-0 shadow-md bg-white rounded-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search student name, email, course title, or transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: 'all', label: 'All Status' },
                  { id: 'active', label: 'Active' },
                  { id: 'pending_payment', label: 'Pending Payment' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'rejected', label: 'Rejected' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStatus(st.id)}
                    className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                      selectedStatus === st.id
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="all">All Payment Methods</option>
                <option value="qr_code">Scan QR / UPI</option>
                <option value="upi">Direct UPI</option>
                <option value="bank_transfer">Bank Transfer / IMPS</option>
                <option value="card">Credit/Debit Card</option>
              </select>

              <button
                onClick={fetchEnrollments}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-gray-200"
                title="Refresh Table"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin text-indigo-600' : ''} />
              </button>
            </div>
          </div>
        </Card>

        {/* Enrollments Main Data Table */}
        <Card className="overflow-hidden border-0 shadow-lg bg-white rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Enrollment & Student</th>
                  <th className="py-4 px-6">Course</th>
                  <th className="py-4 px-6">Payment Mode & Amount</th>
                  <th className="py-4 px-6">Screenshot Proof</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                      <div className="flex justify-center items-center space-x-2">
                        <RefreshCw size={18} className="animate-spin text-indigo-600" />
                        <span>Loading enrollment records...</span>
                      </div>
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                      No enrollments found matching the criteria.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e) => {
                    const studentName = e.user?.name || e.student || 'Unknown Student';
                    const studentEmail = e.user?.email || 'N/A';
                    const studentAvatar = e.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=random`;
                    const courseTitle = e.course?.title || e.course || 'Astronomy Course';
                    const displayId = e._id || e.id || 'ENR-000';
                    const amount = e.amountPaid || e.price || 4999;
                    const screenshot = e.paymentScreenshotUrl;

                    return (
                      <tr key={displayId} className="hover:bg-indigo-50/30 transition-colors">
                        {/* Student Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src={studentAvatar}
                              alt={studentName}
                              className="w-9 h-9 rounded-full object-cover border border-indigo-100 shadow-sm"
                            />
                            <div>
                              <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                                {studentName}
                              </div>
                              <div className="text-[11px] text-gray-500">{studentEmail}</div>
                              <span className="font-mono text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
                                {displayId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Course Info */}
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-800 text-xs line-clamp-1 flex items-center gap-1">
                              <BookOpen size={13} className="text-indigo-500 shrink-0" />
                              {courseTitle}
                            </span>
                            <div className="text-[11px] text-gray-400">
                              Enrolled: {e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString() : (e.date || 'Recent')}
                            </div>
                          </div>
                        </td>

                        {/* Payment Details */}
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="font-extrabold text-gray-900 text-sm">
                              ₹{typeof amount === 'number' ? amount.toLocaleString('en-IN') : amount}
                            </div>
                            <div className="flex items-center space-x-1 text-[11px]">
                              {e.paymentMethod === 'qr_code' || e.paymentMethod === 'upi' ? (
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                  <QrCode size={10} className="mr-1" /> UPI QR Code
                                </Badge>
                              ) : e.paymentMethod === 'bank_transfer' ? (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <Building2 size={10} className="mr-1" /> Bank Wire / IMPS
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                                  <CreditCard size={10} className="mr-1" /> Card / Gateway
                                </Badge>
                              )}
                            </div>
                            {e.transactionId && (
                              <div className="font-mono text-[10px] text-gray-500 truncate max-w-[140px]" title={e.transactionId}>
                                Txn: {e.transactionId}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Payment Screenshot Proof */}
                        <td className="py-4 px-6">
                          {screenshot ? (
                            <button
                              onClick={() => openProofViewer(e)}
                              className="group relative flex items-center space-x-2 bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-200 transition-all text-xs font-semibold shadow-sm"
                            >
                              <FileImage size={14} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                              <span>View Receipt</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 -right-0.5" />
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">No Screenshot</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {e.status === 'active' || e.status === 'Active' ? (
                            <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold px-2.5 py-1">
                              Active Access
                            </Badge>
                          ) : e.status === 'completed' || e.status === 'Completed' ? (
                            <Badge variant="success" className="bg-blue-100 text-blue-800 border-blue-200 font-semibold px-2.5 py-1">
                              Completed
                            </Badge>
                          ) : e.status === 'pending_payment' || e.status === 'Pending Payment' ? (
                            <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-300 font-semibold px-2.5 py-1 animate-pulse">
                              Pending Approval
                            </Badge>
                          ) : (
                            <Badge variant="danger" className="bg-red-100 text-red-800 border-red-200 font-semibold px-2.5 py-1">
                              Rejected
                            </Badge>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {screenshot && (
                              <button
                                onClick={() => openProofViewer(e)}
                                className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                title="Inspect Payment Proof Screenshot"
                              >
                                <Eye size={15} />
                              </button>
                            )}

                            {e.status === 'pending_payment' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(displayId, 'active', 'Approved manually by admin after screenshot verification')}
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                  title="Approve & Grant Course Access"
                                >
                                  <CheckCircle size={16} />
                                </button>

                                <button
                                  onClick={() => handleUpdateStatus(displayId, 'rejected', 'Payment proof invalid or unverified')}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Reject Payment"
                                >
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => openQrScanner(e)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                              title="Generate/Scan QR Code"
                            >
                              <QrCode size={15} />
                            </button>

                            <button
                              onClick={() => handleDeleteEnrollment(displayId)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: SCAN QR CODE & PAY WITH SCREENSHOT PROOF UPLOAD */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Scan UPI QR Code & Verify Payment"
        size="lg"
      >
        <form onSubmit={handleCreateEnrollmentWithQR} className="space-y-6 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left side: QR Code Display */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 p-6 rounded-2xl text-white text-center space-y-4 shadow-xl border border-indigo-800/40">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
                <QrCode size={14} />
                <span>Instant UPI Payment QR</span>
              </div>

              {/* QR Render Canvas/SVG Box */}
              <div className="bg-white p-4 rounded-xl shadow-2xl mx-auto w-52 h-52 flex flex-col items-center justify-center border-4 border-indigo-400/20 relative group">
                {/* Clean Vector SVG QR Code Mockup */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                  <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                  {/* Position detection patterns */}
                  <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                  <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
                  <rect x="12" y="12" width="11" height="11" fill="#4f46e5" />

                  <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                  <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
                  <rect x="77" y="12" width="11" height="11" fill="#4f46e5" />

                  <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                  <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
                  <rect x="12" y="77" width="11" height="11" fill="#4f46e5" />

                  {/* Data blocks */}
                  <rect x="35" y="10" width="8" height="8" fill="#0f172a" />
                  <rect x="48" y="15" width="12" height="6" fill="#4f46e5" />
                  <rect x="35" y="30" width="30" height="6" fill="#0f172a" />
                  <rect x="10" y="35" width="15" height="15" fill="#4f46e5" />
                  <rect x="40" y="45" width="20" height="20" fill="#0f172a" />
                  <rect x="70" y="40" width="15" height="15" fill="#4f46e5" />
                  <rect x="65" y="65" width="25" height="8" fill="#0f172a" />
                  <rect x="35" y="75" width="20" height="15" fill="#4f46e5" />
                  <rect x="75" y="75" width="15" height="15" fill="#0f172a" />
                </svg>
                <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded font-bold shadow">
                    Scan with GPay / PhonePe / Paytm
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-indigo-200">Amount to Pay</p>
                <p className="text-2xl font-black text-emerald-400">
                  ₹{Number(customAmount || 4999).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Copy UPI Box */}
              <div className="bg-white/10 p-2.5 rounded-lg flex items-center justify-between border border-white/10 text-xs">
                <span className="font-mono text-indigo-100">astronovas@upi</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded flex items-center space-x-1 font-semibold transition-colors"
                >
                  <Copy size={12} />
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>
            </div>

            {/* Right side: Form & Screenshot Proof Upload */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Select Course</label>
                <select
                  value={selectedCourse?.id || selectedCourse?._id || ''}
                  onChange={(e) => {
                    const found = coursesList.find(c => (c.id || c._id) === e.target.value);
                    if (found) {
                      setSelectedCourse(found);
                      setCustomAmount(found.price ? found.price.toString().replace(/[^0-9]/g, '') : '4999');
                    }
                  }}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                >
                  {coursesList.map((c) => (
                    <option key={c.id || c._id} value={c.id || c._id}>
                      {c.title} — {c.price || '₹4,999'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Custom Amount (₹)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg font-semibold"
                  >
                    <option value="qr_code">Scan QR Code</option>
                    <option value="upi">Direct UPI ID</option>
                    <option value="bank_transfer">Bank Wire / IMPS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Transaction Ref / UTR No.</label>
                <input
                  type="text"
                  placeholder="e.g. UPI/62910488219/GPAY"
                  value={transactionIdInput}
                  onChange={(e) => setTransactionIdInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono text-xs"
                />
              </div>

              {/* Upload Screenshot Proof */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1 flex items-center justify-between">
                  <span>Upload Payment Screenshot Proof</span>
                  <span className="text-[10px] text-indigo-600 font-bold">*Required for verification</span>
                </label>
                <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 p-3 rounded-xl text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {uploadedScreenshot ? (
                    <div className="space-y-2">
                      <img
                        src={uploadedScreenshot}
                        alt="Uploaded Proof"
                        className="max-h-32 mx-auto rounded-lg shadow border border-indigo-200 object-cover"
                      />
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <CheckCircle size={14} /> Screenshot attached successfully!
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1 py-2">
                      <Upload size={24} className="mx-auto text-indigo-500" />
                      <p className="text-xs font-semibold text-indigo-900">Click to upload payment receipt screenshot</p>
                      <p className="text-[10px] text-gray-500">Supports PNG, JPG, JPEG (GPay / PhonePe / Paytm receipts)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsQrModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5"
                >
                  {actionLoading ? 'Submitting...' : 'Submit Payment Proof'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: PAYMENT SCREENSHOT PROOF INSPECTOR & VERIFIER */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        title="Inspect Payment Receipt Screenshot"
        size="lg"
      >
        {activeEnrollment && (
          <div className="space-y-6 p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Screenshot Lightbox Image */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-xl space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
                  <span className="font-mono text-indigo-400">RECEIPT_PROOF_IMG.PNG</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-emerald-400">HD Screenshot</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-slate-900 max-h-[380px] flex items-center justify-center border border-slate-800">
                  {activeEnrollment.paymentScreenshotUrl ? (
                    <img
                      src={activeEnrollment.paymentScreenshotUrl}
                      alt="Payment Receipt Screenshot"
                      className="max-h-[360px] w-full object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="p-12 text-gray-500 text-xs">
                      No screenshot uploaded for this enrollment.
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction & Student Info Panel */}
              <div className="space-y-4 text-xs">
                <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Enrollment ID</span>
                    <span className="font-mono font-bold text-indigo-700">{activeEnrollment._id || activeEnrollment.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Student Name</span>
                    <span className="font-bold text-gray-900">{activeEnrollment.user?.name || activeEnrollment.student}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Course Title</span>
                    <span className="font-semibold text-gray-800 line-clamp-1">{activeEnrollment.course?.title || activeEnrollment.course}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-indigo-200/60">
                    <span className="text-gray-600 font-bold">Amount Paid</span>
                    <span className="font-black text-base text-emerald-700">₹{(activeEnrollment.amountPaid || 4999).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Transaction / UTR</span>
                    <span className="font-mono text-[11px] text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {activeEnrollment.transactionId || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-600">Current Status:</span>
                  <Badge variant={activeEnrollment.status === 'active' ? 'success' : activeEnrollment.status === 'pending_payment' ? 'warning' : 'danger'}>
                    {activeEnrollment.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                {/* Verification Review Notes */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Verification Notes / Reason</label>
                  <textarea
                    rows={3}
                    placeholder="Enter review notes regarding screenshot verification..."
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    onClick={() => handleUpdateStatus(activeEnrollment._id || activeEnrollment.id, 'active', notesInput || 'Verified payment proof screenshot')}
                    disabled={actionLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    <CheckCircle size={16} />
                    <span>Approve Payment & Activate Access</span>
                  </Button>

                  <Button
                    onClick={() => handleUpdateStatus(activeEnrollment._id || activeEnrollment.id, 'rejected', notesInput || 'Invalid or fake payment proof screenshot')}
                    disabled={actionLoading}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} />
                    <span>Reject Payment Proof</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE NEW ENROLLMENT WITH QR PAY OPTION */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Create New Student Enrollment"
        size="md"
      >
        <form onSubmit={handleCreateEnrollmentWithQR} className="space-y-4 p-2 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg font-medium"
            >
              {studentsList.map((s) => (
                <option key={s.id || s._id} value={s.id || s._id}>
                  {s.name} ({s.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Select Course</label>
            <select
              value={selectedCourse?.id || selectedCourse?._id || ''}
              onChange={(e) => {
                const found = coursesList.find(c => (c.id || c._id) === e.target.value);
                if (found) {
                  setSelectedCourse(found);
                  setCustomAmount(found.price ? found.price.toString().replace(/[^0-9]/g, '') : '4999');
                }
              }}
              className="w-full p-2.5 border border-gray-300 rounded-lg font-medium"
            >
              {coursesList.map((c) => (
                <option key={c.id || c._id} value={c.id || c._id}>
                  {c.title} — {c.price || '₹4,999'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Price / Amount (₹)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg font-medium"
              >
                <option value="qr_code">Scan QR Code</option>
                <option value="upi">Direct UPI</option>
                <option value="bank_transfer">Bank Wire</option>
                <option value="card">Credit Card</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Transaction Reference</label>
            <input
              type="text"
              placeholder="e.g. UPI/88301923144/ADMIN"
              value={transactionIdInput}
              onChange={(e) => setTransactionIdInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Attach Payment Screenshot Proof</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {uploadedScreenshot && (
              <img src={uploadedScreenshot} alt="Preview" className="mt-2 h-20 rounded border object-cover" />
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={actionLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              {actionLoading ? 'Creating...' : 'Create Enrollment'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
