import React from 'react';
import {
  ArrowLeft,
  Pill,
  FileText,
  Truck,
  Clock,
  Shield,
  Phone,
  Heart,
  Stethoscope,
  Package,
  MessageCircle,
  Upload,
  ChevronRight,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';

interface ServicesPageProps {
  onBack: () => void;
}

export default function ServicesPage({ onBack }: ServicesPageProps) {
  const services = [
    {
      icon: Pill,
      title: 'Prescription Dispensing',
      description:
        'Professional dispensing of all prescription medications with expert consultation and guidance.',
      features: [
        'Licensed pharmacist consultation',
        'Medication interaction checking',
        'Dosage guidance and instructions',
        'Generic and brand name options',
      ],
    },
    {
      icon: FileText,
      title: 'Prescription Upload & Processing',
      description:
        'Upload your prescription online for quick processing and preparation.',
      features: [
        'Digital prescription upload',
        'Quick processing and preparation',
        'SMS/WhatsApp notifications',
        'Secure payment processing',
      ],
    },
    {
      icon: Truck,
      title: 'On-Demand Drug Import',
      description:
        'We import medications and medical devices not readily available locally.',
      features: [
        'Special order medications',
        'Medical device imports',
        'Quality assurance guarantee',
        'Competitive pricing and quotes',
      ],
    },
    {
      icon: Clock,
      title: '24/7 Emergency Service',
      description:
        'Round-the-clock availability for emergency medication needs.',
      features: [
        'Emergency medication supply',
        'After-hours consultations',
        'Urgent prescription processing',
        'Emergency delivery service',
      ],
    },
    {
      icon: Shield,
      title: 'Health Consultations',
      description:
        'Professional pharmaceutical consultations and health advice.',
      features: [
        'Medication reviews',
        'Health condition guidance',
        'Drug interaction consultations',
        'Wellness advice',
      ],
    },
    {
      icon: Phone,
      title: 'WhatsApp Support',
      description:
        'Instant support and consultation through WhatsApp.',
      features: [
        'Quick medication inquiries',
        'Prescription clarifications',
        'Order status updates',
        'Health tips and reminders',
      ],
    },
    {
      icon: Heart,
      title: 'Chronic Disease Management',
      description:
        'Specialized care for patients with chronic conditions.',
      features: [
        'Diabetes management support',
        'Hypertension monitoring',
        'Regular medication refills',
        'Lifestyle counseling',
      ],
    },
    {
      icon: Stethoscope,
      title: 'Health Screening',
      description:
        'Basic health screening and monitoring services.',
      features: [
        'Blood pressure monitoring',
        'Blood sugar testing',
        'BMI calculations',
        'Health record maintenance',
      ],
    },
    {
      icon: Package,
      title: 'Medical Supplies',
      description:
        'Complete range of medical supplies and equipment.',
      features: [
        'First aid supplies',
        'Medical equipment',
        'Personal care products',
        'Health supplements',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Back Button */}
      <div className="bg-white border-b border-neutral-200">
        <div className="section-container py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container text-center">
          <div className="badge bg-primary-50 text-primary-700 mb-6">
            Our Services
          </div>
          <h1 className="heading-lg text-neutral-800 mb-4 text-balance">
            Comprehensive Pharmaceutical Care
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mb-6">
            Professional healthcare services designed to meet all your
            pharmaceutical needs with expert guidance and convenient solutions.
          </p>
          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="card p-6 flex flex-col animate-slide-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>

                  {/* Title */}
                  <h3 className="heading-sm text-neutral-800 mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-sm mb-5">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mt-auto">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-neutral-700"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Hours Section */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-10">
            <div className="badge bg-primary-50 text-primary-700 mb-4">
              <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
              Hours
            </div>
            <h2 className="heading-md text-neutral-800 mb-3">
              Service Hours
            </h2>
            <p className="text-body max-w-xl mx-auto">
              We are here when you need us, with extended hours and emergency
              support available around the clock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Regular Hours */}
            <div className="card p-6">
              <h3 className="heading-sm text-neutral-800 mb-4">
                Regular Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-body font-medium">Monday – Sunday</span>
                  <span className="badge bg-primary-50 text-primary-700">
                    7:30 AM – 12:00 AM
                  </span>
                </div>
              </div>
              <p className="text-body-sm mt-4">
                Open every day of the week, including public holidays, to
                ensure you always have access to your medications.
              </p>
            </div>

            {/* Emergency Services */}
            <div className="card p-6 border-primary-200 bg-primary-50/40">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 text-primary-600 mr-2" />
                <h3 className="heading-sm text-neutral-800">
                  Emergency Services
                </h3>
              </div>
              <div className="bg-white rounded-lg border border-primary-200 p-4 mb-4">
                <p className="text-neutral-800 font-semibold mb-1">
                  24/7 Emergency Support
                </p>
                <p className="text-body-sm">
                  Call or WhatsApp us anytime for emergency medication needs.
                </p>
              </div>
              <button
                onClick={() => {
                  const message =
                    'Hello Happy Pills Pharmacy! I need emergency assistance.';
                  const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="btn-primary w-full text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Emergency WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">
            Need Our Services?
          </h2>
          <p className="text-primary-100 text-body-lg max-w-xl mx-auto mb-8">
            Get started with professional pharmaceutical care today. Reach
            out to us on WhatsApp or upload your prescription online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const message =
                  'Hello Happy Pills Pharmacy! I need information about your services.';
                const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us on WhatsApp
            </button>
            <button
              onClick={() => window.open(`https://wa.me/256709745309?text=${encodeURIComponent('Hello Happy Pills Pharmacy! I would like to send my prescription for dispensing. Please let me know the next steps so I can share the prescription image or PDF with you. Thank you!')}`, '_blank')}
              className="btn-secondary border-white text-white hover:bg-white/10 hover:border-white"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Prescription
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
