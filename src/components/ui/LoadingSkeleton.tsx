import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  layoutMode?: 'grid' | 'list';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6, layoutMode = 'grid' }) => {
  return (
    <div
      className={
        layoutMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
          : 'flex flex-col gap-3'
      }
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017] p-3.5 shadow-2xs overflow-hidden ${
            layoutMode === 'list' ? 'flex flex-col sm:flex-row gap-4' : ''
          }`}
        >
          {/* Image skeleton */}
          <div
            className={`rounded-lg bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle ${
              layoutMode === 'list'
                ? 'w-full sm:w-44 h-28 shrink-0'
                : 'w-full h-44 mb-3'
            }`}
          />

          {/* Text lines */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-14 h-4 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle" />
                <div className="w-16 h-4 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle" />
              </div>
              <div className="w-full h-4 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle mb-1.5" />
              <div className="w-3/4 h-4 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle mb-3" />
              <div className="w-full h-3 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle mb-1" />
              <div className="w-4/5 h-3 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle mb-3" />
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100 dark:border-[#1E2230]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle" />
                <div className="w-20 h-3 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle" />
              </div>
              <div className="w-16 h-6 rounded bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse-subtle" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
