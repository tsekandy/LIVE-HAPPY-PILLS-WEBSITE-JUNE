import React, { useState, useEffect } from 'react';
import {
  Shield, Truck, Clock, Upload, ArrowRight, Phone, Mail, MapPin,
  Star, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle,
  Pill, CheckCircle2,
} from 'lucide-react';
import Header from './components/Header';
import HolidayHero from './components/HolidayHero';
import CategoryBar from './components/CategoryBar';
import ShopSection from './components/ShopSection';
import HealthcareServicesSection from './components/HealthcareServicesSection';
import PrescriptionUpload from './components/PrescriptionUpload';
import WellnessHub from './components/WellnessHub';
import FloatingButtons from './components/FloatingButtons';
import ArticleDetail from './components/ArticleDetail';
import AdminDashboard from './components/AdminDashboard';
import PaymentCallback from './components/PaymentCallback';
import HealthDaysPage from './components/HealthDaysPage';
import HealthcareServicePage from './components/HealthcareServicePage';
import AboutUs from './components/pages/AboutUs';
import ServicesPage from './components/pages/ServicesPage';
import BecomePartner from './components/pages/BecomePartner';
import Careers from './components/pages/Careers';
import Feedback from './components/pages/Feedback';
import Rewards from './components/pages/Rewards';
import Locations from './components/pages/Locations';
import DrugFund from './components/pages/DrugFund';
import { getPharmacySchema, getFAQSchema } from './utils/schemaMarkup';
import { CartProvider } from './context/CartContext';

const NAV_ACCENT: Record<string, string> = {
  clinic:           '#1e3a8a', // blue-900
  laboratory:       '#134e4a', // teal-900
  immunisation:     '#4c1d95', // violet-900
  'medication-admin': '#7f1d1d', // red-900 (orange-red dark)
  counselling:      '#881337', // rose-900
  'health-days':    '#1e3a5f', // slate-900-ish
};

export default function App() {
  const initialSlug = new URLSearchParams(window.location.search).get('article');
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.pathname === '/admin' ? 'admin' : (initialSlug ? 'article' : 'home')
  );
  const [articleSlug, setArticleSlug] = useState<string | null>(initialSlug);
  const [shopCategory, setShopCategory] = useState('All');
  const [shopSearch, setShopSearch] = useState('');

  const showPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const showHome = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  const viewArticle = (slug: string) => {
    setArticleSlug(slug);
    setCurrentPage('article');
    window.history.pushState({}, '', `?article=${slug}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      const slug = new URLSearchParams(window.location.search).get('article');
      if (slug) { setArticleSlug(slug); setCurrentPage('article'); }
      else { setArticleSlug(null); setCurrentPage('home'); }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((s) => s.remove());
    const pharmacySchema = document.createElement('script');
    pharmacySchema.type = 'application/ld+json';
    pharmacySchema.innerHTML = JSON.stringify(getPharmacySchema());
    document.head.appendChild(pharmacySchema);
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.innerHTML = JSON.stringify(getFAQSchema());
    document.head.appendChild(faqSchema);
  }, []);

  if (window.location.pathname === '/payment-callback' || window.location.search.includes('OrderTrackingId')) {
    return <PaymentCallback />;
  }

  const renderSubPage = () => {
    if (currentPage === 'article' && articleSlug)
      return <ArticleDetail slug={articleSlug} onBack={showHome} onArticleChange={viewArticle} />;
    if (currentPage === 'admin') return <AdminDashboard onBack={showHome} />;
    if (currentPage === 'about') return <AboutUs onBack={showHome} />;
    if (currentPage === 'services') return <ServicesPage onBack={showHome} />;
    if (currentPage === 'partner') return <BecomePartner onBack={showHome} />;
    if (currentPage === 'careers') return <Careers onBack={showHome} />;
    if (currentPage === 'feedback') return <Feedback onBack={showHome} />;
    if (currentPage === 'rewards') return <Rewards onBack={showHome} />;
    if (currentPage === 'locations') return <Locations onBack={showHome} />;
    if (currentPage === 'drugfund') return <DrugFund onBack={showHome} />;
    if (currentPage === 'health-days')
      return <HealthDaysPage onBack={showHome} />;
    if (currentPage === 'clinic' || currentPage === 'laboratory' || currentPage === 'immunisation' || currentPage === 'medication-admin' || currentPage === 'counselling')
      return <HealthcareServicePage service={currentPage as 'clinic' | 'laboratory' | 'immunisation' | 'medication-admin' | 'counselling'} onBack={() => showPage('services')} />;
    if (currentPage === 'shop')
      return (
        <div className="pt-[108px] md:pt-[116px]">
          <div className="bg-white border-b border-neutral-100 px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-neutral-900">Our Shop</h1>
              <p className="text-neutral-500 text-sm mt-1">Browse medicines, supplements, personal care and more</p>
            </div>
          </div>
          <ShopSection initialCategory={shopCategory} searchQuery={shopSearch} />
        </div>
      );
    return null;
  };

  const subPage = renderSubPage();

  if (subPage && currentPage === 'admin') return subPage;

  return (
    <CartProvider>
    <div className="min-h-screen bg-white">
      <Header
        navColor={NAV_ACCENT[currentPage]}
        onNavigate={(page) => {
          if (page === 'upload' || page === 'contact' || page === 'blog') {
            if (currentPage !== 'home') {
              setCurrentPage('home');
              window.scrollTo(0, 0);
              setTimeout(() => document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' }), 350);
            } else {
              document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' });
            }
            return;
          }
          showPage(page);
        }}
        onSearch={(q) => { setShopSearch(q); setShopCategory('All'); showPage('shop'); }}
      />

      {subPage ? (
        <div className={currentPage !== 'shop' ? 'pt-[108px] md:pt-[116px]' : ''}>{subPage}</div>
      ) : (
        <>
          {/* 1. DYNAMIC HERO CAMPAIGN */}
          <HolidayHero />

          {/* 2. TRUST BAR */}
          <section className="bg-white border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: <Pill className="w-4 h-4" />, label: 'Genuine Medicines', value: '100% Original' },
                  { icon: <Truck className="w-4 h-4" />, label: 'Fast Delivery', value: 'Quick & Safe' },
                  { icon: <Shield className="w-4 h-4" />, label: 'NDA Licensed', value: 'Certified Pharmacy' },
                  { icon: <Clock className="w-4 h-4" />, label: '7:30 AM – Midnight', value: 'Mon – Sun' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-xs">{item.label}</p>
                      <p className="text-[10px] text-neutral-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. CATEGORIES */}
          <CategoryBar
            onNavigate={showPage}
            onCategorySelect={(cat) => { setShopCategory(cat); setShopSearch(''); }}
          />

          {/* 4. POPULAR PRODUCTS (featured, max 10) */}
          <ShopSection featured maxItems={10} showTitle onViewAll={() => showPage('shop')} />

          {/* 5. PRESCRIPTION UPLOAD CTA */}
          <section className="bg-gradient-to-r from-primary-700 to-primary-900 py-7">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-primary-200 uppercase tracking-wide">Prescription Service</p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Send Your Prescription via WhatsApp</h2>
                  <p className="text-primary-200 mb-5 leading-relaxed">
                    Message us your prescription image or PDF directly on WhatsApp. Our licensed pharmacists review it within minutes and prepare your medication. Fast, secure, and simple.
                  </p>
                  <ul className="space-y-2">
                    {['All prescription types accepted', 'Share photo or PDF on WhatsApp', 'Pharmacist reviews within minutes', 'Delivery or pickup available'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-primary-100">
                        <CheckCircle2 className="w-4 h-4 text-primary-300 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <PrescriptionUpload />
                </div>
              </div>
            </div>
          </section>

          {/* 6. OUR SERVICES (quick grid) */}
          <section id="services" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-7">
                <p className="text-xs font-semibold text-primary-600 tracking-wide uppercase mb-2">Our Services</p>
                <h2 className="heading-lg text-neutral-900 mb-2">Pharmaceutical Care You Can Trust</h2>
                <p className="text-body-lg max-w-2xl mx-auto">
                  Comprehensive pharmaceutical and healthcare services designed for your needs.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { icon: '💊', label: 'Prescription Dispensing', desc: 'Expert dispensing' },
                  { icon: '🚚', label: 'On-Demand Import', desc: 'Any medication' },
                  { icon: '⏰', label: '24/7 Emergency', desc: 'Always available' },
                  { icon: '📋', label: 'Health Consultations', desc: 'Expert advice' },
                  { icon: '💳', label: 'Mobile Money', desc: 'MTN & Airtel' },
                  { icon: '💬', label: 'WhatsApp Support', desc: 'Instant help' },
                ].map((s, i) => (
                  <div key={i} className="bg-neutral-50 hover:bg-primary-50 rounded-xl p-3 text-center border border-neutral-100 hover:border-primary-200 transition-all cursor-default group">
                    <span className="text-2xl mb-1.5 block">{s.icon}</span>
                    <p className="text-[10px] font-semibold text-neutral-800 leading-tight mb-0.5 group-hover:text-primary-700">{s.label}</p>
                    <p className="text-[9px] text-neutral-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button onClick={() => showPage('services')} className="btn-primary">
                  View All Services <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </section>

          {/* 7. HEALTHCARE SERVICES (Clinic, Lab, Immunisation, etc.) */}
          <HealthcareServicesSection />

          {/* 8. HOW IT WORKS */}
          <section className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <p className="text-xs font-semibold text-primary-600 tracking-wide uppercase mb-2">How It Works</p>
                <h2 className="heading-lg text-neutral-900 mb-2">Getting Your Medication is Simple</h2>
                <p className="text-body-lg max-w-2xl mx-auto">
                  Three easy steps to access professional pharmaceutical care.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  { step: '01', emoji: '📤', title: 'Send Your Prescription', desc: 'Message us your prescription image or PDF on WhatsApp. Our team will guide you through the process.' },
                  { step: '02', emoji: '👨‍⚕️', title: 'Professional Review', desc: 'Our licensed pharmacists review your prescription, verify details, and prepare your medication with care.' },
                  { step: '03', emoji: '🚗', title: 'Pickup or Delivery', desc: 'Collect from our Nansana location or arrange delivery across Kampala, Wakiso, Mukono, and Jinja.' },
                ].map((item, i, arr) => (
                  <div key={i} className="relative">
                    <div className="bg-white rounded-2xl border border-neutral-200 hover:border-primary-200 hover:shadow-md p-8 h-full transition-all">
                      <div className="flex items-center gap-4 mb-5">
                        <span className="text-4xl">{item.emoji}</span>
                        <span className="text-5xl font-bold text-neutral-100">{item.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 text-neutral-300 z-10">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. HEALTH ARTICLES */}
          <div id="blog">
            <WellnessHub onArticleClick={viewArticle} />
          </div>

          {/* 10. TESTIMONIALS */}
          <section className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-7">
                <p className="text-xs font-semibold text-primary-600 tracking-wide uppercase mb-2">What Our Customers Say</p>
                <h2 className="heading-lg text-neutral-900 mb-2">Trusted by Thousands of Families</h2>
                <p className="text-body-lg max-w-2xl mx-auto">
                  Real experiences from customers across Kampala, Wakiso, Mukono & Jinja.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { quote: "The staff here are so friendly and helpful. They always take time to explain my medications clearly. Best pharmacy in Nansana!", name: 'Sarah M.', location: 'Kampala', image: 'https://iili.io/FOgoSh7.jpg', rating: 5 },
                  { quote: "I've been coming here for years. The pharmacists are so knowledgeable. The WhatsApp service is incredibly convenient for my family.", name: 'James K.', location: 'Wakiso', image: 'https://iili.io/FOgoUQ9.jpg', rating: 5 },
                  { quote: "The WhatsApp service is amazing! I get help for my family's medication needs any time. Excellent service and genuine medicines.", name: 'Mary A.', location: 'Mukono', image: 'https://iili.io/FOgorBe.jpg', rating: 5 },
                ].map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-neutral-200 hover:shadow-md p-7 transition-all">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-neutral-700 leading-relaxed mb-6 italic text-sm">"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm">{t.name}</p>
                        <p className="text-xs text-neutral-500">{t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 11. STATS BAR */}
          <section className="bg-primary-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">The Backbone of Pharmaceutical Care in Uganda</h2>
                <p className="text-primary-200 text-sm max-w-xl mx-auto">
                  Thousands of families trust Happy Pills Pharmacy for their healthcare needs.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '1,000+', label: 'Happy Customers' },
                  { value: '24/7', label: 'Service Availability' },
                  { value: '5+', label: 'Years Serving Uganda' },
                  { value: '5 ★', label: 'Google Rating' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{s.value}</p>
                    <p className="text-primary-300 text-xs font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 12. CONTACT */}
          <section id="contact" className="section-padding bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                <div>
                  <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">Contact Us</p>
                  <h2 className="heading-lg text-white mb-5">Ready for Uganda's Best Pharmaceutical Care?</h2>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    Contact Happy Pills Pharmacy through your preferred channel. Our team is always ready to help.
                  </p>
                  <div className="space-y-5">
                    {[
                      { icon: <Phone className="w-5 h-5" />, label: 'Phone', items: ['+256 709 745 309', '+256 782 504 503'] },
                      { icon: <Mail className="w-5 h-5" />, label: 'Email', items: ['happypillspharmacy@gmail.com'] },
                      { icon: <MapPin className="w-5 h-5" />, label: 'Location', items: ['Zalex House, Nansana Trading Centre', 'Kampala-Hoima Road, Kampala'] },
                      { icon: <Clock className="w-5 h-5" />, label: 'Hours', items: ['Monday – Sunday: 7:30 AM – 12:00 AM', '24/7 Emergency Service Available'] },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                          {item.items.map((d, j) => <p key={j} className="text-neutral-400 text-sm">{d}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/256709745309?text=Hello%20Happy%20Pills%20Pharmacy!%20I%20need%20assistance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Start WhatsApp Consultation
                    </a>
                    <a
                      href="tel:+256709745309"
                      className="w-full flex items-center justify-center gap-3 py-4 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call +256 709 745 309
                    </a>
                    <button
                      onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Prescription
                    </button>
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-700">
                    <p className="text-white font-semibold text-sm mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { href: 'https://www.facebook.com/hppharmacyUg/', label: 'Facebook' },
                        { href: 'https://www.instagram.com/happypillspharmacy', label: 'Instagram' },
                        { href: 'https://twitter.com/HppharmacyUg', label: 'Twitter' },
                        { href: 'https://ug.linkedin.com/company/happy-pills-healthcare-limited', label: 'LinkedIn' },
                        { href: 'https://www.tiktok.com/@happypillspharmacyug', label: 'TikTok' },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-neutral-700 hover:bg-primary-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-[10px] font-bold"
                          title={social.label}
                        >
                          {social.label[0]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 13. FOOTER */}
          <footer className="bg-neutral-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Brand */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://iili.io/FOn6LiP.jpg" alt="Happy Pills Pharmacy" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-white">Happy Pills Pharmacy</h3>
                      <p className="text-xs text-neutral-500">Uganda</p>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    Your trusted digital pharmacy and healthcare platform. Quality medicines, laboratory tests, outpatient clinic, and wellness services — all under one roof in Uganda.
                  </p>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Zalex House, Nansana Trading Centre<br />
                    Kampala-Hoima Road, Kampala<br />
                    Mon – Sun · 7:30 AM – 12:00 AM
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
                  <ul className="space-y-2.5">
                    {[
                      { label: 'About Us', page: 'about' },
                      { label: 'Our Services', page: 'services' },
                      { label: 'Locations', page: 'locations' },
                      { label: 'Careers', page: 'careers' },
                      { label: 'Drug Fund', page: 'drugfund' },
                      { label: 'Become Partner', page: 'partner' },
                    ].map((link) => (
                      <li key={link.page}>
                        <button onClick={() => showPage(link.page)} className="text-neutral-400 hover:text-white transition-colors text-sm">
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Healthcare</h4>
                  <ul className="space-y-2.5">
                    {[
                      'Outpatient Clinic',
                      'Laboratory Tests',
                      'Immunisation',
                      'Medication Admin',
                      'Health Counselling',
                      'Prescription Upload',
                    ].map((item) => (
                      <li key={item}>
                        <button onClick={() => showPage('services')} className="text-neutral-400 hover:text-white transition-colors text-sm">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Connect</h4>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      { label: 'Facebook', href: 'https://www.facebook.com/hppharmacyUg/' },
                      { label: 'Instagram', href: 'https://www.instagram.com/happypillspharmacy' },
                      { label: 'Twitter/X', href: 'https://twitter.com/HppharmacyUg' },
                      { label: 'LinkedIn', href: 'https://ug.linkedin.com/company/happy-pills-healthcare-limited' },
                      { label: 'TikTok', href: 'https://www.tiktok.com/@happypillspharmacyug' },
                      { label: 'WhatsApp Channel', href: 'https://whatsapp.com/channel/0029VaGFM6m11ulYFtpqg41W' },
                    ].map((link) => (
                      <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => showPage('feedback')}
                    className="text-xs px-3 py-2 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-neutral-500 text-xs">&copy; 2025 Happy Pills Pharmacy Uganda. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <p className="text-neutral-600 text-xs">NDA Licensed · Professional Service</p>
                  <button
                    onClick={() => showPage('admin')}
                    className="text-neutral-700 hover:text-neutral-500 text-xs transition-colors"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Floating Contact Buttons */}
      <FloatingButtons />
    </div>
    </CartProvider>
  );
}
