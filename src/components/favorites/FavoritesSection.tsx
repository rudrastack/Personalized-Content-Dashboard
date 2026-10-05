import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { ContentCard } from '../feed/ContentCard';
import { CardModal } from '../feed/CardModal';
import { EmptyState } from '../ui/EmptyState';
import { Bookmark, Trash2 } from 'lucide-react';

interface FavoritesSectionProps {
  items: ContentItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onNavigateToFeed: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  items,
  favorites,
  onToggleFavorite,
  onClearFavorites,
  onNavigateToFeed,
}) => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const favoriteItems = items.filter((item) => favorites.includes(item.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-[#1E2230]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Saved Bookmarks
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/[0.06]">
              {favoriteItems.length} SAVED
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Personal collection of bookmarked articles, recommendations, and discussions.
          </p>
        </div>

        {favoriteItems.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Collection</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteItems.length === 0 ? (
        <EmptyState
          type="favorites"
          title="No bookmarked items"
          description="Click the heart icon on any card in the stream to save it here for reference."
          actionText="Explore Stream"
          onAction={onNavigateToFeed}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {favoriteItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={(selected) => setSelectedItem(selected)}
              layoutMode="grid"
            />
          ))}
        </div>
      )}

      <CardModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
