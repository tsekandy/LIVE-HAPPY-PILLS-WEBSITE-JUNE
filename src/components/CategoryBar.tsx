import React from 'react';
import { Pill, Heart, Baby, Leaf, Cpu, Microscope, FlaskConical, ShoppingBag } from 'lucide-react';

interface CategoryBarProps {
  onNavigate: (page: string) => void;
  onCategorySelect?: (category: string) => void;
}

const CATEGORIES = [
  {
    label: 'Medicines',
    sublabel: 'Order Now',
    icon: <Pill className="w-5 h-5" />,
    color: 'bg-green-50 text-green-600',
    category: 'OTC Medicines',
  },
  {
    label: 'Personal Care',
    sublabel: 'Shop Now',
    icon: <Heart className="w-5 h-5" />,
    color: 'bg-rose-50 text-rose-600',
    category: 'Personal Care',
  },
  {
    label: 'Baby & Mother',
    sublabel: 'Shop Now',
    icon: <Baby className="w-5 h-5" />,
    color: 'bg-sky-50 text-sky-600',
    category: 'Baby & Mother',
  },
  {
    label: 'Supplements',
    sublabel: 'Explore',
    icon: <Leaf className="w-5 h-5" />,
    color: 'bg-amber-50 text-amber-600',
    category: 'Supplements',
  },
  {
    label: 'Wellness',
    sublabel: 'Explore',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'bg-purple-50 text-purple-600',
    category: 'Wellness',
  },
  {
    label: 'Medical Devices',
    sublabel: 'Explore',
    icon: <Cpu className="w-5 h-5" />,
    color: 'bg-blue-50 text-blue-600',
    category: 'Medical Devices',
  },
  {
    label: 'Laboratory',
    sublabel: 'Book Test',
    icon: <Microscope className="w-5 h-5" />,
    color: 'bg-teal-50 text-teal-600',
    category: 'Laboratory',
  },
  {
    label: 'All Products',
    sublabel: 'Browse All',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: 'bg-primary-50 text-primary-600',
    category: 'All',
  },
];

export default function CategoryBar({ onNavigate, onCategorySelect }: CategoryBarProps) {
  const handleClick = (category: string) => {
    onCategorySelect?.(category);
    onNavigate('shop');
  };

  return (
    <section className="bg-white border-b border-neutral-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              onClick={() => handleClick(cat.category)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${cat.color} flex items-center justify-center
                           group-hover:scale-105 transition-transform duration-200 shadow-sm group-hover:shadow-md`}
              >
                {cat.icon}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-semibold text-neutral-800 leading-tight">{cat.label}</p>
                <p className="text-[9px] text-neutral-400 leading-tight hidden sm:block">{cat.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
