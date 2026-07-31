'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const studentsData = [
  { id: 'STU-001', name: 'John Doe', email: 'john@example.com', enrolled: 5, progress: 75, status: 'Active' },
  { id: 'STU-002', name: 'Bob Johnson', email: 'bob@example.com', enrolled: 3, progress: 45, status: 'Inactive' },
  { id: 'STU-003', name: 'Charlie Wilson', email: 'charlie@example.com', enrolled: 8, progress: 90, status: 'Active' },
  { id: 'STU-004', name: 'Frank Miller', email: 'frank@example.com', enrolled: 2, progress: 20, status: 'Pending' },
  { id: 'STU-005', name: 'Grace Kim', email: 'grace@example.com', enrolled: 6, progress: 60, status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function Students() {
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
            <CardTitle>Students</CardTitle>
            <Button variant="primary" size="sm">
              <UserPlus size={18} className="mr-2" />
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Student ID', sortable: true },
              { key: 'name', header: 'Name', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { key: 'enrolled', header: 'Enrolled Courses', sortable: true },
              { key: 'progress', header: 'Avg Progress', sortable: true },
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
            data={studentsData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
