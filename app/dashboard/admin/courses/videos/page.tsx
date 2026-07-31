'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Video, Edit, Trash2, Plus, PlayCircle } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const videosData = [
  { id: 'VID-001', title: 'Introduction to Planets', lesson: 'Introduction to Planets', duration: '45:00', size: '125 MB', status: 'Active' },
  { id: 'VID-002', title: 'Sun and Moon Effects', lesson: 'Sun and Moon Effects', duration: '60:00', size: '180 MB', status: 'Active' },
  { id: 'VID-003', title: 'Mars and Venus', lesson: 'Mars and Venus', duration: '50:00', size: '145 MB', status: 'Active' },
  { id: 'VID-004', title: 'Life Path Calculation', lesson: 'Life Path Calculation', duration: '40:00', size: '110 MB', status: 'Processing' },
  { id: 'VID-005', title: 'Master Numbers', lesson: 'Master Numbers', duration: '55:00', size: '160 MB', status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Processing': 'warning',
  'Failed': 'danger',
} as const;

export default function Videos() {
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
            <CardTitle>Course Videos</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Upload Video
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Video ID', sortable: true },
              { 
                key: 'title', 
                header: 'Video Title',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-gray-500" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                )
              },
              { key: 'lesson', header: 'Lesson', sortable: true },
              { key: 'duration', header: 'Duration', sortable: true },
              { key: 'size', header: 'Size', sortable: true },
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
            data={videosData}
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
