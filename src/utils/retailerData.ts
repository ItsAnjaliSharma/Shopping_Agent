export interface RetailerMeta {
  name: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  tagline: string;
  standardReturnDays: number;
  hasPriceMatch: boolean;
  membershipProgram?: string;
  trustScore: number;
}

export const RETAILER_META: Record<string, RetailerMeta> = {
  amazon: {
    name: 'Amazon',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-500/30',
    accentColor: '#FF9900',
    tagline: 'Fast Prime Shipping & Verified Reviews',
    standardReturnDays: 30,
    hasPriceMatch: false,
    membershipProgram: 'Amazon Prime',
    trustScore: 4.8,
  },
  walmart: {
    name: 'Walmart',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeText: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-500/30',
    accentColor: '#0071DC',
    tagline: 'Everyday Low Prices & Rollbacks',
    standardReturnDays: 90,
    hasPriceMatch: true,
    membershipProgram: 'Walmart+',
    trustScore: 4.6,
  },
  bestbuy: {
    name: 'Best Buy',
    badgeBg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
    badgeText: 'text-yellow-800 dark:text-yellow-200',
    borderColor: 'border-yellow-500/30',
    accentColor: '#FFE000',
    tagline: '1-Hour Store Pickup & Tech Support',
    standardReturnDays: 15,
    hasPriceMatch: true,
    membershipProgram: 'My Best Buy Plus',
    trustScore: 4.7,
  },
  target: {
    name: 'Target',
    badgeBg: 'bg-red-500/10 dark:bg-red-500/20',
    badgeText: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-500/30',
    accentColor: '#CC0000',
    tagline: 'Drive Up Pickup & 5% Circle Savings',
    standardReturnDays: 90,
    hasPriceMatch: true,
    membershipProgram: 'Target Circle 360',
    trustScore: 4.7,
  },
  bh: {
    name: 'B&H Photo Video',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-500/30',
    accentColor: '#00875A',
    tagline: 'Authorized Pro Dealer & Payboo Tax Save',
    standardReturnDays: 30,
    hasPriceMatch: true,
    membershipProgram: 'Payboo Card',
    trustScore: 4.9,
  },
  ebay: {
    name: 'eBay',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-500/30',
    accentColor: '#E53238',
    tagline: 'eBay Refurbished & Buyer Protection',
    standardReturnDays: 30,
    hasPriceMatch: false,
    membershipProgram: 'eBay Money Back Guarantee',
    trustScore: 4.5,
  },
  newegg: {
    name: 'Newegg',
    badgeBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    badgeText: 'text-orange-700 dark:text-orange-300',
    borderColor: 'border-orange-500/30',
    accentColor: '#F7A800',
    tagline: 'PC Components & Tech Deals',
    standardReturnDays: 30,
    hasPriceMatch: true,
    trustScore: 4.6,
  },
  costco: {
    name: 'Costco',
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderColor: 'border-rose-500/30',
    accentColor: '#E31837',
    tagline: 'Wholesale Bundles & 2-Yr Warranty',
    standardReturnDays: 90,
    hasPriceMatch: false,
    membershipProgram: 'Costco Gold Star / Exec',
    trustScore: 4.9,
  },
  other: {
    name: 'Verified Retailer',
    badgeBg: 'bg-slate-500/10 dark:bg-slate-500/20',
    badgeText: 'text-slate-700 dark:text-slate-300',
    borderColor: 'border-slate-500/30',
    accentColor: '#64748B',
    tagline: 'Online Direct Store',
    standardReturnDays: 30,
    hasPriceMatch: false,
    trustScore: 4.5,
  },
};

export const TRENDING_PRODUCTS = [
  {
    query: 'Apple AirPods Pro 2 USB-C',
    category: 'Audio',
    typicalPrice: '$189.99',
    savings: 'Save up to $60',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&auto=format&fit=crop&q=80',
  },
  {
    query: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    typicalPrice: '$328.00',
    savings: 'Save up to $72',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80',
  },
  {
    query: 'PlayStation 5 Slim Console Digital',
    category: 'Gaming',
    typicalPrice: '$399.99',
    savings: 'Save up to $50',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&auto=format&fit=crop&q=80',
  },
  {
    query: 'Apple MacBook Air 13-inch M3 16GB',
    category: 'Laptops',
    typicalPrice: '$999.00',
    savings: 'Save up to $150',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
  },
  {
    query: 'Ninja Foodi DualZone Air Fryer XL',
    category: 'Home & Kitchen',
    typicalPrice: '$139.99',
    savings: 'Save up to $60',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&auto=format&fit=crop&q=80',
  },
  {
    query: 'LG C3 65-Inch OLED 4K Smart TV',
    category: 'TVs',
    typicalPrice: '$1,396.99',
    savings: 'Save up to $300',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'Sparkles' },
  { id: 'audio', label: 'Headphones & Audio', icon: 'Headphones', sample: 'Sony WH-1000XM5' },
  { id: 'laptops', label: 'Laptops & Computers', icon: 'Laptop', sample: 'MacBook Air M3' },
  { id: 'gaming', label: 'Gaming & Consoles', icon: 'Gamepad2', sample: 'PS5 Slim' },
  { id: 'tvs', label: 'TVs & Displays', icon: 'Tv', sample: 'LG C3 65 OLED' },
  { id: 'phones', label: 'Smartphones & Wearables', icon: 'Smartphone', sample: 'iPhone 16 Pro' },
  { id: 'kitchen', label: 'Home & Kitchen', icon: 'Coffee', sample: 'Ninja Air Fryer' },
];

export function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}
