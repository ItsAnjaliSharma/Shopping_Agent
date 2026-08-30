import React from 'react';
import { Bell, Sparkles, Calculator, Zap } from 'lucide-react';
import { WatchlistItem } from '../types';

interface NavbarProps {
  watchlist: WatchlistItem[];
  onOpenWatchlist: () => void;
  onOpenCartOptimizer: () => void;
  onOpenChat: () => void;
  onResetToHome: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  watchlist,
  onOpenWatchlist,
  onOpenCartOptimizer,
  onOpenChat,
  onResetToHome,
  cartCount,
}) => {
  const activeAlertsCount = watchlist.filter((w) => w.alertTriggered).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#0F0F0F]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          id="brand-logo-btn"
          onClick={onResetToHome}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-black shadow-xs transition-transform group-hover:scale-105">
            <div className="h-4 w-4 bg-black rotate-45 flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-white">
                PRICE<span className="text-zinc-500">HAWK</span>
              </span>
              <span className="rounded bg-zinc-800 border border-zinc-700/60 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400">
                v2.5
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium hidden sm:block">
              Multi-Retailer Intelligence Engine
            </p>
          </div>
        </div>

        {/* Action Controls & Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-mono text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>API: STABLE</span>
          </div>

          {/* AI Shopping Agent Button */}
          <button
            id="open-agent-chat-nav-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/40 hover:border-emerald-500/60 transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Ask AI Agent</span>
            <span className="sm:hidden">Agent</span>
          </button>

          {/* Cart / Bundle Optimizer */}
          <button
            id="open-cart-optimizer-btn"
            onClick={onOpenCartOptimizer}
            className="relative flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            title="Compare Bundle & Multi-Item Cart Costs"
          >
            <Calculator className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden md:inline">Cart Optimizer</span>
            {cartCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Price Watchlist & Alerts */}
          <button
            id="open-watchlist-modal-btn"
            onClick={onOpenWatchlist}
            className="relative flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className={`h-3.5 w-3.5 ${activeAlertsCount > 0 ? 'text-amber-400 animate-bounce' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlist.length > 0 && (
              <span
                className={`flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold font-mono ${
                  activeAlertsCount > 0 ? 'bg-amber-500 text-black' : 'bg-zinc-700 text-white'
                }`}
              >
                {watchlist.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
