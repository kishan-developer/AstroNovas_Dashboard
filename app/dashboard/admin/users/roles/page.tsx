'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const rolesData = [
  { id: 'ROL-001', name: 'Admin', users: 5, permissions: 12, status: 'Active' },
  { id: 'ROL-002', name: 'Manager', users: 8, permissions: 10, status: 'Active' },
  { id: 'ROL-003', name: 'Mentor', users: 25, permissions: 8, status: 'Active' },
  { id: 'ROL-004', name: 'Student', users: 1234, permissions: 5, status: 'Active' },
  { id: 'ROL-005', name: 'Guest', users: 0, permissions: 2, status: 'Inactive' },
];

const statusColors = {
  'Active': 'success',
  'Inactive': 'danger',
  'Pending': 'warning',
} as const;

export default function Roles() {
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
            <CardTitle>Roles & Permissions</CardTitle>
            <Button variant="primary" size="sm">
              <Plus size={18} className="mr-2" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Role ID', sortable: true },
              { 
                key: 'name', 
                header: 'Role Name',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-500" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                )
              },
              { key: 'users', header: 'Users', sortable: true },
              { key: 'permissions', header: 'Permissions', sortable: true },
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
            data={rolesData}
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
