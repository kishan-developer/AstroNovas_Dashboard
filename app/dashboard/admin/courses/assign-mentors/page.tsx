'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Plus, X } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const assignmentsData = [
  { id: 'ASN-001', course: 'Vedic Astrology', mentor: 'Jane Smith', assignedDate: '2024-01-15', status: 'Active' },
  { id: 'ASN-002', course: 'Numerology', mentor: 'Diana Lee', assignedDate: '2024-01-14', status: 'Active' },
  { id: 'ASN-003', course: 'Vastu Shastra', mentor: 'Henry Chen', assignedDate: '2024-01-13', status: 'Active' },
  { id: 'ASN-004', course: 'Palmistry', mentor: 'Ivy Wang', assignedDate: '2024-01-12', status: 'Inactive' },
  { id: 'ASN-005', course: 'Tarot Reading', mentor: 'Jack Brown', assignedDate: '2024-01-11', status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function AssignMentors() {
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
            <CardTitle>Assign Mentors to Courses</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              New Assignment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Assignment ID', sortable: true },
              { key: 'course', header: 'Course', sortable: true },
              { 
                key: 'mentor', 
                header: 'Mentor',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <UserCheck size={16} className="text-gray-500" />
                    <span className="font-medium">{item.mentor}</span>
                  </div>
                )
              },
              { key: 'assignedDate', header: 'Assigned Date', sortable: true },
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
            data={assignmentsData}
            pageSize={10}
            actions={(item) => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <X size={16} />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
