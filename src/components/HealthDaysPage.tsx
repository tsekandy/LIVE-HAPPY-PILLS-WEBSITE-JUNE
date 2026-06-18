import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Eye, X, Calendar, MessageCircle, Upload,
} from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';
import {
  getCampaignsWithStatus, getCampaignImage, BG, CATEGORY_LABELS, formatDateRange,
  type CampaignData, type CampaignCategory, type CampaignWithStatus,
} from '../data/campaigns';

interface HealthDaysPageProps {
  onBack: () => void;
}

const ALL_CATEGORIES: (CampaignCategory | 'all')[] = [
  'all', 'health-day', 'national-holiday', 'religious', 'promotion', 'community',
];

const CATEGORY_COLORS: Record<CampaignCategory, string> = {
  'health-day':       'bg-blue-100 text-blue-700',
  'national-holiday': 'bg-amber-100 text-amber-700',
  'religious':        'bg-purple-100 text-purple-700',
  'promotion':        'bg-primary-100 text-primary-700',
  'community':        'bg-teal-100 text-teal-700',
};

export default function HealthDaysPage({ onBack }: HealthDaysPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<CampaignCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'past'>('all');
  const [previewCampaign, setPreviewCampaign] = useState<CampaignData | null>(null);
  const [showWA, setShowWA] = useState(false);
  const [waMsg, setWaMsg] = useState('');

  const allCampaigns = useMemo(() => getCampaignsWithStatus(), []);

  const filtered = allCampaigns.filter((c) => {
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  const activeCampaign = allCampaigns.find((c) => c.status === 'active');

  const counts = {
    all: allCampaigns.length,
    active: allCampaigns.filter((c) => c.status === 'active').length,
    upcoming: allCampaigns.filter((c) => c.status === 'upcoming').length,
    past: allCampaigns.filter((c) => c.status === 'past').length,
  };

  const handleEnquire = (c: CampaignData) => {
    setWaMsg(`Hello Happy Pills Pharmacy! I'm reaching out regarding ${c.badge}. ${c.cta}`);
    setShowWA(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="w-px h-5 bg-neutral-200" />
            <div>
              <h1 className="text-xl font-bold text-neutral-900">Health Days & Campaigns</h1>
              <p className="text-neutral-500 text-xs mt-0.5">
                {counts.active > 0 ? `${counts.active} active · ` : ''}{counts.upcoming} upcoming · {counts.past} past
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaign Banner */}
      {activeCampaign && (
        <div className={`bg-gradient-to-r ${activeCampaign.gradient} text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeCampaign.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Active Now
                  </span>
                  <span className="text-white/70 text-xs">{formatDateRange(activeCampaign)}</span>
                </div>
                <p className="font-bold text-white">{activeCampaign.headline}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewCampaign(activeCampaign)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" /> Preview Hero
              </button>
              <button
                onClick={() => handleEnquire(activeCampaign)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white text-neutral-800 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-600" /> Enquire
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  categoryFilter === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {cat === 'all' ? 'All Categories' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2 sm:ml-auto">
            {(['all', 'active', 'upcoming', 'past'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize ${
                  statusFilter === s
                    ? 'bg-neutral-800 text-white'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
                }`}
              >
                {s === 'all' ? `All (${counts.all})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${counts[s]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">No campaigns match the selected filters.</p>
            </div>
          )}

          {filtered.map((campaign) => (
            <CampaignRow
              key={campaign.name + campaign.date.month}
              campaign={campaign}
              onPreview={() => setPreviewCampaign(campaign)}
              onEnquire={() => handleEnquire(campaign)}
            />
          ))}
        </div>
      </div>

      {/* Hero Preview Modal */}
      {previewCampaign && (
        <HeroPreviewModal
          campaign={previewCampaign}
          onClose={() => setPreviewCampaign(null)}
          onEnquire={() => { handleEnquire(previewCampaign); setPreviewCampaign(null); }}
        />
      )}

      {showWA && (
        <WhatsAppPickerModal
          onClose={() => setShowWA(false)}
          message={waMsg}
          title="Campaign Enquiry"
        />
      )}
    </div>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────

interface CampaignRowProps {
  campaign: CampaignWithStatus;
  onPreview: () => void;
  onEnquire: () => void;
}

function CampaignRow({ campaign, onPreview, onEnquire }: CampaignRowProps) {
  const statusStyles: Record<string, string> = {
    active:   'bg-green-100 text-green-700 border-green-200',
    upcoming: 'bg-blue-50 text-blue-600 border-blue-200',
    past:     'bg-neutral-100 text-neutral-500 border-neutral-200',
  };
  const statusLabels = { active: 'Active Now', upcoming: 'Upcoming', past: 'Past' };

  return (
    <div className={`bg-white rounded-xl border ${
      campaign.status === 'active' ? 'border-green-200 shadow-sm' : 'border-neutral-200'
    } p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow`}>

      {/* Left: emoji + info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {campaign.heroPhoto ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
            <img
              src={campaign.heroPhoto}
              alt={campaign.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = BG; }}
            />
            <span className="absolute bottom-0 right-0 text-xs leading-none p-0.5">{campaign.emoji}</span>
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${campaign.gradient} shadow-sm`}>
            {campaign.emoji}
          </div>
        )}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${statusStyles[campaign.status]}`}>
              {campaign.status === 'active' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />}
              {statusLabels[campaign.status]}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[campaign.category]}`}>
              {CATEGORY_LABELS[campaign.category]}
            </span>
          </div>
          <p className="font-bold text-neutral-900 truncate">{campaign.name}</p>
          <p className="text-sm text-neutral-500 truncate">{campaign.headline}</p>
        </div>
      </div>

      {/* Date range */}
      <div className="flex items-center gap-1.5 text-neutral-500 text-sm shrink-0">
        <Calendar className="w-4 h-4" />
        <span>{formatDateRange(campaign)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={onPreview}
          className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 text-neutral-600 text-xs font-semibold rounded-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Hero
        </button>
        <button
          onClick={onEnquire}
          className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Enquire
        </button>
      </div>
    </div>
  );
}

// ── Hero Preview Modal ────────────────────────────────────────────────────────

interface HeroPreviewModalProps {
  campaign: CampaignData;
  onClose: () => void;
  onEnquire: () => void;
}

function HeroPreviewModal({ campaign, onClose, onEnquire }: HeroPreviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide">Hero Preview</p>
            <h2 className="font-bold text-neutral-900">{campaign.name}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero preview — static replica (no canvas animations) */}
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img src={getCampaignImage(campaign)} alt={campaign.name} className="w-full h-full object-cover opacity-20" loading="eager" referrerPolicy="no-referrer" />
            <div className={`absolute inset-0 bg-gradient-to-r ${campaign.gradient}`} />
          </div>

          {/* Content */}
          <div className={`relative px-8 py-12 ${campaign.heroPhoto ? 'grid grid-cols-1 sm:grid-cols-2 gap-8 items-center' : ''}`}>
            <div>
            {/* Deal strips */}
            {campaign.deals && (
              <div className="mb-4 flex flex-wrap gap-2">
                {campaign.deals.map((deal, i) => (
                  <div key={i} className="bg-yellow-400 text-neutral-950 rounded-xl px-3 py-1.5 text-center shadow">
                    <p className="font-black text-xs leading-none">{deal.label}</p>
                    <p className="text-[10px] font-semibold opacity-75 mt-0.5">{deal.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Badge */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                {campaign.badge}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20">
                Happy Pills Pharmacy
              </span>
            </div>

            {/* Icon + subheadline */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-white/10 ${campaign.accentColor} flex items-center justify-center text-xl`}>
                {campaign.emoji}
              </div>
              <p className={`text-sm font-semibold ${campaign.accentColor} tracking-wide uppercase`}>
                {campaign.subheadline}
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 max-w-2xl">
              {campaign.headline.split(' ').map((word, i, arr) =>
                i === arr.length - 1
                  ? <span key={i} className={campaign.accentColor}> {word}</span>
                  : <span key={i}>{word} </span>
              )}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-sm md:text-base mb-6 max-w-xl leading-relaxed">
              {campaign.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onEnquire}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {campaign.cta}
              </button>
              <button onClick={() => window.open(`https://wa.me/256709745309?text=${encodeURIComponent('Hello Happy Pills Pharmacy! I would like to send my prescription for dispensing. Please let me know the next steps.')}`, '_blank')} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 text-sm transition-colors">
                <Upload className="w-4 h-4" />
                Upload Prescription
              </button>
            </div>

            {/* Date & animation indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>Active: {formatDateRange(campaign)}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <span>Animation: {campaign.animation}</span>
              </div>
            </div>
            </div>

            {/* Hero photo (right column) */}
            {campaign.heroPhoto && (
              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-xs">
                  <div className="absolute -inset-2 rounded-2xl bg-white/10 border border-white/15" />
                  <img
                    src={campaign.heroPhoto}
                    alt={campaign.name}
                    className="relative w-full rounded-xl object-cover shadow-xl"
                    style={{ maxHeight: '280px', objectPosition: 'top center' }}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                    <span className="text-base">{campaign.emoji}</span>
                    <p className="text-white text-xs font-bold leading-tight">{campaign.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview label */}
          <div className="absolute top-3 right-3 bg-black/40 text-white/70 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
            Preview
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            This is a static preview. Live hero includes particle animations for this campaign type.
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
              Close
            </button>
            <button
              onClick={onEnquire}
              className="px-4 py-2 text-sm bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Enquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

