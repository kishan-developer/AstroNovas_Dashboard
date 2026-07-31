'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit, Trash2, Plus, PlayCircle } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const lessonsData = [
  { id: 'LES-001', title: 'Introduction to Planets', module: 'Planetary Movements', course: 'Vedic Astrology', duration: '45 min', order: 1, status: 'Active' },
  { id: 'LES-002', title: 'Sun and Moon Effects', module: 'Planetary Movements', course: 'Vedic Astrology', duration: '60 min', order: 2, status: 'Active' },
  { id: 'LES-003', title: 'Mars and Venus', module: 'Planetary Movements', course: 'Vedic Astrology', duration: '50 min', order: 3, status: 'Active' },
  { id: 'LES-004', title: 'Life Path Calculation', module: 'Life Path Numbers', course: 'Numerology', duration: '40 min', order: 1, status: 'Active' },
  { id: 'LES-005', title: 'Master Numbers', module: 'Life Path Numbers', course: 'Numerology', duration: '55 min', order: 2, status: 'Inactive' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function Lessons() {
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
            <CardTitle>Course Lessons</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Add Lesson
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Lesson ID', sortable: true },
              { 
                key: 'title', 
                header: 'Lesson Title',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                )
              },
              { key: 'module', header: 'Module', sortable: true },
              { key: 'course', header: 'Course', sortable: true },
              { key: 'duration', header: 'Duration', sortable: true },
              { key: 'order', header: 'Order', sortable: true },
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
            data={lessonsData}
            pageSize={10}
            actions={(item) => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <PlayCircle size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
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
