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
  theme: string;
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
  bookingRef: string;
  apartmentType: string;
  features: string[];
  nearbyStation: string;
  rating: string;
  costPerNight: string;
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
  low: number;
  high: number;
  currency: 'AUD';
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
  Osaka: 'oklch(0.45 0.22 22)',
  Kyoto: 'oklch(0.48 0.12 148)',
  Tokyo: 'oklch(0.32 0.16 262)',
};

export const CITY_HEX: Record<string, string> = {
  Osaka: '#B91A30',
  Kyoto: '#5A7A5A',
  Tokyo: '#1E3A6E',
};

export const CITY_LIGHT: Record<string, string> = {
  Osaka: '#FEF2F2',
  Kyoto: '#F0F7F0',
  Tokyo: '#EEF2F9',
};

export const itinerary: DayPlan[] = [
  {
    date: 'Sep 11',
    day: 'Fri',
    city: 'Osaka',
    theme: 'Arrival',
    activities: [
      { time: '~6–8 pm', title: 'Land at Kansai International Airport (KIX)', location: 'Kansai Airport', notes: 'Allow 60–90 min for immigration and baggage.' },
      { time: '~8:30 pm', title: 'Nankai Rapid Service to Namba', location: 'KIX → Namba Station', notes: '~40 min, ~¥970/adult. Avoid Haruka Express — it goes to Shin-Osaka, not Namba.' },
      { time: '~9:30 pm', title: 'Check in MIMARU Osaka Namba Station', location: 'Namba, Osaka', notes: '6-min walk from Nippombashi Station. Steps from Kuromon Market.' },
      { time: '~10 pm', title: 'Dotonbori evening walk', location: 'Dotonbori', notes: 'Glico running man sign, canal lights at night. Perfect first impression of Osaka.' },
      { time: '~10:30 pm', title: 'Late dinner', location: 'Dotonbori', notes: 'Ichiran Ramen Dotonbori (open until 3am) or 7-Eleven onigiri to recover from flight.' },
    ],
  },
  {
    date: 'Sep 12',
    day: 'Sat',
    city: 'Osaka',
    theme: 'Kishiwada Danjiri Festival',
    activities: [
      { time: 'Morning', title: 'Kishiwada Danjiri Festival', location: 'Kishiwada (30 min south by train)', notes: '4-tonne wooden floats pulled at full speed through narrow streets. Most intense festival in Japan — Sep 12–13 are the main days.', urgent: true },
      { time: 'Afternoon', title: 'Osaka Castle', location: 'Chuo Ward', notes: 'Grounds and exterior photos (skip interior museum for young kids). Cherry tree grove paths.' },
      { time: 'Evening', title: 'Dotonbori food crawl', location: 'Dotonbori / Namba', notes: 'Takoyaki, kushikatsu, okonomiyaki. Walk Kuromon Ichiba market for fresh wagyu skewers and crab claws.' },
    ],
  },
  {
    date: 'Sep 13',
    day: 'Sun',
    city: 'Osaka',
    theme: 'Aquarium & Bay',
    activities: [
      { time: 'Morning', title: 'Osaka Aquarium Kaiyukan', location: 'Tempozan, Osaka', notes: 'One of the world\'s largest aquariums. Whale sharks, giant manta rays, glass tunnel. Allow 2–3 hours. Aila will love it.', urgent: true },
      { time: 'Afternoon', title: 'Tempozan Marketplace & Ferris Wheel', location: 'Tempozan', notes: 'Osaka Bay waterfront walk. Ferris wheel lit up beautifully at dusk.' },
      { time: 'Evening', title: 'Final Dotonbori & Namba stroll', location: 'Namba', notes: 'Last evening in Osaka. Souvenir shopping before Kyoto tomorrow.' },
    ],
  },
  {
    date: 'Sep 14',
    day: 'Mon',
    city: 'Kyoto',
    theme: 'Kyoto Arrival',
    activities: [
      { time: 'Morning', title: 'Check out Osaka — forward bags to Kyoto', location: 'MIMARU Osaka', notes: 'Use MIMARU luggage forwarding service (~¥1,500–2,500/bag). Bags arrive next afternoon.' },
      { time: 'Mid-morning', title: 'Shinkansen Osaka → Kyoto', location: 'Shin-Osaka Station', notes: '~15 min, ~¥2,900/adult. Hikari or Kodama. Kids under 6 free.' },
      { time: 'Midday', title: 'Check in MIMARU Kyoto Nijo Castle', location: 'Nijo, Kyoto', notes: '2-min walk from Sanjo Street. 11-min walk to Nijo Castle.' },
      { time: 'Afternoon', title: 'Nijo Castle', location: 'Nijo, Kyoto', notes: 'Ninomaru Palace, legendary nightingale floors that creak to detect intruders. Japanese garden. UNESCO World Heritage.' },
      { time: 'Evening', title: 'Gion district & Pontocho dinner', location: 'Gion, Kyoto', notes: 'Cobblestone streets, traditional machiya townhouses, maiko sighting potential. Pontocho alley for dinner alongside the canal.' },
    ],
  },
  {
    date: 'Sep 15',
    day: 'Tue',
    city: 'Kyoto',
    theme: 'Temples & Bamboo',
    activities: [
      { time: '6:30 am', title: 'Fushimi Inari Taisha', location: 'Fushimi, Kyoto', notes: 'Thousands of torii gates. GO EARLY — before 8am is magical and quiet. Free entry. Allow 2 hours.', urgent: true },
      { time: 'Late morning', title: 'Arashiyama Bamboo Grove', location: 'Arashiyama', notes: 'Bamboo forest walk. Tenryuji Temple garden (UNESCO). Monkey park on the hill for Aila.' },
      { time: 'Afternoon', title: 'Togetsukyo Bridge river walk', location: 'Arashiyama', notes: 'Sagano Romantic Train optional (~¥880/adult). Beautiful river views with mountains behind.' },
      { time: 'Evening', title: 'Nishiki Market', location: 'Central Kyoto', notes: '"Kyoto\'s Kitchen" — tofu skewers, fresh yuba, matcha soft serve. Closes ~6pm so arrive by 5pm.' },
    ],
  },
  {
    date: 'Sep 16',
    day: 'Wed',
    city: 'Kyoto',
    theme: 'Nara & Golden Pavilion',
    activities: [
      { time: 'Morning', title: 'Nara Day Trip — Deer Park', location: 'Nara (30 min by Kintetsu or JR)', notes: 'Nara Park deer feeding — buy official deer crackers ¥200/pack. Tame deer roam freely. Aila will absolutely love it.' },
      { time: 'Mid-morning', title: 'Todai-ji Great Buddha', location: 'Nara', notes: 'World\'s largest wooden building. Giant bronze Buddha statue. ¥600 entry.' },
      { time: 'Afternoon', title: 'Kinkaku-ji — Golden Pavilion', location: 'Northwest Kyoto', notes: 'Iconic gold-leaf temple reflected in the pond. One of Japan\'s most photographed places. ¥500 entry.' },
      { time: 'Optional', title: 'Philosopher\'s Path', location: 'Higashiyama', notes: '2km canal walk lined with cherry trees. Peaceful stroll. Ryoanji rock garden nearby.' },
      { time: 'Evening', title: 'Kimono dressing experience', location: 'Gion, Kyoto', notes: 'Book in advance via Gion Chakiraku or Yumeyakata. Aila in a little yukata will be unforgettable.', urgent: true },
    ],
  },
  {
    date: 'Sep 17',
    day: 'Thu',
    city: 'Tokyo',
    theme: 'Tokyo Arrival',
    activities: [
      { time: 'Morning', title: 'Check out Kyoto — forward bags to Tokyo', location: 'MIMARU Kyoto', notes: 'Forward bags via MIMARU service. Travel Shinkansen with carry-on only — much easier with Aila.' },
      { time: 'Midday', title: 'Shinkansen Kyoto → Tokyo (Nozomi)', location: 'Kyoto Station', notes: '~2h 15min, ~¥13,800/adult. Book reserved seat in advance. Sit on right side (Mt. Fuji views on a clear day).', urgent: true },
      { time: 'Afternoon', title: 'Check in MIMARU Tokyo Shinjuku West', location: 'Nishishinjuku, Tokyo', notes: '8-min walk from JR Shinjuku Station. #1 Specialty Lodging in Nishishinjuku on Tripadvisor. ~40m² family rooms.' },
      { time: 'Evening', title: 'Explore Shinjuku', location: 'Shinjuku, Tokyo', notes: 'Kabukicho (outside), Omoide Yokocho (Memory Lane) for yakitori under the lanterns. Shinjuku Gyoen if still light.' },
    ],
  },
  {
    date: 'Sep 18',
    day: 'Fri',
    city: 'Tokyo',
    theme: 'Asakusa & Shibuya',
    activities: [
      { time: 'Early morning', title: 'Senso-ji Temple, Asakusa', location: 'Asakusa, Tokyo', notes: 'Oldest temple in Tokyo. Arrive before 8am for quiet atmosphere. Nakamise shopping street for souvenirs.' },
      { time: 'Afternoon', title: 'Shibuya Scramble Crossing', location: 'Shibuya', notes: 'World\'s busiest pedestrian crossing. View from Mag\'s Park observation deck or Starbucks overlooking the crossing.' },
      { time: 'Afternoon', title: 'Harajuku Takeshita Street', location: 'Harajuku', notes: 'Crepes, quirky fashion, candy floss. Aila will love the colour and energy.' },
      { time: 'Evening', title: 'Shibuya Sky or Tokyo Skytree', location: 'Shibuya / Asakusa', notes: 'Night views over Tokyo. Shibuya Sky has the better open-air rooftop experience. Book ahead.', urgent: true },
    ],
  },
  {
    date: 'Sep 19',
    day: 'Sat',
    city: 'Tokyo',
    theme: 'DisneySea — Silver Week',
    activities: [
      { time: 'Full day', title: 'Tokyo DisneySea', location: 'Maihama, Chiba', notes: 'BOOK NOW — Silver Week sells out months ahead. Unique to Japan, recommended over Disneyland. More sophisticated theming, great for all ages. Use Disney app for Standby+ passes.', urgent: true },
      { time: 'Tip', title: 'Use Disney app on the day', location: 'DisneySea', notes: 'Check wait times, book priority experiences, order food digitally. Arrive at opening (8am). Mediterranean Harbour is stunning at night.' },
    ],
  },
  {
    date: 'Sep 20',
    day: 'Sun',
    city: 'Tokyo',
    theme: 'Akihabara & Tokyo Tower',
    activities: [
      { time: 'Morning', title: 'Akihabara', location: 'Akihabara, Tokyo', notes: 'Electronics district. Pokémon Center Akihabara, anime goods, gaming. Aila can pick a souvenir here.' },
      { time: 'Midday', title: 'Tsukiji Outer Market', location: 'Tsukiji', notes: 'Breakfast/lunch — freshest sushi in Tokyo, tamagoyaki on a stick, seafood. Peak flavour at mid-morning.' },
      { time: 'Afternoon', title: 'Tokyo Tower & Shiba Park', location: 'Minato', notes: 'Classic Tokyo icon. 360° views. Shiba Park at the base is beautiful for a stroll.' },
      { time: 'Evening', title: 'Roppongi Hills', location: 'Roppongi', notes: 'Mori Tower observation deck for city night views. Great restaurants in the complex.' },
    ],
  },
  {
    date: 'Sep 21',
    day: 'Mon',
    city: 'Tokyo',
    theme: 'Hakone Day Trip',
    activities: [
      { time: 'Morning', title: 'Romancecar Express → Hakone', location: 'Shinjuku Station', notes: '~90 min from Shinjuku. Book seat in advance. Scenic mountain route.', urgent: true },
      { time: 'Mid-morning', title: 'Hakone Open Air Museum', location: 'Hakone', notes: 'Outdoor sculpture park with Picasso pavilion. Incredible mountain backdrop. Kid-friendly with play areas.' },
      { time: 'Afternoon', title: 'Owakudani Valley', location: 'Hakone', notes: 'Volcanic hot springs. Kuro tamago (black eggs boiled in sulfur springs — said to add 7 years to your life). Mt. Fuji views if clear.' },
      { time: 'Afternoon', title: 'Hakone Ropeway', location: 'Hakone', notes: 'Mountain cable car over volcanic valley. Spectacular views. Aila will love the gondola.' },
      { time: 'Return', title: 'Back to Shinjuku by 7pm', location: 'Tokyo', notes: 'Foot onsen at Kowakien before departure (free public foot baths — very relaxing).' },
    ],
  },
  {
    date: 'Sep 22',
    day: 'Tue',
    city: 'Tokyo',
    theme: 'Ueno & Farewell',
    activities: [
      { time: 'Morning', title: 'Ueno Park & Zoo', location: 'Ueno, Tokyo', notes: 'Giant pandas, open-air animal encounters. Autumnal Equinox Day — free entry to national museums. Aila-perfect.' },
      { time: 'Midday', title: 'Final shopping', location: 'Ginza / Shinjuku / Harajuku', notes: 'Ginza for luxury, Shinjuku for electronics, Harajuku for souvenirs. Pack and use MIMARU luggage storage.' },
      { time: 'Afternoon', title: 'Shinjuku Gyoen gardens', location: 'Shinjuku', notes: 'Beautiful Japanese garden for a quiet last afternoon. Picnic on the lawn.' },
      { time: 'Evening', title: 'Farewell dinner', location: 'Shinjuku', notes: 'Book kaiseki or shabu-shabu restaurant in advance. Celebrate an incredible trip.', urgent: true },
    ],
  },
  {
    date: 'Sep 23',
    day: 'Wed',
    city: 'Tokyo',
    theme: 'Departure Day',
    activities: [
      { time: 'Morning', title: 'Check out MIMARU Shinjuku West', location: 'Shinjuku, Tokyo', notes: 'Store bags if needed. Light breakfast — convenience store onigiri or hotel café.' },
      { time: '4.5+ hours before flight', title: 'Tokyo → KIX (Kansai Airport)', location: 'Shinjuku → KIX', notes: 'Options: (1) Shinkansen to Shin-Osaka, then Haruka to KIX — ~3h. (2) Domestic flight HND → KIX/ITM — ~¥10,000/person, ~1.5h.', urgent: true },
      { time: 'At airport', title: 'Tax-free refund at KIX', location: 'Kansai Airport', notes: 'Keep all receipts from tax-free purchases. Claim refund at customs before security. Can save ¥5,000–15,000.' },
      { time: 'Afternoon/Evening', title: 'Fly KIX → Melbourne', location: 'Kansai International Airport', notes: 'Next morning arrives Melbourne (AEST +2hrs from Japan).' },
    ],
  },
];

export const hotels: Hotel[] = [
  {
    name: 'MIMARU Osaka Namba Station',
    brand: 'MIMARU',
    city: 'Osaka',
    checkIn: 'Sep 11',
    checkOut: 'Sep 14',
    nights: 3,
    address: '6-min walk from Nippombashi Station, steps from Kuromon Market, walkable to Dotonbori',
    bookingRef: 'Add booking ref',
    apartmentType: 'Two-bedroom apartment with full kitchen',
    features: ['Full kitchen', 'In-room washer/dryer', 'Children\'s play area', 'Free luggage forwarding', 'Free coffee mornings', 'Board game lounge'],
    nearbyStation: 'Nippombashi Station (6 min walk)',
    rating: '4-star · Tripadvisor Traveller\'s Choice',
    costPerNight: '~AUD $160–200/night',
  },
  {
    name: 'MIMARU Kyoto Nijo Castle',
    brand: 'MIMARU',
    city: 'Kyoto',
    checkIn: 'Sep 14',
    checkOut: 'Sep 17',
    nights: 3,
    address: '2-min walk from Sanjo Street, 11-min walk to Nijo Castle, easy bus access throughout Kyoto',
    bookingRef: 'Add booking ref',
    apartmentType: 'Family apartment — tatami floor & bunk bed options',
    features: ['In-room washer/dryer (all rooms)', 'Full kitchen', 'Free stroller rental', 'Tatami floor option', 'Baby bath & toddler tableware', 'BINGO with gacha prizes'],
    nearbyStation: 'Nijo Castle area (11 min walk)',
    rating: '#12 of 677 Speciality Lodging in Kyoto — Tripadvisor',
    costPerNight: '~AUD $155–200/night',
  },
  {
    name: 'MIMARU Tokyo Shinjuku West',
    brand: 'MIMARU',
    city: 'Tokyo',
    checkIn: 'Sep 17',
    checkOut: 'Sep 23',
    nights: 6,
    address: '8-min walk from JR Shinjuku Station, 6-min walk Tochomae Station, near Shinjuku Gyoen',
    bookingRef: 'Add booking ref',
    apartmentType: '~40m² family apartment with full kitchen',
    features: ['Full kitchen', 'Laundry on premises', '40m² family rooms', 'Near Shinjuku Gyoen', 'September low-season pricing'],
    nearbyStation: 'JR Shinjuku Station (8 min walk)',
    rating: '#1 Specialty Lodging in Nishishinjuku — Tripadvisor',
    costPerNight: '~AUD $200–260/night',
  },
];

export const transportRoutes: TransportRoute[] = [
  {
    from: 'Melbourne',
    to: 'Kansai Airport (KIX)',
    train: 'International flight (Qantas, JAL, ANA)',
    duration: '~9–10 hours',
    price: '~AUD $900–1,500 pp',
    date: 'Sep 11',
    notes: 'Land at KIX. Nankai Rapid Service to Namba (~40 min, ¥970/adult). Avoid Haruka — goes to Shin-Osaka.',
  },
  {
    from: 'KIX Airport',
    to: 'Namba Station',
    train: 'Nankai Rapid Service',
    duration: '~40 min',
    price: '¥970/adult · Kids under 6 free',
    date: 'Sep 11',
    notes: 'Buy IC card (ICOCA) at airport on arrival. Load ¥15,000–20,000.',
  },
  {
    from: 'Osaka',
    to: 'Kyoto',
    train: 'Tokaido Shinkansen — Hikari or Kodama',
    duration: '~15 min',
    price: '~¥2,900/adult (~AUD $29)',
    date: 'Sep 14',
    notes: 'Short hop. Forward luggage via MIMARU the day before — travel light with Aila.',
  },
  {
    from: 'Kyoto',
    to: 'Tokyo',
    train: 'Tokaido Shinkansen — Nozomi',
    duration: '~2h 15min',
    price: '~¥13,800/adult (~AUD $138)',
    date: 'Sep 17',
    notes: 'Book reserved seat in advance. Sit on right side for Mt. Fuji views. Kids under 6 free on unreserved.',
  },
  {
    from: 'Shinjuku',
    to: 'Hakone',
    train: 'Romancecar Limited Express (Odakyu)',
    duration: '~85 min',
    price: '~¥1,270/adult + ¥900 seat fee',
    date: 'Sep 21',
    notes: 'Book seat reservation in advance. Scenic mountain route. Returns easily by 7pm.',
  },
  {
    from: 'Tokyo',
    to: 'KIX Airport',
    train: 'Shinkansen → Shin-Osaka → Haruka, OR domestic flight HND→KIX',
    duration: '~3h (train) OR ~1.5h (flight)',
    price: '~¥5,000–7,000 (train) OR ~¥10,000 (flight)',
    date: 'Sep 23',
    notes: 'Allow 4.5+ hours before international departure. Tax-free refund at KIX customs before security.',
  },
];

export const foodGuide: FoodItem[] = [
  { name: 'Ichiran Ramen', type: 'Ramen', city: 'Osaka', mustTry: true, notes: 'Dotonbori branch open until 3am. Solo booths — very Aila-friendly as she can focus on her bowl.' },
  { name: 'Takoyaki', type: 'Street food', city: 'Osaka', mustTry: true, notes: 'Octopus balls — Osaka\'s signature snack. Crispy outside, molten inside. Dotonbori stalls.' },
  { name: 'Okonomiyaki', type: 'Savoury pancake', city: 'Osaka', mustTry: true, notes: 'Cook it yourself at the table. Mizuno in Dotonbori is legendary. One dip rule for kushikatsu!' },
  { name: 'Kuromon Ichiba Market', type: 'Market', city: 'Osaka', mustTry: true, notes: '"Osaka\'s Kitchen" — fresh wagyu skewers, giant crab claws, uni. Eat as you walk.' },
  { name: 'Tofu skewers & Yuba', type: 'Traditional', city: 'Kyoto', mustTry: true, notes: 'Nishiki Market. Silky Kyoto tofu in a dozen forms. Yuba (tofu skin) is a local delicacy.' },
  { name: 'Matcha everything', type: 'Sweets', city: 'Kyoto', mustTry: true, notes: 'Matcha soft serve, matcha parfait, matcha KitKat. Nishiki Market and Arashiyama are the best spots.' },
  { name: 'Kaiseki', type: 'Fine dining', city: 'Kyoto', mustTry: true, notes: 'Multi-course traditional Kyoto meal. Book 4–6 weeks ahead. From ¥5,000/person. Worth it once.' },
  { name: 'Tsukiji sushi breakfast', type: 'Seafood', city: 'Tokyo', mustTry: true, notes: 'Outer Market (not the closed inner market). Best and freshest sushi in Japan at 10am.' },
  { name: 'Yakitori, Omoide Yokocho', type: 'Grilled', city: 'Tokyo', mustTry: true, notes: 'Smoky lantern-lit alley in Shinjuku. Charcoal-grilled skewers with cold beer. Magical at night.' },
  { name: 'Kuro Tamago', type: 'Snack', city: 'Tokyo', mustTry: true, notes: 'Black eggs from Hakone\'s Owakudani sulfur springs. Said to add 7 years to your life per egg.' },
  { name: 'Convenience store meals', type: 'Quick', city: 'All', mustTry: true, notes: '7-Eleven & Lawson Japan are genuinely exceptional. Onigiri, egg sandwiches, hot ramen. Perfect for Aila.' },
  { name: 'DisneySea food', type: 'Park', city: 'Tokyo', mustTry: true, notes: 'Turkish kebab at Mediterranean Harbour, gyoza dogs, popcorn in Disney buckets. Order via app.' },
];

export const budgetItems: BudgetItem[] = [
  { category: 'Flights (Melbourne ↔ KIX, family)', low: 1800, high: 3000, currency: 'AUD', notes: '~AUD $900–1,500 per adult. Check Qantas, Japan Airlines, ANA. Book 4–6 months ahead.' },
  { category: 'MIMARU Hotels (12 nights)', low: 2400, high: 2800, currency: 'AUD', notes: 'Osaka 3n + Kyoto 3n + Tokyo 6n. Avg ~AUD $215/night family apartment.' },
  { category: 'Shinkansen (all routes, 2 adults)', low: 600, high: 700, currency: 'AUD', notes: 'Osaka↔Kyoto + Kyoto→Tokyo + return to KIX. Kids under 6 often free on unreserved.' },
  { category: 'IC Card local transport', low: 150, high: 200, currency: 'AUD', notes: '~AUD $12–15/day per adult for subway, local JR, buses. Load ICOCA at KIX on arrival.' },
  { category: 'Activities & Attractions', low: 800, high: 1200, currency: 'AUD', notes: 'DisneySea (biggest cost), Kaiyukan, Hakone, museums, Kinkaku-ji, castle entries.' },
  { category: 'Food & Dining', low: 1200, high: 1600, currency: 'AUD', notes: '~AUD $100/day for family of 3. Mix of street food, sit-down, and convenience stores.' },
  { category: 'Luggage forwarding', low: 100, high: 150, currency: 'AUD', notes: '3 transfers × 2–3 bags via Yamato Transport or MIMARU service. ¥1,500–2,500/bag.' },
  { category: 'Travel insurance (family)', low: 150, high: 250, currency: 'AUD', notes: 'Essential — include typhoon/weather disruption cover. Buy before flights are booked.' },
  { category: 'Shopping & souvenirs', low: 500, high: 800, currency: 'AUD', notes: 'Tax-free shopping at qualifying stores (over ¥5,000 purchase). Keep receipts for KIX refund.' },
];

export const bookingChecklist: ChecklistItem[] = [
  { id: 'b1', text: 'MIMARU Osaka Namba Station — Sep 11–14 (3 nights)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b2', text: 'MIMARU Kyoto Nijo Castle — Sep 14–17 (3 nights)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b3', text: 'MIMARU Tokyo Shinjuku West — Sep 17–23 (6 nights) — Silver Week!', urgent: true, deadline: 'ASAP — sells out months ahead', completed: false },
  { id: 'b4', text: 'Tokyo DisneySea tickets — Sep 19 (Silver Week)', urgent: true, deadline: 'ASAP — sells out months ahead', completed: false },
  { id: 'b5', text: 'Flights: Melbourne → KIX (Sep 11), KIX → Melbourne (Sep 23/24)', urgent: true, deadline: 'ASAP', completed: false },
  { id: 'b6', text: 'Travel insurance with typhoon cover', urgent: true, deadline: 'Before booking flights', completed: false },
  { id: 'b7', text: 'Shinkansen reserved seats: Kyoto → Tokyo Sep 17 (Nozomi)', urgent: true, deadline: '4–6 weeks before', completed: false },
  { id: 'b8', text: 'Return transport: Tokyo → KIX Sep 23 (Shinkansen or domestic flight)', urgent: true, deadline: '4–6 weeks before', completed: false },
  { id: 'b9', text: 'Hakone Romancecar seat reservation — Sep 21', urgent: false, deadline: '2–4 weeks before', completed: false },
  { id: 'b10', text: 'Kimono dressing experience in Kyoto (Gion Chakiraku or Yumeyakata)', urgent: false, deadline: '2–4 weeks before', completed: false },
  { id: 'b11', text: 'Farewell dinner Tokyo — kaiseki or shabu-shabu reservation', urgent: false, deadline: '2 weeks before', completed: false },
  { id: 'b12', text: 'Pocket WiFi rental or eSIM (order from Australia — cheaper)', urgent: false, deadline: '2 weeks before', completed: false },
  { id: 'b13', text: 'Notify bank of Japan travel dates (Visa/Mastercard)', urgent: false, deadline: '1 week before', completed: false },
  { id: 'b14', text: 'ICOCA IC card — load at KIX on arrival (¥15,000–20,000)', urgent: false, deadline: 'On arrival', completed: false },
];

export const packingList: ChecklistItem[] = [
  { id: 'p1', text: 'Passports (valid 6+ months after Sep 23, 2026)', completed: false },
  { id: 'p2', text: 'All booking confirmation printouts / PDFs', completed: false },
  { id: 'p3', text: 'Travel insurance documents', completed: false },
  { id: 'p4', text: 'Credit cards with no foreign transaction fees', completed: false },
  { id: 'p5', text: 'Cash JPY (~¥20,000–30,000/adult for arrival)', completed: false },
  { id: 'p6', text: 'Portable power bank (10,000+ mAh)', completed: false },
  { id: 'p7', text: 'Power adapter (Japan uses 100V Type A — same as AU plug, different voltage)', completed: false },
  { id: 'p8', text: 'Comfortable walking shoes — CRITICAL (15,000+ steps/day)', completed: false },
  { id: 'p9', text: 'Slip-on shoes (temples require removing shoes frequently)', completed: false },
  { id: 'p10', text: 'Compact umbrella (typhoon season — Sep peak)', completed: false },
  { id: 'p11', text: 'Light breathable tops ×6–7 (26–30°C early Sep)', completed: false },
  { id: 'p12', text: 'Light cardigan or hoodie ×1 (cool evenings, AC on trains)', completed: false },
  { id: 'p13', text: 'Sunscreen SPF 50+', completed: false },
  { id: 'p14', text: 'Aila: favourite small toys / comfort item for flights', completed: false },
  { id: 'p15', text: 'Aila: good sneakers + sandals', completed: false },
  { id: 'p16', text: 'Aila: kids backpack for day outings', completed: false },
  { id: 'p17', text: 'Aila: small Pokémon figure as trip mascot', completed: false },
  { id: 'p18', text: 'Medications: motion sickness, fever, allergy (Japan pharma is limited)', completed: false },
  { id: 'p19', text: 'Download Google Maps offline — Osaka, Kyoto, Tokyo, Hakone', completed: false },
  { id: 'p20', text: 'Download Google Translate Japanese language pack offline', completed: false },
];
