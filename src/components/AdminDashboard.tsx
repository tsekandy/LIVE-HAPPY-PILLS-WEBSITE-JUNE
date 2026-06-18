import React, { useState, useEffect, useRef } from 'react';
import {
  Lock, LogOut, Plus, Edit2, Trash2, Save, X, Eye, EyeOff,
  Package, Tag, TrendingUp, AlertCircle, CheckCircle2, Image,
  ToggleLeft, ToggleRight, ChevronDown, ArrowLeft,
} from 'lucide-react';
import { getProducts, saveProducts, INITIAL_PRODUCTS, PRODUCT_CATEGORIES, type Product } from '../data/products';

const ADMIN_PASSWORD = 'happypills2024';

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'campaigns'>('products');

  useEffect(() => {
    const stored = sessionStorage.getItem('hp_admin');
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('hp_admin', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('hp_admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to website
          </button>
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
            <div className="bg-primary-700 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-primary-200 text-sm mt-1">Happy Pills Pharmacy</p>
            </div>

            <form onSubmit={handleLogin} className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> {loginError}
                  </p>
                )}
              </div>
              <button type="submit" className="w-full btn-primary py-3 text-base">
                Login to Admin Panel
              </button>
              <p className="text-xs text-neutral-400 text-center mt-4">
                Secured access — for authorised staff only.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <header className="bg-primary-700 text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Website
          </button>
          <div className="w-px h-5 bg-primary-500" />
          <div>
            <h1 className="font-bold text-white text-lg">Admin Dashboard</h1>
            <p className="text-primary-300 text-xs">Happy Pills Pharmacy</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 px-6">
        <div className="flex gap-1 max-w-7xl mx-auto">
          {[
            { key: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
            { key: 'campaigns', label: 'Campaigns', icon: <Tag className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'campaigns' && <CampaignInfo />}
      </div>
    </div>
  );
}

function ProductManager() {
  const [products, setProductsState] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [filterCat, setFilterCat] = useState('All');

  useEffect(() => { setProductsState(getProducts()); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const persistProducts = (updated: Product[]) => {
    saveProducts(updated);
    setProductsState(updated);
  };

  const deleteProduct = (id: string) => {
    if (!confirm('Delete this product?')) return;
    persistProducts(products.filter((p) => p.id !== id));
    showToast('Product deleted.');
  };

  const toggleFeatured = (id: string) => {
    persistProducts(products.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
    showToast('Featured status updated.');
  };

  const toggleStock = (id: string) => {
    persistProducts(products.map((p) => p.id === id ? { ...p, inStock: !p.inStock } : p));
    showToast('Stock status updated.');
  };

  const resetDefaults = () => {
    if (!confirm('Reset all products to defaults? This cannot be undone.')) return;
    persistProducts(INITIAL_PRODUCTS);
    showToast('Products reset to defaults.');
  };

  const displayProducts = filterCat === 'All' ? products : products.filter((p) => p.category === filterCat);

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    featured: products.filter((p) => p.featured).length,
    prescription: products.filter((p) => p.prescription).length,
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium animate-fade-in ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: stats.total, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'In Stock', value: stats.inStock, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Featured', value: stats.featured, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Prescription', value: stats.prescription, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-neutral-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap flex-1">
          {['All', ...PRODUCT_CATEGORIES.slice(1)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterCat === cat ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={resetDefaults} className="px-4 py-2 text-sm text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
            Reset Defaults
          </button>
          <button onClick={() => setShowAddForm(true)} className="btn-primary py-2 text-sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <ProductForm
          product={editingId ? products.find((p) => p.id === editingId) : undefined}
          onSave={(p) => {
            if (editingId) {
              persistProducts(products.map((x) => x.id === editingId ? p : x));
              showToast('Product updated.');
              setEditingId(null);
            } else {
              persistProducts([{ ...p, id: Date.now().toString() }, ...products]);
              showToast('Product added.');
              setShowAddForm(false);
            }
          }}
          onCancel={() => { setEditingId(null); setShowAddForm(false); }}
        />
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Stock</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {displayProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-contain bg-neutral-100 border border-neutral-200" />
                      <div>
                        <p className="font-medium text-neutral-800 text-sm">{product.name}</p>
                        <p className="text-xs text-neutral-400">{product.brand} · {product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                      {product.category}
                    </span>
                    {product.prescription && (
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Rx</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-neutral-800">UGX {product.price.toLocaleString()}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-neutral-400 line-through">{product.originalPrice.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleStock(product.id)}
                      className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                        product.inStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(product.id)}>
                      {product.featured
                        ? <ToggleRight className="w-6 h-6 text-primary-500 mx-auto" />
                        : <ToggleLeft className="w-6 h-6 text-neutral-300 mx-auto" />
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(product.id)}
                        className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-300 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-red-600 hover:border-red-300 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {displayProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">No products in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductFormProps {
  product?: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: product?.name ?? '',
    category: product?.category ?? 'OTC Medicines',
    brand: product?.brand ?? '',
    description: product?.description ?? '',
    image: product?.image ?? '',
    price: product?.price ?? 0,
    originalPrice: product?.originalPrice,
    discount: product?.discount,
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    prescription: product?.prescription ?? false,
    unit: product?.unit ?? '',
  });

  const set = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price) {
      alert('Please fill in Name, Brand, and Price.');
      return;
    }
    onSave({ ...form, id: product?.id ?? '' });
  };

  return (
    <div className="bg-white rounded-2xl border border-primary-200 shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-neutral-800 text-lg">{product ? 'Edit Product' : 'Add New Product'}</h3>
        <button onClick={onCancel} className="text-neutral-400 hover:text-neutral-700"><X className="w-5 h-5" /></button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Product Name *</label>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="input-field" placeholder="e.g. Paracetamol 500mg" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Brand *</label>
          <input type="text" value={form.brand} onChange={(e) => set('brand', e.target.value)} className="input-field" placeholder="e.g. Emzor" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Category *</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input-field">
            {PRODUCT_CATEGORIES.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Unit / Size</label>
          <input type="text" value={form.unit ?? ''} onChange={(e) => set('unit', e.target.value)} className="input-field" placeholder="e.g. Strip of 12, 50ml, Bottle" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Price (UGX) *</label>
          <input type="number" value={form.price} onChange={(e) => set('price', Number(e.target.value))} className="input-field" min={0} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Original Price (UGX) — optional</label>
          <input type="number" value={form.originalPrice ?? ''} onChange={(e) => set('originalPrice', e.target.value ? Number(e.target.value) : undefined)} className="input-field" min={0} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Image URL</label>
          <input type="url" value={form.image} onChange={(e) => set('image', e.target.value)} className="input-field" placeholder="https://..." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} className="input-field min-h-20 resize-y" rows={3} placeholder="Brief product description..." />
        </div>

        {/* Toggles */}
        <div className="md:col-span-2 flex flex-wrap gap-6">
          {[
            { key: 'inStock', label: 'In Stock' },
            { key: 'featured', label: 'Featured Product' },
            { key: 'prescription', label: 'Prescription Required (Rx)' },
          ].map((toggle) => (
            <label key={toggle.key} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form[toggle.key as keyof typeof form] as boolean}
                onChange={(e) => set(toggle.key as keyof typeof form, e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">{toggle.label}</span>
            </label>
          ))}
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-neutral-100">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">Cancel</button>
          <button type="submit" className="btn-primary py-2.5 text-sm">
            <Save className="w-4 h-4 mr-2" /> {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

function CampaignInfo() {
  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-neutral-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-neutral-800 text-lg">Campaign System</h2>
            <p className="text-neutral-500 text-sm">Automatic holiday and health day campaigns</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-neutral-700">
          <p>The <strong>Holiday Hero Campaign System</strong> automatically detects and displays the correct campaign banner based on the current date. No manual activation needed.</p>

          <div className="p-4 bg-primary-50 rounded-xl">
            <p className="font-semibold text-primary-800 mb-2">Campaigns covered:</p>
            <ul className="space-y-1.5 text-primary-700">
              {[
                '🎉 National holidays (New Year, Independence Day, Martyrs Day)',
                '🕌 Religious holidays (Christmas, Ramadan/Eid, Easter)',
                '❤️ Global health days (35+ WHO awareness campaigns)',
                '🛒 Promotional campaigns (Black November, Anniversary)',
                '👶 Family & community days (Mothers Day, Fathers Day, Nurses Day)',
              ].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <p>Each campaign automatically shows a themed banner with:</p>
          <ul className="list-disc list-inside space-y-1 text-neutral-600">
            <li>Custom gradient background & accent colours</li>
            <li>Animated particle effects (fireworks, hearts, ribbons, etc.)</li>
            <li>Deal/promotion strips for commercial campaigns</li>
            <li>WhatsApp CTA pre-filled with campaign message</li>
            <li>Upcoming campaign teaser when no campaign is active</li>
          </ul>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 mb-1">To update campaigns</p>
              <p className="text-amber-700">Edit the <code className="bg-amber-100 px-1 rounded text-xs">HOLIDAYS</code> array in <code className="bg-amber-100 px-1 rounded text-xs">src/components/HolidayHero.tsx</code> to modify or add campaigns. Future versions will support database-driven campaign management.</p>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
            <TrendingUp className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800 mb-1">Campaign images</p>
              <p className="text-green-700">To use custom images for each campaign, update the <code className="bg-green-100 px-1 rounded text-xs">bgImage</code> field in each holiday config with your hosted image URL.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
