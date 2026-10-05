import React from 'react';
import { Category, ContentType } from '@/types';
import {
  Layers,
  Cpu,
  TrendingUp,
  Film,
  Trophy,
  HeartPulse,
  Atom,
  Newspaper,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: Category | 'all';
  onSelectCategory: (cat: Category | 'all') => void;
  selectedType: ContentType | 'all';
  onSelectType: (type: ContentType | 'all') => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedType,
  onSelectType,
  categoryCounts = {},
}) => {
  const categories: { id: Category | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Channels', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'technology', label: 'Tech & AI', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'finance', label: 'Finance & Macro', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'entertainment', label: 'Media & Cinema', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'sports', label: 'Sports Science', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'health', label: 'Health & Bio', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'science', label: 'Deep Science', icon: <Atom className="w-3.5 h-3.5" /> },
  ];

  const types: { id: ContentType | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Formats', icon: <Layers className="w-3 h-3" /> },
    { id: 'news', label: 'News Wire', icon: <Newspaper className="w-3 h-3" /> },
    { id: 'recommendation', label: 'Curated Picks', icon: <Sparkles className="w-3 h-3" /> },
    { id: 'social', label: 'Discussions', icon: <MessageSquare className="w-3 h-3" /> },
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Category Pills Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 dark:bg-[#0E1017] border border-zinc-200 dark:border-[#1E2230] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <span className={isActive ? 'opacity-100' : 'opacity-70'}>{cat.icon}</span>
              <span>{cat.label}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ${
                    isActive
                      ? 'bg-white/20 dark:bg-black/15 text-white dark:text-zinc-900 font-semibold'
                      : 'text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Format Filter Row */}
      <div className="flex items-center justify-between border-t border-zinc-200/80 dark:border-[#1E2230] pt-2.5">
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-[#0E1017] p-0.5 rounded-lg border border-zinc-200 dark:border-[#1E2230]">
          {types.map((t) => {
            const isActive = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectType(t.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
