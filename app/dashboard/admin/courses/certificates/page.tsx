'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Edit, Trash2, Plus } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const certificatesData = [
  { id: 'CRT-001', title: 'Vedic Astrology Certificate', course: 'Vedic Astrology', issued: 156, template: 'Classic', status: 'Active' },
  { id: 'CRT-002', title: 'Numerology Certificate', course: 'Numerology', issued: 89, template: 'Modern', status: 'Active' },
  { id: 'CRT-003', title: 'Vastu Shastra Certificate', course: 'Vastu Shastra', issued: 234, template: 'Classic', status: 'Active' },
  { id: 'CRT-004', title: 'Palmistry Certificate', course: 'Palmistry', issued: 112, template: 'Modern', status: 'Inactive' },
  { id: 'CRT-005', title: 'Tarot Reading Certificate', course: 'Tarot Reading', issued: 178, template: 'Classic', status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Draft': 'warning',
} as const;

export default function Certificates() {
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
            <CardTitle>Course Certificates</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Create Certificate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Certificate ID', sortable: true },
              { 
                key: 'title', 
                header: 'Certificate Title',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-500" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                )
              },
              { key: 'course', header: 'Course', sortable: true },
              { key: 'issued', header: 'Issued', sortable: true },
              { key: 'template', header: 'Template', sortable: true },
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
            data={certificatesData}
            pageSize={10}
            actions={(item) => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download size={16} />
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
