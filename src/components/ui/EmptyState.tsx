import React from 'react';
import { Search, Bookmark, Compass } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'favorites' | 'general';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'general',
  title,
  description,
  actionText,
  onAction,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-6 h-6 text-zinc-400" />;
      case 'favorites':
        return <Bookmark className="w-6 h-6 text-zinc-400" />;
      default:
        return <Compass className="w-6 h-6 text-zinc-400" />;
    }
  };

  const defaultTitle =
    type === 'search'
      ? 'No results found'
      : type === 'favorites'
      ? 'No saved bookmarks'
      : 'No records available';

  const defaultDescription =
    type === 'search'
      ? 'No articles or discussions match your search parameters. Try broad keywords or clear filters.'
      : type === 'favorites'
      ? 'Bookmark articles from the stream to curate your personal reference library.'
      : 'No content available for your selected preferences.';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-zinc-300 dark:border-[#1E2230] rounded-xl my-4 bg-white/50 dark:bg-[#0E1017]/50">
      <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center mb-3">
        {getIcon()}
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        {title || defaultTitle}
      </h3>
      <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-4">
        {description || defaultDescription}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-xs transition-colors shadow-2xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
