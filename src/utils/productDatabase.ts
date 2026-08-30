export interface CatalogProduct {
  queryKeywords: string[];
  name: string;
  brand: string;
  model: string;
  category: string;
  basePrice: number;
  imageUrl: string;
  keySpecs: string[];
  pros: string[];
  cons: string[];
  alternatives: {
    name: string;
    priceEstimate: number;
    savingsVsTarget: number;
    reason: string;
    retailer: string;
  }[];
  listings: {
    retailer: string;
    productTitle: string;
    price: number;
    originalPrice: number;
    currency: string;
    inStock: boolean;
    stockStatus: string;
    condition: string;
    shippingInfo: string;
    shippingCost: number;
    rating: number;
    reviewCount: string;
    dealTag: string | null;
    couponCode: string | null;
    couponDiscount: number;
    seller: string;
    returnPolicy: string;
    deliveryEstimate: string;
    priceMatchEligible: boolean;
  }[];
}

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    queryKeywords: ['airpod', 'airpods', 'airpod pro', 'airpods pro', 'airpods pro 2', 'apple airpods'],
    name: 'Apple AirPods Pro 2 (USB-C Charging Case)',
    brand: 'Apple',
    model: 'AirPods Pro 2nd Gen (MTJV3AM/A)',
    category: 'Audio & Headphones',
    basePrice: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Active Noise Cancellation with Apple H2 Chip',
      'Adaptive Audio and Transparency Mode with Conversation Awareness',
      'MagSafe Charging Case (USB-C) with Speaker & Lanyard Loop',
      'Up to 6 hours listening time with ANC (30 hours total with case)',
      'IP54 dust, sweat, and water resistance'
    ],
    pros: [
      'Top-tier active noise cancellation & transparency mode',
      'Flawless automatic switching across Apple devices',
      'Precision Finding via U1 ultra-wideband chip'
    ],
    cons: [
      'Full feature set requires iOS / Apple ecosystem',
      'Silicone tips may require fit test for optimal seal'
    ],
    alternatives: [
      {
        name: 'Sony WF-1000XM5 Noise-Canceling Earbuds',
        priceEstimate: 248.00,
        savingsVsTarget: 1.00,
        reason: 'Superior LDAC Hi-Res audio codec and cross-platform companion app',
        retailer: 'Best Buy'
      },
      {
        name: 'Bose QuietComfort Ultra Wireless Earbuds',
        priceEstimate: 239.00,
        savingsVsTarget: 10.00,
        reason: 'Industry-leading spatial audio immersion and class-leading ANC',
        retailer: 'Amazon'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C MagSafe Case',
        price: 189.99,
        originalPrice: 249.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Prime 1-Day)',
        condition: 'New',
        shippingInfo: 'Free Prime One-Day Shipping',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '48,200',
        dealTag: 'Lowest Total Price',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Sold by Amazon.com',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'Walmart',
        productTitle: 'Apple AirPods Pro 2nd Gen with USB-C Case (2023 Model)',
        price: 199.00,
        originalPrice: 249.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping or Store Pickup',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '12,100',
        dealTag: 'Rollback Deal',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart.com Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'Apple - AirPods Pro (2nd generation) with MagSafe Case (USB‑C) - White',
        price: 199.99,
        originalPrice: 249.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Pickup in 1 hour)',
        condition: 'New',
        shippingInfo: 'Free Standard Shipping or 1-Hour Pickup',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '24,500',
        dealTag: 'Price Match Guaranteed',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Today in store / 2 days ship',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'Apple AirPods Pro 2nd Generation with MagSafe Case (USB-C)',
        price: 199.99,
        originalPrice: 249.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping on $35+',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '8,900',
        dealTag: '5% Off with Target Circle',
        couponCode: 'TARGETCIRCLE',
        couponDiscount: 10,
        seller: 'Target.com',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2-3 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'B&H Photo',
        productTitle: 'Apple AirPods Pro (2nd Generation, with MagSafe Case USB-C)',
        price: 199.00,
        originalPrice: 249.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Expedited Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '4,100',
        dealTag: 'Payboo Card Save Sales Tax',
        couponCode: null,
        couponDiscount: 0,
        seller: 'B&H Photo Video Direct',
        returnPolicy: '30-Day Returns',
        deliveryEstimate: '1-2 Days',
        priceMatchEligible: false
      },
      {
        retailer: 'eBay',
        productTitle: 'Apple AirPods Pro 2nd Gen USB-C (Allstate 2-Year Warranty Included)',
        price: 169.99,
        originalPrice: 249.00,
        currency: '$',
        inStock: true,
        stockStatus: 'Limited Stock (5 available)',
        condition: 'Refurbished',
        shippingInfo: 'Free Standard Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '1,850',
        dealTag: 'Certified Refurbished Deal',
        couponCode: 'EBAYREFURB15',
        couponDiscount: 15,
        seller: 'Top Rated Plus Certified Refurbisher',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: '3-4 Days',
        priceMatchEligible: false
      }
    ]
  },
  {
    queryKeywords: ['sony wh-1000xm5', 'wh1000xm5', 'xm5', 'sony xm5', 'sony headphones'],
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    model: 'WH-1000XM5/B',
    category: 'Audio & Headphones',
    basePrice: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Dual Processor V1 & QN1 HD Noise Canceling',
      'Auto NC Optimizer with 8 integrated beamforming microphones',
      '30-Hour Battery Life with 3-minute quick charge (3 hours playback)',
      'LDAC Hi-Res Wireless Audio & DSEE Extreme upscaling',
      'Multi-point Bluetooth pairing with Speak-to-Chat'
    ],
    pros: [
      'Benchmark-setting active noise cancellation in noisy environments',
      'Ultra-comfortable lightweight synthetic leather headband',
      'Industry-leading battery longevity and fast charging'
    ],
    cons: [
      'Earcups do not fold inward into a compact footprint',
      'Touch controls can be sensitive in cold or rain'
    ],
    alternatives: [
      {
        name: 'Bose QuietComfort Ultra Wireless Headphones',
        priceEstimate: 379.00,
        savingsVsTarget: 20.00,
        reason: 'Foldable hinge design with CustomTune sound calibration',
        retailer: 'Amazon'
      },
      {
        name: 'Sennheiser Momentum 4 Wireless',
        priceEstimate: 299.95,
        savingsVsTarget: 100.00,
        reason: 'Massive 60-hour battery life with audiophile acoustic staging',
        retailer: 'Best Buy'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones - Black',
        price: 328.00,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Prime)',
        condition: 'New',
        shippingInfo: 'Free One-Day Prime Delivery',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '19,400',
        dealTag: 'Lowest Price',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Sold by Amazon.com',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'Sony - WH-1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones - Black',
        price: 329.99,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Ready in store)',
        condition: 'New',
        shippingInfo: 'Free Next-Day Delivery or Store Pickup',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '10,800',
        dealTag: 'Price Match Guarantee',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Today in store',
        priceMatchEligible: true
      },
      {
        retailer: 'Walmart',
        productTitle: 'Sony WH-1000XM5 Premium Noise Canceling Wireless Over-Ear Headphones',
        price: 329.00,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping',
        shippingCost: 0,
        rating: 4.5,
        reviewCount: '4,200',
        dealTag: 'Rollback',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'B&H Photo',
        productTitle: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones (Black)',
        price: 328.00,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Expedited Delivery',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '2,900',
        dealTag: 'Payboo Card Save Sales Tax',
        couponCode: null,
        couponDiscount: 0,
        seller: 'B&H Photo Video',
        returnPolicy: '30-Day Returns',
        deliveryEstimate: '1-2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'Sony WH-1000XM5 Wireless Noise-Canceling Over-Ear Headphones',
        price: 329.99,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Shipping on $35+',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '1,950',
        dealTag: '5% Off with Target Circle',
        couponCode: 'CIRCLE5',
        couponDiscount: 16.50,
        seller: 'Target Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2-3 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'eBay',
        productTitle: 'Sony WH-1000XM5 Wireless Headphones (Certified Refurbished 2-Yr Warranty)',
        price: 249.99,
        originalPrice: 399.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'Refurbished',
        shippingInfo: 'Free Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '1,400',
        dealTag: 'Top Refurb Deal',
        couponCode: 'REFURB15',
        couponDiscount: 15,
        seller: 'Official Sony Certified Refurbisher',
        returnPolicy: '30-Day Free Returns',
        deliveryEstimate: '3-4 Days',
        priceMatchEligible: false
      }
    ]
  },
  {
    queryKeywords: ['macbook', 'macbook air', 'macbook air m3', 'm3 macbook', 'apple macbook'],
    name: 'Apple MacBook Air 13-inch (M3 Chip, 16GB RAM, 512GB SSD)',
    brand: 'Apple',
    model: 'MacBook Air 13" (MRXN3LL/A)',
    category: 'Computers & Laptops',
    basePrice: 1299.00,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Apple M3 chip (8-core CPU, 10-core GPU, 16-core Neural Engine)',
      '13.6-inch Liquid Retina display with 500 nits brightness & True Tone',
      '16GB Unified Memory + 512GB High-Speed SSD Storage',
      'Dual external display support with laptop lid closed',
      'Up to 18 hours battery life with MagSafe 3 charging'
    ],
    pros: [
      'Blazing daily performance and fanless, silent thermal operation',
      'Industry-leading battery life and aluminum unibody chassis',
      'Crisp 1080p FaceTime HD camera and three-mic spatial audio array'
    ],
    cons: [
      'Dual external monitors only work when laptop display is closed',
      'Storage and memory cannot be upgraded post-purchase'
    ],
    alternatives: [
      {
        name: 'Dell XPS 13 (Intel Core Ultra 7, 16GB RAM, 512GB SSD)',
        priceEstimate: 1199.00,
        savingsVsTarget: 100.00,
        reason: 'OLED InfinityEdge screen and Windows 11 Copilot integration',
        retailer: 'Dell'
      },
      {
        name: 'Apple MacBook Pro 14-inch (M3 Pro)',
        priceEstimate: 1799.00,
        savingsVsTarget: -500.00,
        reason: 'ProMotion 120Hz XDR mini-LED display and active cooling fans',
        retailer: 'Best Buy'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 16GB Memory, 512GB SSD - Midnight',
        price: 1149.00,
        originalPrice: 1299.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Prime)',
        condition: 'New',
        shippingInfo: 'Free Two-Day Prime Delivery',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '6,400',
        dealTag: '$150 Off MSRP',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Sold by Amazon.com',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'Apple - MacBook Air 13" Laptop - M3 chip - 16GB Memory - 512GB SSD - Space Gray',
        price: 1149.00,
        originalPrice: 1299.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Pickup in 1 Hour)',
        condition: 'New',
        shippingInfo: 'Free Standard Shipping or 1-Hour Pickup',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '4,800',
        dealTag: 'Price Match Guaranteed',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Today in store',
        priceMatchEligible: true
      },
      {
        retailer: 'B&H Photo',
        productTitle: 'Apple 13" MacBook Air (M3, Midnight, 16GB/512GB)',
        price: 1149.00,
        originalPrice: 1299.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Expedited Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '1,200',
        dealTag: 'Payboo Card Save Sales Tax',
        couponCode: null,
        couponDiscount: 0,
        seller: 'B&H Photo Video Direct',
        returnPolicy: '30-Day Returns',
        deliveryEstimate: '1-2 Days',
        priceMatchEligible: false
      },
      {
        retailer: 'Walmart',
        productTitle: 'Apple MacBook Air 13.6-inch M3 16GB RAM 512GB SSD Midnight 2024',
        price: 1199.00,
        originalPrice: 1299.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '950',
        dealTag: 'Rollback',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'Apple MacBook Air 13-inch M3 16GB Memory 512GB SSD Storage',
        price: 1249.00,
        originalPrice: 1299.00,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Shipping',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '480',
        dealTag: '5% Target Circle savings',
        couponCode: 'CIRCLE5',
        couponDiscount: 62.45,
        seller: 'Target.com',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2-3 Days',
        priceMatchEligible: true
      }
    ]
  },
  {
    queryKeywords: ['ps5', 'playstation 5', 'ps5 slim', 'playstation 5 slim', 'sony ps5'],
    name: 'Sony PlayStation 5 Slim Console (1TB SSD, Disc Edition)',
    brand: 'Sony',
    model: 'PS5 Slim (CFI-2000)',
    category: 'Gaming & Consoles',
    basePrice: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Custom AMD Zen 2 CPU (8x Cores) & RDNA 2 GPU with Ray Tracing',
      'Ultra-high speed 1TB NVMe Solid State Drive',
      'DualSense Wireless Controller with Haptic Feedback & Adaptive Triggers',
      '4K 120Hz HDR gaming with Tempest 3D AudioTech',
      'Detachable Ultra HD Blu-ray Disc Drive'
    ],
    pros: [
      '30% smaller chassis volume and 24% lighter than original PS5',
      'Expanded 1TB internal storage capacity for game installs',
      'Unmatched exclusive first-party game library'
    ],
    cons: [
      'Vertical stand sold separately ($29.99)',
      'Game downloads consume storage rapidly'
    ],
    alternatives: [
      {
        name: 'Xbox Series X Console (1TB SSD)',
        priceEstimate: 449.99,
        savingsVsTarget: 50.00,
        reason: 'Xbox Game Pass Ultimate library value with Quick Resume feature',
        retailer: 'Microsoft Store'
      },
      {
        name: 'Nintendo Switch OLED Model',
        priceEstimate: 349.99,
        savingsVsTarget: 150.00,
        reason: 'Portable handheld flexibility with 7-inch vibrant OLED screen',
        retailer: 'Target'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'PlayStation 5 Console (Slim) - Disc Edition with 1TB SSD',
        price: 449.00,
        originalPrice: 499.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Prime)',
        condition: 'New',
        shippingInfo: 'Free One-Day Prime Delivery',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '32,100',
        dealTag: 'Lowest Price',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Sold by Amazon.com',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'Sony - PlayStation 5 Slim Console (Disc Edition) - White',
        price: 449.99,
        originalPrice: 499.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Pickup today)',
        condition: 'New',
        shippingInfo: 'Free Standard Shipping or 1-Hour Pickup',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '18,200',
        dealTag: 'Price Match Guaranteed',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Today in store',
        priceMatchEligible: true
      },
      {
        retailer: 'Walmart',
        productTitle: 'Sony PlayStation 5 Video Game Console Slim Disc Edition',
        price: 449.00,
        originalPrice: 499.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '11,400',
        dealTag: 'Rollback',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'PlayStation 5 Slim Console (Disc Edition)',
        price: 449.99,
        originalPrice: 499.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping on $35+',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '7,100',
        dealTag: '5% Circle Card Savings',
        couponCode: 'CIRCLE5',
        couponDiscount: 22.50,
        seller: 'Target Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2-3 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'B&H Photo',
        productTitle: 'Sony PlayStation 5 Slim Console (Disc Version, 1TB)',
        price: 449.00,
        originalPrice: 499.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Expedited Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '1,900',
        dealTag: 'Payboo Card Save Sales Tax',
        couponCode: null,
        couponDiscount: 0,
        seller: 'B&H Photo Video',
        returnPolicy: '30-Day Returns',
        deliveryEstimate: '1-2 Days',
        priceMatchEligible: false
      }
    ]
  },
  {
    queryKeywords: ['oled', 'lg oled', 'c3', 'c4', 'lg c3', 'lg c4', '65 inch oled', 'oled tv', '4k tv'],
    name: 'LG 65-Inch Class C3 Series OLED evo 4K Smart TV',
    brand: 'LG',
    model: 'OLED65C3PUA',
    category: 'TV & Home Theater',
    basePrice: 1699.99,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Self-lit OLED evo display with Brightness Booster',
      'α9 AI Processor Gen6 with 4K AI Super Upscaling',
      '120Hz Refresh Rate with NVIDIA G-SYNC & AMD FreeSync Premium',
      '4x full-bandwidth HDMI 2.1 inputs with eARC support',
      'Dolby Vision, Dolby Atmos, and webOS 23 Smart Platform'
    ],
    pros: [
      'Infinite contrast with true pitch blacks and wide viewing angles',
      'Superb gaming features with 0.1ms response time and 4 HDMI 2.1 ports',
      'Ultra-thin gallery design with minimal bezel profile'
    ],
    cons: [
      'Slightly lower peak brightness compared to mini-LED in direct sunlit rooms',
      'Subwoofer bass requires a dedicated soundbar for immersive audio'
    ],
    alternatives: [
      {
        name: 'Samsung 65" S90C OLED 4K Smart TV',
        priceEstimate: 1597.99,
        savingsVsTarget: 102.00,
        reason: 'Quantum Dot OLED with brighter color volume and 144Hz refresh rate',
        retailer: 'Amazon'
      },
      {
        name: 'Sony 65" Bravia XR A80L OLED 4K Google TV',
        priceEstimate: 1698.00,
        savingsVsTarget: 1.99,
        reason: 'Cognitive Processor XR acoustic surface audio built into the glass',
        retailer: 'Best Buy'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'LG 65-Inch Class OLED evo C3 Series 4K Smart TV with Alexa Built-in (2023)',
        price: 1496.99,
        originalPrice: 1699.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Scheduled Delivery)',
        condition: 'New',
        shippingInfo: 'Free Enhanced Delivery & Unpacking',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '3,800',
        dealTag: 'Lowest Price in 30 Days',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Sold by Amazon.com',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: '2-3 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'LG - 65" Class C3 Series OLED 4K UHD Smart webOS TV',
        price: 1499.99,
        originalPrice: 1699.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Pickup or Delivery)',
        condition: 'New',
        shippingInfo: 'Free Delivery or Store Pickup',
        shippingCost: 0,
        rating: 4.8,
        reviewCount: '5,200',
        dealTag: 'Price Match Guaranteed',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'B&H Photo',
        productTitle: 'LG C3 65" 4K HDR Smart OLED evo TV',
        price: 1496.99,
        originalPrice: 1699.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free White Glove Delivery',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '850',
        dealTag: 'Payboo Card Save Sales Tax ($120+)',
        couponCode: null,
        couponDiscount: 0,
        seller: 'B&H Photo Video Direct',
        returnPolicy: '30-Day Returns',
        deliveryEstimate: '2-4 Days',
        priceMatchEligible: false
      },
      {
        retailer: 'Walmart',
        productTitle: 'LG 65-Inch Class OLED evo 4K Smart TV OLED65C3PUA',
        price: 1549.00,
        originalPrice: 1699.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Freight Delivery',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '1,400',
        dealTag: 'Rollback',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart.com',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '3-5 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'LG 65" Class C3 Series OLED 4K UHD Smart TV',
        price: 1599.99,
        originalPrice: 1699.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free Standard Delivery',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '620',
        dealTag: '5% Off with Target Circle Card',
        couponCode: 'CIRCLE5',
        couponDiscount: 80.00,
        seller: 'Target.com',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '3-4 Days',
        priceMatchEligible: true
      }
    ]
  },
  {
    queryKeywords: ['dyson', 'v15', 'dyson v15', 'vacuum', 'dyson vacuum', 'cordless vacuum'],
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    brand: 'Dyson',
    model: 'V15 Detect (368340-01)',
    category: 'Home & Appliances',
    basePrice: 749.99,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
    keySpecs: [
      'Fluffy Optic cleaner head reveals invisible micro-dust',
      'Piezo acoustic sensor measures and counts dust particles in real time',
      'Dyson Hyperdymium motor spins up to 125,000rpm (240 AW suction)',
      'Up to 60 minutes run time with swappable click-in battery',
      'Whole-machine advanced filtration traps 99.99% of particles to 0.3 microns'
    ],
    pros: [
      'Exceptional suction power and intelligent auto-suction adjustment',
      'Laser illumination makes floor dust effortlessly visible',
      'Hair screw anti-tangle tool cleans pet hair without wrapping'
    ],
    cons: [
      'Heavier trigger grip compared to earlier V8/V10 models',
      'Dust bin capacity requires frequent emptying in large homes'
    ],
    alternatives: [
      {
        name: 'Shark Stratos Cordless Vacuum with Clean Sense IQ',
        priceEstimate: 399.99,
        savingsVsTarget: 250.00,
        reason: 'Folding MultiFLEX wand and odor neutralizing cartridge',
        retailer: 'Amazon'
      },
      {
        name: 'Dyson V8 Absolute Cordless Vacuum',
        priceEstimate: 349.99,
        savingsVsTarget: 300.00,
        reason: 'Lighter 5.8 lb body for effortless quick cleanups',
        retailer: 'Best Buy'
      }
    ],
    listings: [
      {
        retailer: 'Amazon',
        productTitle: 'Dyson V15 Detect Cordless Vacuum Cleaner, Yellow/Iron',
        price: 599.99,
        originalPrice: 749.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Prime)',
        condition: 'New',
        shippingInfo: 'Free 1-Day Prime Delivery',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '8,400',
        dealTag: '$150 Off Deal',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Dyson Official Store on Amazon',
        returnPolicy: 'Free 30-Day Returns',
        deliveryEstimate: 'Tomorrow',
        priceMatchEligible: true
      },
      {
        retailer: 'Best Buy',
        productTitle: 'Dyson - V15 Detect Extra Cordless Vacuum - Yellow/Nickel',
        price: 599.99,
        originalPrice: 749.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Ready in 1 hour)',
        condition: 'New',
        shippingInfo: 'Free Next-Day Shipping or Store Pickup',
        shippingCost: 0,
        rating: 4.7,
        reviewCount: '4,100',
        dealTag: 'Price Match Guaranteed',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Best Buy Official',
        returnPolicy: '15-60 Day Returns',
        deliveryEstimate: 'Today in store',
        priceMatchEligible: true
      },
      {
        retailer: 'Target',
        productTitle: 'Dyson V15 Detect Cordless Stick Vacuum',
        price: 599.99,
        originalPrice: 749.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping',
        shippingCost: 0,
        rating: 4.6,
        reviewCount: '2,300',
        dealTag: '5% Circle Card Savings',
        couponCode: 'CIRCLE5',
        couponDiscount: 30.00,
        seller: 'Target Direct',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'Walmart',
        productTitle: 'Dyson V15 Detect Cordless Vacuum Cleaner 368340-01',
        price: 619.00,
        originalPrice: 749.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock',
        condition: 'New',
        shippingInfo: 'Free 2-Day Shipping',
        shippingCost: 0,
        rating: 4.5,
        reviewCount: '1,700',
        dealTag: 'Special Buy',
        couponCode: null,
        couponDiscount: 0,
        seller: 'Walmart.com',
        returnPolicy: '90-Day Returns',
        deliveryEstimate: '2 Days',
        priceMatchEligible: true
      },
      {
        retailer: 'eBay',
        productTitle: 'Dyson V15 Detect Cordless Vacuum (Dyson Direct Certified Refurbished)',
        price: 449.99,
        originalPrice: 749.99,
        currency: '$',
        inStock: true,
        stockStatus: 'In Stock (Limited Quantity)',
        condition: 'Refurbished',
        shippingInfo: 'Free Shipping',
        shippingCost: 0,
        rating: 4.9,
        reviewCount: '2,900',
        dealTag: 'Dyson Official Outlet Deal',
        couponCode: 'DYSONSAVE15',
        couponDiscount: 25.00,
        seller: 'Official Dyson Outlet Store',
        returnPolicy: '30-Day Free Returns',
        deliveryEstimate: '3-4 Days',
        priceMatchEligible: false
      }
    ]
  }
];

export function findCatalogProduct(query: string): CatalogProduct | null {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) return null;

  // 1. Direct keyword match
  for (const prod of PRODUCT_CATALOG) {
    if (prod.queryKeywords.some((k) => cleanQ.includes(k) || k.includes(cleanQ))) {
      return prod;
    }
  }

  // 2. Token overlap match
  const tokens = cleanQ.split(/\s+/).filter((t) => t.length > 2);
  let bestMatch: CatalogProduct | null = null;
  let maxScore = 0;

  for (const prod of PRODUCT_CATALOG) {
    let score = 0;
    for (const token of tokens) {
      if (prod.name.toLowerCase().includes(token)) score += 3;
      if (prod.brand.toLowerCase().includes(token)) score += 2;
      if (prod.category.toLowerCase().includes(token)) score += 1;
      if (prod.queryKeywords.some((k) => k.includes(token))) score += 2;
    }
    if (score > maxScore && score >= 3) {
      maxScore = score;
      bestMatch = prod;
    }
  }

  return bestMatch;
}
