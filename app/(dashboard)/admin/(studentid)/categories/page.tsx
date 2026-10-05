'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FolderOpen, Plus, BookOpen, Edit, Trash2, Layers, Globe, Rocket, Camera, Code } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Astronomy & Physics', slug: 'astronomy-physics', count: 18, icon: Globe, description: 'Cosmology, stellar physics, general relativity, quantum astronomy' },
  { id: 2, name: 'Space Engineering', slug: 'space-engineering', count: 12, icon: Rocket, description: 'Rocket propulsion, orbital dynamics, satellite systems, mission design' },
  { id: 3, name: 'Astrophotography', slug: 'astrophotography', count: 8, icon: Camera, description: 'Deep sky imaging, narrowband filters, stacking, telescope gear' },
  { id: 4, name: 'Data Science & Python', slug: 'data-science', count: 6, icon: Code, description: 'Astro-informatics, spectra analysis, machine learning for galaxy classification' },
];

export default function AllCategoriesPage() {
  return (
    <DashboardLayout title="Categories" breadcrumb={['Categories', 'All Categories']} activeItem="All Categories" role="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-black">Course Categories</h1>
            <p className="text-gray-500 text-sm font-normal">Organize courses into structured learning domain categories</p>
          </div>
          <Link href="/admin/courses/categories/add">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
              <Plus size={18} className="mr-2" /> Add Category
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Card key={cat.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                      <IconComponent size={20} />
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      <BookOpen size={12} className="mr-1" /> {cat.count} Courses
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">{cat.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">slug: /{cat.slug}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed font-normal">{cat.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                    <Edit size={16} className="mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-black hover:bg-gray-100">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
