export interface RetailerListing {
  id: string;
  retailer: string;
  retailerLogoKey: 'amazon' | 'walmart' | 'bestbuy' | 'target' | 'bh' | 'ebay' | 'newegg' | 'costco' | 'other';
  productTitle: string;
  price: number;
  originalPrice?: number | null;
  currency: string;
  inStock: boolean;
  stockStatus: string;
  condition: 'New' | 'Refurbished' | 'Open Box' | 'Used';
  shippingInfo: string;
  shippingCost: number;
  rating: number;
  reviewCount: string | number;
  dealTag?: string | null;
  couponCode?: string | null;
  couponDiscount?: number;
  effectivePrice: number; // price + shippingCost - (couponDiscount || 0)
  url: string;
  seller: string;
  returnPolicy: string;
  deliveryEstimate?: string;
  priceMatchEligible?: boolean;
}

export interface PriceHistoryPoint {
  date: string;
  amazon?: number;
  walmart?: number;
  bestbuy?: number;
  average: number;
}

export interface SmartAlternative {
  name: string;
  priceEstimate: number;
  savingsVsTarget: number;
  reason: string;
  retailer: string;
}

export interface PriceComparisonResult {
  id: string;
  query: string;
  matchedProductName: string;
  brand: string;
  model: string;
  category: string;
  imageUrl: string;
  summary: string;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  potentialSavings: number;
  recommendedRetailer: string;
  recommendationReason: string;
  priceVerdict: 'Great Time to Buy' | 'Fair Price' | 'Wait for Sale' | 'Price Drop Detected';
  priceVerdictReason: string;
  priceHistory: {
    lowestEverEstimate: number;
    averagePast30Days: number;
    trend: 'down' | 'stable' | 'up';
    historyPoints?: PriceHistoryPoint[];
  };
  keySpecs: string[];
  pros: string[];
  cons: string[];
  alternatives: SmartAlternative[];
  listings: RetailerListing[];
  lastCheckedTimestamp: number;
  sources?: Array<{ title: string; uri: string }>;
}

export interface WatchlistItem {
  id: string;
  productName: string;
  targetPrice: number;
  currentBestPrice: number;
  currentBestRetailer: string;
  initialPrice: number;
  imageUrl: string;
  dateAdded: string;
  alertTriggered: boolean;
  notes?: string;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: number;
  suggestedActions?: string[];
  relatedListings?: Partial<RetailerListing>[];
}

export type SortOption = 'price_asc' | 'discount_desc' | 'rating_desc' | 'shipping_fastest';
export type FilterCondition = 'all' | 'New' | 'Refurbished' | 'Open Box';
