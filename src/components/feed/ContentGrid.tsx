import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { ContentCard } from './ContentCard';
import { CardModal } from './CardModal';
import { Reorder } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';

interface ContentGridProps {
  items: ContentItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onReorder: (newItems: ContentItem[]) => void;
  layoutMode: 'grid' | 'list';
  onToggleLayout: (mode: 'grid' | 'list') => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  favorites,
  onToggleFavorite,
  onReorder,
  layoutMode,
  onToggleLayout,
}) => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  return (
    <div>
      {/* Feed Control Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">
            {items.length} {items.length === 1 ? 'record' : 'records'} indexed
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.04] px-2 py-0.5 rounded">
            Drag to customize stream order
          </span>
        </div>

        {/* Grid / List Layout Switcher */}
        <div className="flex items-center gap-0.5 bg-zinc-100 dark:bg-[#0E1017] p-0.5 rounded-lg border border-zinc-200 dark:border-[#1E2230]">
          <button
            onClick={() => onToggleLayout('grid')}
            className={`p-1 rounded-md text-xs transition-all ${
              layoutMode === 'grid'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleLayout('list')}
            className={`p-1 rounded-md text-xs transition-all ${
              layoutMode === 'list'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Drag & Drop Reorderable Group */}
      <Reorder.Group
        axis={layoutMode === 'grid' ? 'y' : 'y'}
        values={items}
        onReorder={onReorder}
        className={
          layoutMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
            : 'flex flex-col gap-3'
        }
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            dragListener={true}
            className="cursor-default select-none focus:outline-none"
            whileDrag={{
              scale: 1.01,
              zIndex: 30,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            }}
            transition={{ duration: 0.15 }}
          >
            <ContentCard
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={(selected) => setSelectedItem(selected)}
              layoutMode={layoutMode}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Card Detail Modal */}
      <CardModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
