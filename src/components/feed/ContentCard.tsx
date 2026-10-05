import React from 'react';
import { ContentItem } from '@/types';
import {
  Heart,
  Newspaper,
  Sparkles,
  MessageSquare,
  Clock,
  ExternalLink,
  GripVertical,
  ArrowUpRight,
} from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (item: ContentItem) => void;
  layoutMode?: 'grid' | 'list';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onSelect,
  layoutMode = 'grid',
}) => {
  const renderTypeIcon = () => {
    switch (item.type) {
      case 'news':
        return <Newspaper className="w-3 h-3" />;
      case 'recommendation':
        return <Sparkles className="w-3 h-3" />;
      case 'social':
        return <MessageSquare className="w-3 h-3" />;
    }
  };

  const formattedDate = new Date(item.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // List View Mode
  if (layoutMode === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-stretch gap-4 p-3.5 rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017] hover:border-zinc-300 dark:hover:border-[#2C3246] hover:bg-zinc-50/50 dark:hover:bg-[#121520] transition-all duration-150">
        {/* Drag Handle */}
        <div className="hidden sm:flex items-center text-zinc-400 dark:text-zinc-600 cursor-grab active:cursor-grabbing hover:text-zinc-300">
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        {/* Thumbnail Image */}
        <div
          onClick={() => onSelect(item)}
          className="relative w-full sm:w-44 h-28 shrink-0 rounded-lg overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04]"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/75 text-zinc-300 border border-white/[0.08] backdrop-blur-xs">
              {item.category}
            </span>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {item.source}
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
                {item.readTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </>
                )}
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className={`p-1.5 rounded-md transition-colors ${
                  isFavorite
                    ? 'text-rose-500'
                    : 'text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title={isFavorite ? 'Remove from saved' : 'Save bookmark'}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`}
                />
              </button>
            </div>

            <h3
              onClick={() => onSelect(item)}
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer line-clamp-1 transition-colors mb-1"
            >
              {item.title}
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-[#1E2230] text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="capitalize flex items-center gap-1">
                {renderTypeIcon()}
                {item.type}
              </span>
              <span>•</span>
              <span className="font-mono">{item.likes} likes</span>
            </div>

            <button
              onClick={() => onSelect(item)}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-400"
            >
              <span>Read article</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#0E1017] hover:border-zinc-300 dark:hover:border-[#2C3246] hover:bg-zinc-50/50 dark:hover:bg-[#11141F] transition-all duration-150 overflow-hidden">
      {/* Top Image */}
      <div
        onClick={() => onSelect(item)}
        className="relative w-full h-44 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-white/[0.04]"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/75 text-zinc-200 border border-white/[0.1] backdrop-blur-xs">
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-zinc-300 border border-white/[0.08] backdrop-blur-xs capitalize">
              {renderTypeIcon()}
              {item.type}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`w-7 h-7 rounded-md flex items-center justify-center backdrop-blur-xs pointer-events-auto transition-colors ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                : 'bg-black/60 text-zinc-400 hover:text-white hover:bg-black/80 border border-white/[0.08]'
            }`}
            title={isFavorite ? 'Saved to bookmarks' : 'Save bookmark'}
          >
            <Heart
              className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Drag Hint on Hover */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-80 transition-opacity flex items-center gap-1 text-[10px] font-mono text-zinc-300 bg-black/70 px-1.5 py-0.5 rounded border border-white/[0.06]">
          <GripVertical className="w-3 h-3" />
          <span>Reorder</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">
              {item.source}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <span>{formattedDate}</span>
              {item.readTime && (
                <>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </>
              )}
            </div>
          </div>

          {/* Headline */}
          <h3
            onClick={() => onSelect(item)}
            className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer line-clamp-2 leading-snug transition-colors mb-2"
          >
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Footer & Actions */}
        <div>
          <div className="flex items-center gap-2 pt-2.5 border-t border-zinc-100 dark:border-[#1E2230] mb-3">
            {item.authorAvatar ? (
              <img
                src={item.authorAvatar}
                alt={item.author}
                className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-white/[0.08]"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] flex items-center justify-center font-bold">
                {item.author.charAt(0)}
              </div>
            )}
            <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-[110px]">
              {item.author}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 ml-auto">
              {item.likes} likes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(item)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-[#161924] hover:bg-zinc-200 dark:hover:bg-[#1C2030] text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <span>Read Article</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-[#1E2230] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#161924] transition-colors"
                title="External Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
