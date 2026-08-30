import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Truck, Tag, Star, RotateCcw, Plus, Minus } from 'lucide-react';
import { RetailerListing } from '../types';
import { RETAILER_META, formatCurrency } from '../utils/retailerData';

interface RetailerCardProps {
  listing: RetailerListing;
  isWinningDeal?: boolean;
  isInCart?: boolean;
  onToggleCart?: () => void;
}

export const RetailerCard: React.FC<RetailerCardProps> = ({
  listing,
  isWinningDeal = false,
  isInCart = false,
  onToggleCart,
}) => {
  const [copied, setCopied] = useState(false);
  const meta = RETAILER_META[listing.retailerLogoKey] || RETAILER_META.other;

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (listing.couponCode) {
      navigator.clipboard.writeText(listing.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const discountPercent =
    listing.originalPrice && listing.originalPrice > listing.price
      ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
      : null;

  return (
    <div
      id={`retailer-card-${listing.id}`}
      className={`relative flex flex-col justify-between rounded-xl bg-[#0F0F0F] border p-4 transition-all duration-200 ${
        isWinningDeal
          ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30'
          : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 shadow-xs'
      }`}
    >
      {/* Top Badges */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Retailer Identity */}
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-200">
              {listing.retailer}
            </span>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
              {listing.condition}
            </span>
          </div>

          {/* Winning Deal / Deal Tag */}
          {isWinningDeal ? (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500 text-black px-2 py-0.5 text-[10px] font-bold font-mono uppercase">
              <Tag className="h-2.5 w-2.5" />
              Best Price
            </span>
          ) : listing.dealTag ? (
            <span className="inline-flex items-center rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
              {listing.dealTag}
            </span>
          ) : null}
        </div>

        {/* Product Title at Retailer */}
        <h4 className="text-xs font-medium text-zinc-200 line-clamp-2 mb-3" title={listing.productTitle}>
          {listing.productTitle}
        </h4>

        {/* Pricing Block */}
        <div className="rounded-lg bg-zinc-950 border border-zinc-800/80 p-3 mb-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Total Calculated
            </span>
            {listing.originalPrice && listing.originalPrice > listing.effectivePrice && (
              <span className="text-xs font-mono text-zinc-500 line-through">
                {formatCurrency(listing.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">
              {formatCurrency(listing.effectivePrice)}
            </span>
            {discountPercent && discountPercent > 0 && (
              <span className="rounded bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Cost Breakdown Math */}
          <div className="mt-2 pt-2 border-t border-zinc-900 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400 gap-y-1">
            <span>
              Item: <strong className="text-zinc-300 font-mono">{formatCurrency(listing.price)}</strong>
            </span>
            <span>
              Shipping:{' '}
              <strong className={listing.shippingCost === 0 ? 'text-emerald-400 font-medium' : 'text-zinc-300'}>
                {listing.shippingCost === 0 ? 'FREE' : formatCurrency(listing.shippingCost)}
              </strong>
            </span>
            {listing.couponDiscount && listing.couponDiscount > 0 ? (
              <span className="text-emerald-400 font-medium">
                Coupon: -{formatCurrency(listing.couponDiscount)}
              </span>
            ) : null}
          </div>
        </div>

        {/* Coupon Code Section (if present) */}
        {listing.couponCode && (
          <div className="mb-3 flex items-center justify-between rounded-lg border border-dashed border-emerald-500/30 bg-emerald-950/20 px-2.5 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300 font-mono">
              <Tag className="h-3 w-3 text-emerald-400" />
              <span>Code: <code className="font-bold">{listing.couponCode}</code></span>
            </div>
            <button
              type="button"
              onClick={handleCopyCoupon}
              className="flex items-center gap-1 rounded bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Key Details List */}
        <div className="space-y-1.5 text-xs text-zinc-400 mb-4">
          {/* Stock & Delivery */}
          <div className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{listing.shippingInfo} ({listing.deliveryEstimate || 'Fast delivery'})</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                listing.inStock ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span className={listing.inStock ? 'text-zinc-300 font-mono text-[11px]' : 'text-rose-400 font-mono text-[11px]'}>
              {listing.stockStatus}
            </span>
          </div>

          {/* Return Policy & Seller */}
          <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
            <RotateCcw className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
            <span className="truncate">{listing.returnPolicy}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>{listing.rating.toFixed(1)} ({listing.reviewCount} reviews) • {listing.seller}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/80">
        {/* Toggle Cart Optimizer */}
        {onToggleCart && (
          <button
            type="button"
            onClick={onToggleCart}
            title={isInCart ? 'Remove from Cart Optimizer' : 'Add to Cart Optimizer'}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer shrink-0 ${
              isInCart
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/30'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {isInCart ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </button>
        )}

        {/* Go to Retailer Link */}
        <a
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all text-center cursor-pointer ${
            isWinningDeal
              ? 'bg-zinc-100 hover:bg-white text-black shadow-xs'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
          }`}
        >
          <span>View on {listing.retailer}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};
