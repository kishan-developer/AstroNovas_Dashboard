'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Star } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const mentorsData = [
  { id: 'MEN-001', name: 'Jane Smith', email: 'jane@example.com', courses: 5, students: 156, rating: 4.8, status: 'Active' },
  { id: 'MEN-002', name: 'Diana Lee', email: 'diana@example.com', courses: 3, students: 89, rating: 4.6, status: 'Active' },
  { id: 'MEN-003', name: 'Henry Chen', email: 'henry@example.com', courses: 7, students: 234, rating: 4.9, status: 'Active' },
  { id: 'MEN-004', name: 'Ivy Wang', email: 'ivy@example.com', courses: 4, students: 112, rating: 4.5, status: 'Inactive' },
  { id: 'MEN-005', name: 'Jack Brown', email: 'jack@example.com', courses: 6, students: 178, rating: 4.7, status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function Mentors() {
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
            <CardTitle>Mentors</CardTitle>
            <Button variant="primary" size="sm">
              <UserPlus size={18} className="mr-2" />
              Add Mentor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Mentor ID', sortable: true },
              { key: 'name', header: 'Name', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { key: 'courses', header: 'Courses', sortable: true },
              { key: 'students', header: 'Students', sortable: true },
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
            data={mentorsData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
