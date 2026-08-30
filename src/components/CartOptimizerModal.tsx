import React from 'react';
import { X, Calculator, Trash2 } from 'lucide-react';
import { RetailerListing } from '../types';
import { formatCurrency } from '../utils/retailerData';

interface CartOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: RetailerListing[];
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartOptimizerModal: React.FC<CartOptimizerModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveCartItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  // Calculate totals
  const totalBasePrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalShipping = cartItems.reduce((acc, item) => acc + item.shippingCost, 0);
  const totalCoupons = cartItems.reduce((acc, item) => acc + (item.couponDiscount || 0), 0);
  const grandTotal = Math.max(0, totalBasePrice + totalShipping - totalCoupons);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#0A0A0A] border border-zinc-800 p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400 border border-zinc-800">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wide">
                Multi-Store Cart Optimizer
              </h3>
              <p className="text-[11px] font-mono text-zinc-500">
                Evaluating bundle shipping and coupon consolidation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs font-mono text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer px-2 py-1"
              >
                Clear Cart
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Calculator className="mx-auto h-8 w-8 text-zinc-700 mb-2" />
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase">
                No Items in Cart Optimizer
              </h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                Click the (+) button on any retailer listing to compare combined shipping costs and coupon totals.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Items List */}
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl p-3 bg-[#0F0F0F] border border-zinc-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-300">
                        {item.retailer}
                      </span>
                      <div>
                        <h4 className="font-medium text-white line-clamp-1">
                          {item.productTitle}
                        </h4>
                        <span className="text-zinc-500 text-[11px] font-mono">
                          {item.shippingCost === 0 ? 'Free Shipping' : `+$${item.shippingCost} ship`}
                          {item.couponDiscount ? ` • -$${item.couponDiscount} coupon` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-white">
                        {formatCurrency(item.effectivePrice)}
                      </span>
                      <button
                        onClick={() => onRemoveCartItem(item.id)}
                        className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Card */}
              <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-4 text-xs font-mono space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Base Total:</span>
                  <span className="font-mono text-zinc-200">{formatCurrency(totalBasePrice)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Total Shipping:</span>
                  <span className="font-mono text-emerald-400">
                    {totalShipping === 0 ? 'FREE' : formatCurrency(totalShipping)}
                  </span>
                </div>
                {totalCoupons > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>Coupon Discounts:</span>
                    <span>-{formatCurrency(totalCoupons)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-zinc-850 flex justify-between items-baseline">
                  <span className="font-bold uppercase tracking-wider text-zinc-400 text-xs">
                    Optimized Grand Total:
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
