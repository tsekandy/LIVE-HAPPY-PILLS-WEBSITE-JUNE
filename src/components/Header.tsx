import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Phone, ChevronDown, MessageCircle, Search, Upload,
  Pill, Heart, Baby, Microscope, Leaf, Cpu, FlaskConical, ShoppingBag,
  ShoppingCart, Trash2, Plus, Minus,
} from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
  navColor?: string;
}

const CATEGORIES = [
  { label: 'OTC Medicines', icon: <Pill className="w-4 h-4" />, slug: 'otc' },
  { label: 'Personal Care', icon: <Heart className="w-4 h-4" />, slug: 'personal-care' },
  { label: 'Baby & Mother', icon: <Baby className="w-4 h-4" />, slug: 'baby' },
  { label: 'Supplements', icon: <Leaf className="w-4 h-4" />, slug: 'supplements' },
  { label: 'Medical Devices', icon: <Cpu className="w-4 h-4" />, slug: 'devices' },
  { label: 'Laboratory', icon: <Microscope className="w-4 h-4" />, slug: 'laboratory' },
  { label: 'Wellness', icon: <FlaskConical className="w-4 h-4" />, slug: 'wellness' },
];

export default function Header({ onNavigate, onSearch, navColor = '#b91c1c' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('Hello Happy Pills Pharmacy! I need assistance with my medication needs.');
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartWhatsAppMsg, setCartWhatsAppMsg] = useState('');
  const [showCartWhatsApp, setShowCartWhatsApp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const callRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const { items, totalCount, remove, increment, decrement, clear } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (callRef.current && !callRef.current.contains(e.target as Node)) setShowCallMenu(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCategoryMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    onNavigate('shop');
  };

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    {
      label: 'Services',
      page: 'services',
      children: [
        { label: 'All Services', page: 'services' },
        { label: 'Outpatient Clinic', page: 'clinic' },
        { label: 'Laboratory Tests', page: 'laboratory' },
        { label: 'Immunisation', page: 'immunisation' },
        { label: 'Medication Admin', page: 'medication-admin' },
        { label: 'Health Counselling', page: 'counselling' },
      ],
    },
    { label: 'Health Days', page: 'health-days' },
    { label: 'Blog', page: 'blog' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 h-16 md:h-18">
              {/* Logo */}
              <button
                onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
                className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity"
                aria-label="Go to home page"
              >
                <img
                  src="https://iili.io/FOn6LiP.jpg"
                  alt="Happy Pills Pharmacy"
                  className="w-10 h-10 rounded-lg object-cover border border-primary-100"
                />
                <div className="hidden sm:block text-left">
                  <h1 className="text-base md:text-lg font-bold text-neutral-900 leading-tight">
                    Happy Pills <span className="text-primary-600">Pharmacy</span>
                  </h1>
                  <p className="text-[10px] text-neutral-500 font-medium tracking-widest uppercase">
                    Uganda
                  </p>
                </div>
              </button>

              {/* Search Bar — desktop */}
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="flex w-full rounded-lg border border-neutral-300 overflow-hidden focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicines, health products..."
                    className="flex-1 px-4 py-2.5 text-sm text-neutral-800 bg-white outline-none placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden lg:inline">Search</span>
                  </button>
                </div>
              </form>

              {/* Right Actions */}
              <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
                {/* Upload Prescription */}
                <button
                  onClick={() => { setWhatsAppMessage('Hello Happy Pills Pharmacy! I would like to send my prescription for dispensing. Please let me know the next steps.'); setShowWhatsAppPicker(true); }}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-600 text-primary-700 hover:bg-primary-50 transition-colors text-sm font-medium"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden lg:inline">Upload Rx</span>
                </button>

                {/* Call */}
                <div className="relative hidden md:block" ref={callRef}>
                  <button
                    onClick={() => setShowCallMenu(!showCallMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors text-sm font-medium"
                  >
                    <Phone className="w-4 h-4 text-primary-600" />
                    <span className="hidden lg:inline">Call Us</span>
                  </button>
                  {showCallMenu && (
                    <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50">
                      <p className="px-4 pt-1 pb-2 text-xs text-neutral-400 font-semibold uppercase tracking-wide">Phone Numbers</p>
                      <a
                        href="tel:+256709745309"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-primary-500" />
                        +256 709 745 309
                      </a>
                      <a
                        href="tel:+256782504503"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-primary-500" />
                        +256 782 504 503
                      </a>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <button
                  onClick={() => setShowCart(true)}
                  className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="w-5 h-5 text-primary-600" />
                  {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalCount > 99 ? '99+' : totalCount}
                    </span>
                  )}
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => setShowWhatsAppPicker(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg transition-colors text-sm font-semibold shadow-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Bar — desktop */}
        <div className="hidden lg:block text-white transition-colors duration-300" style={{ backgroundColor: navColor }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-11">
              {/* All Categories Dropdown */}
              <div className="relative" ref={catRef}>
                <button
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/30 rounded-md text-sm font-semibold transition-colors h-full"
                >
                  <Menu className="w-4 h-4" />
                  All Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
                </button>
                {showCategoryMenu && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => { onNavigate('shop'); setShowCategoryMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <span className="text-primary-500">{cat.icon}</span>
                        {cat.label}
                      </button>
                    ))}
                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <button
                        onClick={() => { onNavigate('shop'); setShowCategoryMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        View All Products
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Nav Links */}
              {navItems.map((item) => (
                <NavItem key={item.label} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden bg-white border-b border-neutral-100 px-4 py-2">
          <form onSubmit={handleSearch} className="flex rounded-lg border border-neutral-300 overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, health products..."
              className="flex-1 px-3 py-2.5 text-sm text-neutral-800 bg-white outline-none placeholder:text-neutral-400"
            />
            <button type="submit" className="px-4 py-2.5 bg-primary-600 text-white">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => { onNavigate(item.page); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <div className="ml-4 space-y-0.5">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => { onNavigate(child.page); setIsMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+256709745309"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-neutral-100 text-neutral-700 font-semibold text-sm rounded-lg"
                  >
                    <Phone className="w-4 h-4 text-primary-600" /> 709 745 309
                  </a>
                  <a
                    href="tel:+256782504503"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-neutral-100 text-neutral-700 font-semibold text-sm rounded-lg"
                  >
                    <Phone className="w-4 h-4 text-primary-600" /> 782 504 503
                  </a>
                </div>
                <button
                  onClick={() => { setWhatsAppMessage('Hello Happy Pills Pharmacy! I would like to send my prescription for dispensing. Please let me know the next steps.'); setShowWhatsAppPicker(true); setIsMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary-600 text-primary-700 font-semibold text-sm rounded-lg"
                >
                  <Upload className="w-4 h-4" /> Upload Prescription
                </button>
                <button
                  onClick={() => { setShowWhatsAppPicker(true); setIsMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-lg"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="WhatsApp Us"
        />
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setShowCart(false)}
          />
          {/* Drawer */}
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary-600" />
                <h2 className="font-bold text-neutral-900 text-base">
                  My Cart
                  {totalCount > 0 && (
                    <span className="ml-2 text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {totalCount} item{totalCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingCart className="w-14 h-14 text-neutral-200 mb-4" />
                  <p className="font-semibold text-neutral-500">Your cart is empty</p>
                  <p className="text-xs text-neutral-400 mt-1">Browse products and tap "Add" to add items</p>
                  <button
                    onClick={() => { setShowCart(false); onNavigate('shop'); }}
                    className="mt-5 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-3 items-start bg-neutral-50 rounded-xl p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-contain bg-white rounded-lg border border-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-800 leading-tight line-clamp-2">{product.name}</p>
                      {product.unit && <p className="text-[10px] text-neutral-400 mt-0.5">{product.unit}</p>}
                      <p className="text-sm font-bold text-primary-700 mt-1">
                        UGX {(product.price * qty).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => remove(product.id)}
                        className="p-1 rounded text-neutral-300 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => decrement(product.id)}
                          className="w-6 h-6 rounded-md border border-neutral-200 bg-white flex items-center justify-center hover:border-primary-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <button
                          onClick={() => increment(product.id)}
                          className="w-6 h-6 rounded-md border border-neutral-200 bg-white flex items-center justify-center hover:border-primary-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Total</span>
                  <span className="text-lg font-bold text-neutral-900">
                    UGX {items.reduce((sum, { product, qty }) => sum + product.price * qty, 0).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const lines = items.map(
                      ({ product, qty }) =>
                        `• ${product.name}${product.unit ? ` (${product.unit})` : ''} x${qty} — UGX ${(product.price * qty).toLocaleString()}`
                    );
                    const total = items.reduce((s, { product, qty }) => s + product.price * qty, 0);
                    const msg =
                      `Hello Happy Pills Pharmacy! 🛒\n\nI'd like to order the following:\n\n${lines.join('\n')}\n\n*Total: UGX ${total.toLocaleString()}*\n\nPlease confirm availability and arrange delivery/pickup. Thank you!`;
                    setCartWhatsAppMsg(msg);
                    setShowCartWhatsApp(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send Order via WhatsApp
                </button>
                <button
                  onClick={clear}
                  className="w-full py-2.5 text-sm text-neutral-400 hover:text-red-500 transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showCartWhatsApp && (
        <WhatsAppPickerModal
          onClose={() => setShowCartWhatsApp(false)}
          message={cartWhatsAppMsg}
          title="Send Your Order"
        />
      )}
    </>
  );
}

interface NavItemProps {
  item: { label: string; page: string; children?: { label: string; page: string }[] };
  onNavigate: (page: string) => void;
}

function NavItem({ item, onNavigate }: NavItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => onNavigate(item.page)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-black/20 rounded-md transition-colors"
      >
        {item.label}
        {item.children && <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {item.children && open && (
        <div className="absolute top-full left-0 mt-0.5 w-52 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50">
          {item.children.map((child) => (
            <button
              key={child.label}
              onClick={() => { onNavigate(child.page); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
