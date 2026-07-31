'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const managersData = [
  { id: 'MGR-001', name: 'Alice Brown', email: 'alice@example.com', department: 'Operations', students: 450, status: 'Active' },
  { id: 'MGR-002', name: 'David Park', email: 'david@example.com', department: 'Academics', students: 320, status: 'Active' },
  { id: 'MGR-003', name: 'Emma Wilson', email: 'emma@example.com', department: 'Student Affairs', students: 280, status: 'Active' },
  { id: 'MGR-004', name: 'Michael Scott', email: 'michael@example.com', department: 'Operations', students: 410, status: 'Inactive' },
  { id: 'MGR-005', name: 'Sarah Johnson', email: 'sarah@example.com', department: 'Academics', students: 390, status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function Managers() {
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
            <CardTitle>Managers</CardTitle>
            <Button variant="primary" size="sm">
              <UserPlus size={18} className="mr-2" />
              Add Manager
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Manager ID', sortable: true },
              { key: 'name', header: 'Name', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { key: 'department', header: 'Department', sortable: true },
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
                key: 'status', 
                header: 'Status',
                render: (item) => (
                  <Badge variant={statusColors[item.status as keyof typeof statusColors] || 'default'}>
                    {item.status}
                  </Badge>
                )
              },
            ]}
            data={managersData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
