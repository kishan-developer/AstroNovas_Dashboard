'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { certificateService, studentService } from '@/lib/api';
import {
  Award,
  Plus,
  Eye,
  Download,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  UserCheck,
  FileText,
  Upload,
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';

interface StudentOption {
  id: string;
  name: string;
  email: string;
  course: string;
  grade: string;
  category: string;
  mentor: string;
}

const INDIAN_STUDENTS_LIST: StudentOption[] = [
  { id: 'STU-1001', name: 'Aarav Sharma', email: 'aarav.sharma@example.in', course: 'Astrophysics & Cosmology 101', grade: '96% (Distinction)', category: 'Astronomy & Physics', mentor: 'Dr. Vikram Sarabhai' },
  { id: 'STU-1002', name: 'Ananya Patel', email: 'ananya.p@example.in', course: 'Orbital Mechanics Masterclass', grade: '95% (Distinction)', category: 'Space Engineering', mentor: 'Sunita Williams' },
  { id: 'STU-1003', name: 'Rohan Gupta', email: 'rohan.g@example.in', course: 'Deep Sky Astrophotography', grade: '88% (Merit)', category: 'Astrophotography', mentor: 'Pandit Shastri' },
  { id: 'STU-1004', name: 'Priya Verma', email: 'priya.v@example.in', course: 'Cosmic Ray Physics Laboratory', grade: '84% (Pass)', category: 'Physics', mentor: 'Sunita Williams' },
  { id: 'STU-1005', name: 'Aditya Kumar', email: 'aditya.k@example.in', course: 'James Webb Telescope Data Analysis', grade: '92% (Distinction)', category: 'Data Science', mentor: 'Dr. Vikram Sarabhai' },
];

const CATEGORY_TEMPLATES = [
  { id: 'TPL-AST', name: 'Astronomy & Physics Specialization', category: 'Astronomy & Physics', theme: 'Royal Purple & White', mentor: 'Dr. Vikram Sarabhai', border: 'border-purple-700' },
  { id: 'TPL-ENG', name: 'Space Engineering & Robotics', category: 'Space Engineering', theme: 'Solid Black & White Accent', mentor: 'Sunita Williams', border: 'border-black' },
  { id: 'TPL-PHOTO', name: 'Astrophotography & Sky Observation', category: 'Astrophotography', theme: 'Purple Outline & Badge', mentor: 'Pandit Shastri', border: 'border-purple-800' },
  { id: 'TPL-DATA', name: 'Data Science & JWST Research', category: 'Data Science', theme: 'Monochrome Tech', mentor: 'Dr. Vikram Sarabhai', border: 'border-gray-800' },
  { id: 'TPL-VEDIC', name: 'Vedic Astronomy & Cosmology', category: 'Physics', theme: 'Heritage Purple', mentor: 'Pandit Shastri', border: 'border-purple-900' },
];

export default function CertificateTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof CATEGORY_TEMPLATES[0]>(CATEGORY_TEMPLATES[0]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('STU-1001');

  // Auto-Fill Form State
  const [formData, setFormData] = useState({
    studentName: 'Aarav Sharma',
    studentId: 'STU-1001',
    courseTitle: 'Astrophysics & Cosmology 101',
    category: 'Astronomy & Physics',
    grade: '96% (Distinction)',
    issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    verificationCode: 'AST-CERT-2026-901',
    mentorSignatory: 'Dr. Vikram Sarabhai',
  });

  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issuedSuccess, setIssuedSuccess] = useState(false);

  // Custom File Upload state
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Auto-Fill Handler when selecting a Student from Dropdown
  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    const found = INDIAN_STUDENTS_LIST.find(s => s.id === studentId);
    if (found) {
      const code = `CERT-${found.category.substring(0, 3).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`;
      setFormData({
        studentName: found.name,
        studentId: found.id,
        courseTitle: found.course,
        category: found.category,
        grade: found.grade,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        verificationCode: code,
        mentorSignatory: found.mentor,
      });

      // Match category template
      const matchingTpl = CATEGORY_TEMPLATES.find(t => t.category === found.category);
      if (matchingTpl) {
        setSelectedTemplate(matchingTpl);
      }
    }
  };

  // Auto-Fill Handler when selecting a Category Template
  const handleSelectTemplate = (template: typeof CATEGORY_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      category: template.category,
      mentorSignatory: template.mentor,
    }));
  };

  // Custom Upload File Handler with 5MB validation
  const handleCustomFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(`File (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5MB limit. Choose a smaller image or PDF.`);
        return;
      }
      setFileSizeError(null);
      setCustomFile(file);
    }
  };

  // Issue Certificate Handler
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIssuing(true);

    const payload = {
      id: formData.verificationCode,
      studentId: formData.studentId,
      student: formData.studentName,
      course: formData.courseTitle,
      issuedOn: formData.issueDate,
      grade: formData.grade,
      status: 'Issued',
      verificationCode: formData.verificationCode,
      mentor: formData.mentorSignatory,
      customCertificateUrl: customFile ? customFile.name : null,
    };

    try {
      await certificateService.approveCertificate(formData.verificationCode, payload);
    } catch (err) {
      console.warn('Failed to issue certificate via API:', err);
    }

    setIsIssuing(false);
    setIssuedSuccess(true);
    setTimeout(() => {
      setIssuedSuccess(false);
      setIsGeneratorModalOpen(false);
    }, 2000);
  };

  return (
    <DashboardLayout title="Certificate Templates" breadcrumb={['Certificates', 'Category Templates & Generator']} activeItem="Certificate Templates" role="admin">
      <div className="space-y-4">
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Category Certificate Templates & Generator</h1>
            <p className="text-gray-500 text-sm font-normal">Select category certificate templates and auto-fill student details for instant credential issuance</p>
          </div>
          <Button
            onClick={() => setIsGeneratorModalOpen(true)}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold"
          >
            <Sparkles size={18} className="mr-1.5" /> Auto-Fill Certificate Studio
          </Button>
        </div>

        {/* Category Templates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_TEMPLATES.map(tpl => (
            <Card key={tpl.id} className="p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                {/* Visual Template Canvas Preview */}
                <div className={`h-44 bg-purple-700 text-white rounded-md p-4 flex flex-col justify-between text-center relative border-4 ${tpl.border} shadow-sm`}>
                  <div className="flex justify-between items-center text-[10px] text-purple-200 font-mono">
                    <span className="flex items-center gap-1"><ShieldCheck size={12} /> {tpl.category}</span>
                    <span>{tpl.id}</span>
                  </div>
                  <div>
                    <div className="w-10 h-10 bg-white text-purple-700 rounded-full flex items-center justify-center mx-auto mb-1">
                      <Award size={20} />
                    </div>
                    <p className="font-semibold text-sm text-white">{tpl.name}</p>
                    <p className="text-[10px] text-purple-200">AstroNovas Space Science Credential</p>
                  </div>
                  <div className="text-[10px] text-purple-200 italic border-t border-purple-600 pt-1">
                    Authorized Signatory: {tpl.mentor}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-black text-base">{tpl.name}</h3>
                    <Badge variant="primary" className="font-semibold">Active</Badge>
                  </div>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">Category: <span className="font-semibold text-purple-700">{tpl.category}</span></p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-normal">Signatory: {tpl.mentor}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    handleSelectTemplate(tpl);
                    setIsGeneratorModalOpen(true);
                  }}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs"
                >
                  <Sparkles size={14} className="mr-1" /> Use Template
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Auto-Fill Certificate Generator Studio Modal */}
        <Modal
          isOpen={isGeneratorModalOpen}
          onClose={() => setIsGeneratorModalOpen(false)}
          title="Auto-Fill Student Certificate Studio"
          size="lg"
        >
          <div className="space-y-4">
            {issuedSuccess ? (
              <div className="p-6 bg-purple-50 rounded-md border border-purple-200 text-center space-y-3">
                <div className="w-12 h-12 bg-purple-700 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-semibold text-black">Certificate Issued & Verified!</h3>
                <p className="text-sm text-gray-600 font-normal max-w-md mx-auto">
                  Official category certificate for <span className="font-semibold text-purple-700">{formData.studentName}</span> has been saved and published to student credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleIssueCertificate} className="space-y-4">
                {/* Auto-Fill Selection Toolbar */}
                <div className="p-3 bg-purple-50 rounded-md border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                      <UserCheck size={14} /> Auto-Fill Student Details Selector
                    </label>
                    <span className="text-xs text-purple-700 font-normal">Select student to auto-populate form</span>
                  </div>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => handleSelectStudent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-sm font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  >
                    {INDIAN_STUDENTS_LIST.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.id}: {s.name} — {s.course} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Form: Editable Auto-Filled Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-1">Student Name</label>
                      <Input
                        value={formData.studentName}
                        onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1">Course Title</label>
                      <Input
                        value={formData.courseTitle}
                        onChange={e => setFormData({ ...formData, courseTitle: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">Category</label>
                        <Input
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">Grade / Score</label>
                        <Input
                          value={formData.grade}
                          onChange={e => setFormData({ ...formData, grade: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">Verification Code</label>
                        <Input
                          value={formData.verificationCode}
                          onChange={e => setFormData({ ...formData, verificationCode: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">Signatory Mentor</label>
                        <Input
                          value={formData.mentorSignatory}
                          onChange={e => setFormData({ ...formData, mentorSignatory: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Optional Custom PDF / Image Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-black mb-1">Optional Custom Certificate PDF/Image Upload</label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleCustomFileChange}
                        className="w-full text-xs text-gray-600 bg-gray-50 p-2 border border-gray-300 rounded-md cursor-pointer"
                      />
                      {fileSizeError && (
                        <p className="mt-1 text-xs text-purple-700 font-semibold">{fileSizeError}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Real-Time Live Auto-Filled Certificate Canvas Preview */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-black">Live Certificate Preview</label>
                    <div className="p-4 bg-purple-700 text-white rounded-md text-center space-y-3 relative border-4 border-purple-900 shadow-md">
                      <div className="flex justify-between items-center text-[10px] text-purple-200 font-mono border-b border-purple-600 pb-1.5">
                        <span className="flex items-center gap-1"><ShieldCheck size={12} /> {formData.category}</span>
                        <span>{formData.verificationCode}</span>
                      </div>

                      <div className="w-12 h-12 bg-white text-purple-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Award size={24} />
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-[10px] uppercase tracking-widest text-purple-200 font-semibold">AstroNovas Space Science Academy</p>
                        <h2 className="text-xl font-semibold text-white">{formData.studentName || 'Student Name'}</h2>
                        <p className="text-[10px] text-purple-100 font-normal">has successfully completed all laboratory requirements for</p>
                        <h3 className="text-sm font-semibold text-white pt-0.5">{formData.courseTitle || 'Course Title'}</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-600 text-[10px] text-purple-200">
                        <div>
                          <p>Grade: <span className="font-semibold text-white">{formData.grade}</span></p>
                        </div>
                        <div>
                          <p>Date: <span className="font-semibold text-white">{formData.issueDate}</span></p>
                        </div>
                      </div>

                      <div className="text-[10px] text-purple-200 italic pt-1">
                        Signatory: <span className="font-semibold text-white underline">{formData.mentorSignatory}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <Button type="button" variant="outline" onClick={() => setIsGeneratorModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isIssuing} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                    {isIssuing ? 'Issuing Certificate...' : 'Generate & Issue Certificate'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
