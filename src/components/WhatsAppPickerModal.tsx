import React from 'react';
import { X, MessageCircle, Phone } from 'lucide-react';

const NUMBERS = [
  { label: 'Main Line', number: '256709745309', display: '+256 709 745 309' },
  { label: 'Alternative', number: '256782504503', display: '+256 782 504 503' },
];

interface Props {
  onClose: () => void;
  message: string;
  title?: string;
}

export default function WhatsAppPickerModal({ onClose, message, title = 'WhatsApp Us' }: Props) {
  const handleSelect = (number: string) => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            <p className="text-sm text-neutral-500 mt-0.5">Choose a number to continue on WhatsApp</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-neutral-600" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {NUMBERS.map((item, i) => (
            <button
              key={item.number}
              onClick={() => handleSelect(item.number)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-green-400 hover:bg-green-50 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900">{item.display}</p>
                  {i === 0 && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{item.label}</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium flex-shrink-0">
                <Phone className="w-4 h-4" />
                <span>Open</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 pb-5">
          You'll be redirected to WhatsApp
        </p>
      </div>
    </div>
  );
}
