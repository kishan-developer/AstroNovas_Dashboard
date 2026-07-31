'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Trash2, Flag } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const reviewsData = [
  { id: 'REV-001', course: 'Vedic Astrology', student: 'John Doe', rating: 5, comment: 'Excellent course, very informative!', date: '2024-01-15', status: 'Approved' },
  { id: 'REV-002', course: 'Numerology', student: 'Jane Smith', rating: 4, comment: 'Good content but needs more examples', date: '2024-01-14', status: 'Approved' },
  { id: 'REV-003', course: 'Vastu Shastra', student: 'Bob Johnson', rating: 5, comment: 'Amazing mentor and great materials', date: '2024-01-13', status: 'Pending' },
  { id: 'REV-004', course: 'Palmistry', student: 'Alice Brown', rating: 3, comment: 'Could be better structured', date: '2024-01-12', status: 'Approved' },
  { id: 'REV-005', course: 'Tarot Reading', student: 'Charlie Wilson', rating: 4, comment: 'Interesting content', date: '2024-01-11', status: 'Pending' },
];

const statusColors = {
  'Approved': 'success',
  'Pending': 'warning',
  'Rejected': 'danger',
} as const;

export default function CourseReviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Reviews</CardTitle>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Review ID', sortable: true },
              { key: 'course', header: 'Course', sortable: true },
              { key: 'student', header: 'Student', sortable: true },
              { 
                key: 'rating', 
                header: 'Rating',
                render: (item) => (
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{item.rating}/5</span>
                  </div>
                )
              },
              { 
                key: 'comment', 
                header: 'Comment',
                render: (item) => (
                  <div className="flex items-center gap-2 max-w-xs">
                    <MessageSquare size={14} className="text-gray-500 flex-shrink-0" />
                    <span className="truncate">{item.comment}</span>
                  </div>
                )
              },
              { key: 'date', header: 'Date', sortable: true },
              { 
                key: 'status', 
                header: 'Status',
                render: (item) => (
                  <Badge variant={statusColors[item.status as keyof typeof statusColors] || 'default'}>
                    {item.status}
                  </Badge>
                )
              },
            ]}
            data={reviewsData}
            pageSize={10}
            actions={(item) => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Flag size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
