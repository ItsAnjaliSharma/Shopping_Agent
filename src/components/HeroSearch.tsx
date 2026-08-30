import React, { useState } from 'react';
import { Search, Loader2, Sparkles, ArrowRight, Tag, X } from 'lucide-react';
import { TRENDING_PRODUCTS, CATEGORIES } from '../utils/retailerData';

interface HeroSearchProps {
  onSearch: (query: string, condition?: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [condition, setCondition] = useState<'all' | 'New' | 'Refurbished'>('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), condition);
    }
  };

  const handleQuickSearch = (productQuery: string) => {
    setQuery(productQuery);
    onSearch(productQuery, condition);
  };

  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] py-10 sm:py-12 border-b border-zinc-800">
      {/* Background Subtle Tech Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-mono text-zinc-400 shadow-xs mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider">Multi-Store Live Telemetry Active</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white max-w-3xl mx-auto">
          Compare Verified Store Prices in <span className="font-semibold text-emerald-400">Real-Time</span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Grounded scanning across Amazon, Walmart, Best Buy, Target, B&H Photo, and eBay. Evaluates live stock, active coupons, and total shipping.
        </p>

        {/* Search Bar Container */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex flex-col sm:flex-row items-stretch rounded-xl bg-[#0F0F0F] p-1.5 shadow-2xl border border-zinc-800 focus-within:border-emerald-500/50 transition-all">
            <div className="relative flex flex-1 items-center px-3">
              <Search className="h-4 w-4 text-zinc-500 mr-3 shrink-0" />
              <input
                id="main-product-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product, model, or SKU (e.g., Sony WH-1000XM5, MacBook Air M3)..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none py-2 font-normal"
                disabled={isLoading}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Condition Filter in Search bar */}
            <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-zinc-800 px-2 py-1.5 sm:py-0">
              <select
                id="search-condition-selector"
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="bg-zinc-900 text-xs font-medium text-zinc-300 rounded-lg px-2.5 py-2 border border-zinc-800 outline-none cursor-pointer hover:bg-zinc-800 transition-colors"
                disabled={isLoading}
              >
                <option value="all">All Conditions</option>
                <option value="New">Brand New Only</option>
                <option value="Refurbished">Refurbished / Open Box</option>
              </select>

              {/* Submit Button */}
              <button
                id="search-submit-btn"
                type="submit"
                disabled={isLoading || !query.trim()}
                className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold px-5 py-2 text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Run Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Live Retailer Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">Indexed Retailers:</span>
          {[
            { name: 'Amazon', dot: 'bg-amber-400' },
            { name: 'Walmart', dot: 'bg-blue-400' },
            { name: 'Best Buy', dot: 'bg-yellow-400' },
            { name: 'Target', dot: 'bg-red-400' },
            { name: 'B&H Photo', dot: 'bg-emerald-400' },
            { name: 'eBay', dot: 'bg-indigo-400' },
            { name: 'Newegg', dot: 'bg-orange-400' },
            { name: 'Costco', dot: 'bg-rose-400' },
          ].map((ret) => (
            <span
              key={ret.name}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0F0F0F] border border-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${ret.dot}`} />
              {ret.name}
            </span>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="mt-5 flex items-center justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.sample) {
                  setQuery(cat.sample);
                  onSearch(cat.sample, condition);
                }
              }}
              className={`rounded-lg px-3 py-1 text-xs transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-zinc-100 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Trending Popular Searches */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag className="h-3 w-3 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              Active Scans & Trending Drops
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-left">
            {TRENDING_PRODUCTS.map((prod) => (
              <button
                key={prod.query}
                id={`trending-${prod.query.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleQuickSearch(prod.query)}
                className="group flex flex-col justify-between rounded-lg bg-[#0F0F0F] border border-zinc-800 p-2.5 text-left hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer"
              >
                <div>
                  <span className="inline-block rounded bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 text-[9px] font-mono text-emerald-400">
                    {prod.savings}
                  </span>
                  <p className="mt-1 text-xs font-medium text-zinc-300 line-clamp-2 group-hover:text-white transition-colors">
                    {prod.query}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span className="font-semibold text-zinc-300">{prod.typicalPrice}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-emerald-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
