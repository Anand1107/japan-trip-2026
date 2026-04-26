'use client';

import { useState, useEffect } from 'react';
import { EditProvider } from '../components/EditContext';
import EditableText from '../components/EditableText';
import NavBar from '../components/NavBar';
import DocumentsSection from '../components/DocumentsSection';
import {
  itinerary,
  hotels,
  transportRoutes,
  foodGuide,
  budgetItems,
  bookingChecklist,
  packingList,
  CITY_COLORS,
  type ChecklistItem,
} from '../lib/tripData';

// ─── Checklist hook ────────────────────────────────────────────────────────────
function useChecklist(items: ChecklistItem[], storageKey: string) {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setState(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const toggle = (id: string) => {
    setState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const checked = items.filter((i) => state[i.id]).length;
  return { state, toggle, checked, total: items.length };
}

// ─── City pill ─────────────────────────────────────────────────────────────────
function CityPill({ city }: { city: string }) {
  const colors: Record<string, string> = {
    Osaka: 'bg-[#C41E3A] text-white',
    Kyoto: 'bg-[#8B9D6F] text-white',
    Tokyo: 'bg-[#2A3F6F] text-white',
  };
  return (
    <span className={`pill ${city.toLowerCase()} text-xs`}>{city}</span>
  );
}

// ─── Section: Overview ─────────────────────────────────────────────────────────
function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="card text-center">
        <div className="text-5xl mb-3">🌸</div>
        <h1 className="font-serif text-2xl font-semibold text-stone-800 mb-1">Japan 2026</h1>
        <p className="text-stone-500 text-sm mb-4">Family Adventure · Sep 11–23</p>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="pill tokyo">Tokyo · 4 nights</span>
          <span className="pill kyoto">Kyoto · 4 nights</span>
          <span className="pill osaka">Osaka · 4 nights</span>
        </div>
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-semibold mb-3 text-stone-700">Trip Summary</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Travellers</p>
            <p className="font-medium">Anand, Saranya & Aila</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Duration</p>
            <p className="font-medium">13 nights · 13 days</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Fly in</p>
            <p className="font-medium">Tokyo Haneda</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Fly out</p>
            <p className="font-medium">Osaka KIX</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Hotels</p>
            <p className="font-medium">MIMARU Apartments ×3</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Rail pass</p>
            <p className="font-medium">JR Pass 14-day</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-semibold mb-3 text-stone-700">Trip Notes</h2>
        <EditableText
          storageKey="overview_notes"
          defaultValue="September is Silver Week season — Sep 19–23 is a holiday period in Japan. Book popular attractions early. MIMARU apartments have full kitchens — great for Aila's meals. Bring IC cards (Suica/ICOCA) for local transport."
          className="text-sm text-stone-600 leading-relaxed"
          multiline
          tag="p"
        />
      </div>

      <div className="card">
        <h2 className="font-serif text-lg font-semibold mb-3 text-stone-700">Route</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="pill tokyo">Sydney</span>
          <span className="text-stone-300">→</span>
          <span className="pill tokyo">Tokyo</span>
          <span className="text-stone-300">→</span>
          <span className="pill kyoto">Kyoto</span>
          <span className="text-stone-300">→</span>
          <span className="pill osaka">Osaka</span>
          <span className="text-stone-300">→</span>
          <span className="pill tokyo">Sydney</span>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Itinerary ────────────────────────────────────────────────────────
function ItinerarySection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      <h2 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h2>
      {itinerary.map((day, idx) => {
        const color = CITY_COLORS[day.city];
        const isOpen = expanded === idx;
        return (
          <div
            key={idx}
            className="card overflow-hidden cursor-pointer"
            onClick={() => setExpanded(isOpen ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-1 self-stretch rounded-full"
                  style={{ backgroundColor: color, minHeight: 40 }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                      {day.day} {day.date}
                    </span>
                    <CityPill city={day.city} />
                  </div>
                  <p className="text-sm font-medium text-stone-700 mt-0.5">
                    {day.activities[0]?.title}
                    {day.activities.length > 1 && ` +${day.activities.length - 1} more`}
                  </p>
                </div>
              </div>
              <span className="text-stone-400 text-sm">{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
              <div className="mt-4 space-y-3 pl-4">
                {day.activities.map((act, ai) => (
                  <div key={ai} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      {ai < day.activities.length - 1 && (
                        <div className="w-px flex-1 bg-stone-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-start gap-2 flex-wrap">
                        <span className="text-xs text-stone-400 font-medium min-w-[70px]">
                          {act.time}
                        </span>
                        {act.urgent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
                            Book now
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-sm text-stone-800">{act.title}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{act.location}</p>
                      {act.notes && (
                        <EditableText
                          storageKey={`act_${idx}_${ai}_notes`}
                          defaultValue={act.notes}
                          className="text-xs text-stone-500 mt-1 italic"
                          multiline
                          tag="p"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Section: Hotels ───────────────────────────────────────────────────────────
function HotelsSection() {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-semibold text-stone-800">Hotels</h2>
      {hotels.map((h, i) => {
        const color = CITY_COLORS[h.city];
        return (
          <div key={i} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CityPill city={h.city} />
                  <span className="text-xs text-stone-400">{h.checkIn} → {h.checkOut}</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-stone-800">{h.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{h.nearbyStation}</p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${color}18` }}
              >
                🏨
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm border-t border-stone-100 pt-3">
              <div>
                <p className="text-[11px] text-stone-400 uppercase tracking-wide">Check-in</p>
                <EditableText storageKey={`hotel_${i}_checkin`} defaultValue={h.checkIn} className="font-medium text-stone-700" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase tracking-wide">Check-out</p>
                <EditableText storageKey={`hotel_${i}_checkout`} defaultValue={h.checkOut} className="font-medium text-stone-700" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase tracking-wide">Booking ref</p>
                <EditableText storageKey={`hotel_${i}_ref`} defaultValue={h.bookingRef} className="font-medium text-stone-700" />
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase tracking-wide">Nights</p>
                <p className="font-medium text-stone-700">{h.nights} nights</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-100">
              <p className="text-[11px] text-stone-400 uppercase tracking-wide mb-2">Address</p>
              <EditableText storageKey={`hotel_${i}_addr`} defaultValue={h.address} className="text-sm text-stone-600" />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {h.features.map((f) => (
                <span key={f} className="tag">{f}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section: Transport ────────────────────────────────────────────────────────
function TransportSection() {
  return (
    <div className="space-y-4">
      <div className="card bg-[#2A3F6F] text-white">
        <h2 className="font-serif text-lg font-semibold mb-1">JR Pass</h2>
        <p className="text-sm opacity-80">14-day pass · Buy in Australia before departure</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="opacity-60 text-xs">Adult price ~</p>
            <EditableText storageKey="jrpass_price" defaultValue="~AUD $600/person" className="font-semibold" />
          </div>
          <div>
            <p className="opacity-60 text-xs">Validity</p>
            <p className="font-semibold">Sep 11–24</p>
          </div>
        </div>
      </div>

      <h2 className="font-serif text-xl font-semibold text-stone-800">Key Routes</h2>
      {transportRoutes.map((r, i) => (
        <div key={i} className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🚄</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                <span>{r.from}</span>
                <span className="text-stone-300">→</span>
                <span>{r.to}</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{r.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm border-t border-stone-100 pt-3">
            <div>
              <p className="text-[11px] text-stone-400 uppercase tracking-wide">Train</p>
              <p className="font-medium text-stone-700 text-xs">{r.train}</p>
            </div>
            <div>
              <p className="text-[11px] text-stone-400 uppercase tracking-wide">Duration</p>
              <p className="font-medium text-stone-700">{r.duration}</p>
            </div>
            <div>
              <p className="text-[11px] text-stone-400 uppercase tracking-wide">Price</p>
              <p className="font-medium text-stone-700">{r.price}</p>
            </div>
          </div>
          {r.notes && (
            <EditableText
              storageKey={`route_${i}_notes`}
              defaultValue={r.notes}
              className="text-xs text-stone-500 italic mt-2"
              multiline
              tag="p"
            />
          )}
        </div>
      ))}

      <div className="card">
        <h3 className="font-serif text-base font-semibold text-stone-800 mb-3">IC Cards (Suica / ICOCA)</h3>
        <p className="text-sm text-stone-600 mb-2">Use for subways, local JR, buses, convenience stores, vending machines.</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="tag text-center">Load ¥10,000–15,000</div>
          <div className="tag text-center">Tap in & out</div>
          <div className="tag text-center">Works at 7-Eleven</div>
          <div className="tag text-center">Suica = Tokyo</div>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Food ─────────────────────────────────────────────────────────────
function FoodSection() {
  const byCityOrder = ['Tokyo', 'Kyoto', 'Osaka', 'All'] as const;
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-xl font-semibold text-stone-800">Food Guide</h2>
      {byCityOrder.map((city) => {
        const items = foodGuide.filter((f) => f.city === city);
        if (!items.length) return null;
        const color = city === 'All' ? '#8B7355' : CITY_COLORS[city];
        return (
          <div key={city}>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color }}
            >
              {city === 'All' ? 'Everywhere' : city}
            </h3>
            <div className="space-y-2">
              {items.map((f, i) => (
                <div key={i} className="card flex gap-3 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    {f.mustTry ? '⭐' : '🍴'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-stone-800">{f.name}</span>
                      <span className="tag text-[11px]">{f.type}</span>
                    </div>
                    {f.notes && (
                      <EditableText
                        storageKey={`food_${city}_${i}`}
                        defaultValue={f.notes}
                        className="text-xs text-stone-500 mt-0.5"
                        multiline
                        tag="p"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section: Budget ───────────────────────────────────────────────────────────
function BudgetSection() {
  const total = budgetItems.reduce((sum, b) => sum + (b.currency === 'AUD' ? b.allocated : 0), 0);
  return (
    <div className="space-y-4">
      <div className="card bg-stone-800 text-white">
        <p className="text-sm opacity-60 mb-1">Estimated Total Budget</p>
        <p className="font-serif text-3xl font-semibold">AUD ${total.toLocaleString()}</p>
        <p className="text-xs opacity-50 mt-1">Family of 3 · 13 nights</p>
      </div>

      <h2 className="font-serif text-xl font-semibold text-stone-800">Breakdown</h2>
      {budgetItems.map((b, i) => (
        <div key={i} className="card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-stone-800 text-sm">{b.category}</p>
              {b.notes && (
                <EditableText
                  storageKey={`budget_${i}_notes`}
                  defaultValue={b.notes}
                  className="text-xs text-stone-500 mt-0.5"
                  multiline
                  tag="p"
                />
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <EditableText
                storageKey={`budget_${i}_amount`}
                defaultValue={`${b.currency} $${b.allocated.toLocaleString()}`}
                className="font-semibold text-stone-800 text-sm"
              />
            </div>
          </div>
          <div className="mt-2 h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (b.allocated / 7000) * 100)}%`,
                backgroundColor: b.allocated > 3000 ? '#C41E3A' : b.allocated > 1000 ? '#8B9D6F' : '#2A3F6F',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Section: Checklist ────────────────────────────────────────────────────────
function ChecklistSection() {
  const booking = useChecklist(bookingChecklist, 'checklist_booking');
  const packing = useChecklist(packingList, 'checklist_packing');

  return (
    <div className="space-y-6">
      {/* Booking */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl font-semibold text-stone-800">Bookings</h2>
          <span className="text-sm text-stone-500">{booking.checked}/{booking.total}</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-[#C41E3A] rounded-full transition-all duration-500"
            style={{ width: `${(booking.checked / booking.total) * 100}%` }}
          />
        </div>
        <div className="space-y-2">
          {bookingChecklist.map((item) => (
            <label
              key={item.id}
              className={`card flex items-start gap-3 cursor-pointer transition-opacity ${
                booking.state[item.id] ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={!!booking.state[item.id]}
                onChange={() => booking.toggle(item.id)}
                className="mt-0.5 accent-[#C41E3A] w-4 h-4 flex-shrink-0"
              />
              <div className="flex-1">
                <span className={`text-sm text-stone-700 ${booking.state[item.id] ? 'line-through' : ''}`}>
                  {item.text}
                </span>
                {item.urgent && !booking.state[item.id] && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
                    Urgent
                  </span>
                )}
                {item.deadline && (
                  <p className="text-[11px] text-stone-400 mt-0.5">{item.deadline}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Packing */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl font-semibold text-stone-800">Packing List</h2>
          <span className="text-sm text-stone-500">{packing.checked}/{packing.total}</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-[#8B9D6F] rounded-full transition-all duration-500"
            style={{ width: `${(packing.checked / packing.total) * 100}%` }}
          />
        </div>
        <div className="space-y-2">
          {packingList.map((item) => (
            <label
              key={item.id}
              className={`card flex items-start gap-3 cursor-pointer transition-opacity ${
                packing.state[item.id] ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={!!packing.state[item.id]}
                onChange={() => packing.toggle(item.id)}
                className="mt-0.5 accent-[#8B9D6F] w-4 h-4 flex-shrink-0"
              />
              <span className={`text-sm text-stone-700 ${packing.state[item.id] ? 'line-through' : ''}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Root page ─────────────────────────────────────────────────────────────────
export default function JapanTripApp() {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const saved = sessionStorage.getItem('activeTab');
    if (saved) setActiveTab(saved);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    sessionStorage.setItem('activeTab', tab);
  };

  return (
    <EditProvider>
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-2xl mx-auto px-4 pt-16 pb-24">
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'days' && <ItinerarySection />}
        {activeTab === 'hotels' && <HotelsSection />}
        {activeTab === 'transport' && <TransportSection />}
        {activeTab === 'food' && <FoodSection />}
        {activeTab === 'budget' && <BudgetSection />}
        {activeTab === 'docs' && <DocumentsSection />}
        {activeTab === 'checklist' && <ChecklistSection />}
      </main>
    </EditProvider>
  );
}
