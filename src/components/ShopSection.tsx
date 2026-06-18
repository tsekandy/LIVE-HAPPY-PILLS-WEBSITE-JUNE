import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Heart, Search, ArrowRight, Tag, AlertCircle, Share2, Copy, Check } from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';
import { getProducts, PRODUCT_CATEGORIES, type Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ShopSectionProps {
  initialCategory?: string;
  searchQuery?: string;
  featured?: boolean;
  maxItems?: number;
  showTitle?: boolean;
  onViewAll?: () => void;
}

export default function ShopSection({
  initialCategory = 'All',
  searchQuery = '',
  featured = false,
  maxItems,
  showTitle = true,
  onViewAll,
}: ShopSectionProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const { items: cartItems, add: addToCart, remove: removeFromCart } = useCart();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    if (initialCategory !== activeCategory && initialCategory !== 'All') {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = !featured || p.featured;
    return matchesCategory && matchesSearch && matchesFeatured && p.inStock;
  });

  const displayProducts = maxItems ? filteredProducts.slice(0, maxItems) : filteredProducts;

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const enquireSingle = (product: Product) => {
    const msg = `Hello Happy Pills Pharmacy! I'm interested in *${product.name}*${product.unit ? ` (${product.unit})` : ''}.\n\nCan you confirm availability and price? Thank you!`;
    setWhatsAppMessage(msg);
    setShowEnquiry(true);
  };

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-primary-600 tracking-wide uppercase mb-1">Our Products</p>
              <h2 className="heading-lg text-neutral-900">
                {featured ? 'Popular Products' : 'Browse Our Shop'}
              </h2>
            </div>
            {featured && (
              <button
                onClick={onViewAll}
                className="mt-4 md:mt-0 text-primary-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All Products <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Category Tabs */}
        {!featured && (
          <div className="flex gap-2 flex-wrap mb-8">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inWishlist={wishlist.has(product.id)}
                inCart={!!cartItems.find((i) => i.product.id === product.id)}
                onAddCart={() => addToCart(product)}
                onRemoveCart={() => removeFromCart(product.id)}
                onEnquireNow={() => enquireSingle(product)}
                onWishlist={() => toggleWishlist(product.id)}
                onQuickView={() => setQuickView(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-primary-600 font-medium text-sm hover:underline"
            >
              View all products
            </button>
          </div>
        )}

        {/* Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Prescription medicines</span> are only dispensed with a valid prescription from a licensed medical practitioner.
            Items marked <span className="font-semibold">Rx</span> require a prescription.
            <button
              onClick={() => {
                const msg = `Hello Happy Pills Pharmacy! I'd like to upload my prescription for processing.`;
                setWhatsAppMessage(msg);
                setShowEnquiry(true);
              }}
              className="ml-1 text-amber-700 underline font-medium"
            >
              Upload your prescription
            </button>
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onEnquire={() => { enquireSingle(quickView); setQuickView(null); }}
        />
      )}

      {showEnquiry && (
        <WhatsAppPickerModal
          onClose={() => setShowEnquiry(false)}
          message={whatsAppMessage}
          title="Product Enquiry"
        />
      )}
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  inWishlist: boolean;
  inCart: boolean;
  onAddCart: () => void;
  onRemoveCart: () => void;
  onEnquireNow: () => void;
  onWishlist: () => void;
  onQuickView: () => void;
}

function ProductCard({
  product, inWishlist, inCart,
  onAddCart, onRemoveCart, onEnquireNow, onWishlist, onQuickView,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative bg-neutral-50 overflow-hidden" style={{ paddingBottom: '66%' }}>
        <img
          src={product.image}
          alt={product.name}
          onClick={onQuickView}
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.prescription && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Rx
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={onWishlist}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
        </button>

        {/* Quick view overlay */}
        <button
          onClick={onQuickView}
          className="absolute inset-x-0 bottom-0 py-2 bg-primary-600/90 text-white text-xs font-semibold text-center
                     opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wide mb-0.5">{product.brand}</p>
        <h3 className="text-xs font-semibold text-neutral-800 leading-tight mb-1 line-clamp-2 flex-1">{product.name}</h3>
        {product.unit && <p className="text-[9px] text-neutral-400 mb-1.5">{product.unit}</p>}

        {/* Price */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm font-bold text-neutral-900">
            UGX {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-neutral-400 line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={inCart ? onRemoveCart : onAddCart}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-colors ${
              inCart
                ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            {inCart ? 'Added' : 'Add'}
          </button>
          <button
            onClick={onEnquireNow}
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-neutral-200 text-neutral-500 hover:border-green-500 hover:text-green-600 transition-colors"
            title="Enquire on WhatsApp"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onEnquire: () => void;
}

function QuickViewModal({ product, onClose, onEnquire }: QuickViewModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}?product=${encodeURIComponent(product.name)}`;
  const shareText = `Check out *${product.name}* at Happy Pills Pharmacy — UGX ${product.price.toLocaleString()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: shareText, url: shareUrl });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2">
          {/* Image */}
          <div className="bg-neutral-50 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <button onClick={onClose} className="self-end text-neutral-400 hover:text-neutral-700 mb-4">✕</button>
            <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">{product.name}</h2>
            {product.unit && <p className="text-xs text-neutral-500 mb-2">{product.unit}</p>}
            <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-neutral-900">UGX {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-neutral-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            {product.prescription && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-4">
                <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700">Prescription required for dispensing</p>
              </div>
            )}

            <button onClick={onEnquire} className="btn-primary mt-auto">
              <MessageCircle className="w-4 h-4 mr-2" />
              Enquire on WhatsApp
            </button>
          </div>
        </div>

        {/* Share bar */}
        <div className="border-t border-neutral-100 px-6 py-3 flex items-center gap-3">
          <Share2 className="w-4 h-4 text-neutral-400 shrink-0" />
          <span className="text-xs text-neutral-500 font-medium mr-1">Share:</span>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
            target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors"
            title="Share on WhatsApp"
          >
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
            title="Share on Facebook"
          >
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            title="Share on X"
          >
            <svg className="w-3.5 h-3.5 text-neutral-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.626 5.906-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors"
            title="Share on Telegram"
          >
            <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>

          {/* Copy link */}
          <button
            onClick={copyLink}
            className="ml-auto w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            title="Copy link"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-600" />
              : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
          </button>

          {/* Native share (mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={nativeShare}
              className="w-8 h-8 rounded-full bg-primary-50 hover:bg-primary-100 flex items-center justify-center transition-colors"
              title="More sharing options"
            >
              <Share2 className="w-3.5 h-3.5 text-primary-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
