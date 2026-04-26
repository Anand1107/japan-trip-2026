'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
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
  CITY_HEX,
  CITY_LIGHT,
  type ChecklistItem,
} from '../lib/tripData';

// ─── Checklist hook ────────────────────────────────────────────────────────────
function useChecklist(items: ChecklistItem[], storageKey: string) {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setState(JSON.parse(saved));
    } catch { /* ignore */ }
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
  const cls: Record<string, string> = {
    Osaka: 'pill-osaka',
    Kyoto: 'pill-kyoto',
    Tokyo: 'pill-tokyo',
  };
  return <span className={`pill ${cls[city] ?? ''}`}>{city}</span>;
}

// ─── Section: Overview ─────────────────────────────────────────────────────────
function OverviewSection() {
  return (
    <div className="space-y-4 animate-fade-up">
      {/* Hero card */}
      <div className="card text-center" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <p className="text-4xl mb-3">🌸</p>
        <h1 className="font-serif text-2xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
          Japan 2026
        </h1>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Anand, Saranya &amp; Aila · Sep 11–23 · Melbourne ✈ KIX
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="pill pill-osaka">Osaka · 3 nights</span>
          <span className="pill pill-kyoto">Kyoto · 3 nights</span>
          <span className="pill pill-tokyo">Tokyo · 6 nights</span>
        </div>
      </div>

      {/* Route */}
      <div className="card">
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-subtle)' }}>
          Route
        </p>
        <div className="flex items-center gap-2 flex-wrap text-sm font-medium">
          <span style={{ color: 'var(--text-muted)' }}>Melbourne</span>
          <span style={{ color: 'var(--text-subtle)' }}>→</span>
          <span style={{ color: 'var(--osaka-hex)' }}>Osaka KIX</span>
          <span style={{ color: 'var(--text-subtle)' }}>→</span>
          <span style={{ color: 'var(--kyoto-hex)' }}>Kyoto</span>
          <span style={{ color: 'var(--text-subtle)' }}>→</span>
          <span style={{ color: 'var(--tokyo-hex)' }}>Tokyo</span>
          <span style={{ color: 'var(--text-subtle)' }}>→</span>
          <span style={{ color: 'var(--osaka-hex)' }}>KIX</span>
          <span style={{ color: 'var(--text-subtle)' }}>→</span>
          <span style={{ color: 'var(--text-muted)' }}>Melbourne</span>
        </div>
      </div>

      {/* Summary grid */}
      <div className="card">
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-subtle)' }}>
          Trip Details
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Travellers', value: 'Anand, Saranya & Aila' },
            { label: 'Duration', value: '13 days · 12 nights' },
            { label: 'Fly in', value: 'Osaka KIX — Sep 11' },
            { label: 'Fly out', value: 'KIX → Melbourne — Sep 23' },
            { label: 'Hotels', value: 'MIMARU Apartments ×3' },
            { label: 'Rail pass', value: 'No JR Pass — IC card + Shinkansen tickets' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-subtle)' }}>
                {item.label}
              </p>
              <p className="font-medium" style={{ color: 'var(--text)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="card">
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-subtle)' }}>
          Trip Notes
        </p>
        <EditableText
          storageKey="overview_notes"
          defaultValue="September is Silver Week — Sep 19–23 is a major holiday period in Japan. DisneySea on Sep 19 will be busy; book well in advance. MIMARU apartments have full kitchens, perfect for Aila. Use ICOCA IC card from KIX airport for all local transport. No JR Pass needed for this route."
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
          multiline
          tag="p"
        />
      </div>

      {/* Silver Week alert */}
      <div
        className="card"
        style={{
          background: 'var(--osaka-bg)',
          boxShadow: 'none',
          border: '1.5px solid var(--osaka-hex)',
          opacity: 0.9,
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--osaka-hex)' }}>
              Silver Week — Sep 19–23
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--osaka-hex)', opacity: 0.8 }}>
              DisneySea, MIMARU hotels, and Shinkansen reserved seats sell out months ahead. Book these first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Itinerary ────────────────────────────────────────────────────────
function ItinerarySection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3 animate-fade-up">
      <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>
        Day by Day
      </h2>
      {itinerary.map((day, idx) => {
        const hex = CITY_HEX[day.city];
        const light = CITY_LIGHT[day.city];
        const isOpen = expanded === idx;
        return (
          <div
            key={idx}
            className="card overflow-hidden cursor-pointer"
            onClick={() => setExpanded(isOpen ? null : idx)}
            style={{ padding: 0 }}
          >
            {/* Day header */}
            <div className="flex items-center gap-3 p-4">
              {/* City colour strip */}
              <div
                className="w-1 self-stretch rounded-full flex-shrink-0"
                style={{ backgroundColor: hex, minHeight: 40 }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[11px] font-medium uppercase tracking-wide"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {day.day} {day.date}
                  </span>
                  <CityPill city={day.city} />
                </div>
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                  {day.theme}
                </p>
                {!isOpen && (
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {day.activities[0]?.title}
                    {day.activities.length > 1 && ` +${day.activities.length - 1} more`}
                  </p>
                )}
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-subtle)' }}>
                {isOpen ? '▲' : '▼'}
              </span>
            </div>

            {/* Expanded activities */}
            {isOpen && (
              <div
                className="px-4 pb-4 pt-0 space-y-0"
                style={{ borderTop: `1px solid ${light}` }}
              >
                {day.activities.map((act, ai) => (
                  <div key={ai} className="flex gap-3 pt-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5"
                        style={{ backgroundColor: hex }}
                      />
                      {ai < day.activities.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ backgroundColor: light }} />
                      )}
                    </div>
                    <div className="pb-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: 'var(--text-subtle)' }}
                        >
                          {act.time}
                        </span>
                        {act.urgent && (
                          <span className="badge-urgent">Book now</span>
                        )}
                      </div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {act.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                        {act.location}
                      </p>
                      {act.notes && (
                        <EditableText
                          storageKey={`act_${idx}_${ai}_notes`}
                          defaultValue={act.notes}
                          className="text-xs mt-1 italic leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
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
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Hotels</h2>
      {hotels.map((h, i) => {
        const hex = CITY_HEX[h.city];
        const light = CITY_LIGHT[h.city];
        return (
          <div key={i} className="card">
            {/* Hotel header */}
            <div className="flex items-start justify-between mb-4 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CityPill city={h.city} />
                  <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                    {h.checkIn} → {h.checkOut} · {h.nights}n
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold" style={{ color: 'var(--text)' }}>
                  {h.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                  {h.nearbyStation}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: light }}
              >
                🏨
              </div>
            </div>

            {/* Details grid */}
            <div
              className="grid grid-cols-2 gap-3 text-sm pt-3 mb-3"
              style={{ borderTop: `1px solid ${light}` }}
            >
              {[
                { label: 'Check-in', key: `hotel_${i}_checkin`, val: h.checkIn },
                { label: 'Check-out', key: `hotel_${i}_checkout`, val: h.checkOut },
                { label: 'Booking ref', key: `hotel_${i}_ref`, val: h.bookingRef },
                { label: 'Type', key: null, val: h.apartmentType },
              ].map((row) => (
                <div key={row.label}>
                  <p
                    className="text-[11px] uppercase tracking-wide mb-0.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {row.label}
                  </p>
                  {row.key ? (
                    <EditableText
                      storageKey={row.key}
                      defaultValue={row.val}
                      className="font-medium text-sm"
                      style={{ color: 'var(--text)' }}
                    />
                  ) : (
                    <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                      {row.val}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="mb-3">
              <p
                className="text-[11px] uppercase tracking-wide mb-0.5"
                style={{ color: 'var(--text-subtle)' }}
              >
                Address
              </p>
              <EditableText
                storageKey={`hotel_${i}_addr`}
                defaultValue={h.address}
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              />
            </div>

            {/* Cost */}
            <div className="mb-3">
              <p
                className="text-[11px] uppercase tracking-wide mb-0.5"
                style={{ color: 'var(--text-subtle)' }}
              >
                Est. cost
              </p>
              <p className="text-sm font-medium" style={{ color: hex }}>
                {h.costPerNight}
              </p>
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-1.5">
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
  const icons: Record<string, string> = {
    'Nankai Rapid Service': '🚃',
    'Tokaido Shinkansen — Hikari or Kodama': '🚅',
    'Tokaido Shinkansen — Nozomi': '🚅',
    'Romancecar Limited Express (Odakyu)': '🚞',
    'Shinkansen → Shin-Osaka → Haruka, OR domestic flight HND→KIX': '✈️',
    default: '🚄',
  };

  return (
    <div className="space-y-4 animate-fade-up">
      {/* IC Card info */}
      <div
        className="card"
        style={{ background: 'var(--tokyo-bg)', boxShadow: 'none' }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🪙</span>
          <div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--tokyo-hex)' }}>
              IC Card (ICOCA) — Get at KIX on arrival
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tokyo-hex)', opacity: 0.8 }}>
              Load ¥15,000–20,000. Works on all subways, local JR, buses, and convenience stores.
              No JR Pass needed for this trip — individual Shinkansen tickets are cheaper.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['No JR Pass needed', 'Tap in & out', 'Works at 7-Eleven', 'ICOCA = Kansai'].map((t) => (
                <span key={t} className="tag" style={{ background: 'rgba(30,58,110,0.08)', color: 'var(--tokyo-hex)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Key Routes</h2>

      {transportRoutes.map((r, i) => (
        <div key={i} className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl flex-shrink-0">
              {icons[r.train] ?? icons.default}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="flex items-center gap-2 text-sm font-semibold flex-wrap"
                style={{ color: 'var(--text)' }}
              >
                <span className="truncate">{r.from}</span>
                <span style={{ color: 'var(--text-subtle)' }}>→</span>
                <span className="truncate">{r.to}</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>{r.date}</p>
            </div>
          </div>
          <div
            className="grid grid-cols-3 gap-3 text-sm pt-3"
            style={{ borderTop: '1px solid #F0F0F0' }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-subtle)' }}>Train</p>
              <p className="font-medium text-xs" style={{ color: 'var(--text)' }}>{r.train}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-subtle)' }}>Duration</p>
              <p className="font-medium" style={{ color: 'var(--text)' }}>{r.duration}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-subtle)' }}>Price</p>
              <p className="font-medium" style={{ color: 'var(--text)' }}>{r.price}</p>
            </div>
          </div>
          {r.notes && (
            <EditableText
              storageKey={`route_${i}_notes`}
              defaultValue={r.notes}
              className="text-xs italic mt-2 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              multiline
              tag="p"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Section: Food ─────────────────────────────────────────────────────────────
function FoodSection() {
  const cityOrder = ['Osaka', 'Kyoto', 'Tokyo', 'All'] as const;
  const cityColors: Record<string, string> = {
    Osaka: 'var(--osaka-hex)',
    Kyoto: 'var(--kyoto-hex)',
    Tokyo: 'var(--tokyo-hex)',
    All: '#8B7355',
  };
  const cityBg: Record<string, string> = {
    Osaka: 'var(--osaka-bg)',
    Kyoto: 'var(--kyoto-bg)',
    Tokyo: 'var(--tokyo-bg)',
    All: '#F7F3EE',
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Food Guide</h2>
      {cityOrder.map((city) => {
        const items = foodGuide.filter((f) => f.city === city);
        if (!items.length) return null;
        return (
          <div key={city}>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: cityColors[city] }}
            >
              {city === 'All' ? 'Everywhere in Japan' : city}
            </h3>
            <div className="space-y-2">
              {items.map((f, i) => (
                <div key={i} className="card flex gap-3 items-start" style={{ padding: 14 }}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: cityBg[city] }}
                  >
                    {f.mustTry ? '⭐' : '🍴'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {f.name}
                      </span>
                      <span className="tag text-[11px]">{f.type}</span>
                    </div>
                    {f.notes && (
                      <EditableText
                        storageKey={`food_${city}_${i}`}
                        defaultValue={f.notes}
                        className="text-xs mt-0.5 leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
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
  const totalLow = budgetItems.reduce((sum, b) => sum + b.low, 0);
  const totalHigh = budgetItems.reduce((sum, b) => sum + b.high, 0);
  const maxHigh = Math.max(...budgetItems.map((b) => b.high));

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Hero budget card */}
      <div className="card" style={{ background: '#1A1A1A', color: '#FAFAF9' }}>
        <p className="text-xs opacity-50 mb-1 uppercase tracking-wide">Estimated Total</p>
        <p className="font-serif text-3xl font-semibold">
          AUD ${totalLow.toLocaleString()}–${totalHigh.toLocaleString()}
        </p>
        <p className="text-xs opacity-40 mt-1">Family of 3 · 13 days · 12 nights</p>
      </div>

      <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Breakdown</h2>

      {budgetItems.map((b, i) => {
        const barPct = Math.min(100, (b.high / maxHigh) * 100);
        const barColor = b.high > 2500 ? 'var(--osaka-hex)' : b.high > 1000 ? 'var(--kyoto-hex)' : 'var(--tokyo-hex)';
        return (
          <div key={i} className="card">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>{b.category}</p>
                {b.notes && (
                  <EditableText
                    storageKey={`budget_${i}_notes`}
                    defaultValue={b.notes}
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                    multiline
                    tag="p"
                  />
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                  ${b.low.toLocaleString()}–${b.high.toLocaleString()}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>AUD</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0F0F0' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${barPct}%`, background: barColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section: Checklist ────────────────────────────────────────────────────────
function ChecklistSection() {
  const booking = useChecklist(bookingChecklist, 'checklist_booking');
  const packing = useChecklist(packingList, 'checklist_packing');

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Bookings</h2>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {booking.checked}/{booking.total}
          </span>
        </div>
        <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: '#F0F0F0' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(booking.checked / booking.total) * 100}%`, background: 'var(--osaka-hex)' }}
          />
        </div>
        <div className="space-y-2">
          {bookingChecklist.map((item) => (
            <label
              key={item.id}
              className="card flex items-start gap-3 cursor-pointer"
              style={{
                opacity: booking.state[item.id] ? 0.45 : 1,
                transition: 'opacity 200ms ease',
                padding: 14,
              }}
            >
              <input
                type="checkbox"
                checked={!!booking.state[item.id]}
                onChange={() => booking.toggle(item.id)}
                className="mt-0.5 w-4 h-4 flex-shrink-0"
                style={{ accentColor: 'var(--osaka-hex)' }}
              />
              <div className="flex-1 min-w-0">
                <span
                  className="text-sm"
                  style={{
                    color: 'var(--text)',
                    textDecoration: booking.state[item.id] ? 'line-through' : 'none',
                  }}
                >
                  {item.text}
                </span>
                {item.urgent && !booking.state[item.id] && (
                  <span className="badge-urgent ml-2">Urgent</span>
                )}
                {item.deadline && (
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                    {item.deadline}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Packing */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>Packing List</h2>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {packing.checked}/{packing.total}
          </span>
        </div>
        <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: '#F0F0F0' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(packing.checked / packing.total) * 100}%`, background: 'var(--kyoto-hex)' }}
          />
        </div>
        <div className="space-y-2">
          {packingList.map((item) => (
            <label
              key={item.id}
              className="card flex items-start gap-3 cursor-pointer"
              style={{
                opacity: packing.state[item.id] ? 0.45 : 1,
                transition: 'opacity 200ms ease',
                padding: 14,
              }}
            >
              <input
                type="checkbox"
                checked={!!packing.state[item.id]}
                onChange={() => packing.toggle(item.id)}
                className="mt-0.5 w-4 h-4 flex-shrink-0"
                style={{ accentColor: 'var(--kyoto-hex)' }}
              />
              <span
                className="text-sm"
                style={{
                  color: 'var(--text)',
                  textDecoration: packing.state[item.id] ? 'line-through' : 'none',
                }}
              >
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
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === 'loading';

  useEffect(() => {
    const saved = sessionStorage.getItem('activeTab');
    if (saved) setActiveTab(saved);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    sessionStorage.setItem('activeTab', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ width: 32, height: 32, border: '2px solid var(--osaka-hex)', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1.5rem' }}>
        <div className="card" style={{ maxWidth: 360, width: '100%', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
          <h1 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>Japan 2026</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sign in to access the family trip planner</p>
          <button
            onClick={() => signIn('auth0')}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              background: 'var(--osaka-hex)',
              color: '#fff',
              borderRadius: 'var(--r-sm)',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign in with Auth0
          </button>
        </div>
      </div>
    );
  }

  return (
    <EditProvider>
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-2xl mx-auto px-4 pt-16 pb-28">
        {activeTab === 'overview'   && <OverviewSection />}
        {activeTab === 'days'       && <ItinerarySection />}
        {activeTab === 'hotels'     && <HotelsSection />}
        {activeTab === 'transport'  && <TransportSection />}
        {activeTab === 'food'       && <FoodSection />}
        {activeTab === 'budget'     && <BudgetSection />}
        {activeTab === 'docs'       && <DocumentsSection />}
        {activeTab === 'checklist'  && <ChecklistSection />}
      </main>
    </EditProvider>
  );
}
