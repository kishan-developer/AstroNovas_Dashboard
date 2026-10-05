'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BookOpen, CheckCircle, ArrowLeft, Upload, DollarSign, Image as ImageIcon, Eye } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import Link from 'next/link';

export default function CreateCoursePage() {
  const [step, setStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    category: 'Astronomy & Physics',
    price: '4999',
    description: '',
    level: 'Beginner',
  });
  const [isCreated, setIsCreated] = useState(false);

  const defaultThumbnail = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(`Selected file (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5MB maximum limit. Please upload a smaller image.`);
        return;
      }
      setFileSizeError(null);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    setIsCreated(true);
  };

  return (
    <DashboardLayout title="Create Course" breadcrumb={['Courses', 'Create Course']} activeItem="Create Course" role="admin">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Full Thumbnail Modal Preview */}
        <Modal
          isOpen={isThumbnailModalOpen}
          onClose={() => setIsThumbnailModalOpen(false)}
          title="Course Thumbnail Full View"
          size="lg"
        >
          <div className="space-y-4">
            <img
              src={thumbnailPreview || defaultThumbnail}
              alt="Course Thumbnail Full View"
              className="w-full h-auto max-h-[500px] object-cover rounded-md border border-gray-200"
            />
            <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
              <span>Aspect Ratio: 16:9</span>
              <span>Status: {thumbnailPreview ? 'Custom Thumbnail Uploaded' : 'Default Preset Banner'}</span>
            </div>
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <Button size="sm" onClick={() => setIsThumbnailModalOpen(false)} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
        <div className="flex items-center gap-3">
          <Link href="/admin/courses">
            <Button variant="outline" size="sm" className="rounded-md">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-black">Create New Course</h1>
            <p className="text-gray-500 text-sm font-normal">2-Step course creation studio</p>
          </div>
        </div>

        {/* 2-Step Indicator */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: 1, title: 'Basic Details with Thumbnail' },
            { num: 2, title: 'Pricing & Publish' },
          ].map(s => (
            <div
              key={s.num}
              onClick={() => !isCreated && setStep(s.num)}
              className={`p-3 rounded-md border text-center cursor-pointer transition-all ${
                step === s.num
                  ? 'border-purple-700 bg-purple-50 text-purple-700 font-semibold shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="text-xs uppercase font-semibold text-gray-500">Step 0{s.num}</div>
              <div className="text-sm font-semibold mt-0.5">{s.title}</div>
            </div>
          ))}
        </div>

        {isCreated ? (
          <Card className="p-4 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={24} />
            </div>
            <h2 className="text-xl font-semibold text-black">Course Created Successfully!</h2>
            <p className="text-gray-500 text-sm font-normal max-w-md mx-auto">
              "<span className="font-semibold text-black">{courseInfo.title || 'Astrophysics Specialization'}</span>" has been created with pricing & thumbnail configured.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/admin/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
              <Link href="/admin/lessons/management">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">Manage Lessons</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Course Title</label>
                  <Input
                    placeholder="e.g. Masterclass in Stellar Evolution & Black Holes"
                    value={courseInfo.title}
                    onChange={e => setCourseInfo({ ...courseInfo, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">Category</label>
                    <select
                      value={courseInfo.category}
                      onChange={e => setCourseInfo({ ...courseInfo, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal focus:outline-none focus:ring-2 focus:ring-purple-700 text-black"
                    >
                      <option value="Astronomy & Physics">Astronomy & Physics</option>
                      <option value="Space Engineering">Space Engineering</option>
                      <option value="Astrophotography">Astrophotography</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">Difficulty Level</label>
                    <select
                      value={courseInfo.level}
                      onChange={e => setCourseInfo({ ...courseInfo, level: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal focus:outline-none focus:ring-2 focus:ring-purple-700 text-black"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-semibold text-black">Course Thumbnail Image</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsThumbnailModalOpen(true)}
                      className="text-xs font-semibold py-1 px-3 border-purple-700 text-purple-700 hover:bg-purple-50"
                    >
                      <Eye size={14} className="mr-1" /> View Thumbnail
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-purple-50/50 transition-colors text-center cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {thumbnailPreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={thumbnailPreview} alt="Course Thumbnail Preview" className="h-32 object-cover rounded-md border border-gray-200" />
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-purple-700">Click or Drag to replace image</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span onClick={(e) => { e.stopPropagation(); setIsThumbnailModalOpen(true); }} className="text-xs font-semibold text-purple-700 hover:underline cursor-pointer flex items-center">
                            <Eye size={12} className="mr-1" /> Full View
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                          <ImageIcon size={20} />
                        </div>
                        <p className="text-sm font-semibold text-black">Click or drag image to upload course thumbnail</p>
                        <p className="text-xs text-gray-500 font-normal">PNG, JPG, or WEBP up to 5MB (Recommended: 1280x720px)</p>
                      </div>
                    )}
                  </div>
                  {fileSizeError && (
                    <p className="mt-2 text-xs font-semibold text-purple-700 bg-purple-50 p-2.5 rounded-md border border-purple-200">
                      {fileSizeError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Course Summary & Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what students will learn in this course..."
                    value={courseInfo.description}
                    onChange={e => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal focus:outline-none focus:ring-2 focus:ring-purple-700 text-black"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(2)} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                    Next: Pricing & Publish
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Enrollment Price (₹ INR)</label>
                  <Input
                    type="number"
                    placeholder="4999"
                    value={courseInfo.price}
                    onChange={e => setCourseInfo({ ...courseInfo, price: e.target.value })}
                  />
                </div>

                <div className="p-4 bg-purple-50 rounded-md border border-purple-200 space-y-2">
                  <h4 className="font-semibold text-purple-900 text-sm">Course Readiness Summary</h4>
                  <ul className="text-xs text-purple-800 space-y-1 font-normal">
                    <li>✓ Course title & category configured</li>
                    <li>✓ Thumbnail image {thumbnailPreview ? 'uploaded' : 'pending (using default banner)'}</li>
                    <li>✓ Pricing set to ₹{courseInfo.price || '4,999'} INR</li>
                    <li>✓ Ready for student enrollment</li>
                  </ul>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <Button onClick={() => setStep(1)} variant="outline">
                    Back to Basic Details
                  </Button>
                  <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                    Publish Course
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
