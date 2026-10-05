'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { productService } from '@/lib/api';
import {
  Package,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Tag,
  Box,
  CreditCard,
  Upload,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

interface ProductRecord {
  id: string;
  title: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  salesCount: number;
  description: string;
  imageUrl?: string | null;
}

const DEFAULT_PRODUCTS: ProductRecord[] = [
  { id: 'PRD-101', title: 'AstroNovas Pro Refractor Telescope 100ED', sku: 'SKU-AST-100ED', category: 'Telescope Optics', price: '₹48,999', stock: 24, status: 'In Stock', rating: 4.9, salesCount: 142, description: 'High-aperture extra-low dispersion doublet refractor for solar and deep sky photography.' },
  { id: 'PRD-102', title: 'Narrowband CMOS Astrophotography Camera 16MP', sku: 'SKU-CAM-16MP', category: 'Astrophotography', price: '₹64,500', stock: 12, status: 'In Stock', rating: 4.8, salesCount: 98, description: 'Cooled CMOS astrophotography sensor with ultra-low readout noise and high quantum efficiency.' },
  { id: 'PRD-103', title: 'Motorized Equatorial GoTo Mount EQ5', sku: 'SKU-MNT-EQ5', category: 'Astronomy Gear', price: '₹39,999', stock: 4, status: 'Low Stock', rating: 5.0, salesCount: 65, description: 'Computerized GoTo tracking mount with dual-axis stepper motors and planetarium connectivity.' },
  { id: 'PRD-104', title: 'Orbital Mechanics & Rocketry Lab Kit', sku: 'SKU-KIT-ORB01', category: 'Laboratory Kits', price: '₹8,499', stock: 50, status: 'In Stock', rating: 4.7, salesCount: 310, description: 'Hands-on practical physics kit for calculating orbital velocity, delta-v, and staging ratios.' },
  { id: 'PRD-105', title: 'Vedic Cosmology & Astrophysics Comprehensive Guide', sku: 'SKU-BK-VEDIC', category: 'Books & Guides', price: '₹1,499', stock: 0, status: 'Out of Stock', rating: 4.9, salesCount: 520, description: 'Academic hardcover research manual correlating classical Indian astronomy with modern cosmology.' },
];

export default function AllProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>(DEFAULT_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('All');
  const [loading, setLoading] = useState(true);

  // Edit / Delete Modal State
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductRecord | null>(null);

  // Form State for Quick Edit
  const [editForm, setEditForm] = useState({
    title: '',
    price: '',
    stock: 0,
    category: '',
    status: 'In Stock' as 'In Stock' | 'Low Stock' | 'Out of Stock',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Products from API
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getProducts();
        if (data && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Failed to load products from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filtered Products via useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesTab = activeTab === 'All' || p.status === activeTab;
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [products, search, selectedCategory, activeTab]);

  // Statistics counters
  const stats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter(p => p.status === 'In Stock').length,
      lowStock: products.filter(p => p.status === 'Low Stock').length,
      outOfStock: products.filter(p => p.status === 'Out of Stock').length,
    };
  }, [products]);

  // Open Quick Edit Modal
  const handleOpenEdit = (p: ProductRecord) => {
    setEditingProduct(p);
    setEditForm({
      title: p.title,
      price: p.price,
      stock: p.stock,
      category: p.category,
      status: p.status,
    });
  };

  // Save Edit Handler
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSubmitting(true);

    const updated: ProductRecord = {
      ...editingProduct,
      title: editForm.title,
      price: editForm.price,
      stock: Number(editForm.stock),
      category: editForm.category,
      status: Number(editForm.stock) === 0 ? 'Out of Stock' : Number(editForm.stock) < 5 ? 'Low Stock' : 'In Stock',
    };

    try {
      await productService.updateProduct(editingProduct.id, updated);
    } catch (err) {
      console.warn('API product update failed:', err);
    }

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
    setIsSubmitting(false);
    setEditingProduct(null);
  };

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      await productService.deleteProduct(deletingProduct.id);
    } catch (err) {
      console.warn('API product delete failed:', err);
    }

    setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
  };

  return (
    <DashboardLayout title="Products Catalog" breadcrumb={['Products', 'All Products']} activeItem="All Products" role="admin">
      <div className="space-y-4">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black">Product Catalog & Inventory Studio</h1>
            <p className="text-gray-500 text-sm font-normal">Manage astronomy gear, telescope optics, lab kits, and physical store inventory</p>
          </div>
          <Link href="/admin/products/create">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
              <Upload size={18} className="mr-1.5" /> Upload New Product
            </Button>
          </Link>
        </div>

        {/* Overview Stats Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
              <Package size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Total Products</p>
              <p className="text-lg font-semibold text-black">{stats.total}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center font-semibold border border-purple-200">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">In Stock Items</p>
              <p className="text-lg font-semibold text-purple-700">{stats.inStock}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              <Box size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Low Stock Alert</p>
              <p className="text-lg font-semibold text-black">{stats.lowStock}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-semibold">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-normal">Out of Stock</p>
              <p className="text-lg font-semibold text-gray-700">{stats.outOfStock}</p>
            </div>
          </Card>
        </div>

        {/* Search & Filter Toolbar */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search product title, SKU, or category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-xs font-semibold text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="All">All Categories</option>
                <option value="Telescope Optics">Telescope Optics</option>
                <option value="Astrophotography">Astrophotography</option>
                <option value="Astronomy Gear">Astronomy Gear</option>
                <option value="Laboratory Kits">Laboratory Kits</option>
                <option value="Books & Guides">Books & Guides</option>
              </select>

              {(['All', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-purple-700 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Products Table Directory */}
        <Card className="overflow-hidden p-0 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-black uppercase tracking-wider">
                  <th className="py-3 px-4">Product Details & SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Unit Price (INR ₹)</th>
                  <th className="py-3 px-4">Stock Quantity</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm font-normal text-black">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-md flex items-center justify-center font-semibold flex-shrink-0">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-black leading-snug">{p.title}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">{p.sku} • ID: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="secondary" className="font-semibold">{p.category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-black text-sm">{p.price}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-black">{p.stock} units</span>
                      <span className="text-xs text-gray-500 font-normal ml-2">({p.salesCount} sold)</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={p.status === 'In Stock' ? 'primary' : p.status === 'Low Stock' ? 'warning' : 'danger'}
                        className={`font-semibold ${p.status === 'Low Stock' ? 'bg-purple-50 text-purple-700 border border-purple-200' : ''}`}
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${p.id}`}>
                          <Button size="sm" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs">
                            <Eye size={14} className="mr-1" /> Details
                          </Button>
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                          title="Quick Edit Product"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => setDeletingProduct(p)}
                          className="p-1.5 rounded-full hover:bg-purple-50 text-black transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Edit Product Modal */}
        <Modal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          title={`Edit Product: ${editingProduct?.sku || ''}`}
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
              <label className="block text-sm font-semibold text-black mb-1">Category</label>
              <select
                value={editForm.category}
                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-normal text-black focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="Telescope Optics">Telescope Optics</option>
                <option value="Astrophotography">Astrophotography</option>
                <option value="Astronomy Gear">Astronomy Gear</option>
                <option value="Laboratory Kits">Laboratory Kits</option>
                <option value="Books & Guides">Books & Guides</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-semibold">
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Product Modal */}
        <Modal
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
          title="Delete Product"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-md border border-purple-200">
              <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="text-xs text-purple-900 font-normal">
                Are you sure you want to delete <span className="font-semibold">{deletingProduct?.title}</span>?
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setDeletingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-black hover:bg-gray-900 text-white font-semibold">
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
