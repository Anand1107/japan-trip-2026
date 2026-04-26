'use client';

import { useEdit } from './EditContext';

type Tab = {
  id: string;
  label: string;
  icon: string;
};

const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', icon: '🗾' },
  { id: 'days', label: 'Days', icon: '📅' },
  { id: 'hotels', label: 'Hotels', icon: '🏨' },
  { id: 'transport', label: 'Train', icon: '🚄' },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'budget', label: 'Budget', icon: '💴' },
  { id: 'docs', label: 'Docs', icon: '📄' },
  { id: 'checklist', label: 'List', icon: '✅' },
];

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function NavBar({ activeTab, onTabChange }: Props) {
  const { isEditing, toggleEdit, saveStatus } = useEdit();

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-washi border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌸</span>
            <span className="font-serif text-sm font-semibold text-stone-700">Japan 2026</span>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && (
              <span className="text-xs text-stone-400 animate-pulse">Saving…</span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-xs text-emerald-600">✓ Saved</span>
            )}
            <button
              onClick={toggleEdit}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                isEditing
                  ? 'bg-osaka text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isEditing ? '💾 Done' : '✏️ Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-washi border-t border-stone-200 safe-area-bottom">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 gap-0.5 transition-colors ${
                  activeTab === tab.id
                    ? 'text-osaka'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                <span className="text-[10px] font-medium leading-none">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 w-8 h-0.5 bg-osaka rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
