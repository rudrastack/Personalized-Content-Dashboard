import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { TrendingUp, Heart, ArrowUpRight, Flame } from 'lucide-react';
import { CardModal } from '../feed/CardModal';

interface TrendingSectionProps {
  items: ContentItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  items,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const trendingList = [...items]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-[#1E2230]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Trending Velocity
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/[0.06]">
              <Flame className="w-3 h-3 text-amber-500" />
              TOP 10 ACCELERATION
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Ranked by cross-channel engagement velocity and algorithmic discussion momentum.
          </p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2.5">
        {trendingList.map((item, index) => {
          const rank = (index + 1).toString().padStart(2, '0');
          const isFavorite = favorites.includes(item.id);

          return (
            <div
              key={item.id}
              className="group relative flex flex-col sm:flex-row items-center gap-3.5 p-3 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017] hover:border-zinc-300 dark:hover:border-[#2C3246] hover:bg-zinc-50/50 dark:hover:bg-[#121520] transition-all duration-150"
            >
              {/* Rank Index */}
              <div className="w-8 shrink-0 text-center font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                {rank}
              </div>

              {/* Thumbnail */}
              <div
                onClick={() => setSelectedItem(item)}
                className="relative w-full sm:w-28 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.04]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-black/80 text-zinc-300">
                  {item.category}
                </span>
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-1">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {item.source}
                  </span>
                  <span>•</span>
                  <span>{item.author}</span>
                  <span className="ml-auto text-blue-500 font-semibold">
                    {item.trendingScore}% velocity
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedItem(item)}
                  className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer line-clamp-1 transition-colors mb-1.5"
                >
                  {item.title}
                </h3>

                {/* Progress bar */}
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{ width: `${item.trendingScore}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-[#1E2230]">
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-1.5 rounded-md transition-colors ${
                    isFavorite
                      ? 'text-rose-500'
                      : 'text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  title={isFavorite ? 'Remove bookmark' : 'Bookmark item'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-[#161924] hover:bg-zinc-200 dark:hover:bg-[#1C2030] text-[11px] font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CardModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
