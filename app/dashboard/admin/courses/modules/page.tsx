'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderTree, Edit, Trash2, Plus } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const modulesData = [
  { id: 'MOD-001', title: 'Introduction to Astrology', course: 'Vedic Astrology', lessons: 8, order: 1, status: 'Active' },
  { id: 'MOD-002', title: 'Planetary Movements', course: 'Vedic Astrology', lessons: 12, order: 2, status: 'Active' },
  { id: 'MOD-003', title: 'Birth Chart Analysis', course: 'Vedic Astrology', lessons: 10, order: 3, status: 'Active' },
  { id: 'MOD-004', title: 'Numerology Basics', course: 'Numerology', lessons: 6, order: 1, status: 'Active' },
  { id: 'MOD-005', title: 'Life Path Numbers', course: 'Numerology', lessons: 8, order: 2, status: 'Inactive' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function CourseModules() {
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
            <CardTitle>Course Modules</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Add Module
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Module ID', sortable: true },
              { 
                key: 'title', 
                header: 'Module Title',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <FolderTree size={16} className="text-gray-500" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                )
              },
              { key: 'course', header: 'Course', sortable: true },
              { key: 'lessons', header: 'Lessons', sortable: true },
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
            data={modulesData}
            pageSize={10}
            actions={(item) => (
              <div className="flex items-center gap-2">
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
