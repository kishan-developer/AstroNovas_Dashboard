'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FolderOpen, ArrowLeft, CheckCircle, Globe, Rocket, Camera, Code, Radio, Sun, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AddCourseCategoryPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const iconOptions = [Globe, Rocket, Camera, Code, Radio, Sun, Zap, BookOpen];

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="Add Category" breadcrumb={['Courses', 'Categories', 'Add Category']} activeItem="Add Category" role="admin">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/courses/categories">
            <Button variant="outline" size="sm" className="rounded-md">
              <ArrowLeft size={16} className="mr-1" /> Back to Categories
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-black">Add New Course Category</h1>
            <p className="text-gray-500 text-sm font-normal">Create a new subject domain category for courses</p>
          </div>
        </div>

        {submitted ? (
          <Card className="p-4 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={24} />
            </div>
            <h2 className="text-xl font-semibold text-black">Category Created!</h2>
            <p className="text-gray-500 text-sm font-normal">
              Category "<span className="font-semibold text-black">{name}</span>" is now live and can be assigned to new courses.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button onClick={() => setSubmitted(false)} variant="outline">Add Another</Button>
              <Link href="/admin/courses/categories">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">View All Categories</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4 sm:p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Category Name</label>
                <Input
                  placeholder="e.g. Quantum Computing for Astronomy"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">URL Slug</label>
                <Input
                  placeholder="quantum-computing-astronomy"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Category Icon (Lucide)</label>
                <div className="flex gap-2 flex-wrap">
                  {iconOptions.map((IconComp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIconIndex(idx)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                        selectedIconIndex === idx ? 'border-purple-700 bg-purple-100 text-purple-700 font-semibold' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      <IconComp size={18} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of what this category covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal focus:outline-none focus:ring-2 focus:ring-purple-700 text-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <Link href="/admin/courses/categories">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                  Save Category
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
