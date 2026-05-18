import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import MobileMoneyModal from './MobileMoneyModal';
import WhatsAppPickerModal from './WhatsAppPickerModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMoneyModal, setShowMobileMoneyModal] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [showCallNumbers, setShowCallNumbers] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', page: 'about' },
    {
      label: 'Services',
      page: 'services',
      children: [
        { label: 'Our Services', page: 'services' },
        { label: 'Drug Fund Scheme', page: 'drugfund' },
        { label: 'Rewards Program', page: 'rewards' },
      ],
    },
    { label: 'Locations', page: 'locations' },
    { label: 'Careers', page: 'careers' },
    { label: 'Partner', page: 'partner' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity"
              aria-label="Go to home page"
            >
              <img
                src="https://iili.io/FOn6LiP.jpg"
                alt="Happy Pills Pharmacy"
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
              <div className="text-left">
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-neutral-900 leading-tight">
                  Happy Pills Pharmacy
                </h1>
                <p className="hidden sm:block text-[11px] text-neutral-500 font-medium tracking-wide uppercase">
                  Your Trusted Healthcare Partner
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => {
                            onNavigate(child.page);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => onNavigate('feedback')}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Feedback
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowCallNumbers(!showCallNumbers)}
                  onBlur={() => setTimeout(() => setShowCallNumbers(false), 150)}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden xl:inline">Call Us</span>
                </button>
                {showCallNumbers && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50 animate-fade-in">
                    <a
                      href="tel:+256709745309"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-primary-500" />
                      <span>+256 709 745 309</span>
                    </a>
                    <a
                      href="tel:+256782504503"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-primary-500" />
                      <span>+256 782 504 503</span>
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowWhatsAppPicker(true)}
                className="btn-primary text-sm py-2.5 px-5"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 animate-fade-in">
            <div className="section-container py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => {
                            onNavigate(child.page);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  onNavigate('feedback');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Feedback
              </button>

              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+256709745309"
                    className="flex items-center justify-center gap-2 py-3 px-3 bg-neutral-100 text-neutral-700 font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    709 745 309
                  </a>
                  <a
                    href="tel:+256782504503"
                    className="flex items-center justify-center gap-2 py-3 px-3 bg-neutral-100 text-neutral-700 font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    782 504 503
                  </a>
                </div>
                <button
                  onClick={() => {
                    setShowWhatsAppPicker(true);
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full text-sm py-3"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us Now
                </button>
                <button
                  onClick={() => {
                    setShowMobileMoneyModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="btn-secondary w-full text-sm py-3"
                >
                  Mobile Money Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <MobileMoneyModal
        isOpen={showMobileMoneyModal}
        onClose={() => setShowMobileMoneyModal(false)}
      />

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message="Hello Happy Pills Pharmacy! I need assistance with my medication needs."
          title="WhatsApp Us"
        />
      )}
    </>
  );
}
