import React, { useState } from 'react';
import {
  ArrowLeft, MessageCircle, Phone, Clock, MapPin, CheckCircle2,
  Shield, Activity, Syringe, Stethoscope, HeartPulse, FlaskConical,
  ChevronRight,
} from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';

type ServiceKey = 'clinic' | 'laboratory' | 'immunisation' | 'medication-admin' | 'counselling';

interface HealthcareServicePageProps {
  service: ServiceKey;
  onBack: () => void;
}

interface ServiceConfig {
  key: ServiceKey;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accent: string;
  emoji: string;
  whatsAppMsg: string;
  features: { title: string; items: string[] }[];
  faq: { q: string; a: string }[];
}

const SERVICE_DATA: Record<ServiceKey, ServiceConfig> = {
  clinic: {
    key: 'clinic',
    name: 'HP Outpatient Clinic',
    tagline: 'Expert medical consultations at your doorstep',
    description:
      'Our licensed medical practitioners provide thorough outpatient consultations for common illnesses, chronic disease management, and preventive care. No appointment necessary — walk in any day, 7:30 AM to midnight.',
    icon: <Stethoscope className="w-10 h-10" />,
    gradient: 'from-blue-700 to-blue-900',
    accent: 'text-blue-200',
    emoji: '🏥',
    whatsAppMsg: 'Hello Happy Pills Pharmacy! I would like to book an outpatient clinic consultation. Please advise on availability.',
    features: [
      {
        title: 'What We Treat',
        items: [
          'Fever, malaria & typhoid',
          'Respiratory infections & coughs',
          'Hypertension & diabetes monitoring',
          'Skin conditions & wound care',
          'Reproductive health consultations',
          'Paediatric consultations',
          'STI screening & treatment',
          'Nutritional assessments',
        ],
      },
      {
        title: 'What to Bring',
        items: [
          'Previous medical records (if any)',
          'Current prescription medications',
          'National ID or passport',
          'Health insurance card (if applicable)',
        ],
      },
      {
        title: 'Why Choose Our Clinic',
        items: [
          'Licensed medical practitioners on duty',
          'Linked directly to our in-house pharmacy',
          'Same-day prescriptions dispensed',
          'Affordable consultation fees',
          'Private, confidential consultations',
          'Referral letters available',
        ],
      },
    ],
    faq: [
      { q: "Do I need an appointment?", a: 'No — walk-in consultations are welcome 7 days a week, 7:30 AM to midnight.' },
      { q: "What are the consultation fees?", a: 'Fees vary by consultation type. WhatsApp us for current pricing.' },
      { q: "Can you manage my chronic medication?", a: 'Yes. We provide regular reviews for hypertension, diabetes, and other chronic conditions.' },
    ],
  },

  laboratory: {
    key: 'laboratory',
    name: 'HP Laboratory Services',
    tagline: 'Accurate diagnostics, fast results, affordable prices',
    description:
      'Our NDA-accredited laboratory offers a comprehensive range of diagnostic tests with rapid turnaround times. Results are delivered directly to your WhatsApp, keeping your healthcare simple and accessible.',
    icon: <FlaskConical className="w-10 h-10" />,
    gradient: 'from-teal-700 to-teal-900',
    accent: 'text-teal-200',
    emoji: '🔬',
    whatsAppMsg: 'Hello Happy Pills Pharmacy! I would like to book a laboratory test. Please send me a list of available tests and prices.',
    features: [
      {
        title: 'Available Tests',
        items: [
          'Complete Blood Count (CBC)',
          'Malaria RDT & microscopy',
          'Blood glucose & HbA1c',
          'Liver & kidney function panels',
          'Lipid profile',
          'HIV, syphilis & hepatitis B/C',
          'Urinalysis & stool analysis',
          'Pregnancy tests',
          'Typhoid (Widal test)',
          'Thyroid function (TSH, T3, T4)',
          'CD4 count & viral load',
          'Blood group & cross-match',
        ],
      },
      {
        title: 'Our Process',
        items: [
          'Sample collection at the lab or via home visit',
          'Rapid turnaround — many results same day',
          'Results sent securely to your WhatsApp',
          'Lab technician available to explain results',
          'Doctor review available on request',
        ],
      },
    ],
    faq: [
      { q: 'How quickly do I get results?', a: 'Most routine tests are ready within 2–4 hours. Specialised tests may take 24–48 hours.' },
      { q: "Do you need a doctor's request?", a: 'Not for most tests. You can self-request. A doctor referral is needed for some specialised panels.' },
      { q: 'Can results be sent to my doctor?', a: 'Yes — we can send a copy of your results directly to your referring doctor.' },
    ],
  },

  immunisation: {
    key: 'immunisation',
    name: 'Immunisation Services',
    tagline: 'Protect yourself and your family with certified vaccines',
    description:
      'We administer a full range of WHO-recommended vaccines for children and adults. All vaccines are stored under strict cold-chain conditions and administered by qualified healthcare staff.',
    icon: <Syringe className="w-10 h-10" />,
    gradient: 'from-violet-700 to-violet-900',
    accent: 'text-violet-200',
    emoji: '💉',
    whatsAppMsg: 'Hello Happy Pills Pharmacy! I would like to enquire about immunisation/vaccination services. Please advise on available vaccines and scheduling.',
    features: [
      {
        title: 'Vaccines Available',
        items: [
          'COVID-19 (available doses)',
          'Influenza (flu) — seasonal',
          'Hepatitis A & B',
          'Yellow fever (travel certificate issued)',
          'Meningitis',
          'Typhoid',
          'Human Papillomavirus (HPV)',
          'Rabies (post-exposure)',
          'Tetanus & Td booster',
          'Childhood immunisation schedule',
        ],
      },
      {
        title: 'Service Details',
        items: [
          'Walk-in or by appointment',
          'Vaccination certificate issued',
          'Yellow fever international travel cert',
          'Cold-chain verified storage',
          'Paediatric and adult doses available',
          'Group/corporate vaccination packages',
        ],
      },
    ],
    faq: [
      { q: 'Do I need a prescription for vaccines?', a: 'No — most vaccines can be administered without a prior prescription. WhatsApp us to confirm availability.' },
      { q: 'Do you issue yellow fever certificates?', a: 'Yes. We are an accredited yellow fever vaccination centre and issue international travel certificates.' },
      { q: 'Can you vaccinate at our workplace?', a: 'Yes — we offer group corporate vaccination visits. Contact us to schedule.' },
    ],
  },

  'medication-admin': {
    key: 'medication-admin',
    name: 'Medication Administration',
    tagline: 'Safe, supervised medication administration by qualified staff',
    description:
      'For patients requiring injections, IV therapy, wound dressings, or medication that must be administered under supervision — our clinical staff provide a safe and professional environment.',
    icon: <Activity className="w-10 h-10" />,
    gradient: 'from-orange-700 to-red-800',
    accent: 'text-orange-200',
    emoji: '🩹',
    whatsAppMsg: 'Hello Happy Pills Pharmacy! I need medication administration services (e.g., injections/dressings/IV). Please advise on availability.',
    features: [
      {
        title: 'Services Offered',
        items: [
          'Intramuscular (IM) injections',
          'Intravenous (IV) infusions & drips',
          'Subcutaneous injections (e.g., insulin)',
          'Wound dressing & management',
          'Catheter care & management',
          'Nebulisation therapy',
          'Vitamin & supplement infusions',
          'Post-operative care & monitoring',
        ],
      },
      {
        title: 'Safety Standards',
        items: [
          'Single-use sterile equipment only',
          'Trained nursing staff on duty',
          'Emergency resuscitation equipment available',
          'Observation period post-administration',
          'Adverse reaction protocols in place',
        ],
      },
    ],
    faq: [
      { q: "Do I need a doctor's prescription for injections?", a: 'Yes — a valid prescription is required for prescription medicines. Our clinic can issue one if needed.' },
      { q: 'Can you administer IV drips for hydration?', a: 'Yes — we offer IV hydration therapy and vitamin infusions. WhatsApp us to book.' },
      { q: 'Is the administration area private?', a: 'Yes — we have a dedicated, private clinical area for all procedures.' },
    ],
  },

  counselling: {
    key: 'counselling',
    name: 'Health Counselling',
    tagline: 'Personalised guidance for better health outcomes',
    description:
      'Our pharmacists and clinical officers provide one-on-one health counselling sessions covering medication management, chronic disease, nutrition, family planning, and mental wellness — empowering you to take control of your health.',
    icon: <HeartPulse className="w-10 h-10" />,
    gradient: 'from-rose-700 to-primary-800',
    accent: 'text-rose-200',
    emoji: '💬',
    whatsAppMsg: 'Hello Happy Pills Pharmacy! I would like to schedule a health counselling session. Please advise on available topics and times.',
    features: [
      {
        title: 'Counselling Topics',
        items: [
          'Chronic disease management (diabetes, hypertension)',
          'Medication adherence counselling',
          'Family planning & contraceptive advice',
          'HIV/AIDS & ART counselling',
          'Nutrition & dietary guidance',
          'Mental health & stress support',
          'Smoking cessation',
          'Alcohol & substance use support',
          'Post-diagnosis emotional support',
        ],
      },
      {
        title: 'How It Works',
        items: [
          'In-person or WhatsApp-based sessions',
          'Confidential, non-judgmental environment',
          'Personalised health action plans',
          'Follow-up check-ins available',
          'Referral to specialists if needed',
        ],
      },
    ],
    faq: [
      { q: 'Is the counselling confidential?', a: 'Absolutely. All sessions are completely private and your information is never shared without your consent.' },
      { q: 'Can I have a counselling session on WhatsApp?', a: 'Yes — we offer text and voice WhatsApp counselling sessions for your convenience.' },
      { q: 'Is there a cost for counselling?', a: 'Basic pharmacist counselling is included with your visit. Extended or specialist sessions may have a small fee — WhatsApp us for details.' },
    ],
  },
};

export default function HealthcareServicePage({ service, onBack }: HealthcareServicePageProps) {
  const [showWA, setShowWA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const config = SERVICE_DATA[service];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${config.gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-start gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              {config.icon}
            </div>
            <div>
              <p className={`text-sm font-semibold ${config.accent} uppercase tracking-wide mb-1`}>
                {config.emoji} Happy Pills Healthcare
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                {config.name}
              </h1>
              <p className={`text-lg ${config.accent} max-w-2xl`}>{config.tagline}</p>
            </div>
          </div>

          {/* Quick info bar */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { icon: <Clock className="w-4 h-4" />, label: '7:30 AM – Midnight daily' },
              { icon: <MapPin className="w-4 h-4" />, label: 'Zalex House, Nansana' },
              { icon: <Shield className="w-4 h-4" />, label: 'NDA Licensed' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70 text-sm bg-white/10 px-3 py-1.5 rounded-full">
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-white border-b border-neutral-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <p className="text-neutral-700 text-sm font-medium hidden sm:block">
            Book or enquire about {config.name}
          </p>
          <div className="flex gap-3 ml-auto">
            <a
              href="tel:+256709745309"
              className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <button
              onClick={() => setShowWA(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Book on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">About This Service</h2>
              <p className="text-neutral-600 leading-relaxed">{config.description}</p>
            </div>

            {/* Features */}
            {config.features.map((section, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-5">{section.title}</h2>
                <ul className="space-y-2.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {config.faq.map((item, i) => (
                  <div key={i} className="border border-neutral-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-semibold text-neutral-800 text-sm">{item.q}</span>
                      <ChevronRight className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book CTA */}
            <div className={`bg-gradient-to-br ${config.gradient} rounded-2xl p-6 text-white`}>
              <p className="text-lg font-bold mb-2">{config.name}</p>
              <p className="text-white/70 text-sm mb-5">Book or enquire now — our team responds within minutes.</p>
              <button
                onClick={() => setShowWA(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white text-neutral-800 font-semibold rounded-xl hover:bg-neutral-100 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                Book on WhatsApp
              </button>
              <a
                href="tel:+256709745309"
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call +256 709 745 309
              </a>
            </div>

            {/* Info card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-bold text-neutral-900 mb-4 text-sm">Service Information</h3>
              <div className="space-y-3">
                {[
                  { icon: <Clock className="w-4 h-4 text-neutral-400" />, label: 'Hours', value: '7:30 AM – 12:00 AM daily' },
                  { icon: <MapPin className="w-4 h-4 text-neutral-400" />, label: 'Location', value: 'Zalex House, Nansana\nKampala-Hoima Road' },
                  { icon: <Phone className="w-4 h-4 text-neutral-400" />, label: 'Phone', value: '+256 709 745 309\n+256 782 504 503' },
                  { icon: <Shield className="w-4 h-4 text-neutral-400" />, label: 'Accreditation', value: 'NDA Licensed\nNHIF Registered' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-semibold">{item.label}</p>
                      <p className="text-sm text-neutral-700 whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other services */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-bold text-neutral-900 mb-4 text-sm">Other Services</h3>
              <div className="space-y-2">
                {(Object.keys(SERVICE_DATA) as ServiceKey[])
                  .filter((k) => k !== service)
                  .map((k) => {
                    const s = SERVICE_DATA[k];
                    return (
                      <button
                        key={k}
                        onClick={onBack}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                      >
                        <span className="text-xl">{s.emoji}</span>
                        <span className="text-sm text-neutral-700 group-hover:text-neutral-900 font-medium">{s.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-300 ml-auto" />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWA && (
        <WhatsAppPickerModal
          onClose={() => setShowWA(false)}
          message={config.whatsAppMsg}
          title={config.name}
        />
      )}
    </div>
  );
}
