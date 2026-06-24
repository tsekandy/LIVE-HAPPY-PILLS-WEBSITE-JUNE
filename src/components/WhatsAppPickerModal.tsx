import { X, Phone, Clock, Lightbulb, ShieldCheck, Pill, Users, Package } from 'lucide-react';

const SUPPLIER_MSG =
  "Hello Happy Pills Pharmacy, I visited your pharmacy today. Please find attached my product list for your review. Don't hesitate to reach out to me, my name is ";

const NUMBERS = [
  {
    label: 'Customer Support',
    number: '256709745309',
    display: '+256 709 745 309',
    description: 'Prescription inquiries, medicine availability, deliveries',
    badge: 'Most Popular',
    Icon: Pill,
    message: null,
  },
  {
    label: 'Customer Care',
    number: '256782504503',
    display: '+256 782 504 503',
    description: 'Orders, follow-ups, general assistance',
    Icon: Users,
    message: null,
  },
  {
    label: 'Suppliers & Procurement',
    number: '256758443656',
    display: '+256 758 443 656',
    description: 'Vendor registration, quotations, stock supply, partnerships',
    Icon: Package,
    message: SUPPLIER_MSG,
  },
];

interface Props {
  onClose: () => void;
  message: string;
  title?: string;
}

export default function WhatsAppPickerModal({ onClose, message, title = 'WhatsApp Us' }: Props) {
  const handleSelect = (number: string, override: string | null) => {
    const text = override ?? message;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 sticky top-0 bg-white z-10 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 leading-tight">{title}</h2>
              <p className="text-xs text-neutral-500">Choose the right department for faster assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5 text-neutral-600" />
          </button>
        </div>

        {/* Number cards */}
        <div className="px-3 pt-3 space-y-2">
          {NUMBERS.map((item) => (
            <button
              key={item.number}
              onClick={() => handleSelect(item.number, item.message)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-green-400 hover:bg-green-50 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <item.Icon className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-neutral-900 text-sm">{item.display}</p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-xs font-semibold text-green-700">{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                      ★ {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
                <span>Open</span>
              </div>
            </button>
          ))}
        </div>

        {/* Operating Hours */}
        <div className="mx-3 mt-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-700 flex-shrink-0" />
          <p className="text-xs text-neutral-700">
            <span className="font-semibold text-green-700">Operating Hours:</span>{' '}
            Mon – Sun &nbsp;|&nbsp; 7:30 AM – 12:00 Midnight
          </p>
        </div>

        {/* Tip */}
        <div className="mx-3 mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-neutral-700">
            For urgent medicine inquiries, use{' '}
            <span className="font-semibold text-green-700">Customer Support</span>
          </p>
        </div>

        {/* Footer */}
        <div className="py-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <p className="text-[11px] text-neutral-400">Your conversations are secure and confidential</p>
        </div>

      </div>
    </div>
  );
}
