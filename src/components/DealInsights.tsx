import React from 'react';
import { Sparkles, TrendingDown, TrendingUp, Minus, CheckCircle, AlertCircle, ArrowUpRight, Shield } from 'lucide-react';
import { PriceComparisonResult } from '../types';
import { formatCurrency, RETAILER_META } from '../utils/retailerData';

interface DealInsightsProps {
  result: PriceComparisonResult;
  onSelectAlternative?: (altQuery: string) => void;
}

export const DealInsights: React.FC<DealInsightsProps> = ({
  result,
  onSelectAlternative,
}) => {
  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'Great Time to Buy':
      case 'Price Drop Detected':
        return {
          bg: 'bg-emerald-950/20 border-emerald-500/30',
          text: 'text-emerald-300',
          badge: 'bg-emerald-500 text-black',
          icon: <TrendingDown className="h-4 w-4 text-emerald-400" />,
        };
      case 'Wait for Sale':
        return {
          bg: 'bg-amber-950/20 border-amber-500/30',
          text: 'text-amber-300',
          badge: 'bg-amber-500 text-black',
          icon: <TrendingUp className="h-4 w-4 text-amber-400" />,
        };
      default:
        return {
          bg: 'bg-zinc-900 border-zinc-800',
          text: 'text-zinc-300',
          badge: 'bg-zinc-700 text-white',
          icon: <Minus className="h-4 w-4 text-zinc-400" />,
        };
    }
  };

  const verdictStyle = getVerdictStyle(result.priceVerdict);

  return (
    <div className="space-y-4">
      {/* Verdict & Timing Intelligence Box */}
      <div className={`rounded-xl border p-4 sm:p-5 ${verdictStyle.bg} transition-colors shadow-xs`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 shadow-xs shrink-0">
              {verdictStyle.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  AI Timing Intelligence
                </span>
                <span className={`rounded px-2 py-0.2 text-[10px] font-mono font-bold ${verdictStyle.badge}`}>
                  {result.priceVerdict}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-white">
                {result.priceVerdictReason}
              </p>
            </div>
          </div>

          {/* Historical Metrics */}
          <div className="grid grid-cols-2 gap-2 sm:border-l sm:border-zinc-800 sm:pl-5 shrink-0">
            <div className="rounded-lg bg-zinc-950/80 p-2 border border-zinc-800/80">
              <span className="block text-[10px] font-mono text-zinc-500">Lowest Ever</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {formatCurrency(result.priceHistory.lowestEverEstimate)}
              </span>
            </div>
            <div className="rounded-lg bg-zinc-950/80 p-2 border border-zinc-800/80">
              <span className="block text-[10px] font-mono text-zinc-500">30-Day Avg</span>
              <span className="text-xs font-mono font-bold text-zinc-300">
                {formatCurrency(result.priceHistory.averagePast30Days)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Pros/Cons & Key Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros & Cons */}
        <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-5 shadow-xs">
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Buyer Sentiment & Reviews
          </h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide mb-1.5 block">
                Top Advantages
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {result.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2.5 border-t border-zinc-800/80">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide mb-1.5 block">
                Points to Consider
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {result.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Specs & Sources */}
        <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              Verified Key Specifications
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {result.keySpecs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2 p-1.5 rounded-lg bg-zinc-950 border border-zinc-850">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources Grounding Info */}
          {result.sources && result.sources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                LIVE SOURCES GROUNDING:
              </span>
              <div className="flex flex-wrap gap-1">
                {result.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  >
                    <span className="truncate max-w-[130px]">{src.title}</span>
                    <ArrowUpRight className="h-2.5 w-2.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smart Alternative Recommendations */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-5 shadow-xs">
          <div className="mb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Smart Substitutes & Value Alternatives
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Comparable models that offer competitive specs or greater budget savings
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.alternatives.map((alt, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-lg bg-zinc-950 p-3 border border-zinc-800/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-white line-clamp-1">
                      {alt.name}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {formatCurrency(alt.priceEstimate)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-2">
                    {alt.reason}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Available at {alt.retailer}
                  </span>
                  {onSelectAlternative && (
                    <button
                      type="button"
                      onClick={() => onSelectAlternative(alt.name)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      Compare Prices &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Retailer Price Match & Return Policy Cheat Sheet */}
      <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-5 shadow-xs">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          Store Price-Matching & Return Windows Guide
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase">
                <th className="pb-2">Retailer</th>
                <th className="pb-2">Price Match Policy</th>
                <th className="pb-2">Return Window</th>
                <th className="pb-2">Special Perks / Cards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850 text-zinc-300">
              {Object.entries(RETAILER_META).filter(([k]) => k !== 'other').map(([key, meta]) => (
                <tr key={key} className="hover:bg-zinc-900/30">
                  <td className="py-2 font-medium text-white">
                    {meta.name}
                  </td>
                  <td className="py-2">
                    {meta.hasPriceMatch ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle className="h-3 w-3" /> Matches competitors
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-mono">Dynamic algorithm</span>
                    )}
                  </td>
                  <td className="py-2 font-mono text-zinc-300">
                    {meta.standardReturnDays} Days Free
                  </td>
                  <td className="py-2 text-zinc-500">
                    {meta.tagline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
