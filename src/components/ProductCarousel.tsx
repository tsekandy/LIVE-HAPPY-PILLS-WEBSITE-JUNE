import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const products = [
    {
      id: 1,
      name: 'Neutrogena Skincare',
      image: 'https://iili.io/FOxMTyg.png',
      description: 'Advanced skincare solutions for healthy, radiant skin',
      category: 'Skincare',
    },
    {
      id: 2,
      name: 'Vitabiotics Supplements',
      image: 'https://iili.io/FOxEeWl.webp',
      description: 'Premium vitamin supplements for optimal health',
      category: 'Supplements',
    },
    {
      id: 3,
      name: 'Moderma Cosmetics',
      image: 'https://iili.io/FOxIYCJ.jpg',
      description: 'Professional beauty products and cosmetics',
      category: 'Cosmetics',
    },
    {
      id: 4,
      name: 'ProVen Probiotics',
      image: 'https://iili.io/CoiTczu.png',
      description: 'More immunity from the Gut - advanced probiotics',
      category: 'Probiotics',
    },
    {
      id: 5,
      name: 'Moderma Skin Range',
      image: 'https://iili.io/FOxYucb.jpg',
      description: 'Anti-aging and premium skincare range',
      category: 'Skincare',
    },
    {
      id: 6,
      name: 'Weight & Muscle Supplements',
      image: 'https://iili.io/FORNfX2.jpg',
      description: 'Protein growth and muscle development formulas',
      category: 'Supplements',
    },
    {
      id: 7,
      name: 'Golden Time Test Kits',
      image: '/file_00000000b92071f5b3a0510545e8c011.png',
      description: 'Trusted accuracy for better care - Fast, easy and accurate self-test kits',
      category: 'Test Kits',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Premium Brands</p>
            <h2 className="heading-lg text-neutral-900">Products available at our pharmacy</h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="badge bg-primary-50 text-primary-700 mb-4 self-start">
                      {product.category}
                    </span>
                    <h3 className="heading-md text-neutral-900 mb-4">{product.name}</h3>
                    <p className="text-body-lg mb-8">{product.description}</p>
                    <button
                      onClick={() => {
                        setWhatsAppMessage(`Hello Happy Pills Pharmacy! I'm interested in ${product.name} products. Are they available?`);
                        setShowWhatsAppPicker(true);
                      }}
                      className="btn-primary self-start"
                    >
                      Check Availability
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  <div className="relative h-64 md:h-auto bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-primary-600' : 'w-2 bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="Check Availability"
        />
      )}
    </section>
  );
}
