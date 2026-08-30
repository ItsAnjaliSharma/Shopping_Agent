import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';
import { AgentChatMessage, PriceComparisonResult } from '../types';

interface AgentChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct?: PriceComparisonResult | null;
  initialQuery?: string;
}

export const AgentChatDrawer: React.FC<AgentChatDrawerProps> = ({
  isOpen,
  onClose,
  currentProduct,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: "👋 Hi! I'm PriceHawk, your shopping agent. Ask me about store price match policies, hidden coupon codes, return windows, or timing advice!",
      timestamp: Date.now(),
      suggestedActions: [
        'Will Best Buy price match this Amazon price?',
        'Are there any active promo codes or cash back tricks?',
        'Is this the all-time lowest price or should I wait?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle incoming initial query if opened with specific question
  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          currentProduct: currentProduct ? {
            name: currentProduct.matchedProductName,
            lowestPrice: currentProduct.lowestPrice,
            recommendedRetailer: currentProduct.recommendedRetailer,
            listings: currentProduct.listings.map((l) => ({
              retailer: l.retailer,
              price: l.effectivePrice,
              condition: l.condition,
              coupon: l.couponCode,
            })),
          } : null,
        }),
      });

      if (!response.ok) throw new Error('Chat failed');
      const data = await response.json();

      const agentMsg: AgentChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: data.reply,
        timestamp: Date.now(),
        suggestedActions: data.suggestedActions || [],
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'agent',
          text: "I'm having trouble connecting to live price intelligence right now. However, you can check store price match policies on Best Buy and Target's customer support pages!",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#0A0A0A] border-l border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                PRICEHAWK_AGENT
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </h3>
              <p className="text-[10px] font-mono text-zinc-500">
                {currentProduct ? `Active: ${currentProduct.brand} ${currentProduct.model || ''}` : 'Real-time assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-zinc-100 text-black font-medium rounded-br-xs'
                    : 'bg-[#0F0F0F] text-zinc-200 rounded-bl-xs border border-zinc-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Suggested Follow-up Actions */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-2 space-y-1 max-w-[85%]">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(action)}
                      className="flex items-center gap-1.5 text-left rounded-lg bg-zinc-950 border border-zinc-800/80 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 shrink-0 text-emerald-400" />
                      <span className="line-clamp-1">{action}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 p-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Analyzing live store policies & stock...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="border-t border-zinc-800 p-3 bg-zinc-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 rounded-lg bg-[#0F0F0F] border border-zinc-800 p-1 focus-within:border-zinc-600"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about price matching, coupons, policies..."
              className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white placeholder:text-zinc-600 outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-7 w-7 items-center justify-center rounded bg-zinc-100 text-black hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
