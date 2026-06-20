import React, { createContext, useContext, useState, useEffect } from 'react';

const EcoContext = createContext();

const initialProducts = [
  { id: 1, name: 'Bamboo Toothbrush', price: 99, ecoScore: 9.5, image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80', impact: 'Saves 25g Plastic', category: 'Personal Care', material: 'Bamboo', co2: 0.18, water: 1.2, stock: 15, rating: 4.8, makerId: 1, slug: 'bamboo-toothbrush' },
  { id: 2, name: 'Bamboo Cutlery Set', price: 199, ecoScore: 9.3, impact: 'Saves 45g Plastic', category: 'Home & Living', material: 'Bamboo', co2: 0.25, water: 1.5, stock: 8, rating: 4.6, makerId: 1, slug: 'bamboo-cutlery' },
  { id: 3, name: 'Organic Cotton Tote Bag', price: 349, ecoScore: 9.2, impact: 'Saves 200g CO₂', category: 'Fashion & Bags', material: 'Organic Cotton', co2: 0.50, water: 5.0, stock: 22, rating: 4.9, makerId: 4, slug: 'organic-cotton-tote' },
  { id: 4, name: 'Natural Soap Bar', price: 149, ecoScore: 9.0, impact: 'Saves 100g Plastic', category: 'Personal Care', material: 'Natural Oils', co2: 0.12, water: 0.8, stock: 40, rating: 4.7, makerId: 2, slug: 'natural-soap-bar' },
  { id: 5, name: 'Copper Water Bottle', price: 899, ecoScore: 8.8, impact: 'Saves 300g CO₂', category: 'Home & Living', material: 'Copper', co2: 0.70, water: 1.0, stock: 12, rating: 4.5, makerId: 3, slug: 'copper-water-bottle' },
  { id: 6, name: 'Beeswax Food Wrap', price: 199, ecoScore: 8.7, impact: 'Saves 80g Plastic', category: 'Home & Living', material: 'Beeswax', co2: 0.15, water: 0.5, stock: 25, rating: 4.4, makerId: 2, slug: 'beeswax-food-wrap' },
  { id: 7, name: 'Charcoal Floss', price: 199, ecoScore: 8.9, impact: 'Zero Plastic Packaging', category: 'Personal Care', material: 'Charcoal / Silk', co2: 0.10, water: 0.3, stock: 18, rating: 4.8, makerId: 2, slug: 'charcoal-floss' },
  { id: 8, name: 'Konjac Facial Sponge', price: 249, ecoScore: 9.1, impact: '100% Biodegradable', category: 'Personal Care', material: 'Konjac Root', co2: 0.08, water: 0.6, stock: 15, rating: 4.7, makerId: 2, slug: 'konjac-sponge' },
  { id: 9, name: 'Natural Deodorant', price: 299, ecoScore: 8.6, impact: 'Cruelty-Free & Vegan', category: 'Personal Care', material: 'Coconut Oil / Shea Butter', co2: 0.20, water: 0.9, stock: 30, rating: 4.6, makerId: 2, slug: 'natural-deodorant' },
  { id: 10, name: 'Shampoo Bar', price: 249, ecoScore: 9.0, impact: 'Replaces 2 Plastic Bottles', category: 'Personal Care', material: 'Plant Extract', co2: 0.15, water: 1.1, stock: 35, rating: 4.7, makerId: 2, slug: 'shampoo-bar' },
  { id: 11, name: 'Reusable Cotton Pads', price: 199, ecoScore: 9.2, impact: 'Saves 500+ Disposables', category: 'Personal Care', material: 'Bamboo / Cotton', co2: 0.14, water: 2.2, stock: 28, rating: 4.8, makerId: 4, slug: 'reusable-cotton-pads' },
  { id: 12, name: 'Clay Clay Terracotta Cups (Set of 6)', price: 299, ecoScore: 9.7, impact: '100% Soil Returnable', category: 'Home & Living', material: 'Clay', co2: 0.05, water: 0.2, stock: 10, rating: 4.9, makerId: 1, slug: 'clay-terracotta-cups' }
];

const initialMakers = [
  {
    id: 1,
    name: 'Karthik Pottery',
    location: 'Kutch, Gujarat',
    description: 'Reviving traditional pottery through eco-friendly practices and local clay sourcing.',
    longDescription: 'Karthik Pottery is a generation-spanning workshop located in Kutch, Gujarat. We extract local river clay sustainably, shape our products by hand wheel, and fire them in eco-friendly kilns fueled by agricultural residue. By eliminating synthetic glazes, our products are completely biodegradable and safe for health.',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80',
    stats: { products: 12, rating: '4.8', co2: '2.3 tons', followers: 142 },
    story: [
      { year: '2012', title: 'The Revival', desc: 'Started with just one wheel, trying to revive the terracotta techniques of Gujarat.' },
      { year: '2016', title: 'Solar Klns', desc: 'Installed the first low-emission kiln powered by local biomass.' },
      { year: '2021', title: 'EcoVerse Partnership', desc: 'Joined EcoVerse, increasing sales by 300% and training 5 new apprentices.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80',
      'https://images.unsplash.com/photo-1565192647048-f997ded879ab?w=300&q=80'
    ],
    certifications: ['India Organic Soil Association', 'Crafts Council of India Fair Wages'],
    reviews: [
      { author: 'Megha S.', rating: 5, comment: 'These clay cups are amazing! They give a wonderful earthy smell to tea.', date: '2026-05-12' },
      { author: 'Aman D.', rating: 4, comment: 'Beautiful finish. Shipped safely in straw and cardboard.', date: '2026-06-01' }
    ]
  },
  {
    id: 2,
    name: 'Meera Naturals',
    location: 'Coimbatore, Tamil Nadu',
    description: 'Natural skincare made with love, pure ingredients, and zero chemical preservatives.',
    longDescription: 'Meera Naturals manufactures vegan, cold-processed soaps, shampoo bars, and beauty oils. We source botanicals directly from self-help women cooperatives in rural Coimbatore, ensuring a completely transparent supply chain.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    stats: { products: 8, rating: '4.9', co2: '1.8 tons', followers: 230 },
    story: [
      { year: '2018', title: 'Kitchen Alchemy', desc: 'Meera started cold-pressing soaps in her kitchen using garden neem.' },
      { year: '2022', title: 'Cooperative Launch', desc: 'Formed a cooperative network with 12 local organic herb farmers.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&q=80'
    ],
    certifications: ['GMP Certified Cosmetics', 'Cruelty Free India', 'Ecocert Raw Ingredients'],
    reviews: [
      { author: 'Lata K.', rating: 5, comment: 'The shampoo bar has completely replaced my plastic bottles. Hair feels soft!', date: '2026-06-10' }
    ]
  },
  {
    id: 3,
    name: 'The Wood Folks',
    location: 'Saharanpur, Uttar Pradesh',
    description: 'Handcrafted wooden homeware carved sustainably from reclaimed mango wood.',
    longDescription: 'Reclaiming fallen or discarded mango and sheesham wood from agricultural orchards, The Wood Folks designs minimalist modern housewares. Each piece is hand-carved by traditional Saharanpur artisans, keeping age-old wood carving skills alive.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    stats: { products: 15, rating: '4.7', co2: '3.1 tons', followers: 88 },
    story: [
      { year: '2015', title: 'Sourcing Reclaimed', desc: 'Faced with timber scarcity, switched 100% of production to fallen orchard wood.' },
      { year: '2020', title: 'Design Guild Award', desc: 'Honored for sustainable packaging and design at the National Craft Expo.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&q=80'
    ],
    certifications: ['FSC Reclaimed Timber Seal', 'Export Promotion Council for Handicrafts EPCH'],
    reviews: []
  },
  {
    id: 4,
    name: 'SwaBun Eco Textiles',
    location: 'Bengaluru, Karnataka',
    description: 'Sustainable hand-loomed textiles empowering women weavers and using natural plant dyes.',
    longDescription: 'SwaBun works with over 40 women weavers across Karnataka, training them in hand-looming organic cotton and flax linen. All color dyes are extracted from natural waste like marigold flowers, pomegranate peels, and madder roots, recycling 100% of dye bath water.',
    image: 'https://images.unsplash.com/photo-1605372482348-12c5b0df14c8?w=600&q=80',
    stats: { products: 6, rating: '4.8', co2: '2.6 tons', followers: 198 },
    story: [
      { year: '2019', title: 'Handloom Training', desc: 'Set up three self-help clusters for women in rural Tumkur.' },
      { year: '2024', title: 'Zero Waste Dyeing', desc: 'Pioneered closed-loop dye filtration using charcoal filters.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1605372482348-12c5b0df14c8?w=300&q=80'
    ],
    certifications: ['GOTS Organic Textile Standard', 'Fair Trade Weaver Certification'],
    reviews: [
      { author: 'Rahul V.', rating: 5, comment: 'Amazing tote bags. Extremely sturdy, and the plant dye colors look rich.', date: '2026-06-15' }
    ]
  }
];

const initialCommunityPosts = [
  {
    id: 1,
    type: 'Discussions',
    title: 'Share your zero-waste journey!',
    content: 'Hi everyone! I just hit my 6-month anniversary of going zero-waste in my kitchen. The hardest part was giving up packaged snacks, but I started baking and storing in glass jars. How did you start your journey?',
    author: 'GreenLeaf',
    authorName: 'Arpita',
    authorPts: 1250,
    likes: 24,
    likedBy: [],
    comments: [
      { author: 'EcoWarrior', content: 'Congrats! Mine was replacing plastic wrap with beeswax wraps. Never looked back.', date: '2026-06-19' },
      { author: 'SustainableSoul', content: 'Snacks are definitely the final boss of zero waste! Great job on baking.', date: '2026-06-20' }
    ],
    date: '2026-06-19T10:00:00Z',
    category: 'Lifestyle'
  },
  {
    id: 2,
    type: 'Discussions',
    title: 'DIY home maker: jasmine face oil bottles',
    content: 'Made a fresh batch of cold-pressed almond and organic jasmine face oil today! Bottled them up in sterile amber glass pipettes. Smells absolute heaven and keeps the skin fully hydrated without chemicals.',
    author: 'EcoDIY',
    authorPts: 450,
    likes: 18,
    likedBy: [],
    comments: [
      { author: 'Meera Naturals', content: 'This is excellent! Amber glass is key to protecting cold-pressed oils from UV degradation.', date: '2026-06-20' }
    ],
    date: '2026-06-20T08:30:00Z',
    category: 'DIY'
  },
  {
    id: 3,
    type: 'Discussions',
    title: 'Best biodegradable brands in India?',
    content: 'Im looking to buy compostable trash bags and bamboo toothbrushes in bulk for my family. Aside from EcoVerse, are there specific Indian manufacturers you guys recommend that are verified plastic-free?',
    author: 'SustainableSoul',
    authorPts: 980,
    likes: 31,
    likedBy: [],
    comments: [
      { author: 'EarthMate', content: 'EcoVerse products are actually sourced directly from those makers, so you support them directly here! But try Kutch collectives too.', date: '2026-06-20' }
    ],
    date: '2026-06-20T12:00:00Z',
    category: 'Q&A'
  }
];

const initialChallenges = [
  { id: 'plasticFree', title: 'Plastic-Free Week', desc: 'Avoid using any single-use plastic cups, bags, or packaging for a full week.', progress: 60, target: 7, current: 4, rewardXP: 150, rewardPoints: 50, joined: true, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80', active: true },
  { id: 'byob', title: 'Bring Your Own Bottle', desc: 'Refill your reusable copper or steel water bottle and skip single-use water bottles.', progress: 80, target: 10, current: 8, rewardXP: 100, rewardPoints: 30, joined: true, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80', active: true },
  { id: 'zeroWaste', title: 'Zero Waste Month', desc: 'Compost organic waste, recycle everything else, and limit non-recyclable landfill bins to under 1kg.', progress: 0, target: 30, current: 0, rewardXP: 500, rewardPoints: 150, joined: false, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&q=80', active: false },
  { id: 'treePlantation', title: 'Tree Plantation Challenge', desc: 'Plant a local sapling in your area and share a photo to verify growth.', progress: 0, target: 1, current: 0, rewardXP: 300, rewardPoints: 100, joined: false, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&q=80', active: false }
];

export const EcoProvider = ({ children }) => {
  // Load initial state from LocalStorage or use defaults
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecoverse_user');
    return saved ? JSON.parse(saved) : {
      name: 'Arpita',
      email: 'arpita@ecoverse.org',
      role: 'customer', // 'customer' | 'seller' | 'admin'
      xp: 1250,
      level: 'Earth Guardian', // 'Green Starter' | 'Planet Protector' | 'Earth Guardian' | 'Sustainability Hero'
      points: 320,
      passport: {
        plasticSaved: 4.3, // kg
        carbonReduced: 18.0, // kg
        treesSupported: 12,
        waterSaved: 85.0 // L
      },
      collections: [
        { id: 1, name: 'My Zero-Waste Kitchen', items: [2, 6, 12] },
        { id: 2, name: 'My Sustainable College Essentials', items: [1, 3, 11] }
      ],
      wishlist: [1, 3, 5],
      coupons: []
    };
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ecoverse_cart');
    return saved ? JSON.parse(saved) : [
      { product: initialProducts[0], quantity: 2 } // 2 Bamboo Toothbrushes
    ];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ecoverse_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [makers, setMakers] = useState(() => {
    const saved = localStorage.getItem('ecoverse_makers');
    return saved ? JSON.parse(saved) : initialMakers;
  });

  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('ecoverse_posts');
    return saved ? JSON.parse(saved) : initialCommunityPosts;
  });

  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('ecoverse_challenges');
    return saved ? JSON.parse(saved) : initialChallenges;
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('ecoverse_search_history');
    return saved ? JSON.parse(saved) : ['Bamboo', 'Clay', 'Soap'];
  });

  const [notification, setNotification] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('ecoverse_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ecoverse_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ecoverse_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ecoverse_makers', JSON.stringify(makers));
  }, [makers]);

  useEffect(() => {
    localStorage.setItem('ecoverse_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('ecoverse_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('ecoverse_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Toast notification utility
  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Switch role Customer / Seller / Admin
  const switchRole = (newRole) => {
    let updatedProfile = { ...user, role: newRole };
    if (newRole === 'seller') {
      updatedProfile.name = 'Rajesh';
      updatedProfile.email = 'rajesh@karthikpottery.com';
      updatedProfile.shopName = 'Karthik Pottery';
    } else if (newRole === 'admin') {
      updatedProfile.name = 'Admin Director';
      updatedProfile.email = 'admin@ecoverse.org';
    } else {
      updatedProfile.name = 'Arpita';
      updatedProfile.email = 'arpita@ecoverse.org';
    }
    setUser(updatedProfile);
    triggerNotification(`Switched role to ${newRole.toUpperCase()} mode!`, 'info');
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerNotification(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    triggerNotification(`Removed product from cart!`, 'info');
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity: qty }
        : item
    ));
  };

  // Add review to Product
  const addReviewToProduct = (productId, reviewData) => {
    setProducts(prevProducts => prevProducts.map(prod => {
      if (prod.id === productId) {
        const currentRating = prod.rating || 4.5;
        const newRating = parseFloat(((currentRating * 5 + reviewData.rating) / 6).toFixed(1));
        return {
          ...prod,
          rating: newRating
        };
      }
      return prod;
    }));
    triggerNotification('Thank you! Your product review has been submitted.');
  };

  // Add review to Maker
  const addReviewToMaker = (makerId, reviewData) => {
    setMakers(prevMakers => prevMakers.map(maker => {
      if (maker.id === makerId) {
        const newReview = {
          author: user.name,
          rating: reviewData.rating,
          comment: reviewData.comment,
          date: new Date().toISOString().split('T')[0]
        };
        const currentRating = parseFloat(maker.stats.rating) || 4.5;
        const newRatingVal = parseFloat(((currentRating * maker.reviews.length + reviewData.rating) / (maker.reviews.length + 1)).toFixed(1));
        return {
          ...maker,
          stats: {
            ...maker.stats,
            rating: newRatingVal.toString()
          },
          reviews: [newReview, ...maker.reviews]
        };
      }
      return maker;
    }));
    triggerNotification('Thank you! Your maker review has been submitted.');
  };

  // Checkout process — saves stats and rewards points
  const checkout = (couponCode = '') => {
    if (cart.length === 0) return;

    let subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    let discount = 0;
    if (couponCode) {
      const match = user.coupons.find(c => c.code === couponCode && !c.used);
      if (match) {
        discount = match.value;
      }
    }

    const finalAmount = Math.max(0, subtotal - discount);

    // Calculate aggregated savings
    let plasticSaved = 0;
    let carbonReduced = 0;
    let waterSaved = 0;

    cart.forEach(item => {
      plasticSaved += (item.product.co2 * 10 * item.quantity); // simulated plastic weight conversion
      carbonReduced += (item.product.co2 * item.quantity);
      waterSaved += (item.product.water * item.quantity);
    });

    plasticSaved = parseFloat(plasticSaved.toFixed(2));
    carbonReduced = parseFloat(carbonReduced.toFixed(2));
    waterSaved = parseFloat(waterSaved.toFixed(2));

    // Calculate points and XP earned
    const pointsEarned = Math.floor(finalAmount * 0.1); // 10% cash back in eco points
    const xpEarned = Math.floor(finalAmount * 0.5); // 50% cash back in XP

    // Update user passport, points, and XP
    setUser(prev => {
      const nextXP = prev.xp + xpEarned;
      let nextLevel = prev.level;
      if (nextXP >= 2500) nextLevel = 'Sustainability Hero';
      else if (nextXP >= 1500) nextLevel = 'Earth Champion';
      else if (nextXP >= 800) nextLevel = 'Planet Protector';
      else nextLevel = 'Green Starter';

      // Check level up notification
      if (nextLevel !== prev.level) {
        setTimeout(() => {
          triggerNotification(`🎉 LEVEL UP! You are now a ${nextLevel}!`, 'info');
        }, 1500);
      }

      // Mark coupon as used if applied
      let updatedCoupons = prev.coupons;
      if (couponCode) {
        updatedCoupons = prev.coupons.map(c => c.code === couponCode ? { ...c, used: true } : c);
      }

      return {
        ...prev,
        points: prev.points + pointsEarned,
        xp: nextXP,
        level: nextLevel,
        coupons: updatedCoupons,
        passport: {
          plasticSaved: parseFloat((prev.passport.plasticSaved + plasticSaved / 1000).toFixed(2)), // convert g to kg
          carbonReduced: parseFloat((prev.passport.carbonReduced + carbonReduced).toFixed(2)),
          treesSupported: prev.passport.treesSupported + (carbonReduced > 5 ? 1 : 0),
          waterSaved: parseFloat((prev.passport.waterSaved + waterSaved).toFixed(2))
        }
      };
    });

    // Deduct stock from products
    setProducts(prevProducts => prevProducts.map(prod => {
      const cartItem = cart.find(item => item.product.id === prod.id);
      if (cartItem) {
        return { ...prod, stock: Math.max(0, prod.stock - cartItem.quantity) };
      }
      return prod;
    }));

    setCart([]);
    triggerNotification(`Order successful! Earned ${pointsEarned} Eco Points & ${xpEarned} XP! 🌱`);
    return { pointsEarned, xpEarned };
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    let active = false;
    setUser(prev => {
      const isIn = prev.wishlist.includes(productId);
      active = !isIn;
      return {
        ...prev,
        wishlist: isIn
          ? prev.wishlist.filter(id => id !== productId)
          : [...prev.wishlist, productId]
      };
    });
    triggerNotification(active ? 'Added to wishlist!' : 'Removed from wishlist!', 'info');
  };

  // Eco Collections
  const createCollection = (name) => {
    setUser(prev => {
      const newCol = {
        id: Date.now(),
        name,
        items: []
      };
      return {
        ...prev,
        collections: [...prev.collections, newCol]
      };
    });
    triggerNotification(`Collection "${name}" created!`);
  };

  const addToCollection = (collectionId, productId) => {
    setUser(prev => {
      return {
        ...prev,
        collections: prev.collections.map(col => {
          if (col.id === collectionId) {
            if (col.items.includes(productId)) return col;
            return { ...col, items: [...col.items, productId] };
          }
          return col;
        })
      };
    });
    triggerNotification('Added to collection!');
  };

  const removeFromCollection = (collectionId, productId) => {
    setUser(prev => {
      return {
        ...prev,
        collections: prev.collections.map(col => {
          if (col.id === collectionId) {
            return { ...col, items: col.items.filter(id => id !== productId) };
          }
          return col;
        })
      };
    });
    triggerNotification('Removed from collection!');
  };

  // Community postings
  const addCommunityPost = (type, title, content, category) => {
    const newPost = {
      id: Date.now(),
      type,
      title,
      content,
      category: category || 'Lifestyle',
      author: user.name,
      authorPts: user.xp,
      likes: 0,
      likedBy: [],
      comments: [],
      date: new Date().toISOString()
    };
    setCommunityPosts(prev => [newPost, ...prev]);

    // Give points for writing posts
    setUser(prev => ({
      ...prev,
      points: prev.points + 15,
      xp: prev.xp + 50
    }));
    triggerNotification('Post created! Earned 15 Eco Points & 50 XP! 💬');
  };

  const likePost = (postId) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = post.likedBy && post.likedBy.includes(user.name);
        const newLikedBy = liked 
          ? (post.likedBy || []).filter(name => name !== user.name)
          : [...(post.likedBy || []), user.name];
        return {
          ...post,
          likes: liked ? post.likes - 1 : post.likes + 1,
          likedBy: newLikedBy
        };
      }
      return post;
    }));
  };

  const addComment = (postId, content) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { author: user.name, content, date: new Date().toISOString() }
          ]
        };
      }
      return post;
    }));
    triggerNotification('Comment added!');
  };

  // Eco Challenges
  const enrollChallenge = (challengeId) => {
    setChallenges(prev => prev.map(ch =>
      ch.id === challengeId ? { ...ch, joined: true } : ch
    ));
    triggerNotification('Successfully joined challenge! Track your progress.');
  };

  const submitChallengeProof = (challengeId) => {
    let rewards = { xp: 0, points: 0 };
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        rewards = { xp: ch.rewardXP, points: ch.rewardPoints };
        return { ...ch, progress: 100, current: ch.target };
      }
      return ch;
    }));

    setUser(prev => ({
      ...prev,
      points: prev.points + rewards.points,
      xp: prev.xp + rewards.xp
    }));

    triggerNotification(`Proof approved! Earned ${rewards.points} Eco Points & ${rewards.xp} XP! 🏆`);
  };

  // Redeem Rewards
  const redeemReward = (pointsCost, discountValue, couponName) => {
    if (user.points < pointsCost) {
      triggerNotification('Insufficient Eco Points!', 'error');
      return false;
    }

    const couponCode = `ECO-${couponName.toUpperCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

    setUser(prev => ({
      ...prev,
      points: prev.points - pointsCost,
      coupons: [
        ...prev.coupons,
        { code: couponCode, name: couponName, value: discountValue, used: false, date: new Date().toISOString() }
      ]
    }));

    triggerNotification(`Redeemed! Your coupon is: ${couponCode}`);
    return couponCode;
  };

  // Follow Maker
  const followMaker = (makerId) => {
    setMakers(prevMakers => prevMakers.map(maker => {
      if (maker.id === makerId) {
        return {
          ...maker,
          stats: {
            ...maker.stats,
            followers: maker.stats.followers + 1
          }
        };
      }
      return maker;
    }));
    triggerNotification('You are now following this maker!');
  };

  // Smart Search suggestions history
  const addSearchQuery = (query) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 6);
    });
  };

  // Mock AI Generator tools
  const generateAIDescription = async (title, materials, keyFeatures) => {
    // Simulated delay to feel organic
    await new Promise(resolve => setTimeout(resolve, 800));
    return `Crafted carefully with premium, responsibly sourced ${materials || 'natural inputs'}, the all-new ${title || 'Eco Product'} is engineered to elevate your daily lifestyle while keeping carbon footprints minimal. Featuring ${keyFeatures || 'biodegradable properties'}, this zero-waste alternative fully replaces standard plastic products. Handcrafted by local community artisans, it ships in 100% biodegradable kraft packaging. Add this sustainable story to your household and support ethical livelihoods.`;
  };

  const generateAISEO = async (title, materials) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      titleTag: `Buy Handcrafted ${title} | 100% Sustainable & Plastic-Free | EcoVerse`,
      metaDescription: `Discover the premium ${title} made ethically from organic ${materials || 'raw fibers'}. Biodegradable, zero-waste shipping, and direct support for rural artisan cooperatives. Shop the green transition now!`,
      keywords: `sustainable ${title}, buy ${title} online, eco-friendly ${materials}, plastic-free toothbrush, zero waste india, organic home goods`
    };
  };

  const sendAIPrompt = async (chatHistory) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lastMsg = chatHistory[chatHistory.length - 1].content.toLowerCase();
    
    if (lastMsg.includes('certification') || lastMsg.includes('certify')) {
      return "To improve your sustainability credentials on EcoVerse, we recommend obtaining a standard GOTS (Global Organic Textile Standard) or EPCH Fair Wages certification. We also offer direct micro-grants for local biomass kiln installations which reduce carbon emissions by up to 45%.";
    }
    if (lastMsg.includes('packaging') || lastMsg.includes('plastic')) {
      return "Excellent question. Converting to recycled Kraft paper boxes or cotton pouches can save an average of 40g of plastic per shipment. EcoVerse provides compostable honeycombed paper padding at bulk discount rates for our registered makers.";
    }
    if (lastMsg.includes('shipping') || lastMsg.includes('carbon')) {
      return "We track delivery carbon footprints based on carrier vehicle types. You can optimize your scores by warehousing items in regional hubs or utilizing local electric two-wheeler delivery services partnered with EcoVerse.";
    }
    return "Hello! I am your AI Sustainability Assistant. Ask me how to optimize your supply chain, reduce shipping plastic, source eco-certified raw materials, or get funding for solar energy wheels.";
  };

  return (
    <EcoContext.Provider value={{
      user,
      cart,
      products,
      makers,
      communityPosts,
      challenges,
      searchHistory,
      notification,
      switchRole,
      addToCart,
      removeFromCart,
      updateCartQty,
      addReviewToProduct,
      addReviewToMaker,
      checkout,
      toggleWishlist,
      createCollection,
      addToCollection,
      removeFromCollection,
      addCommunityPost,
      likePost,
      addComment,
      enrollChallenge,
      submitChallengeProof,
      redeemReward,
      followMaker,
      addSearchQuery,
      generateAIDescription,
      generateAISEO,
      sendAIPrompt,
      triggerNotification
    }}>
      {children}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: notification.type === 'error' ? '#ef4444' : 'var(--primary)',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <span>{notification.message}</span>
        </div>
      )}
    </EcoContext.Provider>
  );
};

export const useEco = () => useContext(EcoContext);
