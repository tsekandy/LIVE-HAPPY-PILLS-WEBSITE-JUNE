import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageCircle, Upload, Heart, Shield, Syringe, Stethoscope,
  Globe, Users, Baby, Ribbon, Pill, Activity, Leaf, Droplets,
} from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';
import {
  CAMPAIGNS, getCurrentCampaign, getUpcomingCampaign, getCampaignImage, BG,
  type CampaignData, type AnimationType,
} from '../data/campaigns';

// ── Icon map (icon name string → React node) ─────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  heart:       <Heart className="w-8 h-8" />,
  shield:      <Shield className="w-8 h-8" />,
  globe:       <Globe className="w-8 h-8" />,
  users:       <Users className="w-8 h-8" />,
  baby:        <Baby className="w-8 h-8" />,
  ribbon:      <Ribbon className="w-8 h-8" />,
  pill:        <Pill className="w-8 h-8" />,
  activity:    <Activity className="w-8 h-8" />,
  leaf:        <Leaf className="w-8 h-8" />,
  droplets:    <Droplets className="w-8 h-8" />,
  syringe:     <Syringe className="w-8 h-8" />,
  stethoscope: <Stethoscope className="w-8 h-8" />,
};

// ── Canvas particle system ────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; color: string; size: number;
  rotation: number; rotationSpeed: number;
  type: AnimationType; char?: string;
  gravity: number; life: number; maxLife: number;
}

function createParticle(canvas: HTMLCanvasElement, type: AnimationType): Particle {
  const colors: Record<AnimationType, string[]> = {
    fireworks: ['#ff4444','#ff8800','#ffdd00','#44ff44','#4488ff','#ff44ff','#ffffff'],
    hearts:    ['#ff4488','#ff2266','#ff88aa','#ffaabb','#ff6699'],
    snowflakes:['#cce8ff','#aaddff','#99ccff','#bbddff','#ffffff'],
    confetti:  ['#ff4444','#44aaff','#ffdd00','#44dd44','#ff88ff','#ff8800','#00ddaa'],
    ribbons:   ['#ff4488','#dd2266','#ff6699','#ff88bb','#cc1155'],
    stars:     ['#ffdd00','#ffee44','#ffcc00','#fff176','#ffee88'],
    leaves:    ['#44aa44','#66cc44','#88dd44','#33aa33','#22bb22'],
    crosses:   ['#aaddff','#88ccff','#66bbff','#99ddff','#bbeeee'],
    drops:     ['#ff4444','#dd2222','#ff6666','#cc3333','#ff8888'],
    sparkles:  ['#aaddff','#88ccff','#66aadd','#99bbcc','#77bbdd'],
    none:      ['#ffffff'],
  };
  const palette = colors[type] || colors.confetti;
  const color = palette[Math.floor(Math.random() * palette.length)];
  const chars: Record<string, string[]> = {
    hearts: ['♥','❤','♡'], snowflakes: ['❄','❅','❆','✻','✼'],
    stars: ['★','✦','✧','⭐','✨'], leaves: ['🌿','🍃','🌱','❧'],
    crosses: ['✚','†','+','✞'], drops: ['💧','•','○'], ribbons: ['🎗','❤','♥'],
  };
  const charOptions = chars[type];
  const char = charOptions ? charOptions[Math.floor(Math.random() * charOptions.length)] : undefined;
  const fromTop = ['snowflakes','confetti','ribbons','leaves','stars'].includes(type);
  const fromBottom = ['fireworks'].includes(type);
  const x = Math.random() * canvas.width;
  const y = fromTop ? -20 : fromBottom ? canvas.height + 20 : Math.random() * canvas.height;
  const baseVy = fromTop ? 1 + Math.random() * 2.5 : fromBottom ? -(4 + Math.random() * 6) : (Math.random() - 0.5) * 2;
  return {
    x, y, vx: (Math.random() - 0.5) * (type === 'snowflakes' ? 1 : 3), vy: baseVy,
    alpha: 0.85 + Math.random() * 0.15, color,
    size: type === 'fireworks' ? 2 + Math.random() * 3 : 10 + Math.random() * 16,
    rotation: Math.random() * Math.PI * 2, rotationSpeed: (Math.random() - 0.5) * 0.12,
    type, char, gravity: fromTop ? 0.03 : fromBottom ? 0.1 : 0,
    life: 0, maxLife: 120 + Math.random() * 180,
  };
}

function spawnFireworkBurst(canvas: HTMLCanvasElement, particles: Particle[]) {
  const x = 0.1 * canvas.width + Math.random() * 0.8 * canvas.width;
  const y = 0.1 * canvas.height + Math.random() * 0.5 * canvas.height;
  const colors = ['#ff4444','#ff8800','#ffdd00','#44ff44','#4488ff','#ff44ff','#ffffff','#00ffdd'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 30 + Math.floor(Math.random() * 20); i++) {
    const angle = (i / 30) * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      alpha: 1, color, size: 2 + Math.random() * 3,
      rotation: 0, rotationSpeed: 0, type: 'fireworks',
      gravity: 0.08, life: 0, maxLife: 60 + Math.random() * 60,
    });
  }
}

function useParticleCanvas(type: AnimationType, active: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active || type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    particlesRef.current = [];
    const initialCount = type === 'fireworks' ? 0 : 40;
    for (let i = 0; i < initialCount; i++) {
      const p = createParticle(canvas, type); p.y = Math.random() * canvas.height;
      particlesRef.current.push(p);
    }
    const maxParticles = type === 'fireworks' ? 300 : 80;
    const spawnRate = type === 'fireworks' ? 0 : (type === 'snowflakes' ? 60 : 30);
    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (type !== 'fireworks' && frameRef.current % spawnRate === 0 && particlesRef.current.length < maxParticles) {
        particlesRef.current.push(createParticle(canvas, type));
      }
      if (type === 'fireworks' && frameRef.current % 80 === 0) spawnFireworkBurst(canvas, particlesRef.current);
      ctx.save();
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++; p.x += p.vx; p.vy += p.gravity; p.y += p.vy; p.rotation += p.rotationSpeed;
        const alpha = p.alpha * (1 - p.life / p.maxLife);
        if (p.life >= p.maxLife || (p.y > canvas.height + 30 && type !== 'fireworks') || (p.y < -30 && type === 'fireworks')) return false;
        ctx.save(); ctx.globalAlpha = Math.max(0, alpha); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        if (p.char) {
          ctx.font = `${p.size}px serif`; ctx.fillStyle = p.color;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.char, 0, 0);
        } else if (type === 'confetti') {
          ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (type === 'fireworks') {
          ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color; ctx.shadowBlur = 6; ctx.shadowColor = p.color; ctx.fill(); ctx.shadowBlur = 0;
        } else {
          ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
        }
        ctx.restore(); return true;
      });
      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [type, active]);

  return canvasRef;
}

// ── Hero component ────────────────────────────────────────────────────────────

export default function HolidayHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  useEffect(() => { setIsVisible(true); }, []);

  const currentCampaign = useMemo(() => getCurrentCampaign(), []);
  const upcomingCampaign = useMemo(() => getUpcomingCampaign(), []);

  const hero = currentCampaign;
  const isActive = !!currentCampaign;
  const animationType: AnimationType = currentCampaign?.animation ?? 'none';
  const canvasRef = useParticleCanvas(animationType, isActive);

  return (
    <>
      <section className="relative bg-neutral-900 overflow-hidden pt-[108px] md:pt-[116px] lg:pt-[108px]">
        <div className="absolute inset-0">
          <img src={hero ? getCampaignImage(hero) : BG} alt={hero?.name ?? 'Happy Pills Pharmacy'} className="w-full h-full object-cover opacity-25" loading="eager" referrerPolicy="no-referrer" />
          <div className={`absolute inset-0 bg-gradient-to-r ${hero?.gradient ?? 'from-neutral-900 via-neutral-900/90 to-neutral-900/50'}`} />
        </div>

        {isActive && animationType !== 'none' && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />
        )}

        <div
          className={`relative py-8 md:py-12 lg:py-14 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Split layout when campaign has a hero photo, otherwise full-width text */}
            <div className={`${isActive && hero?.heroPhoto ? 'grid md:grid-cols-2 gap-8 items-center' : ''}`}>

              {/* ── Text Column ── */}
              <div className={isActive && hero?.heroPhoto ? '' : 'max-w-3xl'}>
                {/* Deal strips */}
                {hero?.deals && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {hero.deals.map((deal, i) => (
                      <div key={i} className="bg-yellow-400 text-neutral-950 rounded-xl px-4 py-2 text-center shadow-lg">
                        <p className="font-black text-sm leading-none">{deal.label}</p>
                        <p className="text-xs font-semibold opacity-75 mt-0.5">{deal.sub}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                    {hero?.badge ?? 'Licensed Pharmacy · NDA Approved'}
                  </span>
                  {!isActive && (
                    <>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                        Clinic · Lab · Pharmacy
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20">
                        24/7 Service
                      </span>
                    </>
                  )}
                </div>

                {/* Icon + subtitle */}
                {isActive && hero && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/10 ${hero.accentColor} flex items-center justify-center`}>
                      {ICON_MAP[hero.iconName] ?? <Pill className="w-8 h-8" />}
                    </div>
                    <p className={`text-sm font-semibold ${hero.accentColor} tracking-wide uppercase`}>
                      {hero.subheadline}
                    </p>
                  </div>
                )}

                {/* Headline */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-4">
                  {isActive && hero ? (
                    <>
                      {hero.headline.split(' ').map((word, i, arr) =>
                        i === arr.length - 1
                          ? <span key={i} className={hero.accentColor}> {word}</span>
                          : <span key={i}>{word} </span>
                      )}
                    </>
                  ) : (
                    <>
                      Provider-Centred Solutions for
                      <span className="text-primary-400"> Patient-Centred Care</span>
                    </>
                  )}
                </h1>

                <p className="text-sm md:text-base text-neutral-300 mb-6 leading-relaxed max-w-2xl">
                  {hero?.description ?? 'Helping Ugandans access quality pharmaceutical care — expert consultations, premium medicines, laboratory tests, and clinical services across Kampala, Wakiso, Mukono & Jinja.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const msg = isActive && hero
                        ? `Hello Happy Pills Pharmacy! I'm reaching out regarding ${hero.badge}. ${hero.cta}`
                        : 'Hello Happy Pills Pharmacy! I need assistance with my medication needs.';
                      setWhatsAppMessage(msg);
                      setShowWhatsAppPicker(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {hero?.cta ?? 'Consult on WhatsApp'}
                  </button>
                  <button
                    onClick={() => { setWhatsAppMessage('Hello Happy Pills Pharmacy! I would like to send my prescription for dispensing. Please let me know the next steps.'); setShowWhatsAppPicker(true); }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Prescription
                  </button>
                </div>

                {!isActive && upcomingCampaign && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-sm text-neutral-400">
                      <span className="text-neutral-300 font-medium">Coming soon:</span>{' '}
                      {upcomingCampaign.emoji} {upcomingCampaign.badge} — {upcomingCampaign.headline}
                    </p>
                  </div>
                )}
              </div>

              {/* ── Photo Column (only when campaign has heroPhoto) ── */}
              {isActive && hero?.heroPhoto && (
                <div className="hidden md:flex justify-end items-end h-full">
                  <div className="relative w-full max-w-sm">
                    {/* Decorative ring */}
                    <div className={`absolute -inset-3 rounded-3xl bg-white/5 border border-white/10`} />
                    {/* Photo */}
                    <img
                      src={hero.heroPhoto}
                      alt={hero.name}
                      className="relative w-full rounded-2xl object-cover shadow-2xl"
                      style={{ maxHeight: '380px', objectPosition: 'top center' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Bottom badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
                      <span className="text-lg">{hero.emoji}</span>
                      <div>
                        <p className="text-white text-xs font-bold leading-tight">{hero.name}</p>
                        <p className={`text-xs ${hero.accentColor} leading-tight`}>{hero.subheadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="WhatsApp Us"
        />
      )}
    </>
  );
}
