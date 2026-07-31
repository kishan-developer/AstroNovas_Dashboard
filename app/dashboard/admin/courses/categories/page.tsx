'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Edit, Trash2, BookOpen } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const categoriesData = [
  { id: 'CAT-001', name: 'Vedic Astrology', courses: 15, status: 'Active' },
  { id: 'CAT-002', name: 'Numerology', courses: 12, status: 'Active' },
  { id: 'CAT-003', name: 'Vastu Shastra', courses: 8, status: 'Active' },
  { id: 'CAT-004', name: 'Palmistry', courses: 10, status: 'Active' },
  { id: 'CAT-005', name: 'Tarot Reading', courses: 6, status: 'Inactive' },
  { id: 'CAT-006', name: 'Yoga & Meditation', courses: 9, status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function Categories() {
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
            <CardTitle>Course Categories</CardTitle>
            <Button variant="primary" size="sm">
              <FolderPlus size={18} className="mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Category ID', sortable: true },
              { 
                key: 'name', 
                header: 'Category Name',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-gray-500" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                )
              },
              { key: 'courses', header: 'Courses', sortable: true },
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
            data={categoriesData}
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
