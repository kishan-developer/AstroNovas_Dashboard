'use client';

import React, { use, useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { productService } from '@/lib/api';
import {
  Package,
  ArrowLeft,
  Edit,
  Box,
  CheckCircle,
  Tag,
  ShoppingBag,
  Star,
  FileText,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function DynamicProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id || 'PRD-101';

  const [product, setProduct] = useState<any>({
    id: productId.startsWith('PRD-') ? productId : `PRD-${productId}`,
    title: 'AstroNovas Pro Refractor Telescope 100ED',
    sku: 'SKU-AST-100ED',
    category: 'Telescope Optics',
    price: '₹48,999',
    stock: 24,
    status: 'In Stock',
    rating: 4.9,
    salesCount: 142,
    description: 'High-aperture extra-low dispersion doublet refractor for solar and deep sky photography.',
    specifications: 'Aperture: 100mm, Focal Length: 700mm, Weight: 4.2kg, Glass Type: FPL-53 ED',
  });

  const [loading, setLoading] = useState(true);

  // Quick Stock Adjustment Modal
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [newStock, setNewStock] = useState<number>(product.stock);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: product.title,
    price: product.price,
    stock: product.stock,
    category: product.category,
    description: product.description,
  });

  // Fetch Product details from API
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await productService.getProductById(productId);
        if (data) {
          setProduct(data);
          setNewStock(data.stock);
          setEditForm({
            title: data.title,
            price: data.price,
            stock: data.stock,
            category: data.category,
            description: data.description || '',
          });
        }
      } catch (err) {
        console.warn('Failed to load product details from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  // Handle Stock Update
  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStatus = newStock === 0 ? 'Out of Stock' : newStock < 5 ? 'Low Stock' : 'In Stock';
    const updated = { ...product, stock: Number(newStock), status: updatedStatus };

    try {
      await productService.updateProduct(product.id, updated);
    } catch (err) {
      console.warn('API update stock failed:', err);
    }

    setProduct(updated);
    setIsStockModalOpen(false);
  };

  // Handle Product Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStatus = Number(editForm.stock) === 0 ? 'Out of Stock' : Number(editForm.stock) < 5 ? 'Low Stock' : 'In Stock';
    const updated = {
      ...product,
      title: editForm.title,
      price: editForm.price,
      stock: Number(editForm.stock),
      category: editForm.category,
      description: editForm.description,
      status: updatedStatus,
    };

    try {
      await productService.updateProduct(product.id, updated);
    } catch (err) {
      console.warn('API update product failed:', err);
    }

    setProduct(updated);
    setIsEditModalOpen(false);
  };

  return (
    <DashboardLayout title={`Product: ${product.sku}`} breadcrumb={['Products', 'Details', product.id]} activeItem="All Products" role="admin">
      <div className="space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft size={16} className="mr-1" /> Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-black">{product.title}</h1>
              <p className="text-gray-500 text-sm font-normal">SKU: <span className="font-mono font-semibold text-purple-700">{product.sku}</span> • ID: {product.id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsStockModalOpen(true)} variant="outline" className="text-purple-700 border-purple-700 hover:bg-purple-50">
              <Box size={16} className="mr-1" /> Adjust Stock
            </Button>
            <Button onClick={() => setIsEditModalOpen(true)} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
              <Edit size={16} className="mr-1" /> Edit Details
            </Button>
          </div>
        </div>

        {/* Product Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
              <Tag size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Unit Price (INR)</p>
              <p className="text-lg font-semibold text-black">{product.price}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center font-semibold border border-purple-200">
              <Box size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Stock Level</p>
              <p className="text-lg font-semibold text-purple-700">{product.stock} units</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Total Sales</p>
              <p className="text-lg font-semibold text-black">{product.salesCount} sold</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-semibold">
              <Star size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Customer Rating</p>
              <p className="text-lg font-semibold text-gray-700">{product.rating} / 5.0</p>
            </div>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 md:col-span-2 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <Badge variant="secondary" className="font-semibold">{product.category}</Badge>
                <h2 className="text-xl font-semibold text-black mt-1">{product.title}</h2>
              </div>
              <Badge variant={product.status === 'In Stock' ? 'primary' : product.status === 'Low Stock' ? 'warning' : 'danger'} className="font-semibold">
                {product.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black mb-1">Product Description</h3>
              <p className="text-sm text-gray-600 font-normal leading-relaxed">{product.description}</p>
            </div>

            {product.specifications && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-black mb-2">Technical Specifications</h3>
                <div className="p-3 bg-purple-50 rounded-md border border-purple-200 text-xs text-purple-900 font-normal">
                  {product.specifications}
                </div>
              </div>
            )}
          </Card>

          {/* Product Image / Icon Box */}
          <Card className="p-4 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50 border border-gray-200">
            <div className="w-24 h-24 bg-purple-100 text-purple-700 rounded-md flex items-center justify-center font-semibold">
              <Package size={48} />
            </div>
            <div>
              <h4 className="font-semibold text-black text-base">{product.sku}</h4>
              <p className="text-xs text-gray-500 font-normal">Official AstroNovas Equipment Item</p>
            </div>
            <Button onClick={() => setIsStockModalOpen(true)} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs w-full">
              Update Inventory Stock
            </Button>
          </Card>
        </div>

        {/* Adjust Stock Modal */}
        <Modal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          title={`Adjust Inventory Stock: ${product.sku}`}
          size="sm"
        >
          <form onSubmit={handleUpdateStock} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Available Stock Units</label>
              <Input
                type="number"
                value={newStock}
                onChange={e => setNewStock(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setIsStockModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                Save Stock
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Product: ${product.id}`}
          size="md"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Product Title</label>
              <Input
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Price (INR ₹)</label>
                <Input
                  value={editForm.price}
                  onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Stock Quantity</label>
                <Input
                  type="number"
                  value={editForm.stock}
                  onChange={e => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Description</label>
              <textarea
                rows={3}
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                Update Product
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
