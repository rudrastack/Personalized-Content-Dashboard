import React from 'react';
import { Category, UserPreferences } from '@/types';
import {
  X,
  SlidersHorizontal,
  Check,
  Cpu,
  TrendingUp,
  Film,
  Trophy,
  HeartPulse,
  Atom,
  RotateCcw,
} from 'lucide-react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onToggleCategory: (category: Category) => void;
  onUpdateLayout: (layout: 'grid' | 'list') => void;
  onToggleAutoRefresh: (enabled: boolean) => void;
  onResetPreferences: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onToggleCategory,
  onUpdateLayout,
  onToggleAutoRefresh,
  onResetPreferences,
}) => {
  if (!isOpen) return null;

  const categoryList: { id: Category; label: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'technology',
      label: 'Technology & AI',
      description: 'Quantum computing, agent architectures, hardware breakthroughs',
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
    {
      id: 'finance',
      label: 'Markets & Macro',
      description: 'Central bank policies, digital settlement, venture capital',
      icon: <TrendingUp className="w-3.5 h-3.5" />,
    },
    {
      id: 'entertainment',
      label: 'Media & Cinema',
      description: 'Virtual production, audio dramas, creative direction',
      icon: <Film className="w-3.5 h-3.5" />,
    },
    {
      id: 'sports',
      label: 'Sports Science',
      description: 'Endurance pacing, telemetry diagnostics, motorsport',
      icon: <Trophy className="w-3.5 h-3.5" />,
    },
    {
      id: 'health',
      label: 'Health & Longevity',
      description: 'mRNA therapeutics, circadian rest, cellular optimization',
      icon: <HeartPulse className="w-3.5 h-3.5" />,
    },
    {
      id: 'science',
      label: 'Deep Science',
      description: 'James Webb observations, quantum entanglement, geophysics',
      icon: <Atom className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0E1017] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#1E2230] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-100 dark:border-[#1E2230]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-500" />
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Stream Preferences
              </h2>
              <p className="text-[11px] text-zinc-500">
                Configure subscribed topics and layout defaults
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Categories Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase font-mono tracking-wider">
                Active Channels
              </label>
              <span className="text-[11px] font-mono text-zinc-500">
                {preferences.favoriteCategories.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categoryList.map((cat) => {
                const isSelected = preferences.favoriteCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => onToggleCategory(cat.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-blue-500/50 bg-blue-500/5 text-zinc-100'
                        : 'border-zinc-200 dark:border-[#1E2230] hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-[#121520]'
                    }`}
                  >
                    <div className={`mt-0.5 ${isSelected ? 'text-blue-500' : 'text-zinc-500'}`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          {cat.label}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-blue-500 stroke-[3]" />
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 line-clamp-2 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Mode */}
          <div className="pt-3 border-t border-zinc-100 dark:border-[#1E2230]">
            <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase font-mono tracking-wider mb-2">
              Default Card Layout
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateLayout('grid')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                  preferences.layoutMode === 'grid'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-500 font-semibold'
                    : 'border-zinc-200 dark:border-[#1E2230] text-zinc-500 hover:text-zinc-300'
                }`}
              >
                3-Column Grid
              </button>
              <button
                onClick={() => onUpdateLayout('list')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                  preferences.layoutMode === 'list'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-500 font-semibold'
                    : 'border-zinc-200 dark:border-[#1E2230] text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Compact List
              </button>
            </div>
          </div>

          {/* Live Stream Switch */}
          <div className="pt-3 border-t border-zinc-100 dark:border-[#1E2230] flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Simulated Live Ingestion
              </p>
              <p className="text-[11px] text-zinc-500">
                Automatically ingest simulated real-time news & social updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoRefresh}
                onChange={(e) => onToggleAutoRefresh(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-zinc-100 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#090A0F]">
          <button
            onClick={onResetPreferences}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-300"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
