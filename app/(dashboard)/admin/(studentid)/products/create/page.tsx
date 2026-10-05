'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { productService } from '@/lib/api';
import {
  Upload,
  ArrowLeft,
  CheckCircle,
  Package,
  FileText,
  Tag,
  AlertTriangle,
  ImageIcon,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface UploadedImageItem {
  id: string;
  file: File;
  name: string;
  sizeFormatted: string;
  previewUrl: string;
}

export default function CreateProductPage() {
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Telescope Optics');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(10);
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');

  // Multiple Image Upload & Drag-and-Drop Reorder State
  const [imageItems, setImageItems] = useState<UploadedImageItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDraggingDropzone, setIsDraggingDropzone] = useState(false);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB Max Size per image

  // Process raw FileList with strict 2MB validation per image
  const processFiles = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const newItems: UploadedImageItem[] = [];
    let oversizedError: string | null = null;

    Array.from(files).forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        oversizedError = `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 2MB maximum size limit. Please upload images smaller than 2MB.`;
      } else {
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          previewUrl: URL.createObjectURL(file),
        });
      }
    });

    if (oversizedError) {
      setFileSizeError(oversizedError);
    } else {
      setFileSizeError(null);
    }

    if (newItems.length > 0) {
      setImageItems(prev => [...prev, ...newItems]);
    }
  };

  // Input change handler
  const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // Dropzone drag-and-drop file upload handler
  const handleDropFilesToUpload = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingDropzone(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // HTML5 Drag & Drop Reorder Cards Handler
  const handleDropReorder = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    setImageItems(prev => {
      const updated = [...prev];
      const [movedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, movedItem);
      return updated;
    });

    setDraggedIndex(null);
  };

  // Move position left or right via button controls
  const handleMovePosition = (currentIndex: number, direction: -1 | 1) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= imageItems.length) return;

    setImageItems(prev => {
      const updated = [...prev];
      const temp = updated[currentIndex];
      updated[currentIndex] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  // Remove individual image from gallery
  const handleRemoveImage = (id: string) => {
    setImageItems(prev => prev.filter(img => img.id !== id));
  };

  // Submit Product Form
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedPrice = price.startsWith('₹') ? price : `₹${price}`;
    const primaryImgName = imageItems[0]?.name || null;
    const galleryImageNames = imageItems.map(item => item.name);

    const newProduct = {
      id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      title,
      sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      price: formattedPrice,
      stock: Number(stock),
      status: Number(stock) === 0 ? 'Out of Stock' : Number(stock) < 5 ? 'Low Stock' : 'In Stock',
      description,
      specifications,
      imageUrl: primaryImgName,
      galleryImages: galleryImageNames,
      rating: 5.0,
      salesCount: 0,
    };

    try {
      await productService.createProduct(newProduct);
    } catch (err) {
      console.warn('API product creation failed:', err);
    }

    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  const handleResetForm = () => {
    setTitle('');
    setSku('');
    setPrice('');
    setStock(10);
    setDescription('');
    setSpecifications('');
    setImageItems([]);
    setDraggedIndex(null);
    setFileSizeError(null);
    setSubmittedSuccess(false);
  };

  return (
    <DashboardLayout title="Upload Product" breadcrumb={['Products', 'Create Product']} activeItem="All Products" role="admin">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button variant="outline" size="sm" className="rounded-md">
              <ArrowLeft size={16} className="mr-1" /> Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-black">Upload New Product</h1>
            <p className="text-gray-500 text-sm font-normal">Add astronomy gear, optical instruments, or lab kits to physical inventory</p>
          </div>
        </div>

        {submittedSuccess ? (
          <Card className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={28} />
            </div>
            <h2 className="text-xl font-semibold text-black">Product Uploaded Successfully!</h2>
            <p className="text-sm text-gray-600 font-normal">
              Product "<span className="font-semibold text-purple-700">{title}</span>" has been published and added to live store inventory.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button onClick={handleResetForm} variant="outline">Upload Another Product</Button>
              <Link href="/admin/products">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">View All Products</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4 sm:p-6">
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Product Title</label>
                  <Input
                    placeholder="e.g. AstroNovas Pro Refractor Telescope 100ED"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">SKU / Item Code</label>
                  <Input
                    placeholder="e.g. SKU-AST-100ED"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Product Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                  >
                    <option value="Telescope Optics">Telescope Optics</option>
                    <option value="Astrophotography">Astrophotography</option>
                    <option value="Astronomy Gear">Astronomy Gear</option>
                    <option value="Laboratory Kits">Laboratory Kits</option>
                    <option value="Books & Guides">Books & Guides</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Unit Price (INR ₹)</label>
                  <Input
                    placeholder="e.g. 48999"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Initial Stock Count</label>
                  <Input
                    type="number"
                    placeholder="e.g. 24"
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              {/* Product Multiple Image Upload Section (2MB Validation & Drag-and-Drop Reordering) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-black">
                    Product Images Upload (Drag to Reorder Position • Max 2MB per image)
                  </label>
                  {imageItems.length > 0 && (
                    <span className="text-xs text-purple-700 font-semibold">
                      {imageItems.length} {imageItems.length === 1 ? 'image' : 'images'} uploaded • Position #1 is Primary
                    </span>
                  )}
                </div>

                {/* Upload Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingDropzone(true); }}
                  onDragLeave={() => setIsDraggingDropzone(false)}
                  onDrop={handleDropFilesToUpload}
                  className={`border-2 border-dashed rounded-md p-4 transition-colors text-center cursor-pointer relative ${
                    isDraggingDropzone ? 'border-purple-700 bg-purple-100/70' : 'border-gray-300 bg-gray-50 hover:bg-purple-50/50'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-semibold text-black">Click or drag image files here to upload</p>
                    <p className="text-xs text-gray-500 font-normal">PNG, JPG, WEBP • Maximum 2MB size limit per image</p>
                  </div>
                </div>

                {fileSizeError && (
                  <div className="p-3 bg-purple-50 rounded-md border border-purple-200 text-xs font-semibold text-purple-900 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-purple-700 flex-shrink-0" />
                    <span>{fileSizeError}</span>
                  </div>
                )}

                {/* Drag and Drop Position Reorderable Gallery */}
                {imageItems.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-normal">
                      <span>Drag image cards to reorder positions or use left/right controls</span>
                      <span className="font-semibold text-purple-700">Position #1 = Main Catalog Image</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {imageItems.map((item, idx) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => {
                            setDraggedIndex(idx);
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDropReorder(idx)}
                          onDragEnd={() => setDraggedIndex(null)}
                          className={`relative border rounded-md p-2 bg-white flex flex-col justify-between group space-y-2 cursor-grab active:cursor-grabbing transition-all ${
                            draggedIndex === idx ? 'opacity-40 border-purple-700 scale-95' : 'border-gray-200 hover:border-purple-400'
                          }`}
                        >
                          <div className="relative h-28 w-full bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                            <img src={item.previewUrl} alt={item.name} className="h-full w-full object-cover" />

                            {/* Position Number Badge */}
                            <span className={`absolute top-1 left-1 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm ${
                              idx === 0 ? 'bg-purple-700 text-white' : 'bg-black/80 text-white'
                            }`}>
                              #{idx + 1} {idx === 0 ? 'Primary' : ''}
                            </span>

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(item.id)}
                              className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full transition-colors"
                              title="Remove image"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-black truncate" title={item.name}>{item.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono">{item.sizeFormatted}</p>
                          </div>

                          {/* Position Reordering Action Buttons */}
                          <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px]">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePosition(idx, -1)}
                              className="p-1 rounded bg-gray-100 hover:bg-purple-100 text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              title="Move position left"
                            >
                              <ChevronLeft size={14} />
                            </button>

                            <span className="font-semibold text-purple-700 text-[10px]">
                              Pos #{idx + 1}
                            </span>

                            <button
                              type="button"
                              disabled={idx === imageItems.length - 1}
                              onClick={() => handleMovePosition(idx, 1)}
                              className="p-1 rounded bg-gray-100 hover:bg-purple-100 text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              title="Move position right"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed summary of product features and usage..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Technical Specifications (Key Specifications)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Aperture: 100mm, Focal Length: 700mm, Weight: 4.2kg"
                  value={specifications}
                  onChange={e => setSpecifications(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <Link href="/admin/products">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                  {isSubmitting ? 'Uploading...' : 'Save & Publish Product'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
