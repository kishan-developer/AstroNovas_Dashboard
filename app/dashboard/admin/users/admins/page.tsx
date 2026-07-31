'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Shield } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const adminsData = [
  { id: 'ADM-001', name: 'Eve Davis', email: 'eve@example.com', permissions: 'Full Access', lastLogin: '2024-01-15', status: 'Active' },
  { id: 'ADM-002', name: 'Tom Anderson', email: 'tom@example.com', permissions: 'Full Access', lastLogin: '2024-01-14', status: 'Active' },
  { id: 'ADM-003', name: 'Lisa Chen', email: 'lisa@example.com', permissions: 'Limited Access', lastLogin: '2024-01-10', status: 'Active' },
  { id: 'ADM-004', name: 'Mike Ross', email: 'mike@example.com', permissions: 'Full Access', lastLogin: '2024-01-08', status: 'Inactive' },
  { id: 'ADM-005', name: 'Rachel Green', email: 'rachel@example.com', permissions: 'Full Access', lastLogin: '2024-01-05', status: 'Active' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function Admins() {
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
            <CardTitle>Admins</CardTitle>
            <Button variant="primary" size="sm">
              <UserPlus size={18} className="mr-2" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Admin ID', sortable: true },
              { key: 'name', header: 'Name', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { 
                key: 'permissions', 
                header: 'Permissions',
                render: (item) => (
                  <div className="flex items-center gap-1">
                    <Shield size={14} className="text-gray-500" />
                    <span className="font-medium">{item.permissions}</span>
                  </div>
                )
              },
              { key: 'lastLogin', header: 'Last Login', sortable: true },
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
            data={adminsData}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
