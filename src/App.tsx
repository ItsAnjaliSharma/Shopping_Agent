import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { ComparisonView } from './components/ComparisonView';
import { WatchlistModal } from './components/WatchlistModal';
import { CartOptimizerModal } from './components/CartOptimizerModal';
import { AgentChatDrawer } from './components/AgentChatDrawer';
import { PriceComparisonResult, WatchlistItem, RetailerListing } from './types';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentResult, setCurrentResult] = useState<PriceComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string>('Apple AirPods Pro 2 USB-C');

  // Modals & Drawers state
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isCartOptimizerOpen, setIsCartOptimizerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Watchlist state with LocalStorage persistence
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('pricehawk_watchlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'watch-1',
        productName: 'Sony WH-1000XM5 Wireless Headphones',
        targetPrice: 299.99,
        currentBestPrice: 328.00,
        currentBestRetailer: 'Amazon',
        initialPrice: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80',
        dateAdded: new Date().toLocaleDateString(),
        alertTriggered: false,
        notes: 'Target alert under $300',
      },
    ];
  });

  // Cart Optimizer state with LocalStorage persistence
  const [cartItems, setCartItems] = useState<RetailerListing[]>(() => {
    try {
      const saved = localStorage.getItem('pricehawk_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Save watchlist
  useEffect(() => {
    try {
      localStorage.setItem('pricehawk_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  // Save cart items
  useEffect(() => {
    try {
      localStorage.setItem('pricehawk_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Real-time comparison execution
  const executeComparison = useCallback(async (query: string, condition: string = 'all') => {
    if (!query.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);
    setActiveQuery(query);

    try {
      const res = await fetch('/api/compare-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, condition }),
      });

      if (!res.ok) {
        throw new Error(`Failed to compare prices (HTTP ${res.status})`);
      }

      const data: PriceComparisonResult = await res.json();
      setCurrentResult(data);
    } catch (err: any) {
      console.error('Error fetching price comparison:', err);
      setErrorMessage(err.message || 'Unable to retrieve live prices. Please try searching again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    executeComparison('Apple AirPods Pro 2 USB-C');
  }, [executeComparison]);

  // Watchlist handlers
  const handleAddToWatchlist = (itemData: Omit<WatchlistItem, 'id' | 'dateAdded' | 'alertTriggered'>) => {
    const newItem: WatchlistItem = {
      ...itemData,
      id: `watch-${Date.now()}`,
      dateAdded: new Date().toLocaleDateString(),
      alertTriggered: itemData.currentBestPrice <= itemData.targetPrice,
    };
    setWatchlist((prev) => [newItem, ...prev]);
  };

  const handleRemoveWatchlistItem = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isCurrentInWatchlist = currentResult
    ? watchlist.some((w) => w.productName.toLowerCase() === currentResult.matchedProductName.toLowerCase())
    : false;

  // Cart Optimizer handlers
  const handleToggleCartItem = (listing: RetailerListing) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === listing.id);
      if (exists) {
        return prev.filter((item) => item.id !== listing.id);
      } else {
        return [...prev, listing];
      }
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenChatWithQuery = (q: string) => {
    setChatInitialQuery(q);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        watchlist={watchlist}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenCartOptimizer={() => setIsCartOptimizerOpen(true)}
        onOpenChat={() => {
          setChatInitialQuery(undefined);
          setIsChatOpen(true);
        }}
        onResetToHome={() => executeComparison('Apple AirPods Pro 2 USB-C')}
        cartCount={cartItems.length}
      />

      <main>
        {/* Search Hero Section */}
        <HeroSearch
          onSearch={(q, cond) => executeComparison(q, cond)}
          isLoading={isLoading}
          initialQuery={activeQuery}
        />

        {/* Loading State Spinner & Scanner UI */}
        {isLoading && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="mx-auto max-w-md rounded-2xl bg-[#0F0F0F] border border-zinc-800 p-8 shadow-2xl">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 mb-5">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <h3 className="text-base font-mono font-bold text-white uppercase tracking-wide">
                SCANNING_MAJOR_RETAILERS...
              </h3>
              <p className="mt-2 text-xs font-mono text-zinc-500 leading-relaxed">
                Querying live price feeds, active discount codes, shipping fees, and return policies across verified retailers.
              </p>

              {/* Progress pulses */}
              <div className="mt-6 flex justify-center gap-1.5 flex-wrap">
                {['Amazon', 'Walmart', 'Best Buy', 'Target', 'B&H Photo', 'eBay'].map((store, idx) => (
                  <span
                    key={store}
                    style={{ animationDelay: `${idx * 150}ms` }}
                    className="inline-block rounded bg-zinc-950 border border-zinc-800/80 px-2 py-1 text-[10px] font-mono text-zinc-400 animate-pulse"
                  >
                    {store}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && !isLoading && (
          <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-rose-300 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
              <div className="flex-1">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wide">Search Error</h4>
                <p className="text-xs mt-0.5 text-zinc-400">{errorMessage}</p>
                <button
                  onClick={() => executeComparison(activeQuery)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 text-xs font-mono cursor-pointer transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Retry Comparison</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Comparison View Dashboard */}
        {!isLoading && currentResult && (
          <ComparisonView
            result={currentResult}
            onAddToWatchlist={handleAddToWatchlist}
            isItemInWatchlist={isCurrentInWatchlist}
            cartItems={cartItems}
            onToggleCartItem={handleToggleCartItem}
            onSelectAlternative={(alt) => executeComparison(alt)}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        )}
      </main>

      {/* Watchlist Modal */}
      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemoveItem={handleRemoveWatchlistItem}
        onSelectProduct={(name) => executeComparison(name)}
        onUpdateWatchlist={(updated) => setWatchlist(updated)}
      />

      {/* Cart Optimizer Modal */}
      <CartOptimizerModal
        isOpen={isCartOptimizerOpen}
        onClose={() => setIsCartOptimizerOpen(false)}
        cartItems={cartItems}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* AI Shopping Agent Drawer */}
      <AgentChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentProduct={currentResult}
        initialQuery={chatInitialQuery}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-800/80 bg-[#0A0A0A] py-8 text-center text-xs text-zinc-500 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">PRICEHAWK</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400">Autonomous Real-Time Price Engine</span>
          </div>
          <p className="text-zinc-500 text-[11px]">
            Live price intelligence grounded with real-time merchant search feeds.
          </p>
        </div>
      </footer>
    </div>
  );
}
