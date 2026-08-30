import React, { useState } from 'react';
import { X, Bell, Trash2, ArrowUpRight, RefreshCw, CheckCircle } from 'lucide-react';
import { WatchlistItem } from '../types';
import { formatCurrency } from '../utils/retailerData';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: WatchlistItem[];
  onRemoveItem: (id: string) => void;
  onSelectProduct: (productName: string) => void;
  onUpdateWatchlist: (items: WatchlistItem[]) => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemoveItem,
  onSelectProduct,
  onUpdateWatchlist,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefreshAll = async () => {
    if (watchlist.length === 0 || isRefreshing) return;
    setIsRefreshing(true);
    setRefreshMessage(null);

    try {
      const res = await fetch('/api/check-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: watchlist }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items)) {
          onUpdateWatchlist(data.items);
          setRefreshMessage('Refreshed live prices across all tracked items!');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setRefreshMessage(null), 3000);
    }
  };

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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-amber-400 border border-zinc-800">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wide">
                Price Drop Watchlist
              </h3>
              <p className="text-[11px] font-mono text-zinc-500">
                Tracking {watchlist.length} product{watchlist.length === 1 ? '' : 's'} with live threshold alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshAll}
              disabled={isRefreshing || watchlist.length === 0}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-50 cursor-pointer transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
              <span>Refresh Now</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Refresh Notification Banner */}
        {refreshMessage && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 font-mono">
            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{refreshMessage}</span>
          </div>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5">
          {watchlist.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-8 w-8 text-zinc-700 mb-2" />
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase">
                Watchlist is Empty
              </h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                Search for any product and set target alerts to track deals in real-time.
              </p>
            </div>
          ) : (
            watchlist.map((item) => {
              const isTriggered = item.alertTriggered || item.currentBestPrice <= item.targetPrice;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl p-3.5 border transition-all ${
                    isTriggered
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-[#0F0F0F] border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="h-10 w-10 rounded-lg bg-zinc-950 p-1 object-contain border border-zinc-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.productName}
                        </h4>
                        {isTriggered && (
                          <span className="rounded bg-amber-500 px-1.5 py-0.2 text-[9px] font-mono font-bold text-black uppercase">
                            Target Hit!
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs font-mono">
                        <span className="text-zinc-400">
                          Best:{' '}
                          <strong className="text-white font-mono">
                            {formatCurrency(item.currentBestPrice)}
                          </strong>{' '}
                          at {item.currentBestRetailer}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">
                          Target:{' '}
                          <strong className="text-emerald-400 font-mono">
                            {formatCurrency(item.targetPrice)}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        onSelectProduct(item.productName);
                        onClose();
                      }}
                      className="flex items-center gap-1 rounded-lg bg-zinc-100 hover:bg-white text-black px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <span>Compare</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 cursor-pointer transition-colors"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
