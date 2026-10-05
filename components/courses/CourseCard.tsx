'use client';

import React, { useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Course } from '@/lib/redux/slices/coursesSlice';
import { BookOpen, Users, Star, Eye, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  onViewThumbnail: (course: Course) => void;
  onPublish?: (course: Course) => void;
  isPublishing?: boolean;
}

export const CourseCard = React.memo(function CourseCard({
  course,
  onEdit,
  onDelete,
  onViewThumbnail,
  onPublish,
  isPublishing = false,
}: CourseCardProps) {
  const handleEditClick = useCallback(() => {
    onEdit(course);
  }, [course, onEdit]);

  const handleDeleteClick = useCallback(() => {
    onDelete(course);
  }, [course, onDelete]);

  const handleViewClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onViewThumbnail(course);
  }, [course, onViewThumbnail]);

  const handlePublishClick = useCallback(() => {
    if (onPublish) {
      onPublish(course);
    }
  }, [course, onPublish]);

  return (
    <Card className="flex flex-col justify-between p-4 hover:shadow-md transition-all">
      <div className="space-y-3">
        {/* Thumbnail Image Header */}
        <div className="relative h-40 w-full overflow-hidden rounded-md group bg-gray-100 border border-gray-200">
          <img
            src={course.thumbnail || DEFAULT_THUMBNAIL}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="font-semibold shadow-sm">{course.category}</Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge
              variant={course.status === 'Published' ? 'primary' : 'default'}
              className={`font-semibold shadow-sm ${course.status === 'Draft' ? 'bg-black text-white' : ''}`}
            >
              {course.status}
            </Badge>
          </div>
          <button
            onClick={handleViewClick}
            className="absolute bottom-2 right-2 bg-white/95 hover:bg-white text-purple-700 p-1.5 rounded-full shadow-sm transition-all flex items-center gap-1 text-xs font-semibold px-2.5"
            title="View Full Thumbnail"
          >
            <Eye size={14} /> View
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-black text-base leading-snug">{course.title}</h3>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{course.id}</p>
        </div>

        {course.revenue ? (
          <div className="grid grid-cols-2 gap-2 p-3 bg-purple-50 rounded-md text-xs">
            <div>
              <span className="text-gray-600 font-normal">Total Enrolled:</span>
              <p className="font-semibold text-black text-sm">{course.students || 0}</p>
            </div>
            <div>
              <span className="text-gray-600 font-normal">Gross Revenue:</span>
              <p className="font-semibold text-purple-700 text-sm">{course.revenue}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-gray-600 font-normal pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1"><Users size={14} /> {course.students || 0} Students</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessons || 12} Lessons</span>
            {course.rating > 0 && (
              <span className="flex items-center gap-1 text-purple-700 font-semibold">
                <Star size={14} fill="currentColor" /> {course.rating}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
        <span className="text-base font-semibold text-purple-700">{course.price}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleEditClick}
            className="p-1.5 rounded-full hover:bg-purple-50 text-purple-700 transition-colors"
            title="Edit Course"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
            title="Delete Course"
          >
            <Trash2 size={16} />
          </button>

          {course.status === 'Draft' && onPublish && (
            <Button
              size="sm"
              disabled={isPublishing}
              onClick={handlePublishClick}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold ml-1 text-xs py-1 px-2.5"
            >
              <CheckCircle size={13} className="mr-1" /> {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});
