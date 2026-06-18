export type AnimationType =
  | 'fireworks' | 'hearts' | 'snowflakes' | 'confetti'
  | 'ribbons' | 'stars' | 'leaves' | 'crosses' | 'drops'
  | 'sparkles' | 'none';

export type CampaignCategory =
  | 'national-holiday' | 'religious' | 'health-day' | 'promotion' | 'community';

export interface CampaignData {
  name: string;
  date: { month: number; day: number };
  endDate?: { month: number; day: number };
  headline: string;
  subheadline: string;
  description: string;
  cta: string;
  badge: string;
  gradient: string;
  accentColor: string;
  bgImage: string;
  heroPhoto?: string;
  animation: AnimationType;
  iconName: string;
  emoji: string;
  category: CampaignCategory;
  deals?: { label: string; sub: string }[];
}

export const BG = 'https://iili.io/FOS1c42.jpg';

export function getCampaignImage(campaign: CampaignData): string {
  return campaign.heroPhoto ?? BG;
}

export const CAMPAIGNS: CampaignData[] = [
  // ── JANUARY ───────────────────────────────────────────────
  {
    name: 'New Year', date: { month: 1, day: 1 }, endDate: { month: 1, day: 7 },
    headline: 'New Year, Better Health', subheadline: 'Happy New Year 2026!',
    description: 'Begin the new year with a commitment to your wellbeing. Happy Pills Pharmacy supports your health resolutions with expert consultations and quality medications.',
    cta: 'Start Your Health Journey', badge: 'Happy New Year',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-yellow-300',
    bgImage: BG, animation: 'fireworks', iconName: 'globe', emoji: '🎉',
    category: 'national-holiday',
    deals: [{ label: 'FREE', sub: 'Consultation' }, { label: '20% OFF', sub: 'Supplements' }],
  },
  {
    name: 'World Leprosy Day', date: { month: 1, day: 29 }, endDate: { month: 2, day: 4 },
    headline: 'End Stigma, Restore Dignity', subheadline: 'World Leprosy Day',
    description: 'Early diagnosis can cure leprosy and change lives. Happy Pills Pharmacy supports awareness, treatment access, and stigma-free healthcare for all.',
    cta: 'Get Leprosy Support', badge: 'World Leprosy Day',
    gradient: 'from-amber-900 via-amber-800 to-orange-700', accentColor: 'text-amber-300',
    bgImage: BG, animation: 'sparkles', iconName: 'heart', emoji: '🤝',
    category: 'health-day',
  },

  // ── FEBRUARY ──────────────────────────────────────────────
  {
    name: 'World Cancer Day', date: { month: 2, day: 4 }, endDate: { month: 2, day: 10 },
    headline: 'Close the Care Gap', subheadline: 'World Cancer Day',
    description: 'Early detection saves lives. Get screened, stay healthy, and stay strong. We support cancer patients with medications, nutritional care, and guidance.',
    cta: 'Get Cancer Care Support', badge: 'World Cancer Day',
    gradient: 'from-purple-900 via-purple-800 to-fuchsia-700', accentColor: 'text-purple-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/6303671/pexels-photo-6303671.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'ribbons', iconName: 'ribbon', emoji: '🎗️',
    category: 'health-day',
  },

  // ── MARCH ─────────────────────────────────────────────────
  {
    name: "International Women's Day", date: { month: 3, day: 8 }, endDate: { month: 3, day: 14 },
    headline: 'Strong Women, Stronger World', subheadline: "International Women's Day",
    description: "Celebrating women's health, strength, and incredible journey. From maternal care to chronic disease support — we're here for every stage of a woman's health.",
    cta: "Support Women's Health", badge: "Women's Day",
    gradient: 'from-rose-900 via-rose-800 to-pink-700', accentColor: 'text-rose-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/4926661/pexels-photo-4926661.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'hearts', iconName: 'heart', emoji: '💜',
    category: 'community',
  },
  {
    name: 'World Kidney Day', date: { month: 3, day: 13 }, endDate: { month: 3, day: 19 },
    headline: 'Kidney Health for All', subheadline: 'World Kidney Day',
    description: 'Keep your kidneys healthy with simple daily habits. Our pharmacists provide kidney health products, supplements, and expert guidance for kidney disease management.',
    cta: 'Get Kidney Health Support', badge: 'World Kidney Day',
    gradient: 'from-blue-900 via-blue-800 to-sky-700', accentColor: 'text-sky-300',
    bgImage: BG, animation: 'drops', iconName: 'activity', emoji: '🫘',
    category: 'health-day',
  },
  {
    name: 'World TB Day', date: { month: 3, day: 24 }, endDate: { month: 3, day: 30 },
    headline: 'Yes! We Can End TB', subheadline: 'World TB Day',
    description: 'Get tested, get treated, and protect your loved ones. Tuberculosis is curable. We support TB patients with medications, DOTS adherence, and nutritional guidance.',
    cta: 'Get TB Support', badge: 'World TB Day',
    gradient: 'from-blue-900 via-blue-800 to-sky-700', accentColor: 'text-blue-300',
    bgImage: BG, animation: 'sparkles', iconName: 'shield', emoji: '🫁',
    category: 'health-day',
  },

  // ── APRIL ─────────────────────────────────────────────────
  {
    name: 'World Health Day', date: { month: 4, day: 7 }, endDate: { month: 4, day: 13 },
    headline: 'Healthy Today, Stronger Tomorrow', subheadline: 'World Health Day',
    description: 'Good health is the foundation of a better life. Access quality healthcare starts with a trusted pharmacy. Happy Pills Pharmacy — care for all Ugandans.',
    cta: 'Access Quality Healthcare', badge: 'World Health Day',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-rose-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'crosses', iconName: 'stethoscope', emoji: '🩺',
    category: 'health-day',
  },
  {
    name: 'World Malaria Day', date: { month: 4, day: 25 }, endDate: { month: 5, day: 1 },
    headline: 'End Malaria for a Healthier Uganda', subheadline: 'World Malaria Day',
    description: 'Sleep under a treated net every night. Get antimalarials, rapid test kits, and mosquito repellents. Our pharmacists provide prevention and treatment support.',
    cta: 'Get Malaria Protection', badge: 'World Malaria Day',
    gradient: 'from-amber-900 via-amber-800 to-yellow-700', accentColor: 'text-amber-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/32946369/pexels-photo-32946369.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'drops', iconName: 'shield', emoji: '🦟',
    category: 'health-day',
  },
  {
    name: 'World Immunization Week', date: { month: 4, day: 24 }, endDate: { month: 4, day: 30 },
    headline: 'Humanly Possible: Vaccines for All', subheadline: 'World Immunization Week',
    description: 'Protect your child against preventable diseases. Immunization saves millions of lives each year. Book your vaccination appointment at Happy Pills Pharmacy today.',
    cta: 'Book Immunisation', badge: 'Immunization Week',
    gradient: 'from-sky-900 via-sky-800 to-blue-700', accentColor: 'text-sky-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/5905920/pexels-photo-5905920.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'sparkles', iconName: 'syringe', emoji: '💉',
    category: 'health-day',
  },

  // ── MAY ───────────────────────────────────────────────────
  {
    name: 'International Nurses Day', date: { month: 5, day: 12 }, endDate: { month: 5, day: 14 },
    headline: 'Thank You, Nurses!', subheadline: 'International Nurses Day',
    description: "Celebrating the heroes who care for us every day. Nurses are the backbone of healthcare. Happy Pills Pharmacy salutes all nurses across Uganda.",
    cta: 'Contact Our Team', badge: 'Nurses Day',
    gradient: 'from-teal-900 via-teal-800 to-cyan-700', accentColor: 'text-teal-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/29941468/pexels-photo-29941468.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'hearts', iconName: 'heart', emoji: '👩‍⚕️',
    category: 'community',
  },
  {
    name: 'World Hypertension Day', date: { month: 5, day: 17 }, endDate: { month: 5, day: 23 },
    headline: 'Measure Your Blood Pressure Accurately', subheadline: 'World Hypertension Day',
    description: 'Control it, live longer. Know your numbers today. We provide BP monitors, antihypertensive medications, and expert lifestyle counselling.',
    cta: 'Check Your Blood Pressure', badge: 'World Hypertension Day',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-red-300',
    bgImage: BG, animation: 'sparkles', iconName: 'activity', emoji: '🩸',
    category: 'health-day',
  },
  {
    name: 'World No Tobacco Day', date: { month: 5, day: 31 }, endDate: { month: 6, day: 6 },
    headline: 'Choose Health, Not Tobacco', subheadline: 'World No Tobacco Day',
    description: 'Protect your lungs, your family, and your environment. We provide smoking cessation support, nicotine replacement therapy, and health counselling.',
    cta: 'Quit Smoking Today', badge: 'No Tobacco Day',
    gradient: 'from-slate-900 via-slate-800 to-gray-700', accentColor: 'text-green-300',
    bgImage: BG, animation: 'leaves', iconName: 'leaf', emoji: '🚭',
    category: 'health-day',
  },

  // ── JUNE ──────────────────────────────────────────────────
  {
    name: 'Uganda Martyrs Day', date: { month: 6, day: 3 }, endDate: { month: 6, day: 9 },
    headline: 'Honouring Our Heritage, Protecting Our Health', subheadline: 'Uganda Martyrs Day',
    description: 'As Uganda celebrates this national holiday, Happy Pills Pharmacy remains committed to accessible healthcare for all communities across Kampala and beyond.',
    cta: 'Access Healthcare Services', badge: 'Uganda Martyrs Day',
    gradient: 'from-primary-900 via-primary-800 to-orange-700', accentColor: 'text-red-300',
    bgImage: BG, animation: 'crosses', iconName: 'shield', emoji: '🇺🇬',
    category: 'national-holiday',
  },
  {
    name: 'World Environment Day', date: { month: 6, day: 5 }, endDate: { month: 6, day: 11 },
    headline: 'Our Land, Our Future', subheadline: 'World Environment Day',
    description: 'A cleaner environment means a healthier community. Happy Pills Pharmacy is committed to eco-friendly healthcare practices and community health.',
    cta: 'Learn More', badge: 'Environment Day',
    gradient: 'from-green-900 via-green-800 to-emerald-700', accentColor: 'text-green-300',
    bgImage: BG, animation: 'leaves', iconName: 'leaf', emoji: '🌍',
    category: 'health-day',
  },
  {
    name: 'World Blood Donor Day', date: { month: 6, day: 14 }, endDate: { month: 6, day: 20 },
    headline: 'Give Blood, Give Life', subheadline: 'World Blood Donor Day',
    description: "Your blood can save someone's tomorrow. We support blood donors with iron supplements, hydration guidance, and post-donation care.",
    cta: 'Support Blood Donation', badge: 'World Blood Donor Day',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-red-300',
    bgImage: BG, animation: 'drops', iconName: 'droplets', emoji: '🩸',
    category: 'health-day',
  },
  {
    name: "Father's Day", date: { month: 6, day: 15 }, endDate: { month: 6, day: 22 },
    headline: 'Strong Fathers, Healthy Families', subheadline: "Father's Day",
    description: "Celebrate the men who lead with love and care. Gift your father the gift of health — from supplements to health devices, we have the perfect health gift.",
    cta: 'Shop for Dad', badge: "Father's Day",
    gradient: 'from-blue-900 via-blue-800 to-sky-700', accentColor: 'text-blue-300',
    bgImage: BG, animation: 'confetti', iconName: 'users', emoji: '👨‍👧‍👦',
    category: 'community',
  },

  // ── JULY ──────────────────────────────────────────────────
  {
    name: 'World Population Day', date: { month: 7, day: 11 }, endDate: { month: 7, day: 17 },
    headline: 'Planning Today for a Better Tomorrow', subheadline: 'World Population Day',
    description: 'Empowering families for sustainable growth. Family planning and maternal health are at the heart of community wellbeing.',
    cta: 'Family Health Support', badge: 'World Population Day',
    gradient: 'from-sky-900 via-sky-800 to-blue-700', accentColor: 'text-sky-300',
    bgImage: BG, animation: 'confetti', iconName: 'users', emoji: '👨‍👩‍👧‍👦',
    category: 'health-day',
  },
  {
    name: 'World Hepatitis Day', date: { month: 7, day: 28 }, endDate: { month: 8, day: 3 },
    headline: "It's Time for Action", subheadline: 'World Hepatitis Day',
    description: 'Protect your liver. Get screened and vaccinated today. We offer hepatitis screening referrals, liver health supplements, and medication support.',
    cta: 'Get Hepatitis Support', badge: 'World Hepatitis Day',
    gradient: 'from-amber-900 via-yellow-800 to-amber-700', accentColor: 'text-amber-300',
    bgImage: BG, animation: 'sparkles', iconName: 'activity', emoji: '🫀',
    category: 'health-day',
  },

  // ── AUGUST ────────────────────────────────────────────────
  {
    name: 'World Breastfeeding Week', date: { month: 8, day: 1 }, endDate: { month: 8, day: 7 },
    headline: 'Support Breastfeeding', subheadline: 'World Breastfeeding Week',
    description: 'Nourish. Protect. Bond. Breast milk is best. We support breastfeeding mothers with lactation supplements, nursing supplies, and expert guidance.',
    cta: "Support Mother's Health", badge: 'Breastfeeding Week',
    gradient: 'from-pink-900 via-pink-800 to-rose-700', accentColor: 'text-pink-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/5699452/pexels-photo-5699452.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'hearts', iconName: 'baby', emoji: '🤱',
    category: 'health-day',
  },

  // ── SEPTEMBER ─────────────────────────────────────────────
  {
    name: 'Pharmacy Anniversary', date: { month: 9, day: 1 }, endDate: { month: 9, day: 7 },
    headline: 'Celebrating Years of Trusted Healthcare', subheadline: 'Happy Pills Pharmacy Anniversary',
    description: 'Thank you Uganda! We celebrate our pharmacy anniversary with special offers, free consultations, and exclusive discounts for our loyal customers.',
    cta: 'Celebrate With Us', badge: 'Anniversary Celebrations',
    gradient: 'from-amber-950 via-amber-900 to-yellow-700', accentColor: 'text-yellow-300',
    bgImage: BG, animation: 'fireworks', iconName: 'heart', emoji: '🎂',
    category: 'promotion',
    deals: [{ label: 'ANNIVERSARY', sub: 'Special Deals' }, { label: 'FREE', sub: 'Consultation' }],
  },
  {
    name: 'World Pharmacist Day', date: { month: 9, day: 25 }, endDate: { month: 9, day: 28 },
    headline: 'Pharmacists: Your Partners in Health', subheadline: '25 September · World Pharmacist Day',
    description: 'We recognise and celebrate the dedication, expertise and compassion of pharmacists who strengthen health systems and improve lives every day across Uganda.',
    cta: 'Thank a Pharmacist', badge: 'World Pharmacist Day',
    gradient: 'from-slate-900 via-blue-950 to-teal-900', accentColor: 'text-teal-300',
    bgImage: BG,
    heroPhoto: 'https://iili.io/FOS1c42.jpg?auto=compress&cs=tinysrgb&w=800',
    animation: 'sparkles', iconName: 'stethoscope', emoji: '👨‍⚕️',
    category: 'health-day',
  },
  {
    name: 'World Patient Safety Day', date: { month: 9, day: 17 }, endDate: { month: 9, day: 23 },
    headline: 'Elevate the Voice of Patients', subheadline: 'World Patient Safety Day',
    description: 'Safe care starts with open communication. Your safety is our highest priority. We deliver quality, verified medications and professional pharmaceutical care.',
    cta: 'Talk to Our Team', badge: 'Patient Safety Day',
    gradient: 'from-blue-900 via-blue-800 to-indigo-700', accentColor: 'text-blue-300',
    bgImage: BG, animation: 'sparkles', iconName: 'shield', emoji: '🛡️',
    category: 'health-day',
  },
  {
    name: 'World Heart Day', date: { month: 9, day: 29 }, endDate: { month: 10, day: 5 },
    headline: 'Love Your Heart', subheadline: 'World Heart Day',
    description: 'Small steps today for a stronger heartbeat tomorrow. We provide cardiac medications, cholesterol monitors, omega-3 supplements, and expert heart health counselling.',
    cta: 'Protect Your Heart', badge: 'World Heart Day',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-red-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/8352120/pexels-photo-8352120.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'hearts', iconName: 'heart', emoji: '❤️',
    category: 'health-day',
  },

  // ── OCTOBER ───────────────────────────────────────────────
  {
    name: 'Uganda Independence Day', date: { month: 10, day: 9 }, endDate: { month: 10, day: 15 },
    headline: 'Independent Uganda, Healthy Ugandans', subheadline: 'Uganda Independence Day',
    description: "Celebrating Uganda's independence with a commitment to accessible healthcare. Happy Pills Pharmacy serves communities across Uganda.",
    cta: 'Celebrate with Health', badge: 'Independence Day',
    gradient: 'from-neutral-900 via-neutral-800 to-amber-700', accentColor: 'text-amber-300',
    bgImage: BG, animation: 'fireworks', iconName: 'globe', emoji: '🇺🇬',
    category: 'national-holiday',
  },
  {
    name: 'World Mental Health Day', date: { month: 10, day: 10 }, endDate: { month: 10, day: 16 },
    headline: 'Mental Health is a Universal Right', subheadline: 'World Mental Health Day',
    description: 'It is okay to seek help. You are not alone. We provide mental health medications, stress-relief supplements, and confidential pharmacist consultations.',
    cta: 'Get Mental Health Support', badge: 'World Mental Health Day',
    gradient: 'from-teal-900 via-teal-800 to-cyan-700', accentColor: 'text-teal-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/7005332/pexels-photo-7005332.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'hearts', iconName: 'heart', emoji: '🧠',
    category: 'health-day',
  },
  {
    name: 'Breast Cancer Awareness Month', date: { month: 10, day: 1 }, endDate: { month: 10, day: 31 },
    headline: 'Early Detection Saves Lives', subheadline: 'Breast Cancer Awareness Month',
    description: 'Check. Protect. Live. Early detection is the most powerful tool against breast cancer. Speak to our pharmacists about screening and supportive care.',
    cta: 'Get Screened', badge: 'Breast Cancer Awareness',
    gradient: 'from-pink-900 via-pink-800 to-rose-700', accentColor: 'text-pink-300',
    bgImage: BG, animation: 'ribbons', iconName: 'ribbon', emoji: '🎀',
    category: 'health-day',
  },
  {
    name: 'World Stroke Day', date: { month: 10, day: 29 }, endDate: { month: 11, day: 4 },
    headline: 'Be Greater Than Stroke', subheadline: 'World Stroke Day',
    description: 'Learn the warning signs and stay active. Know FAST: Face, Arms, Speech, Time. We provide stroke prevention medications and post-stroke care support.',
    cta: 'Learn About Stroke', badge: 'World Stroke Day',
    gradient: 'from-primary-950 via-primary-900 to-orange-700', accentColor: 'text-orange-300',
    bgImage: BG, animation: 'sparkles', iconName: 'activity', emoji: '⚡',
    category: 'health-day',
  },
  {
    name: 'World Polio Day', date: { month: 10, day: 24 }, endDate: { month: 10, day: 30 },
    headline: 'End Polio Now', subheadline: 'World Polio Day',
    description: 'Two drops of vaccine protect a lifetime of dreams. Polio vaccination is safe, effective, and free. Ask us about vaccination schedules for your children.',
    cta: 'Book Vaccination', badge: 'World Polio Day',
    gradient: 'from-blue-950 via-blue-900 to-sky-700', accentColor: 'text-sky-300',
    bgImage: BG, animation: 'sparkles', iconName: 'syringe', emoji: '💉',
    category: 'health-day',
  },

  // ── NOVEMBER ──────────────────────────────────────────────
  {
    name: 'World Pneumonia Day', date: { month: 11, day: 12 }, endDate: { month: 11, day: 18 },
    headline: 'Health for All: Time for Action', subheadline: 'World Pneumonia Day',
    description: 'Everyone deserves access to quality care without financial hardship. We provide affordable antibiotics, respiratory care, and immune support for all families.',
    cta: 'Get Respiratory Care', badge: 'World Pneumonia Day',
    gradient: 'from-slate-900 via-slate-800 to-gray-700', accentColor: 'text-slate-300',
    bgImage: BG, animation: 'sparkles', iconName: 'activity', emoji: '🫁',
    category: 'health-day',
  },
  {
    name: 'World Diabetes Day', date: { month: 11, day: 14 }, endDate: { month: 11, day: 20 },
    headline: 'Know Your Numbers', subheadline: 'World Diabetes Day',
    description: 'Take control today for a healthier tomorrow. We provide glucose monitors, insulin supplies, dietary supplements, and expert diabetes management consultations.',
    cta: 'Manage Diabetes Better', badge: 'World Diabetes Day',
    gradient: 'from-blue-900 via-sky-800 to-cyan-700', accentColor: 'text-sky-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/6941879/pexels-photo-6941879.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'sparkles', iconName: 'activity', emoji: '🩺',
    category: 'health-day',
  },
  {
    name: 'Black November', date: { month: 11, day: 1 }, endDate: { month: 11, day: 30 },
    headline: 'Biggest Health Deals of the Year', subheadline: 'Black November Sale',
    description: 'Happy Pills Pharmacy Black November is here! Enjoy massive discounts on medicines, wellness products, and health supplements all November long.',
    cta: 'Shop November Deals', badge: 'Black November',
    gradient: 'from-neutral-950 via-neutral-900 to-neutral-800', accentColor: 'text-yellow-400',
    bgImage: BG, animation: 'confetti', iconName: 'pill', emoji: '🛍️',
    category: 'promotion',
    deals: [
      { label: 'Up to 30% OFF', sub: 'Medicines' },
      { label: 'Up to 25% OFF', sub: 'Wellness' },
      { label: 'Up to 20% OFF', sub: 'Supplements' },
      { label: 'FREE', sub: 'Consultation' },
    ],
  },

  // ── DECEMBER ──────────────────────────────────────────────
  {
    name: 'World AIDS Day', date: { month: 12, day: 1 }, endDate: { month: 12, day: 14 },
    headline: 'End the Stigma, Not the Fight', subheadline: 'World AIDS Day',
    description: 'Test. Treat. Support. Together, we can end AIDS. We provide antiretroviral support, immune-boosting supplements, and confidential consultations.',
    cta: 'Get HIV/AIDS Support', badge: 'World AIDS Day',
    gradient: 'from-primary-950 via-primary-900 to-primary-700', accentColor: 'text-red-300',
    bgImage: BG,
    heroPhoto: 'https://images.pexels.com/photos/8679680/pexels-photo-8679680.jpeg?auto=compress&cs=tinysrgb&w=800',
    animation: 'ribbons', iconName: 'ribbon', emoji: '🎗️',
    category: 'health-day',
  },
  {
    name: 'Universal Health Coverage Day', date: { month: 12, day: 12 }, endDate: { month: 12, day: 18 },
    headline: 'Health for All — No One Left Behind', subheadline: 'Universal Health Coverage Day',
    description: 'Everyone deserves access to quality healthcare. Happy Pills Pharmacy is committed to affordable, accessible pharmaceutical care for all Ugandans.',
    cta: 'Access Healthcare', badge: 'UHC Day',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-primary-300',
    bgImage: BG, animation: 'sparkles', iconName: 'globe', emoji: '🌐',
    category: 'health-day',
  },
  {
    name: 'Christmas', date: { month: 12, day: 25 }, endDate: { month: 12, day: 31 },
    headline: 'Merry Christmas & Good Health!', subheadline: 'Merry Christmas',
    description: 'Wishing you joy, love, and good health this Christmas and always. Happy Pills Pharmacy keeps your family healthy through the festive season.',
    cta: 'Shop Health Gifts', badge: 'Merry Christmas',
    gradient: 'from-green-900 via-green-800 to-emerald-700', accentColor: 'text-green-300',
    bgImage: BG, animation: 'snowflakes', iconName: 'heart', emoji: '🎄',
    category: 'national-holiday',
    deals: [{ label: 'Gift Health', sub: 'This Christmas' }, { label: 'FREE', sub: 'Wrapping' }],
  },
  {
    name: 'Boxing Day', date: { month: 12, day: 26 }, endDate: { month: 12, day: 31 },
    headline: 'Boxing Day Health Sales', subheadline: 'Boxing Day',
    description: 'Continue the festive savings with our Boxing Day health deals. Stock up on medicines, vitamins, and wellness products for the new year.',
    cta: 'Shop Boxing Day Deals', badge: 'Boxing Day Sale',
    gradient: 'from-primary-900 via-primary-800 to-rose-700', accentColor: 'text-red-300',
    bgImage: BG, animation: 'confetti', iconName: 'pill', emoji: '🎁',
    category: 'national-holiday',
    deals: [{ label: 'SALE', sub: 'Boxing Day' }, { label: '15% OFF', sub: 'Medicines' }],
  },

  // ── RELIGIOUS ─────────────────────────────────────────────
  {
    name: 'Good Friday', date: { month: 4, day: 18 }, endDate: { month: 4, day: 21 },
    headline: 'Good Friday Blessings', subheadline: 'Good Friday',
    description: 'Wishing the Christian community in Uganda a blessed Good Friday. Happy Pills Pharmacy is open to serve your healthcare needs.',
    cta: 'Contact Us', badge: 'Good Friday',
    gradient: 'from-purple-950 via-purple-900 to-indigo-800', accentColor: 'text-purple-300',
    bgImage: BG, animation: 'crosses', iconName: 'heart', emoji: '✝️',
    category: 'religious',
  },
  {
    name: 'Easter', date: { month: 4, day: 20 }, endDate: { month: 4, day: 21 },
    headline: 'Happy Easter — Health & Joy to Your Family', subheadline: 'Happy Easter',
    description: 'Wishing you a joyful Easter filled with good health and happiness. We are here for all your healthcare needs during the Easter celebrations.',
    cta: 'Shop Now', badge: 'Happy Easter',
    gradient: 'from-amber-900 via-yellow-800 to-lime-700', accentColor: 'text-yellow-300',
    bgImage: BG, animation: 'confetti', iconName: 'heart', emoji: '🐣',
    category: 'religious',
  },
  {
    name: 'Ramadan / Eid', date: { month: 3, day: 1 }, endDate: { month: 4, day: 25 },
    headline: 'Ramadan Mubarak', subheadline: 'Blessed Ramadan',
    description: 'Wishing you a blessed Ramadan filled with peace, health, and happiness. We are here to support your health and wellness throughout the holy month.',
    cta: 'Shop Essentials', badge: 'Ramadan Mubarak',
    gradient: 'from-slate-900 via-indigo-900 to-indigo-800', accentColor: 'text-yellow-300',
    bgImage: BG, animation: 'stars', iconName: 'globe', emoji: '🌙',
    category: 'religious',
  },
];

// ── Helper functions ─────────────────────────────────────────────────────────

export function getHolidayPeriod(c: CampaignData, year: number): { start: Date; end: Date } {
  const start = new Date(year, c.date.month - 1, c.date.day);
  const end = c.endDate
    ? new Date(year, c.endDate.month - 1, c.endDate.day)
    : new Date(year, c.date.month - 1, c.date.day + 7);
  return { start, end };
}

export function getCurrentCampaign(): CampaignData | null {
  const now = new Date();
  const year = now.getFullYear();
  for (const c of CAMPAIGNS) {
    const { start, end } = getHolidayPeriod(c, year);
    if (now >= start && now <= end) return c;
  }
  return null;
}

export function getUpcomingCampaign(): CampaignData | null {
  const now = new Date();
  const year = now.getFullYear();
  let closest: CampaignData | null = null;
  let closestDiff = Infinity;
  for (const c of CAMPAIGNS) {
    const { start } = getHolidayPeriod(c, year);
    const diff = start.getTime() - now.getTime();
    if (diff > 0 && diff < closestDiff) { closestDiff = diff; closest = c; }
  }
  return closest;
}

/** Returns all campaigns sorted by date (current year), with a status field */
export type CampaignStatus = 'active' | 'upcoming' | 'past';

export interface CampaignWithStatus extends CampaignData {
  status: CampaignStatus;
  startDate: Date;
  endDate2: Date;
}

export function getCampaignsWithStatus(): CampaignWithStatus[] {
  const now = new Date();
  const year = now.getFullYear();

  return CAMPAIGNS.map((c): CampaignWithStatus => {
    const { start, end } = getHolidayPeriod(c, year);
    let status: CampaignStatus;
    if (now >= start && now <= end) status = 'active';
    else if (start > now) status = 'upcoming';
    else status = 'past';
    return { ...c, status, startDate: start, endDate2: end };
  }).sort((a, b) => {
    // Sort: active first, then upcoming by date, then past
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (b.status === 'active' && a.status !== 'active') return 1;
    if (a.status === 'upcoming' && b.status === 'past') return -1;
    if (b.status === 'upcoming' && a.status === 'past') return 1;
    return a.startDate.getTime() - b.startDate.getTime();
  });
}

export const CATEGORY_LABELS: Record<CampaignCategory, string> = {
  'national-holiday': 'National Holiday',
  'religious': 'Religious Holiday',
  'health-day': 'Health Awareness Day',
  'promotion': 'Pharmacy Promotion',
  'community': 'Community Day',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateRange(c: CampaignData): string {
  const start = `${MONTHS[c.date.month - 1]} ${c.date.day}`;
  if (!c.endDate) return start;
  const end = `${MONTHS[c.endDate.month - 1]} ${c.endDate.day}`;
  return `${start} – ${end}`;
}
