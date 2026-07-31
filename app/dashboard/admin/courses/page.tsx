'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Star, Users, Clock } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const coursesData = [
  { id: 'CRS-001', title: 'Vedic Astrology', category: 'Astrology', mentor: 'Jane Smith', students: 156, rating: 4.8, status: 'Active' },
  { id: 'CRS-002', title: 'Numerology', category: 'Numerology', mentor: 'Diana Lee', students: 89, rating: 4.6, status: 'Active' },
  { id: 'CRS-003', title: 'Vastu Shastra', category: 'Vastu', mentor: 'Henry Chen', students: 234, rating: 4.9, status: 'Active' },
  { id: 'CRS-004', title: 'Palmistry', category: 'Palmistry', mentor: 'Ivy Wang', students: 112, rating: 4.5, status: 'Inactive' },
  { id: 'CRS-005', title: 'Tarot Reading', category: 'Tarot', mentor: 'Jack Brown', students: 178, rating: 4.7, status: 'Active' },
  { id: 'CRS-006', title: 'Yoga & Meditation', category: 'Wellness', mentor: 'Grace Kim', students: 245, rating: 4.8, status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function AllCourses() {
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
            <CardTitle>All Courses</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Course ID', sortable: true },
              { 
                key: 'title', 
                header: 'Title',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-500" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                )
              },
              { key: 'category', header: 'Category', sortable: true },
              { key: 'mentor', header: 'Mentor', sortable: true },
              { 
                key: 'students', 
                header: 'Students',
                render: (item) => (
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-500" />
                    <span className="font-medium">{item.students}</span>
                  </div>
                )
              },
              { 
                key: 'rating', 
                header: 'Rating',
                render: (item) => (
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                )
              },
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
            data={coursesData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
