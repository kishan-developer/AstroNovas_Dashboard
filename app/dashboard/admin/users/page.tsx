'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Filter } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const usersData = [
  { id: 'USR-001', name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', joined: '2024-01-15' },
  { id: 'USR-002', name: 'Jane Smith', email: 'jane@example.com', role: 'Mentor', status: 'Active', joined: '2024-01-14' },
  { id: 'USR-003', name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive', joined: '2024-01-13' },
  { id: 'USR-004', name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', joined: '2024-01-12' },
  { id: 'USR-005', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Student', status: 'Active', joined: '2024-01-11' },
  { id: 'USR-006', name: 'Diana Lee', email: 'diana@example.com', role: 'Mentor', status: 'Active', joined: '2024-01-10' },
  { id: 'USR-007', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active', joined: '2024-01-09' },
  { id: 'USR-008', name: 'Frank Miller', email: 'frank@example.com', role: 'Student', status: 'Pending', joined: '2024-01-08' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

const roleColors = {
  'Admin': 'purple',
  'Manager': 'blue',
  'Mentor': 'green',
  'Student': 'orange',
} as const;

export default function AllUsers() {
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
            <CardTitle>All Users</CardTitle>
            <Button variant="primary" size="sm">
              <UserPlus size={18} className="mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', sortable: true },
              { key: 'name', header: 'Name', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { 
                key: 'role', 
                header: 'Role',
                render: (item) => (
                  <Badge variant={roleColors[item.role as keyof typeof roleColors] || 'default'}>
                    {item.role}
                  </Badge>
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
              { key: 'joined', header: 'Joined Date', sortable: true },
            ]}
            data={usersData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
