'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  fetchCoursesThunk,
  updateCourseThunk,
  deleteCourseThunk,
  Course,
} from '@/lib/redux/slices/coursesSlice';
import { CourseCard } from '@/components/courses/CourseCard';
import { Search, AlertTriangle, ImageIcon, Plus, Eye } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

export default function PublishedCoursesPage() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);

  const [search, setSearch] = useState('');

  // Edit Modal State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editThumbnailPreview, setEditThumbnailPreview] = useState<string | null>(null);
  const [isEditThumbnailModalOpen, setIsEditThumbnailModalOpen] = useState(false);
  const [viewingThumbnailCourse, setViewingThumbnailCourse] = useState<Course | null>(null);
  const [editFileSizeError, setEditFileSizeError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    price: '',
    status: 'Published',
    level: 'Beginner',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal State
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Fetch Courses via Redux Toolkit Async Thunk with Axios
  useEffect(() => {
    dispatch(fetchCoursesThunk());
  }, [dispatch]);

  // Derived State using useMemo for high performance filtering
  const publishedCourses = useMemo(() => {
    return courses.filter((c) => {
      const isPublished = c.status === 'Published';
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      return isPublished && matchesSearch;
    });
  }, [courses, search]);

  // Thumbnail File Upload Handler with 5MB validation
  const handleEditImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setEditFileSizeError(`Selected file (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 5MB maximum limit. Please upload a smaller image.`);
        return;
      }
      setEditFileSizeError(null);
      setEditThumbnailPreview(URL.createObjectURL(file));
    }
  }, []);

  // Handlers wrapped in useCallback for performance
  const handleOpenEdit = useCallback((course: Course) => {
    setEditingCourse(course);
    setEditThumbnailPreview(course.thumbnail || DEFAULT_THUMBNAIL);
    setEditFileSizeError(null);
    setEditForm({
      title: course.title || '',
      category: course.category || 'Astronomy & Physics',
      price: course.price ? course.price.replace(/[^\d]/g, '') : '4999',
      status: course.status || 'Published',
      level: course.level || 'Intermediate',
    });
  }, []);

  const handleOpenDelete = useCallback((course: Course) => {
    setDeletingCourse(course);
  }, []);

  const handleOpenViewThumbnail = useCallback((course: Course) => {
    setViewingThumbnailCourse(course);
  }, []);

  // Submit Edit Form to Redux Store + Axios API
  const handleSaveEdit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setIsSaving(true);
    const updatedPayload = {
      title: editForm.title,
      category: editForm.category,
      price: `₹${Number(editForm.price).toLocaleString('en-IN')}`,
      status: editForm.status as 'Published' | 'Draft',
      level: editForm.level,
      thumbnail: editThumbnailPreview || undefined,
    };

    await dispatch(updateCourseThunk({ id: editingCourse.id, courseData: updatedPayload }));

    setIsSaving(false);
    setEditingCourse(null);
  }, [editingCourse, editForm, editThumbnailPreview, dispatch]);

  // Confirm Delete with Redux Store + Axios API
  const handleConfirmDelete = useCallback(async () => {
    if (!deletingCourse) return;

    setIsDeleting(true);
    await dispatch(deleteCourseThunk(deletingCourse.id));

    setIsDeleting(false);
    setDeletingCourse(null);
  }, [deletingCourse, dispatch]);

  return (
    <DashboardLayout title="Published Courses" breadcrumb={['Courses', 'Published Courses']} activeItem="Published Courses" role="admin">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Published Courses</h1>
            <p className="text-gray-500 text-sm font-normal">Active courses available for student enrollment</p>
          </div>
          <Link href="/admin/courses/create">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
              <Plus size={18} className="mr-1.5" /> Create Course
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search published courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
        </Card>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onViewThumbnail={handleOpenViewThumbnail}
            />
          ))}
        </div>

        {/* Edit Course Modal */}
        <Modal
          isOpen={!!editingCourse}
          onClose={() => setEditingCourse(null)}
          title={`Edit Published Course: ${editingCourse?.id}`}
          size="md"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Course Title</label>
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
            </div>

            {/* Thumbnail Upload & View Button */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-semibold text-black">Course Thumbnail Image</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditThumbnailModalOpen(true)}
                  className="text-xs font-semibold py-1 px-3 border-purple-700 text-purple-700 hover:bg-purple-50"
                >
                  <Eye size={14} className="mr-1" /> View Thumbnail
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-purple-50/50 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {editThumbnailPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={editThumbnailPreview} alt="Course Thumbnail" className="h-28 object-cover rounded-md border border-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-purple-700">Click or Drag to replace image</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span onClick={(e) => { e.stopPropagation(); setIsEditThumbnailModalOpen(true); }} className="text-xs font-semibold text-purple-700 hover:underline cursor-pointer flex items-center">
                        <Eye size={12} className="mr-1" /> Full View
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                      <ImageIcon size={20} />
                    </div>
                    <p className="text-sm font-semibold text-black">Click or drag image to upload thumbnail</p>
                    <p className="text-xs text-gray-500 font-normal">PNG, JPG, or WEBP up to 5MB</p>
                  </div>
                )}
              </div>
              {editFileSizeError && (
                <p className="mt-2 text-xs font-semibold text-purple-700 bg-purple-50 p-2.5 rounded-md border border-purple-200">
                  {editFileSizeError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
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
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Enrollment Price (₹ INR)</label>
                <Input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft (Unpublish)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setEditingCourse(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Full Thumbnail Modal for Published Course */}
        <Modal
          isOpen={isEditThumbnailModalOpen || !!viewingThumbnailCourse}
          onClose={() => {
            setIsEditThumbnailModalOpen(false);
            setViewingThumbnailCourse(null);
          }}
          title={`Thumbnail Full View: ${editingCourse?.title || viewingThumbnailCourse?.title || ''}`}
          size="lg"
        >
          <div className="space-y-4">
            <img
              src={editThumbnailPreview || viewingThumbnailCourse?.thumbnail || DEFAULT_THUMBNAIL}
              alt="Course Thumbnail Full View"
              className="w-full max-h-[60vh] object-contain rounded-md border border-gray-200 bg-black"
            />
            <div className="flex justify-between items-center text-xs text-gray-500 font-normal">
              <span>Standard aspect ratio 16:9 • High Quality Preview</span>
              <Button
                type="button"
                onClick={() => {
                  setIsEditThumbnailModalOpen(false);
                  setViewingThumbnailCourse(null);
                }}
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deletingCourse}
          onClose={() => setDeletingCourse(null)}
          title="Confirm Course Deletion"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-md border border-purple-200">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="text-xs text-purple-900 font-normal">
                This action will permanently delete the published course and remove all associated curriculum modules from the backend server.
              </div>
            </div>

            <p className="text-sm font-normal text-black">
              Are you sure you want to delete course <span className="font-semibold text-purple-700">"{deletingCourse?.title}"</span> (<span className="font-mono text-xs">{deletingCourse?.id}</span>)?
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setDeletingCourse(null)}>
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="bg-black hover:bg-gray-900 text-white font-semibold"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
