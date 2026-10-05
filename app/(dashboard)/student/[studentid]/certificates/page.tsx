'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Award, Download, ShieldCheck, CheckCircle, Clock, Send, Eye, BookOpen } from 'lucide-react';

const INITIAL_STUDENT_CERTS = [
  { id: 'CERT-AST-9821', title: 'Astrophysics & Cosmology 101', issueDate: 'Feb 10, 2026', grade: '96% (Distinction)', status: 'Issued', verificationCode: 'AST-CERT-2026-901', mentor: 'Dr. Vikram Sarabhai' },
  { id: 'REQ-CERT-104', title: 'James Webb Telescope Data Analysis', requestedDate: 'Aug 28, 2026', grade: '92% (Distinction)', status: 'Pending Approval', verificationCode: null, mentor: 'Dr. Vikram Sarabhai' },
];

const COMPLETED_COURSES_ELIGIBLE = [
  { id: 'CRS-02', title: 'Orbital Mechanics Masterclass', completionDate: 'Aug 20, 2026', grade: '95% (Distinction)', mentor: 'Sunita Williams' },
];

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState(INITIAL_STUDENT_CERTS);
  const [eligibleCourses, setEligibleCourses] = useState(COMPLETED_COURSES_ELIGIBLE);
  const [viewingCert, setViewingCert] = useState<any | null>(null);
  const [requestingCourse, setRequestingCourse] = useState<any | null>(null);

  // Request Certificate Action
  const handleRequestCertificate = (course: any) => {
    const newReq = {
      id: `REQ-CERT-${Math.floor(100 + Math.random() * 900)}`,
      title: course.title,
      requestedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      grade: course.grade,
      status: 'Pending Approval',
      verificationCode: null,
      mentor: course.mentor,
    };

    setCertificates(prev => [newReq, ...prev]);
    setEligibleCourses(prev => prev.filter(c => c.id !== course.id));
    setRequestingCourse(null);
  };

  return (
    <DashboardLayout title="My Certificates" breadcrumb={['Student', 'Certificates']} activeItem="Certificates" role="student">
      <div className="space-y-4">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">My Certificates & Digital Credentials</h1>
            <p className="text-gray-500 text-sm font-normal">Request certificates upon course completion and download verified credentials</p>
          </div>
        </div>

        {/* Eligible Courses for Certificate Request Section */}
        {eligibleCourses.length > 0 && (
          <Card className="p-4 bg-purple-50 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-semibold">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-black text-sm">Course Completion Eligible for Certificate</h3>
                  <p className="text-xs text-gray-600 font-normal">You have completed 100% of the curriculum for these courses</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {eligibleCourses.map(course => (
                <div key={course.id} className="p-3 bg-white border border-purple-200 rounded-md flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-black text-sm">{course.title}</h4>
                    <p className="text-xs text-gray-500 font-normal">Completed on {course.completionDate} • Grade: {course.grade}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleRequestCertificate(course)}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs ml-3 whitespace-nowrap"
                  >
                    <Send size={14} className="mr-1" /> Request Certificate
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Issued and Pending Certificates Grid */}
        <div className="space-y-3">
          <h3 className="font-semibold text-black text-base">Your Academic Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <Card key={cert.id} className="p-4 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <Badge
                      variant={cert.status === 'Issued' ? 'primary' : 'warning'}
                      className={`font-semibold ${cert.status === 'Pending Approval' ? 'bg-purple-50 text-purple-700 border border-purple-200' : ''}`}
                    >
                      {cert.status}
                    </Badge>
                    <span className="font-mono text-xs text-gray-500">{cert.id}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${cert.status === 'Issued' ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-base leading-snug">{cert.title}</h3>
                      <p className="text-xs text-gray-500 font-normal mt-0.5">Academic Performance: <span className="font-semibold text-purple-700">{cert.grade}</span></p>
                    </div>
                  </div>

                  {cert.status === 'Pending Approval' ? (
                    <div className="p-2.5 bg-purple-50 rounded-md border border-purple-200 text-xs text-purple-900 font-normal flex items-center gap-2">
                      <Clock size={14} className="text-purple-700 flex-shrink-0" />
                      <span>Submitted on {cert.requestedDate}. Admin is reviewing and generating credential code.</span>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-md border border-gray-200 text-xs text-gray-600 font-normal flex items-center justify-between">
                      <span className="flex items-center gap-1 font-semibold text-purple-700"><ShieldCheck size={14} /> Verified Credential</span>
                      <span className="font-mono text-xs">{cert.verificationCode}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-normal">
                    {cert.status === 'Issued' ? `Issued: ${cert.issueDate}` : `Requested: ${cert.requestedDate}`}
                  </span>
                  {cert.status === 'Issued' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setViewingCert(cert)} className="text-xs font-semibold border-purple-700 text-purple-700 hover:bg-purple-50">
                        <Eye size={14} className="mr-1" /> View
                      </Button>
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs">
                        <Download size={14} className="mr-1" /> Download PDF
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* View Certificate Preview Modal */}
        <Modal
          isOpen={!!viewingCert}
          onClose={() => setViewingCert(null)}
          title={`Digital Certificate: ${viewingCert?.id || ''}`}
          size="lg"
        >
          {viewingCert && (
            <div className="space-y-4">
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
                  <h2 className="text-2xl font-semibold text-white">Aarav Sharma</h2>
                  <p className="text-xs text-purple-100 font-normal">has successfully completed all theoretical and practical curriculum for</p>
                  <h3 className="text-lg font-semibold text-white pt-1">{viewingCert.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-600 text-xs font-normal text-purple-200">
                  <div>
                    <p className="text-purple-300">Grade & Distinction:</p>
                    <p className="font-semibold text-white text-sm">{viewingCert.grade}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Issue Date:</p>
                    <p className="font-semibold text-white text-sm">{viewingCert.issueDate}</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-purple-200 font-normal italic">
                  Authorized Signatory: <span className="font-semibold text-white underline">{viewingCert.mentor || 'Dr. Vikram Sarabhai'}</span>
                </div>
              </div>

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
      </div>
    </DashboardLayout>
  );
}
