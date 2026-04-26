export type ActivityItem = {
  time: string;
  title: string;
  location: string;
  notes?: string;
  urgent?: boolean;
};

export type DayPlan = {
  date: string;
  day: string;
  city: 'Osaka' | 'Kyoto' | 'Tokyo';
  activities: ActivityItem[];
};

export type Hotel = {
  name: string;
  brand: string;
  city: 'Osaka' | 'Kyoto' | 'Tokyo';
  checkIn: string;
  checkOut: string;
  nights: number;
  address: string;
  phone: string;
  bookingRef: string;
  apartmentType: string;
  features: string[];
  nearbyStation: string;
};

export type TransportRoute = {
  from: string;
  to: string;
  train: string;
  duration: string;
  price: string;
  date: string;
  notes?: string;
};

export type FoodItem = {
  name: string;
  type: string;
  city: 'Osaka' | 'Kyoto' | 'Tokyo' | 'All';
  mustTry: boolean;
  notes?: string;
};

export type BudgetItem = {
  category: string;
  allocated: number;
  currency: 'AUD' | 'JPY';
  notes?: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  urgent?: boolean;
  deadline?: string;
  completed: boolean;
};

export const CITY_COLORS: Record<string, string> = {
  Osaka: '#C41E3A',
  Kyoto: '#8B9D6F',
  Tokyo: '#2A3F6F',
};

export const itinerary: DayPlan[] = [
  {
    date: 'Sep 11',
    day: 'Fri',
    city: 'Tokyo',
    activities: [
      { time: 'Arrives', title: 'Fly into Tokyo (Haneda)', location: 'Haneda Airport', notes: 'Check transport options to Shinjuku — N\'EX or Monorail+JR' },
      { time: 'Afternoon', title: 'Check in MIMARU Shinjuku', location: 'Shinjuku, Tokyo', notes: 'MIMARU Tokyo Shinjuku West — apartment-style with kitchen' },
      { time: 'Evening', title: 'Explore Shinjuku', location: 'Shinjuku', notes: 'Easy dinner near hotel, recover from flight. Aila-friendly ramen.' },
    ],
  },
  {
    date: 'Sep 12',
    day: 'Sat',
    city: 'Tokyo',
    activities: [
      { time: '9:00 AM', title: 'Tsukiji Outer Market', location: 'Tsukiji', notes: 'Breakfast sushi & tamagoyaki. Great for Aila.' },
      { time: '11:30 AM', title: 'teamLab Borderless', location: 'Azabudai Hills, Minato', notes: 'Pre-book tickets! Opens June 2024. Kid favourite.', urgent: true },
      { time: '3:00 PM', title: 'Odaiba Seaside Park', location: 'Odaiba', notes: 'Rainbow Bridge views, beach walk, TeamLab is nearby.' },
      { time: '6:30 PM', title: 'Dinner at Odaiba', location: 'Odaiba', notes: 'DiverCity or Aqua City malls have family-friendly options.' },
    ],
  },
  {
    date: 'Sep 13',
    day: 'Sun',
    city: 'Tokyo',
    activities: [
      { time: '8:30 AM', title: 'Meiji Shrine', location: 'Harajuku', notes: 'Arrive early. Serene forest walk. Free entry.' },
      { time: '10:30 AM', title: 'Yoyogi Park', location: 'Harajuku', notes: 'Picnic if weather good. Aila can run around.' },
      { time: '12:00 PM', title: 'Takeshita Street lunch', location: 'Harajuku', notes: 'Crepe stalls and quirky food. Aila will love it.' },
      { time: '2:30 PM', title: 'Shibuya Crossing', location: 'Shibuya', notes: 'World\'s busiest crossing. View from Scramble Square or Starbucks.' },
    ],
  },
  {
    date: 'Sep 14',
    day: 'Mon',
    city: 'Tokyo',
    activities: [
      { time: '9:00 AM', title: 'Senso-ji Temple', location: 'Asakusa', notes: 'Nakamise Shopping Street for souvenirs. Traditional rickshaw rides.' },
      { time: '11:30 AM', title: 'Tokyo Skytree', location: 'Asakusa', notes: 'Views over Tokyo. Pre-book tickets to skip queues.', urgent: true },
      { time: '2:00 PM', title: 'Akihabara', location: 'Akihabara', notes: 'Electronics district. Pokemon Centre, anime goods for Aila.' },
      { time: '6:00 PM', title: 'Shinjuku dinner', location: 'Shinjuku', notes: 'Last Tokyo dinner — try Omoide Yokocho (Memory Lane).' },
    ],
  },
  {
    date: 'Sep 15',
    day: 'Tue',
    city: 'Kyoto',
    activities: [
      { time: '9:00 AM', title: 'Shinkansen: Tokyo → Kyoto', location: 'Tokyo Station', notes: 'Hikari/Nozomi ~2h15m. Use JR Pass. Luggage forward to Osaka hotel.', urgent: true },
      { time: '11:30 AM', title: 'Check in MIMARU Kyoto', location: 'Kyoto Station Area', notes: 'MIMARU Kyoto Station. Drop bags and explore.' },
      { time: '2:00 PM', title: 'Fushimi Inari Shrine', location: 'Fushimi', notes: 'Thousands of torii gates. Early afternoon less crowded. Free.' },
      { time: '5:00 PM', title: 'Nishiki Market', location: 'Central Kyoto', notes: '"Kyoto\'s Kitchen" — snacks and local produce. Short walk from Shijo.' },
    ],
  },
  {
    date: 'Sep 16',
    day: 'Wed',
    city: 'Kyoto',
    activities: [
      { time: '8:00 AM', title: 'Arashiyama Bamboo Grove', location: 'Arashiyama', notes: 'Go EARLY — bamboo at 8am is magical & quiet. Rickshaw ride option.' },
      { time: '10:00 AM', title: 'Tenryu-ji Temple & Garden', location: 'Arashiyama', notes: 'UNESCO garden. Cherry trees & pond. ¥500 entry.' },
      { time: '12:00 PM', title: 'Lunch in Arashiyama', location: 'Arashiyama', notes: 'Tofu cuisine area. Shojin ryori (Buddhist veg meals).' },
      { time: '2:30 PM', title: 'Kinkaku-ji (Golden Pavilion)', location: 'Northwest Kyoto', notes: 'Book timed entry. Golden temple reflected in lake. Iconic.', urgent: true },
    ],
  },
  {
    date: 'Sep 17',
    day: 'Thu',
    city: 'Kyoto',
    activities: [
      { time: '9:00 AM', title: 'Nijo Castle', location: 'Central Kyoto', notes: '"Nightingale floors" creak to detect intruders. Great for Aila.' },
      { time: '11:00 AM', title: 'Philosopher\'s Path', location: 'Higashiyama', notes: '2km canal walk. Lined with cherry trees (beautiful in any season).' },
      { time: '1:00 PM', title: 'Lunch near Nanzen-ji', location: 'Higashiyama', notes: 'Yudofu (tofu hot pot) restaurants. Traditional Kyoto cuisine.' },
      { time: '3:00 PM', title: 'Gion Geisha District', location: 'Gion', notes: 'Evening walk for maiko sightings around Hanamikoji Street at dusk.' },
      { time: '5:30 PM', title: 'Kaiseki dinner', location: 'Gion', notes: 'Book in advance! Multi-course traditional meal.', urgent: true },
    ],
  },
  {
    date: 'Sep 18',
    day: 'Fri',
    city: 'Kyoto',
    activities: [
      { time: '9:00 AM', title: 'Kiyomizu-dera Temple', location: 'East Kyoto', notes: 'Wooden stage temple on hillside. Views of Kyoto skyline.' },
      { time: '11:00 AM', title: 'Sannenzaka & Ninenzaka', location: 'Higashiyama', notes: 'Preserved stone-paved lanes. Shops and cafes. Very photogenic.' },
      { time: '2:00 PM', title: 'Kyoto Cooking Class', location: 'Central Kyoto', notes: 'Book in advance! Aila-friendly classes available.', urgent: true },
      { time: '6:00 PM', title: 'Silver Week note', location: 'All Kyoto', notes: 'Sep 19-23 is Silver Week — busy! Book everything now.', urgent: true },
    ],
  },
  {
    date: 'Sep 19',
    day: 'Sat',
    city: 'Osaka',
    activities: [
      { time: '9:00 AM', title: 'Shinkansen: Kyoto → Osaka', location: 'Kyoto Station', notes: 'JR Shinkansen ~15min or Hankyu/JR rapid ~30min. JR Pass valid.' },
      { time: '10:30 AM', title: 'Check in MIMARU Osaka', location: 'Namba, Osaka', notes: 'MIMARU Osaka Namba. Walking distance to Dotonbori.' },
      { time: '1:00 PM', title: 'Dotonbori', location: 'Namba', notes: 'Glico Man sign, street food heaven. Aila loves Takoyaki here.' },
      { time: '3:30 PM', title: 'Kuromon Ichiba Market', location: 'Nipponbashi', notes: '"Osaka\'s Kitchen" — fresh uni, wagyu skewers, crab claws to eat walking.' },
    ],
  },
  {
    date: 'Sep 20',
    day: 'Sun',
    city: 'Osaka',
    activities: [
      { time: '9:00 AM', title: 'Osaka Castle', location: 'Chuo Ward', notes: 'Interactive history museum inside. Grounds are free. Great for Aila.' },
      { time: '11:30 AM', title: 'Osaka Castle Park', location: 'Chuo Ward', notes: 'Picnic or lunch in park. Cherry tree grove paths.' },
      { time: '2:00 PM', title: 'Kaiyukan Aquarium', location: 'Tempozan', notes: 'One of world\'s best aquariums. Whale sharks! Aila will love it.', urgent: true },
      { time: '6:00 PM', title: 'Tempozan Ferris Wheel', location: 'Tempozan', notes: 'Views over Osaka Bay. Illuminated at night.' },
    ],
  },
  {
    date: 'Sep 21',
    day: 'Mon',
    city: 'Osaka',
    activities: [
      { time: '10:00 AM', title: 'Shinsekai District', location: 'Naniwa Ward', notes: 'Retro 1920s district. Tsutenkaku Tower. Kushikatsu (deep-fried skewers).' },
      { time: '12:00 PM', title: 'Kushikatsu lunch', location: 'Shinsekai', notes: 'Rule: dip once only! Traditional Osaka kushikatsu bar.' },
      { time: '2:00 PM', title: 'Shinsaibashi Shopping', location: 'Shinsaibashi', notes: 'America-mura (vintage), Shinsaibashi-suji (covered arcade). Last shopping.' },
      { time: '5:00 PM', title: 'Namba Yasaka Shrine', location: 'Namba', notes: 'Giant lion head shrine. Very unusual and photogenic.' },
    ],
  },
  {
    date: 'Sep 22',
    day: 'Tue',
    city: 'Osaka',
    activities: [
      { time: '10:00 AM', title: 'Day trip: Nara', location: 'Nara', notes: 'JR Osaka to Nara 45min. Feed deer (tame). Todai-ji Giant Buddha. Free deer!', urgent: false },
      { time: '1:00 PM', title: 'Todai-ji Temple', location: 'Nara', notes: 'World\'s largest wooden building. Giant bronze Buddha. Aila loves the deer.' },
      { time: '4:00 PM', title: 'Return to Osaka', location: 'Namba', notes: 'Easy return on JR. Last dinner in Osaka — wagyu or sushi.' },
      { time: '7:00 PM', title: 'Final Osaka dinner', location: 'Dotonbori / Namba', notes: 'Farewell dinner. Try Mizuno restaurant for okonomiyaki.' },
    ],
  },
  {
    date: 'Sep 23',
    day: 'Wed',
    city: 'Osaka',
    activities: [
      { time: '8:00 AM', title: 'Check out MIMARU Osaka', location: 'Namba', notes: 'Store luggage if flight is afternoon. Explore final morning.' },
      { time: '10:00 AM', title: 'Last breakfast & stroll', location: 'Dotonbori', notes: 'Morning is quieter. Tamago sando from convenience store or local cafe.' },
      { time: '12:00 PM', title: 'Head to KIX airport', location: 'Kansai International Airport', notes: 'Nankai Rapi:t 38min to KIX from Namba. Or Limousine bus. Allow 3hr before departure.' },
      { time: 'Afternoon', title: 'Fly home from Kansai (KIX)', location: 'Kansai International Airport', notes: 'Safe travels! Keep all receipts for tax refund at airport.' },
    ],
  },
];

export const hotels: Hotel[] = [
  {
    name: 'MIMARU Tokyo Shinjuku West',
    brand: 'MIMARU',
    city: 'Tokyo',
    checkIn: 'Sep 11',
    checkOut: 'Sep 15',
    nights: 4,
    address: 'Shinjuku, Tokyo',
    phone: '+81-3-XXXX-XXXX',
    bookingRef: 'Add booking ref',
    apartmentType: 'Family Apartment with Kitchen',
    features: ['Full kitchen', 'Washing machine', 'Baby cot available', 'Nintendo Switch'],
    nearbyStation: 'Shinjuku Station (5 min walk)',
  },
  {
    name: 'MIMARU Kyoto Station',
    brand: 'MIMARU',
    city: 'Kyoto',
    checkIn: 'Sep 15',
    checkOut: 'Sep 19',
    nights: 4,
    address: 'Kyoto Station Area, Kyoto',
    phone: '+81-75-XXXX-XXXX',
    bookingRef: 'Add booking ref',
    apartmentType: 'Family Apartment with Kitchen',
    features: ['Full kitchen', 'Washing machine', 'Central location', 'Baby cot available'],
    nearbyStation: 'Kyoto Station (8 min walk)',
  },
  {
    name: 'MIMARU Osaka Namba',
    brand: 'MIMARU',
    city: 'Osaka',
    checkIn: 'Sep 19',
    checkOut: 'Sep 23',
    nights: 4,
    address: 'Namba, Chuo Ward, Osaka',
    phone: '+81-6-XXXX-XXXX',
    bookingRef: 'Add booking ref',
    apartmentType: 'Family Apartment with Kitchen',
    features: ['Full kitchen', 'Washing machine', 'Walking distance to Dotonbori', 'Baby cot available'],
    nearbyStation: 'Namba Station (3 min walk)',
  },
];

export const transportRoutes: TransportRoute[] = [
  {
    from: 'Haneda Airport',
    to: 'Shinjuku',
    train: 'Tokyo Monorail → JR Yamanote Line',
    duration: '~50 min',
    price: '¥700',
    date: 'Sep 11',
    notes: 'Or Keikyu Line → JR from Shinagawa. IC card works.',
  },
  {
    from: 'Tokyo',
    to: 'Kyoto',
    train: 'Tokaido Shinkansen (Hikari/Nozomi)',
    duration: '2h 15min – 2h 40min',
    price: 'JR Pass',
    date: 'Sep 15',
    notes: 'Nozomi NOT covered by JR Pass — take Hikari. Reserve seats free with pass.',
  },
  {
    from: 'Kyoto',
    to: 'Osaka Namba',
    train: 'Hankyu Kyoto Line or JR Rapid',
    duration: '30–45 min',
    price: 'JR Pass / ¥560 Hankyu',
    date: 'Sep 19',
    notes: 'JR covers Osaka Station. Namba needs Hankyu or subway (not JR Pass).',
  },
  {
    from: 'Osaka',
    to: 'Kansai Airport (KIX)',
    train: 'Nankai Rapi:t Limited Express',
    duration: '38 min',
    price: '¥1,450',
    date: 'Sep 23',
    notes: 'Runs every 30min from Namba. Allow 3hr before international departure.',
  },
];

export const foodGuide: FoodItem[] = [
  { name: 'Sushi Breakfast', type: 'Seafood', city: 'Tokyo', mustTry: true, notes: 'Tsukiji Outer Market — cheapest, freshest sushi in Japan' },
  { name: 'Ramen', type: 'Noodles', city: 'Tokyo', mustTry: true, notes: 'Ichiran (solo booths) or Fuunji for tsukemen' },
  { name: 'Tamagoyaki', type: 'Egg', city: 'Tokyo', mustTry: true, notes: 'Sweet rolled omelette at Tsukiji — Aila-friendly' },
  { name: 'Gyukatsu', type: 'Beef', city: 'Tokyo', mustTry: true, notes: 'Panko-crumbed beef (lighter than tonkatsu). Try Gyukatsu Motomura.' },
  { name: 'Yudofu', type: 'Tofu', city: 'Kyoto', mustTry: true, notes: 'Silk tofu in dashi broth. Quintessential Kyoto comfort food.' },
  { name: 'Kaiseki', type: 'Multi-course', city: 'Kyoto', mustTry: true, notes: 'Book ahead! 7–12 course traditional Kyoto meal. From ¥5,000/person.' },
  { name: 'Matcha Everything', type: 'Sweets', city: 'Kyoto', mustTry: true, notes: 'Matcha soft serve, matcha parfait, matcha KitKat.' },
  { name: 'Takoyaki', type: 'Street food', city: 'Osaka', mustTry: true, notes: 'Octopus balls! Dotonbori stands. Aila-approved.' },
  { name: 'Okonomiyaki', type: 'Savoury pancake', city: 'Osaka', mustTry: true, notes: 'Cook it yourself or watch the chef. Mizuno in Dotonbori is legendary.' },
  { name: 'Kushikatsu', type: 'Skewers', city: 'Osaka', mustTry: true, notes: 'Deep-fried everything. Shinsekai neighbourhood. One-dip rule!' },
  { name: 'Wagyu Beef', type: 'Beef', city: 'Osaka', mustTry: true, notes: 'Kobe/Matsusaka wagyu near Dotonbori. Worth the splurge once.' },
  { name: 'Convenience Store Meals', type: 'Quick', city: 'All', mustTry: true, notes: '7-Eleven & Lawson Japan are genuinely good. Onigiri & sandwiches for Aila.' },
];

export const budgetItems: BudgetItem[] = [
  { category: 'Flights (return, family)', allocated: 7000, currency: 'AUD', notes: 'Sydney ↔ Tokyo / Osaka (check Qantas, Japan Airlines, ANA)' },
  { category: 'MIMARU Hotels (12 nights)', allocated: 5000, currency: 'AUD', notes: '3 × MIMARU apartments. ~AUD$400/night family apartment' },
  { category: 'JR Passes (2× adult)', allocated: 1200, currency: 'AUD', notes: '14-day JR Pass per adult. Child under 6 free. Buy before leaving AU.' },
  { category: 'Food & Dining', allocated: 3500, currency: 'AUD', notes: '~AUD$280/day family. Mix street food, sit-down, convenience stores.' },
  { category: 'Activities & Attractions', allocated: 1500, currency: 'AUD', notes: 'teamLab, Kinkaku-ji, Kaiyukan, Osaka Castle, cooking class, temples.' },
  { category: 'Local Transport (IC card)', allocated: 500, currency: 'AUD', notes: 'Subway, bus, non-JR trains. Load ¥10,000–15,000 on Suica/ICOCA card.' },
  { category: 'Shopping & Souvenirs', allocated: 1500, currency: 'AUD', notes: 'Budget per person. Tax-free shopping at 5,000+ yen stores.' },
  { category: 'Travel Insurance', allocated: 400, currency: 'AUD', notes: 'Family comprehensive cover — compulsory! Book before departure.' },
  { category: 'Luggage Forwarding', allocated: 200, currency: 'AUD', notes: 'Takuhaibin service: ¥1,500–2,500 per bag city-to-city. Highly recommended.' },
  { category: 'SIM / Pocket WiFi', allocated: 150, currency: 'AUD', notes: 'Pre-order data SIM from AU (IIJmio or GTN) or rent WiFi at airport.' },
];

export const bookingChecklist: ChecklistItem[] = [
  { id: 'b1', text: 'teamLab Borderless tickets (sells out months ahead)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b2', text: 'Kaiyukan Aquarium Osaka — timed entry recommended', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b3', text: 'JR Pass — purchase in Australia before departure', urgent: true, deadline: '2 months before', completed: false },
  { id: 'b4', text: 'MIMARU Tokyo Shinjuku West (Sep 11–15)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b5', text: 'MIMARU Kyoto Station (Sep 15–19)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b6', text: 'MIMARU Osaka Namba (Sep 19–23)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b7', text: 'Flights: Sydney → Tokyo (Haneda), Osaka (KIX) → Sydney', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b8', text: 'Travel insurance (family comprehensive)', urgent: true, deadline: 'Before booking flights', completed: false },
  { id: 'b9', text: 'Shinkansen seat reservations (free with JR Pass)', urgent: false, deadline: '1 month before', completed: false },
  { id: 'b10', text: 'Kyoto kaiseki dinner reservation', urgent: true, deadline: '2 months before', completed: false },
  { id: 'b11', text: 'Kyoto cooking class (Aila-friendly)', urgent: false, deadline: '1 month before', completed: false },
  { id: 'b12', text: 'Data SIM or Pocket WiFi rental', urgent: false, deadline: '2 weeks before', completed: false },
  { id: 'b13', text: 'Yen cash exchange (AU → JPY)', urgent: false, deadline: '1 week before', completed: false },
  { id: 'b14', text: 'Suica/ICOCA IC card — order or get at airport', urgent: false, deadline: 'On arrival', completed: false },
];

export const packingList: ChecklistItem[] = [
  { id: 'p1', text: 'Passports (valid 6+ months after Sep 23)', completed: false },
  { id: 'p2', text: 'JR Pass exchange vouchers', completed: false },
  { id: 'p3', text: 'Travel insurance documents', completed: false },
  { id: 'p4', text: 'All booking confirmation printouts/PDFs', completed: false },
  { id: 'p5', text: 'Credit cards (Visa/Mastercard, no foreign fees)', completed: false },
  { id: 'p6', text: 'Cash JPY (¥30,000–50,000 per person for start)', completed: false },
  { id: 'p7', text: 'Portable power bank (10,000+ mAh)', completed: false },
  { id: 'p8', text: 'Universal power adapter (Japan uses Type A)', completed: false },
  { id: 'p9', text: 'Comfortable walking shoes (10,000+ steps/day!)', completed: false },
  { id: 'p10', text: 'Light rain jacket / travel umbrella', completed: false },
  { id: 'p11', text: 'Aila: favourite toys/books for long flights', completed: false },
  { id: 'p12', text: 'Aila: snacks for plane and transit', completed: false },
  { id: 'p13', text: 'Medications (motion sickness, fever, allergy)', completed: false },
  { id: 'p14', text: 'Sunscreen SPF50+ (September still hot in Japan)', completed: false },
  { id: 'p15', text: 'Slip-on shoes (temples require removing shoes often)', completed: false },
  { id: 'p16', text: 'Lightweight clothes (Sep avg 25–30°C in Japan)', completed: false },
  { id: 'p17', text: 'Small day backpack / kids backpack for Aila', completed: false },
  { id: 'p18', text: 'Laundry bag (MIMARU has washing machines)', completed: false },
  { id: 'p19', text: 'Download Google Maps offline (Tokyo, Kyoto, Osaka)', completed: false },
  { id: 'p20', text: 'Download Google Translate Japanese pack offline', completed: false },
];
