'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Edit, Trash2 } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const levelsData = [
  { id: 'LVL-001', name: 'Beginner', description: 'For new learners', order: 1, status: 'Active' },
  { id: 'LVL-002', name: 'Intermediate', description: 'For experienced learners', order: 2, status: 'Active' },
  { id: 'LVL-003', name: 'Advanced', description: 'For expert learners', order: 3, status: 'Active' },
  { id: 'LVL-004', name: 'Expert', description: 'For mastery level', order: 4, status: 'Inactive' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function CourseLevels() {
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
            <CardTitle>Course Levels</CardTitle>
            <Button variant="primary" size="sm">
              <Layers size={18} className="mr-2" />
              Add Level
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Level ID', sortable: true },
              { 
                key: 'name', 
                header: 'Level Name',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-gray-500" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                )
              },
              { key: 'description', header: 'Description', sortable: true },
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
            data={levelsData}
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
