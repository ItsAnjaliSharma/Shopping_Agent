import React, { useState, useMemo } from 'react';
import {
  PriceComparisonResult,
  RetailerListing,
  SortOption,
  FilterCondition,
  WatchlistItem,
} from '../types';
import { RetailerCard } from './RetailerCard';
import { DealInsights } from './DealInsights';
import { formatCurrency, RETAILER_META } from '../utils/retailerData';
import {
  Sparkles,
  TrendingDown,
  Bell,
  ArrowRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  CheckCircle2,
  ExternalLink,
  Check,
} from 'lucide-react';

interface ComparisonViewProps {
  result: PriceComparisonResult;
  onAddToWatchlist: (item: Omit<WatchlistItem, 'id' | 'dateAdded' | 'alertTriggered'>) => void;
  isItemInWatchlist: boolean;
  cartItems: RetailerListing[];
  onToggleCartItem: (listing: RetailerListing) => void;
  onSelectAlternative: (altQuery: string) => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  result,
  onAddToWatchlist,
  isItemInWatchlist,
  cartItems,
  onToggleCartItem,
  onSelectAlternative,
  onOpenChatWithQuery,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('price_asc');
  const [conditionFilter, setConditionFilter] = useState<FilterCondition>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showWatchlistInput, setShowWatchlistInput] = useState(false);
  const [targetPriceInput, setTargetPriceInput] = useState(
    (result.lowestPrice * 0.9).toFixed(2)
  );
  const [activeTab, setActiveTab] = useState<'deals' | 'insights'>('deals');

  // Winning listing
  const winningListing = result.listings[0] || null;
  const inStockCount = result.listings.filter((l) => l.inStock).length;
  const totalCount = result.listings.length;

  // Filter & Sort listings
  const filteredListings = useMemo(() => {
    return result.listings
      .filter((listing) => {
        if (conditionFilter !== 'all' && listing.condition !== conditionFilter) return false;
        if (inStockOnly && !listing.inStock) return false;
        if (freeShippingOnly && listing.shippingCost > 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price_asc') return a.effectivePrice - b.effectivePrice;
        if (sortOption === 'discount_desc') {
          const discA = a.originalPrice ? (a.originalPrice - a.effectivePrice) : 0;
          const discB = b.originalPrice ? (b.originalPrice - b.effectivePrice) : 0;
          return discB - discA;
        }
        if (sortOption === 'rating_desc') return b.rating - a.rating;
        if (sortOption === 'shipping_fastest') {
          return (a.shippingCost) - (b.shippingCost);
        }
        return 0;
      });
  }, [result.listings, sortOption, conditionFilter, inStockOnly, freeShippingOnly]);

  const handleSaveWatchlist = () => {
    const target = parseFloat(targetPriceInput) || result.lowestPrice;
    onAddToWatchlist({
      productName: result.matchedProductName,
      targetPrice: target,
      currentBestPrice: result.lowestPrice,
      currentBestRetailer: result.recommendedRetailer,
      initialPrice: result.lowestPrice,
      imageUrl: result.imageUrl,
      notes: `Target alert when price drops below ${formatCurrency(target)}`,
    });
    setShowWatchlistInput(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Product Title & Top Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-300 uppercase tracking-wider">
              {result.brand}
            </span>
            <span className="text-zinc-500 font-mono text-xs">•</span>
            <span className="text-zinc-500 text-xs font-mono">
              Live scan of {totalCount} verified retailers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            {result.matchedProductName}
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {result.summary}
          </p>
        </div>

        {/* Best Current Price Badge */}
        <div className="text-left md:text-right shrink-0">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-0.5">
            Best Current Price ({result.recommendedRetailer})
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight flex items-baseline md:justify-end gap-2">
            <span>{formatCurrency(result.lowestPrice)}</span>
            {result.potentialSavings > 0 && (
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded">
                Save {formatCurrency(result.potentialSavings)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4-Column Metric Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Price Range */}
        <div className="bg-[#0F0F0F] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">
            Price Range
          </div>
          <div className="text-lg font-medium font-mono text-white my-2">
            {formatCurrency(result.lowestPrice)} — {formatCurrency(result.highestPrice)}
          </div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[25%]" />
          </div>
        </div>

        {/* Metric 2: Price Gap & Volatility */}
        <div className="bg-[#0F0F0F] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">
            Market Spread
          </div>
          <div className="text-lg font-medium font-mono text-white my-2">
            {formatCurrency(result.potentialSavings)} Max Gap
          </div>
          <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Avg: {formatCurrency(result.averagePrice)}</span>
          </div>
        </div>

        {/* Metric 3: Inventory Status */}
        <div className="bg-[#0F0F0F] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">
            Inventory Status
          </div>
          <div className="text-lg font-medium font-mono text-white my-2">
            {inStockCount}/{totalCount} In Stock
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            {inStockCount === totalCount ? 'High availability' : 'Stock variance across stores'}
          </div>
        </div>

        {/* Metric 4: AI Recommendation */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-wider">
            AI Verdict
          </div>
          <div className="text-lg font-bold text-emerald-400 uppercase tracking-tight my-2">
            {result.priceVerdict}
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <button
              type="button"
              onClick={() => setActiveTab('insights')}
              className="text-emerald-400/80 hover:text-emerald-300 underline underline-offset-2 cursor-pointer font-mono"
            >
              See Trend Analysis &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F0F0F] border border-zinc-800 p-3.5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 p-1 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={result.imageUrl}
              alt={result.matchedProductName}
              className="h-full w-full object-contain"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">
              Instant Action: Buy at {result.recommendedRetailer}
            </div>
            <div className="text-[11px] text-zinc-400">
              {result.recommendationReason}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Price Alert / Watchlist */}
          {isItemInWatchlist ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 px-3 py-1.5 text-xs font-mono text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              <span>Tracking</span>
            </div>
          ) : showWatchlistInput ? (
            <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-700">
              <span className="text-xs text-zinc-400 pl-1 font-mono">$</span>
              <input
                type="number"
                value={targetPriceInput}
                onChange={(e) => setTargetPriceInput(e.target.value)}
                className="w-16 bg-transparent text-xs text-white outline-none font-mono"
                placeholder="Target"
              />
              <button
                type="button"
                onClick={handleSaveWatchlist}
                className="rounded bg-emerald-500 hover:bg-emerald-400 text-black px-2 py-0.5 text-xs font-semibold cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowWatchlistInput(true)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="h-3.5 w-3.5 text-amber-400" />
              <span>Set Alert</span>
            </button>
          )}

          {/* Direct Checkout Link */}
          {winningListing && (
            <a
              href={winningListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold px-4 py-1.5 text-xs transition-all cursor-pointer shadow-xs"
            >
              <span>Visit {winningListing.retailer}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      {/* Navigation Tabs (Live Retailer Matrix vs AI Insights) */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('deals')}
            className={`pb-2.5 transition-all cursor-pointer font-medium text-xs sm:text-sm flex items-center gap-2 ${
              activeTab === 'deals'
                ? 'text-white border-b-2 border-white font-semibold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Live Comparison Matrix</span>
            <span className="rounded bg-zinc-800 px-1.5 py-0.2 text-[10px] font-mono text-zinc-400">
              {filteredListings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('insights')}
            className={`pb-2.5 transition-all cursor-pointer font-medium text-xs sm:text-sm flex items-center gap-1.5 ${
              activeTab === 'insights'
                ? 'text-white border-b-2 border-white font-semibold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Price Intelligence & Substitutes</span>
          </button>
        </div>

        {/* View Mode Toggle (Grid vs Table) */}
        {activeTab === 'deals' && (
          <div className="hidden sm:flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Table View"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'deals' ? (
        <div className="space-y-4">
          {/* Filter & Sort Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#0F0F0F] p-3 border border-zinc-800">
            {/* Condition Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 mr-1 hidden sm:inline uppercase">
                Filter:
              </span>
              {(['all', 'New', 'Refurbished'] as FilterCondition[]).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`rounded-lg px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                    conditionFilter === cond
                      ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                      : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {cond === 'all' ? 'All Conditions' : cond}
                </button>
              ))}

              {/* In Stock Toggle */}
              <button
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                  inStockOnly
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <CheckCircle2 className={`h-3 w-3 ${inStockOnly ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>In Stock Only</span>
              </button>

              {/* Free Shipping Toggle */}
              <button
                type="button"
                onClick={() => setFreeShippingOnly(!freeShippingOnly)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                  freeShippingOnly
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>Free Shipping</span>
              </button>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-300 outline-none cursor-pointer hover:bg-zinc-800"
              >
                <option value="price_asc">Lowest Total Price</option>
                <option value="discount_desc">Biggest Discount %</option>
                <option value="rating_desc">Highest Seller Rating</option>
                <option value="shipping_fastest">Fastest / Free Shipping</option>
              </select>
            </div>
          </div>

          {/* Listings Rendering */}
          {filteredListings.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-12 text-center">
              <SlidersHorizontal className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
              <h3 className="text-sm font-semibold text-white">
                No stores match your active filters
              </h3>
              <p className="text-xs text-zinc-500 mt-1 mb-4">
                Try toggling off 'In Stock Only' or switching condition to 'All'.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConditionFilter('all');
                  setInStockOnly(false);
                  setFreeShippingOnly(false);
                }}
                className="rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((listing, index) => (
                <RetailerCard
                  key={listing.id}
                  listing={listing}
                  isWinningDeal={index === 0 && sortOption === 'price_asc'}
                  isInCart={cartItems.some((c) => c.id === listing.id)}
                  onToggleCart={() => onToggleCartItem(listing)}
                />
              ))}
            </div>
          ) : (
            /* Table Matrix View */
            <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    <tr>
                      <th className="p-3">Retailer</th>
                      <th className="p-3">Condition</th>
                      <th className="p-3">Base Price</th>
                      <th className="p-3">Shipping</th>
                      <th className="p-3">Coupons & Perks</th>
                      <th className="p-3 font-bold text-white">Effective Total</th>
                      <th className="p-3">Return Window</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-normal">
                    {filteredListings.map((listing, index) => {
                      const isWinner = index === 0 && sortOption === 'price_asc';
                      return (
                        <tr
                          key={listing.id}
                          className={`hover:bg-zinc-800/30 transition-colors ${
                            isWinner ? 'bg-emerald-950/15' : ''
                          }`}
                        >
                          <td className="p-3 font-medium text-white flex items-center gap-2">
                            <span className="rounded bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-200">
                              {listing.retailer}
                            </span>
                            {isWinner && (
                              <span className="rounded bg-emerald-500 text-black px-1.5 py-0.2 text-[9px] font-bold uppercase font-mono">
                                CHEAPEST
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="rounded px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
                              {listing.condition}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-zinc-400">
                            {formatCurrency(listing.price)}
                          </td>
                          <td className="p-3 font-mono">
                            <span className={listing.shippingCost === 0 ? 'text-emerald-400 font-medium' : 'text-zinc-400'}>
                              {listing.shippingCost === 0 ? 'Free Express' : formatCurrency(listing.shippingCost)}
                            </span>
                          </td>
                          <td className="p-3">
                            {listing.couponCode ? (
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-300">
                                {listing.couponCode} (-{formatCurrency(listing.couponDiscount || 0)})
                              </span>
                            ) : listing.dealTag ? (
                              <span className="text-[11px] text-zinc-400">{listing.dealTag}</span>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                          </td>
                          <td className="p-3 font-bold font-mono text-white text-sm">
                            {formatCurrency(listing.effectivePrice)}
                          </td>
                          <td className="p-3 text-zinc-500 text-[11px]">
                            {listing.returnPolicy}
                          </td>
                          <td className="p-3 text-right">
                            <a
                              href={listing.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white px-2.5 py-1 text-xs transition-colors"
                            >
                              <span>Store</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* AI Insights & Substitutes Tab */
        <DealInsights
          result={result}
          onSelectAlternative={onSelectAlternative}
        />
      )}
    </div>
  );
};
