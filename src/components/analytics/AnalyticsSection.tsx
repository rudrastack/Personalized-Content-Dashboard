import React from 'react';
import { ContentItem } from '@/types';
import {
  BarChart2,
  Bookmark,
  TrendingUp,
  FolderHeart,
  Eye,
} from 'lucide-react';

interface AnalyticsSectionProps {
  items: ContentItem[];
  favorites: string[];
  favoriteCategories: string[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  items,
  favorites,
  favoriteCategories,
}) => {
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalLikes = items.reduce((acc, item) => acc + item.likes, 0);
  const totalShares = items.reduce((acc, item) => acc + item.shares, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-200 dark:border-[#1E2230]">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
          Telemetry & Analytics
        </h2>
        <p className="text-xs text-zinc-500">
          Stream throughput metrics, subscriber preferences, and category engagement distribution.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Ingested */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017]">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-3">
            <span>Ingested Content</span>
            <BarChart2 className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
            {items.length}
          </div>
          <span className="text-[11px] font-mono text-emerald-500">
            100% Synced
          </span>
        </div>

        {/* Saved Bookmarks */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017]">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-3">
            <span>Saved Bookmarks</span>
            <Bookmark className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
            {favorites.length}
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            Active in Storage
          </span>
        </div>

        {/* Total Likes */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017]">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-3">
            <span>Aggregated Likes</span>
            <Eye className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
            {totalLikes.toLocaleString()}
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {totalShares.toLocaleString()} shares
          </span>
        </div>

        {/* Active Topics */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017]">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-3">
            <span>Active Channels</span>
            <FolderHeart className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="font-mono text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
            {favoriteCategories.length}
          </div>
          <span className="text-[11px] font-mono text-blue-500">
            Subscribed
          </span>
        </div>
      </div>

      {/* Distribution Section */}
      <div className="p-5 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017]">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Category Ingestion Share
          </h3>
          <p className="text-xs text-zinc-500">
            Normalized distribution of records across topic domains.
          </p>
        </div>

        <div className="space-y-3.5">
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const percentage = Math.round((count / (items.length || 1)) * 100);
            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="capitalize text-zinc-700 dark:text-zinc-300">
                    {cat}
                  </span>
                  <span className="text-zinc-500">
                    {count} records ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
