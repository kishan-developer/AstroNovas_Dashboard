'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { certificateService } from '@/lib/api';
import {
  Award,
  Eye,
  Download,
  Search,
  CheckCircle,
  ShieldCheck,
  Upload,
  XCircle,
  Clock,
  FileText,
  AlertTriangle,
  ImageIcon,
  Filter,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface CertificateRecord {
  id: string;
  studentId: string;
  student: string;
  course: string;
  completionDate: string;
  requestedOn?: string;
  issuedOn?: string;
  grade: string;
  status: 'Pending Approval' | 'Issued' | 'Rejected';
  verificationCode?: string | null;
  customCertificateUrl?: string | null;
  mentor?: string;
}

const DEFAULT_CERTIFICATES: CertificateRecord[] = [
  { id: 'CERT-AST-9821', studentId: 'STU-1001', student: 'Aarav Sharma', course: 'Astrophysics & Cosmology 101', issuedOn: 'Feb 10, 2026', completionDate: 'Feb 08, 2026', grade: '96% (Distinction)', status: 'Issued', verificationCode: 'AST-CERT-2026-901', customCertificateUrl: null, mentor: 'Dr. Vikram Sarabhai' },
  { id: 'CERT-ORB-4412', studentId: 'STU-1002', student: 'Ananya Patel', course: 'Orbital Mechanics Masterclass', issuedOn: 'Jan 18, 2026', completionDate: 'Jan 15, 2026', grade: '95% (Distinction)', status: 'Issued', verificationCode: 'ORB-CERT-2026-412', customCertificateUrl: null, mentor: 'Sunita Williams' },
  { id: 'CERT-AST-3190', studentId: 'STU-1003', student: 'Rohan Gupta', course: 'Deep Sky Astrophotography', issuedOn: 'Mar 02, 2026', completionDate: 'Feb 28, 2026', grade: '88% (Merit)', status: 'Issued', verificationCode: 'AST-CERT-2026-190', customCertificateUrl: null, mentor: 'Pandit Shastri' },
  { id: 'REQ-CERT-104', studentId: 'STU-1005', student: 'Aditya Kumar', course: 'James Webb Telescope Data Analysis', requestedOn: 'Aug 28, 2026', completionDate: 'Aug 27, 2026', grade: '92% (Distinction)', status: 'Pending Approval', verificationCode: null, customCertificateUrl: null, mentor: 'Dr. Vikram Sarabhai' },
  { id: 'REQ-CERT-105', studentId: 'STU-1004', student: 'Priya Verma', course: 'Cosmic Ray Physics Laboratory', requestedOn: 'Aug 26, 2026', completionDate: 'Aug 25, 2026', grade: '84% (Pass)', status: 'Pending Approval', verificationCode: null, customCertificateUrl: null, mentor: 'Sunita Williams' },
];

export default function AllCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(DEFAULT_CERTIFICATES);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Pending Approval' | 'Issued' | 'Rejected'>('All');
  const [loading, setLoading] = useState(true);

  // View Certificate Preview Modal
  const [viewingCert, setViewingCert] = useState<CertificateRecord | null>(null);

  // Upload Custom Certificate Modal
  const [uploadingCert, setUploadingCert] = useState<CertificateRecord | null>(null);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [isSubmittingUpload, setIsSubmittingUpload] = useState(false);

  // Reject Request Modal
  const [rejectingCert, setRejectingCert] = useState<CertificateRecord | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  // Action Loading
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Fetch Certificates from API
  useEffect(() => {
    async function loadCertificates() {
      try {
        const data = await certificateService.getCertificates();
        if (data && Array.isArray(data) && data.length > 0) {
          setCertificates(data);
        }
      } catch (err) {
        console.warn('Failed to load certificates from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  // Filtered Certificates via useMemo
  const filteredCertificates = useMemo(() => {
    return certificates.filter(c => {
      const matchesSearch =
        c.student.toLowerCase().includes(search.toLowerCase()) ||
        c.course.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'All' || c.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [certificates, search, activeTab]);

  // Statistics counters
  const stats = useMemo(() => {
    return {
      total: certificates.length,
      pending: certificates.filter(c => c.status === 'Pending Approval').length,
      issued: certificates.filter(c => c.status === 'Issued').length,
      rejected: certificates.filter(c => c.status === 'Rejected').length,
    };
  }, [certificates]);

  // Approve & Issue Certificate Handler
  const handleApproveCertificate = useCallback(async (cert: CertificateRecord) => {
    setApprovingId(cert.id);
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const code = `AST-CERT-2026-${Math.floor(100 + Math.random() * 900)}`;

    const updated: CertificateRecord = {
      ...cert,
      status: 'Issued',
      issuedOn: todayStr,
      verificationCode: code,
    };

    try {
      await certificateService.approveCertificate(cert.id, updated);
    } catch (err) {
      console.warn('API approve certificate failed:', err);
    }

    setCertificates(prev => prev.map(c => c.id === cert.id ? updated : c));
    setApprovingId(null);
  }, []);

  // File Input Handler with 5MB validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(`File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5MB maximum limit. Please choose a smaller image/PDF.`);
        return;
      }
      setFileSizeError(null);
      setUploadFileName(file.name);
      if (file.type.startsWith('image/')) {
        setUploadedFilePreview(URL.createObjectURL(file));
      } else {
        setUploadedFilePreview(null);
      }
    }
  };

  // Submit Custom Uploaded Certificate
  const handleSaveUploadedCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadingCert) return;

    setIsSubmittingUpload(true);
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const code = `CUSTOM-CERT-2026-${Math.floor(100 + Math.random() * 900)}`;

    const updated: CertificateRecord = {
      ...uploadingCert,
      status: 'Issued',
      issuedOn: todayStr,
      verificationCode: code,
      customCertificateUrl: uploadedFilePreview || 'custom_uploaded_cert.pdf',
    };

    try {
      await certificateService.uploadCustomCertificate(uploadingCert.id, uploadFileName);
      await certificateService.approveCertificate(uploadingCert.id, updated);
    } catch (err) {
      console.warn('API upload custom certificate failed:', err);
    }

    setCertificates(prev => prev.map(c => c.id === uploadingCert.id ? updated : c));
    setIsSubmittingUpload(false);
    setUploadingCert(null);
    setUploadedFilePreview(null);
    setUploadFileName('');
  };

  // Submit Rejection Handler
  const handleConfirmReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingCert) return;

    setIsRejecting(true);
    const updated: CertificateRecord = {
      ...rejectingCert,
      status: 'Rejected',
    };

    try {
      await certificateService.rejectCertificate(rejectingCert.id, rejectReason);
    } catch (err) {
      console.warn('API reject certificate failed:', err);
    }

    setCertificates(prev => prev.map(c => c.id === rejectingCert.id ? updated : c));
    setIsRejecting(false);
    setRejectingCert(null);
    setRejectReason('');
  };

  return (
    <DashboardLayout title="Certificates Management" breadcrumb={['Certificates', 'Approval & Verification']} activeItem="All Certificates" role="admin">
      <div className="space-y-4">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Certificates Management Studio</h1>
            <p className="text-gray-500 text-sm font-normal">Review course completion requests, upload custom certificates, and approve credentials</p>
          </div>
        </div>

        {/* Overview Stats Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Total Records</p>
              <p className="text-lg font-semibold text-black">{stats.total}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center font-semibold border border-purple-200">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Pending Approval</p>
              <p className="text-lg font-semibold text-purple-700">{stats.pending}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Issued Credentials</p>
              <p className="text-lg font-semibold text-black">{stats.issued}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-semibold">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Rejected Requests</p>
              <p className="text-lg font-semibold text-gray-700">{stats.rejected}</p>
            </div>
          </Card>
        </div>

        {/* Toolbar with Search and Status Tabs */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search student, course, or certificate ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {(['All', 'Pending Approval', 'Issued', 'Rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-purple-700 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {tab} {tab === 'Pending Approval' && stats.pending > 0 ? `(${stats.pending})` : ''}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Certificates Table Directory */}
        <Card className="overflow-hidden p-0 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-black uppercase tracking-wider">
                  <th className="py-3 px-4">Request / Cert ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Course Specialization</th>
                  <th className="py-3 px-4">Completion & Grade</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions & Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm font-normal text-black">
                {filteredCertificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-purple-700">{cert.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-black">{cert.student}</div>
                      <div className="text-xs text-gray-500 font-mono">{cert.studentId}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 font-normal">{cert.course}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-semibold text-black">{cert.grade}</div>
                      <div className="text-xs text-gray-500 font-normal">Completed: {cert.completionDate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={cert.status === 'Issued' ? 'primary' : cert.status === 'Pending Approval' ? 'warning' : 'danger'}
                        className={`font-semibold ${cert.status === 'Pending Approval' ? 'bg-purple-50 text-purple-700 border border-purple-200' : ''}`}
                      >
                        {cert.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {cert.status === 'Pending Approval' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setUploadingCert(cert)}
                            className="text-xs font-semibold border-purple-700 text-purple-700 hover:bg-purple-50"
                            title="Upload Custom Certificate PDF/Image"
                          >
                            <Upload size={14} className="mr-1" /> Upload PDF
                          </Button>

                          <Button
                            size="sm"
                            disabled={approvingId === cert.id}
                            onClick={() => handleApproveCertificate(cert)}
                            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs"
                          >
                            <CheckCircle size={14} className="mr-1" /> {approvingId === cert.id ? 'Approving...' : 'Approve'}
                          </Button>

                          <button
                            onClick={() => setRejectingCert(cert)}
                            className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                            title="Reject Certificate Request"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ) : cert.status === 'Issued' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => setViewingCert(cert)}
                            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs"
                          >
                            <Eye size={14} className="mr-1" /> View Certificate
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Request Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* View Official Certificate Modal Preview */}
        <Modal
          isOpen={!!viewingCert}
          onClose={() => setViewingCert(null)}
          title={`Digital Certificate: ${viewingCert?.id || ''}`}
          size="lg"
        >
          {viewingCert && (
            <div className="space-y-4">
              {viewingCert.customCertificateUrl ? (
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
                    <FileText size={24} />
                  </div>
                  <h3 className="font-semibold text-black text-base">Custom Uploaded Certificate Document</h3>
                  <p className="text-xs text-gray-500 font-normal">Custom file uploaded by admin for {viewingCert.student}</p>
                  {uploadedFilePreview && (
                    <img src={uploadedFilePreview} alt="Custom Certificate" className="max-h-60 object-contain mx-auto rounded-md border" />
                  )}
                </div>
              ) : (
                /* Standard Digital Certificate Layout */
                <div className="p-6 bg-purple-700 text-white rounded-md text-center space-y-4 relative border-4 border-purple-900 shadow-lg">
                  <div className="flex justify-between items-center text-xs font-mono text-purple-200 border-b border-purple-600 pb-2">
                    <span className="flex items-center gap-1"><ShieldCheck size={14} /> Official Verified Credential</span>
                    <span>Verification Code: {viewingCert.verificationCode || 'AST-CERT-2026-901'}</span>
                  </div>

                  <div className="w-16 h-16 bg-white text-purple-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Award size={32} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-purple-200 font-semibold">AstroNovas Space Science Academy</p>
                    <h2 className="text-2xl font-semibold text-white">{viewingCert.student}</h2>
                    <p className="text-xs text-purple-100 font-normal">has successfully completed all theoretical and practical curriculum for</p>
                    <h3 className="text-lg font-semibold text-white pt-1">{viewingCert.course}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-600 text-xs font-normal text-purple-200">
                    <div>
                      <p className="text-purple-300">Grade & Distinction:</p>
                      <p className="font-semibold text-white text-sm">{viewingCert.grade}</p>
                    </div>
                    <div>
                      <p className="text-purple-300">Issue Date:</p>
                      <p className="font-semibold text-white text-sm">{viewingCert.issuedOn || viewingCert.completionDate}</p>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-purple-200 font-normal italic">
                    Authorized Signatory: <span className="font-semibold text-white underline">{viewingCert.mentor || 'Dr. Vikram Sarabhai'}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500 font-normal">Status: Verified & Active</span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setViewingCert(null)}>
                    Close
                  </Button>
                  <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                    <Download size={14} className="mr-1" /> Download Certificate PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Upload Custom Certificate Modal */}
        <Modal
          isOpen={!!uploadingCert}
          onClose={() => setUploadingCert(null)}
          title={`Upload Custom Certificate: ${uploadingCert?.student || ''}`}
          size="md"
        >
          <form onSubmit={handleSaveUploadedCertificate} className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-md border border-purple-200 text-xs text-purple-900 font-normal">
              You are uploading a custom certificate file for <span className="font-semibold">{uploadingCert?.student}</span> completing <span className="font-semibold">{uploadingCert?.course}</span>.
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Select Certificate File (PDF or Image)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-purple-50/50 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {uploadedFilePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={uploadedFilePreview} alt="Certificate File Preview" className="h-32 object-cover rounded-md border border-gray-200" />
                    <span className="text-xs font-semibold text-purple-700">{uploadFileName} (Click to change)</span>
                  </div>
                ) : uploadFileName ? (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <p className="text-sm font-semibold text-black">{uploadFileName}</p>
                    <p className="text-xs text-purple-700 font-semibold">Click to replace file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-semibold text-black">Click or drag certificate PDF / image to upload</p>
                    <p className="text-xs text-gray-500 font-normal">PDF, PNG, JPG up to 5MB file size limit</p>
                  </div>
                )}
              </div>
              {fileSizeError && (
                <p className="mt-2 text-xs font-semibold text-purple-700 bg-purple-50 p-2.5 rounded-md border border-purple-200">
                  {fileSizeError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setUploadingCert(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingUpload} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {isSubmittingUpload ? 'Uploading & Approving...' : 'Upload & Approve'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Reject Request Modal */}
        <Modal
          isOpen={!!rejectingCert}
          onClose={() => setRejectingCert(null)}
          title="Reject Certificate Request"
          size="sm"
        >
          <form onSubmit={handleConfirmReject} className="space-y-4">
            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-md border border-purple-200">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="text-xs text-purple-900 font-normal">
                Rejecting this request will notify the student to complete remaining course modules.
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Reason for Rejection</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Mandatory final project assignment missing or failing grade..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setRejectingCert(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isRejecting} className="bg-black hover:bg-gray-900 text-white font-semibold">
                {isRejecting ? 'Rejecting...' : 'Confirm Reject'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
