'use client';

import { useEdit } from './EditContext';
import { useSession, signIn, signOut } from 'next-auth/react';

type Tab = { id: string; label: string; icon: string };

const TABS: Tab[] = [
  { id: 'overview',   label: 'Overview', icon: '🗾' },
  { id: 'days',       label: 'Days',     icon: '📅' },
  { id: 'hotels',     label: 'Hotels',   icon: '🏨' },
  { id: 'transport',  label: 'Train',    icon: '🚄' },
  { id: 'food',       label: 'Food',     icon: '🍜' },
  { id: 'budget',     label: 'Budget',   icon: '💴' },
  { id: 'docs',       label: 'Docs',     icon: '📄' },
  { id: 'checklist',  label: 'List',     icon: '✅' },
];

type Props = { activeTab: string; onTabChange: (tab: string) => void };

export default function NavBar({ activeTab, onTabChange }: Props) {
  const { isEditing, toggleEdit, saveStatus } = useEdit();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {/* ─── Top bar ─── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">🌸</span>
            <span
              className="font-serif text-sm font-semibold"
              style={{ color: 'var(--text)' }}
            >
              Japan 2026
            </span>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && (
              <span className="text-xs animate-pulse" style={{ color: 'var(--text-subtle)' }}>
                Saving…
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-xs" style={{ color: '#16a34a' }}>✓ Saved</span>
            )}
            <button
              onClick={toggleEdit}
              className="text-xs px-3 py-1.5 font-medium transition-all"
              style={{
                borderRadius: 'var(--r-sm)',
                background: isEditing ? 'var(--osaka-hex)' : '#F4F4F4',
                color: isEditing ? '#fff' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEditing ? '💾 Done' : '✏️ Edit'}
            </button>
            {user ? (
              <div className="flex items-center gap-1.5">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name ?? 'User'}
                    className="w-7 h-7 rounded-full"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  />
                ) : (
                  <span className="text-base">👤</span>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-xs px-2 py-1 font-medium transition-all"
                  style={{
                    borderRadius: 'var(--r-sm)',
                    background: '#F4F4F4',
                    color: 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('auth0')}
                className="text-xs px-3 py-1.5 font-medium transition-all"
                style={{
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--osaka-hex)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── Bottom nav ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'var(--bg-card)',
          boxShadow: '0 -1px 0 rgba(0,0,0,0.06), 0 -4px 16px rgba(0,0,0,0.04)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-8">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative flex flex-col items-center py-2.5 gap-0.5 transition-colors"
                  style={{
                    color: active ? 'var(--osaka-hex)' : 'var(--text-subtle)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span className="text-lg leading-none">{tab.icon}</span>
                  <span
                    className="text-[10px] font-medium leading-none"
                    style={{ color: active ? 'var(--osaka-hex)' : 'var(--text-subtle)' }}
                  >
                    {tab.label}
                  </span>
                  {active && (
                    <span
                      className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                      style={{
                        width: 28,
                        height: 2.5,
                        background: 'var(--osaka-hex)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
