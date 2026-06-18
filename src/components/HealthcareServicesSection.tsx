import React, { useState } from 'react';
import {
  Stethoscope, Microscope, Syringe, Pill, MessageCircle,
  Phone, ArrowRight, CheckCircle2, Clock, MapPin, Users, Heart, Shield,
  FlaskConical, Baby, Activity,
} from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaMessage: string;
  gradient: string;
  iconBg: string;
}

function ServiceCard({ icon, title, subtitle, description, features, ctaLabel, ctaMessage, gradient, iconBg }: ServiceCardProps) {
  const [showWA, setShowWA] = useState(false);

  return (
    <>
      <div className={`rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className={`p-6 ${gradient}`}>
          <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">{subtitle}</p>
          <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
        </div>

        {/* Body */}
        <div className="p-6 bg-white flex flex-col flex-1">
          <p className="text-sm text-neutral-600 mb-5 leading-relaxed">{description}</p>

          <ul className="space-y-2.5 mb-6 flex-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowWA(true)}
            className="btn-primary w-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {ctaLabel}
          </button>
        </div>
      </div>

      {showWA && (
        <WhatsAppPickerModal
          onClose={() => setShowWA(false)}
          message={ctaMessage}
          title={ctaLabel}
        />
      )}
    </>
  );
}

export default function HealthcareServicesSection() {
  const services: ServiceCardProps[] = [
    {
      icon: <Stethoscope className="w-7 h-7 text-white" />,
      title: 'HP Outpatient Clinic',
      subtitle: 'Healthcare Services',
      description: 'Professional medical consultations by qualified healthcare practitioners. We provide comprehensive outpatient care for the whole family.',
      features: [
        'General consultations & minor illness',
        'Health assessment & screening',
        'Chronic disease monitoring',
        'Follow-up care & referral support',
        'Child & adult healthcare',
        'Medical certificates',
      ],
      ctaLabel: 'Book Consultation',
      ctaMessage: 'Hello Happy Pills Pharmacy! I would like to book an outpatient consultation at your clinic. Please provide available times and consultation fees.',
      gradient: 'bg-gradient-to-br from-primary-700 to-primary-900',
      iconBg: 'bg-white/20',
    },
    {
      icon: <FlaskConical className="w-7 h-7 text-white" />,
      title: 'HP Laboratory Services',
      subtitle: 'Diagnostic Tests',
      description: 'Comprehensive laboratory testing services with accurate, reliable results. Our diagnostic tests support your healthcare journey.',
      features: [
        'Routine & comprehensive blood tests',
        'Malaria rapid tests',
        'Blood sugar & HbA1c monitoring',
        'HIV, hepatitis & STI screening',
        'Urine & stool analysis',
        'Pregnancy & fertility tests',
      ],
      ctaLabel: 'Request Lab Test',
      ctaMessage: 'Hello Happy Pills Pharmacy! I would like to request laboratory tests. Could you share your test catalogue and pricing?',
      gradient: 'bg-gradient-to-br from-blue-700 to-blue-900',
      iconBg: 'bg-white/20',
    },
    {
      icon: <Syringe className="w-7 h-7 text-white" />,
      title: 'Immunisation Services',
      subtitle: 'Vaccination Programs',
      description: 'Protect yourself and your family with our comprehensive vaccination programmes. We offer childhood, adult, and travel vaccines.',
      features: [
        'Childhood immunisation schedule',
        'Adult & booster vaccines',
        'Travel health vaccinations',
        'Flu & pneumonia vaccines',
        'Hepatitis B vaccination',
        'Vaccination records & certificates',
      ],
      ctaLabel: 'Book Immunisation',
      ctaMessage: 'Hello Happy Pills Pharmacy! I would like to book an immunisation/vaccination appointment. Could you share available vaccines and booking procedure?',
      gradient: 'bg-gradient-to-br from-amber-600 to-amber-800',
      iconBg: 'bg-white/20',
    },
    {
      icon: <Pill className="w-7 h-7 text-white" />,
      title: 'Medication Administration',
      subtitle: 'Nursing Support',
      description: 'Professional medication administration and nursing support services by trained healthcare staff for patients requiring assistance.',
      features: [
        'Injection administration',
        'Intravenous (IV) medication support',
        'Wound care & dressing',
        'Basic nursing procedures',
        'Medication monitoring',
        'Patient education & training',
      ],
      ctaLabel: 'Request Service',
      ctaMessage: 'Hello Happy Pills Pharmacy! I would like to inquire about your medication administration / nursing support services. Please share more details.',
      gradient: 'bg-gradient-to-br from-rose-600 to-rose-800',
      iconBg: 'bg-white/20',
    },
    {
      icon: <Heart className="w-7 h-7 text-white" />,
      title: 'Health Counselling',
      subtitle: 'Wellness Advice',
      description: 'Expert health guidance and counselling from our qualified pharmacists and healthcare professionals to support your wellness journey.',
      features: [
        'Medicine use counselling',
        'Chronic disease education',
        'Nutrition & dietary guidance',
        'Lifestyle modification support',
        'Mental health first-line support',
        'Preventive healthcare advice',
      ],
      ctaLabel: 'Talk to a Professional',
      ctaMessage: 'Hello Happy Pills Pharmacy! I would like to speak with a healthcare professional about health counselling / advice. When would be a good time?',
      gradient: 'bg-gradient-to-br from-purple-600 to-purple-900',
      iconBg: 'bg-white/20',
    },
  ];

  return (
    <section className="section-padding bg-neutral-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">
            More Than a Pharmacy
          </p>
          <h2 className="heading-lg text-neutral-900 mb-4">
            Complete Healthcare Under One Roof
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Beyond dispensing medicines, Happy Pills Pharmacy offers clinical, laboratory, and wellness services — making us Uganda's most complete community healthcare platform.
          </p>
        </div>

        {/* Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Clock className="w-5 h-5" />, label: '7:30 AM – Midnight', sub: 'Mon – Sun' },
            { icon: <MapPin className="w-5 h-5" />, label: 'Zalex House, Nansana', sub: 'Kampala-Hoima Road' },
            { icon: <Phone className="w-5 h-5" />, label: '+256 709 745 309', sub: 'Call anytime' },
            { icon: <Shield className="w-5 h-5" />, label: 'NDA Licensed', sub: 'Certified professionals' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 bg-primary-700 rounded-2xl text-center text-white">
          <Users className="w-10 h-10 mx-auto mb-4 text-primary-300" />
          <h3 className="text-xl font-bold mb-2">Not sure which service you need?</h3>
          <p className="text-primary-200 mb-6 max-w-lg mx-auto">
            Chat with our friendly team on WhatsApp. We'll guide you to the right service quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/256709745309?text=Hello%20Happy%20Pills%20Pharmacy!%20I%20need%20help%20choosing%20the%20right%20healthcare%20service%20for%20my%20needs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+256709745309"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
