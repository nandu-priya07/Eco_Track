const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { 
    id: 1, 
    name: "Reusable Bamboo Straws", 
    category: "Kitchen", 
    price: 12.99, 
    score: 95, 
    image: "https://images.unsplash.com/photo-1590756254933-2873d72a83b6?w=500&q=80", 
    tags: ["zero-waste", "bamboo"], 
    features: ["100% Biodegradable", "Includes cleaning brush"] 
  },
  { 
    id: 2, 
    name: "Solar Power Bank", 
    category: "Electronics", 
    price: 39.99, 
    score: 88, 
    image: "https://images.unsplash.com/photo-1620915606622-c322b7c4a179?w=500&q=80", 
    tags: ["renewable", "tech"], 
    features: ["Solar charging capability", "Recycled materials"] 
  },
  { 
    id: 3, 
    name: "Organic Cotton Tote", 
    category: "Accessories", 
    price: 15.00, 
    score: 92, 
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640df1?w=500&q=80", 
    tags: ["organic", "reusable"], 
    features: ["Fair trade certified", "100% Organic Cotton"] 
  },
  { 
    id: 4, 
    name: "Beeswax Food Wraps", 
    category: "Kitchen", 
    price: 18.50, 
    score: 97, 
    image: "https://images.unsplash.com/photo-1585002015024-699ceeb3782b?w=500&q=80", 
    tags: ["plastic-free", "biodegradable"], 
    features: ["Washable", "Natural antibacterial"] 
  },
  {
    id: 5,
    name: "Bamboo Toothbrush Set",
    category: "Bathroom",
    price: 14.50,
    score: 96,
    image: "https://images.unsplash.com/photo-1605600659929-e85df649fb9a?w=500&q=80",
    tags: ["bamboo", "plastic-free"],
    features: ["Biodegradable handle", "BPA-free bristles"]
  },
  {
    id: 6,
    name: "Compost Bin",
    category: "Kitchen",
    price: 45.00,
    score: 94,
    image: "https://images.unsplash.com/photo-1622322300063-41bb7270e5b8?w=500&q=80",
    tags: ["compost", "zero-waste"],
    features: ["Odor filter", "Stainless steel interior"]
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/analyze', (req, res) => {
  // Dummy endpoint to analyze footprint
  res.json({
    success: true,
    footprintScore: 78,
    suggestions: [
      "Use public transport more often",
      "Switch to renewable energy",
      "Reduce meat consumption"
    ]
  });
});

app.post('/api/recommend', (req, res) => {
  const { category, name, location } = req.body;
  let recommended = products;
  if(category) {
    recommended = products.filter(p => 
      (Array.isArray(p.tags) && p.tags.includes(category.toLowerCase())) || 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (recommended.length === 0) {
      recommended = products; // Fallback so we always show something
  }
  
  res.json(recommended);
});

// ─── Eco Chatbot ────────────────────────────────────────────────────────────
const ecoKnowledge = [
  {
    keywords: ['hello', 'hi', 'hey', 'greet', 'start', 'help'],
    reply: `👋 Hello! I'm EcoBot, your personal sustainability guide!\n\nI can help you with:\n🌱 Eco-friendly product tips\n♻️ Recycling & waste reduction\n🌍 Carbon footprint advice\n💧 Water conservation\n⚡ Energy saving at home\n🏆 EcoTrack points & rewards\n\nWhat would you like to explore today?`,
  },
  {
    keywords: ['recycle', 'recycling', 'waste', 'trash', 'bin', 'sort'],
    reply: `♻️ **Smart Recycling Guide:**\n\n• 📦 Paper & Cardboard — Remove tape & flatten boxes\n• 🥤 Plastic — Rinse containers, check number (1-7)\n• 🍶 Glass — Separate by colour if required\n• 🥫 Metal/Cans — Rinse and crush to save space\n• 📱 E-Waste — Never bin electronics; use certified e-waste centres\n• 🥦 Food Scraps — Compost! It diverts 30% of household waste\n\n💡 Tip: When in doubt, check your local council's recycling guide.`,
  },
  {
    keywords: ['carbon', 'footprint', 'emission', 'co2', 'climate', 'greenhouse'],
    reply: `🌍 **Reducing Your Carbon Footprint:**\n\n🚗 Transport (biggest impact):\n• Walk, cycle, or use public transport\n• Combine errands into one trip\n• Consider an EV or car-share\n\n🏠 Home energy:\n• Switch to LED bulbs (saves ~75% energy)\n• Use a programmable thermostat\n• Air-dry clothes instead of tumble-drying\n\n🥦 Diet:\n• Eat more plant-based meals\n• Buy local & seasonal produce\n• Reduce food waste\n\n✈️ Flights account for ~8% of global emissions — consider train travel or offset your flights.`,
  },
  {
    keywords: ['water', 'save water', 'conserve', 'drought', 'tap'],
    reply: `💧 **Water Conservation Tips:**\n\n🚿 In the bathroom:\n• Shorten showers by 2 min = saves ~10 litres\n• Fix leaky taps (1 drip/sec = 11,000 L/year!)\n• Install a dual-flush toilet\n\n🍽️ In the kitchen:\n• Only run dishwashers when full\n• Boil only the water you need\n• Rinse veg in a bowl, not running water\n\n🌱 Garden:\n• Water at dawn or dusk to reduce evaporation\n• Collect rainwater for plants\n• Choose drought-resistant plants\n\n💡 Average person uses ~150L/day — small changes add up!`,
  },
  {
    keywords: ['energy', 'electric', 'power', 'solar', 'save electricity', 'bills'],
    reply: `⚡ **Energy Saving at Home:**\n\n💡 Lighting:\n• Switch to LED (uses 75% less energy)\n• Use smart bulbs with timers\n\n🔌 Appliances:\n• Unplug devices on standby (saves ~10% on bills)\n• A+ rated appliances use up to 50% less energy\n• Use cold wash for laundry\n\n🌡️ Heating/Cooling:\n• Turn down thermostat by 1°C = 10% energy saving\n• Seal drafts around doors & windows\n• Use curtains to retain heat\n\n☀️ Renewable options:\n• Solar panels pay back in 6-10 years\n• Green energy tariffs available from most suppliers`,
  },
  {
    keywords: ['product', 'recommend', 'buy', 'shop', 'eco', 'best', 'sustainable'],
    reply: `🛒 **Our Top Eco Product Picks:**\n\n🌿 Bamboo Toothbrush Set (Score: 96/100)\n→ Biodegradable handle, BPA-free bristles\n\n🐝 Beeswax Food Wraps (Score: 97/100)\n→ Replaces plastic wrap, washable, antibacterial\n\n☀️ Solar Power Bank (Score: 88/100)\n→ Charge devices using the sun!\n\n🥤 Reusable Bamboo Straws (Score: 95/100)\n→ Zero-waste alternative, includes cleaning brush\n\n👜 Organic Cotton Tote (Score: 92/100)\n→ Fair-trade certified, replaces 100s of plastic bags\n\nVisit our Products page to see scores, reviews & buy! 🏪`,
  },
  {
    keywords: ['point', 'reward', 'badge', 'level', 'gamif', 'challenge', 'earn'],
    reply: `🏆 **EcoTrack Rewards System:**\n\n🌟 How to earn Eco Points:\n• 🛒 Purchase eco products → +50 pts each\n• ♻️ Log a recycling session → +20 pts\n• 🚲 Use green transport → +15 pts\n• 📖 Complete eco challenges → +100 pts\n• 🌱 Daily check-in streak → +5 pts/day\n\n🎖️ Levels:\n• 🌱 Seedling (0-199 pts)\n• 🌿 Green Sprout (200-499 pts)\n• 🌳 Eco Warrior (500-999 pts)\n• 🌍 Planet Guardian (1000+ pts)\n\n🎁 Redeem points for discounts on future purchases!\nHead to the Gamification page to start your challenges!`,
  },
  {
    keywords: ['plastic', 'single-use', 'straw', 'bottle', 'bag', 'packaging'],
    reply: `🚫 **Beating Single-Use Plastic:**\n\n❌ Replace these with better alternatives:\n• 🥤 Straws → Bamboo or steel reusable straws\n• 🧴 Bottles → Insulated stainless steel bottle\n• 💼 Carrier bags → Canvas or jute tote bags\n• 🧻 Cling film → Beeswax wraps or silicone lids\n• ☕ Coffee cups → Reusable travel mug\n• 🛍️ Produce bags → Mesh reusable bags\n\n📊 Impact: Switching to reusables can eliminate 700+ single-use items per person per year!\n\nFind all these alternatives in our shop 🛒`,
  },
  {
    keywords: ['food', 'eat', 'diet', 'vegan', 'vegetarian', 'meat', 'plant'],
    reply: `🥦 **Sustainable Eating Guide:**\n\n🌱 Biggest impact you can make:\n• Swapping 1 beef meal/week → saves 2.3 kg CO₂\n• Going plant-based for a year → saves ~0.8 tonnes CO₂\n\n🍽️ Practical tips:\n• Buy seasonal, local produce\n• Shop at farmers markets\n• Plan meals to reduce food waste\n• Compost leftovers\n• Choose sustainable seafood\n\n📦 Packaging:\n• Buy in bulk to reduce packaging\n• Avoid pre-packaged salads & fruit\n• Bring reusable containers to deli counters\n\n🌍 Food production = 26% of global emissions — your plate matters!`,
  },
  {
    keywords: ['transport', 'car', 'travel', 'flight', 'plane', 'cycle', 'bike', 'bus', 'train'],
    reply: `🚗 **Green Transport Guide:**\n\n🚲 Best options (zero emissions):\n• Walking & cycling — healthiest & greenest\n• Electric scooter/e-bike — great for urban areas\n\n🚌 Low carbon options:\n• Bus (3x less CO₂ than car)\n• Train (6x less CO₂ per km than flying!)\n• Metro/Tram — fastest in cities\n\n🚗 If you need a car:\n• EV charged on renewables = near-zero emissions\n• Carpool with colleagues or neighbours\n• Keep tyres inflated (saves 3% fuel)\n\n✈️ One long-haul flight = up to 3 tonnes CO₂\n→ Choose trains where possible, offset unavoidable flights`,
  },
  {
    keywords: ['compost', 'garden', 'soil', 'worm', 'organic', 'grow'],
    reply: `🌱 **Composting & Gardening:**\n\n🗑️ Starting a compost bin:\n• Brown materials: cardboard, leaves, twigs (carbon)\n• Green materials: veg peels, grass, coffee grounds (nitrogen)\n• Layer 3:1 brown:green ratio\n• Add water to keep moist, turn weekly\n• Ready in 2-6 months!\n\n❌ Never compost: meat, dairy, diseased plants, oil\n\n🌿 In your garden:\n• Plant pollinator-friendly flowers (lavender, sunflowers)\n• Grow your own herbs & veg\n• Avoid chemical pesticides\n• Collect rainwater\n• Leave a wild corner for wildlife\n\n🪱 Worm composting (vermicomposting) is perfect for flats!`,
  },
  {
    keywords: ['score', 'rating', 'ecolabel', 'certified', 'badge', 'rating'],
    reply: `📊 **Understanding Eco Scores:**\n\nEcoTrack scores every product 0-100 based on:\n\n• 🌱 **Materials** (30%) — Organic, recycled, biodegradable?\n• 🏭 **Manufacturing** (25%) — Energy use, fair trade, labour?\n• 📦 **Packaging** (20%) — Minimal, recyclable, compostable?\n• 🚚 **Transport** (15%) — Local production, carbon offsets?\n• ♻️ **End-of-life** (10%) — Can it be recycled or composted?\n\n🏆 Score guide:\n• 90-100: Exceptional 🌟\n• 75-89: Great ✅\n• 60-74: Good 👍\n• Below 60: Room to improve\n\nAll products in our shop score 85+ — only the best!`,
  },
];

const fallbackReplies = [
  `🌿 Great question! While I focus on eco-topics, I'm always learning.\n\nTry asking me about:\n• ♻️ Recycling tips\n• 🌍 Reducing your carbon footprint\n• 💧 Saving water at home\n• ⚡ Energy efficiency\n• 🛒 Eco-friendly products\n• 🏆 EcoTrack rewards & challenges`,
  `🤔 I'm not sure about that specific topic, but I'd love to help you on your eco journey!\n\nSome things I'm great at:\n• Sustainable living tips\n• Product recommendations\n• Carbon footprint advice\n• Recycling guides\n\nWhat eco-challenge can I help you tackle today?`,
];

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const lower = message.toLowerCase();
  let reply = null;

  for (const entry of ecoKnowledge) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      reply = entry.reply;
      break;
    }
  }

  if (!reply) {
    reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }

  // Simulate slight delay for realism
  setTimeout(() => res.json({ reply }), 400 + Math.random() * 600);
});
// ─────────────────────────────────────────────────────────────────────────────

// ─── In-memory data stores ────────────────────────────────────────────────────
let users = [
  // Seed a demo merchant and customer so users can log in immediately
  {
    id: 'u1',
    name: 'Demo Merchant',
    email: 'merchant@demo.com',
    password: 'demo123',
    role: 'merchant',
    storeName: 'Green Leaf Co.',
  },
  {
    id: 'u2',
    name: 'Demo Customer',
    email: 'customer@demo.com',
    password: 'demo123',
    role: 'customer',
  },
];

let reviews = [
  {
    id: 'r1',
    productId: 1,
    userId: 'u2',
    reviewerName: 'Demo Customer',
    rating: 5,
    comment: 'Amazing bamboo straws — zero plastic guilt! Lasted over a year already.',
    date: new Date('2026-03-10').toISOString(),
  },
  {
    id: 'r2',
    productId: 5,
    userId: 'u2',
    reviewerName: 'Demo Customer',
    rating: 4,
    comment: 'Great toothbrush set. Feels premium and the biodegradable handle is a game-changer.',
    date: new Date('2026-03-22').toISOString(),
  },
];

let nextUserId = 3;
let nextReviewId = 3;
// ─────────────────────────────────────────────────────────────────────────────

// ─── Auth Endpoints ───────────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, storeName } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!['customer', 'merchant'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const user = {
    id: `u${nextUserId++}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role,
    ...(role === 'merchant' && { storeName: storeName?.trim() || name.trim() }),
  };
  users.push(user);

  const { password: _pw, ...safeUser } = user;
  res.status(201).json({ user: safeUser });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  if (role && user.role !== role) {
    return res.status(403).json({ error: `This account is registered as a ${user.role}, not a ${role}.` });
  }

  const { password: _pw, ...safeUser } = user;
  res.json({ user: safeUser });
});

// ─── Merchant Product Endpoints ───────────────────────────────────────────────

// Helper: get merchant from header
function getMerchant(req, res) {
  const userId = req.headers['x-user-id'];
  const user = users.find(u => u.id === userId);
  if (!user || user.role !== 'merchant') {
    res.status(403).json({ error: 'Merchant access required.' });
    return null;
  }
  return user;
}

// GET /api/merchant/products — list own products
app.get('/api/merchant/products', (req, res) => {
  const merchant = getMerchant(req, res);
  if (!merchant) return;

  const own = products.filter(p => p.merchantId === merchant.id);
  res.json(own);
});

// POST /api/merchant/products — add product
app.post('/api/merchant/products', (req, res) => {
  const merchant = getMerchant(req, res);
  if (!merchant) return;

  const { name, category, price, score, tags, features } = req.body;

  if (!name || !category || price === undefined || !score) {
    return res.status(400).json({ error: 'name, category, price and score are required.' });
  }

  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 100;

  const product = {
    id: newId,
    name: name.trim(),
    category,
    price: parseFloat(price),
    score: parseInt(score),
    tags: Array.isArray(tags) ? tags : [],
    features: Array.isArray(features) ? features : [],
    images: [],
    image: '',  // backward-compat single image
    merchantId: merchant.id,
    merchantName: merchant.storeName || merchant.name,
  };

  products.push(product);
  res.status(201).json(product);
});

// PUT /api/merchant/products/:id — update product
app.put('/api/merchant/products/:id', (req, res) => {
  const merchant = getMerchant(req, res);
  if (!merchant) return;

  const id = parseInt(req.params.id);
  const idx = products.findIndex(p => p.id === id && p.merchantId === merchant.id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found or not yours.' });
  }

  const { name, category, price, score, tags, features } = req.body;

  products[idx] = {
    ...products[idx],
    name: name?.trim() || products[idx].name,
    category: category || products[idx].category,
    price: price !== undefined ? parseFloat(price) : products[idx].price,
    score: score !== undefined ? parseInt(score) : products[idx].score,
    tags: Array.isArray(tags) ? tags : products[idx].tags,
    features: Array.isArray(features) ? features : products[idx].features,
  };

  res.json(products[idx]);
});

// DELETE /api/merchant/products/:id — delete product
app.delete('/api/merchant/products/:id', (req, res) => {
  const merchant = getMerchant(req, res);
  if (!merchant) return;

  const id = parseInt(req.params.id);
  const idx = products.findIndex(p => p.id === id && p.merchantId === merchant.id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found or not yours.' });
  }

  products.splice(idx, 1);
  res.json({ success: true });
});

// ─── Reviews Endpoints ────────────────────────────────────────────────────────

// GET /api/products/:id/reviews
app.get('/api/products/:id/reviews', (req, res) => {
  const productId = parseInt(req.params.id);
  const productReviews = reviews
    .filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(productReviews);
});

// POST /api/products/:id/reviews
app.post('/api/products/:id/reviews', (req, res) => {
  const userId = req.headers['x-user-id'];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({ error: 'You must be logged in to review.' });
  }
  if (user.role !== 'customer') {
    return res.status(403).json({ error: 'Only customers can write reviews.' });
  }

  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  // One review per user per product
  const existing = reviews.find(r => r.productId === productId && r.userId === userId);
  if (existing) {
    return res.status(409).json({ error: 'You have already reviewed this product.' });
  }

  const { rating, comment, reviewerName } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }
  if (!comment || comment.trim().length < 5) {
    return res.status(400).json({ error: 'Review comment is too short.' });
  }

  const review = {
    id: `r${nextReviewId++}`,
    productId,
    userId,
    reviewerName: reviewerName || user.name,
    rating: parseInt(rating),
    comment: comment.trim(),
    date: new Date().toISOString(),
  };

  reviews.push(review);
  res.status(201).json(review);
});

// ─────────────────────────────────────────────────────────────────────────────

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`\n🌿 EcoTrack Server Ready!`);
    console.log(`📦 Products: ${products.length}`);
    console.log(`👥 Demo accounts:`);
    console.log(`   🏪 Merchant: merchant@demo.com / demo123`);
    console.log(`   🌿 Customer: customer@demo.com / demo123\n`);
});
