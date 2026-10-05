import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { X, Heart, ExternalLink, Share2, Clock, Calendar, Check, ArrowUpRight } from 'lucide-react';

interface CardModalProps {
  item: ContentItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = new Date(item.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E1017] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#1E2230] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-md bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white backdrop-blur-xs border border-white/[0.1] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-white/[0.04]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-blue-600 text-white font-semibold">
              {item.category}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono capitalize bg-black/60 text-zinc-300 border border-white/[0.1]">
              {item.type}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-500 mb-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {item.source}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
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

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-snug mb-4">
            {item.title}
          </h2>

          {/* Author snippet */}
          <div className="flex items-center gap-2.5 py-2.5 border-y border-zinc-100 dark:border-[#1E2230] mb-5">
            {item.authorAvatar ? (
              <img
                src={item.authorAvatar}
                alt={item.author}
                className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-white/[0.1]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs flex items-center justify-center font-bold">
                {item.author.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                {item.author}
              </p>
              {item.mediaExtra?.handle && (
                <p className="text-[11px] font-mono text-zinc-500">{item.mediaExtra.handle}</p>
              )}
            </div>
            {item.mediaExtra?.rating && (
              <div className="ml-auto text-[11px] font-mono text-amber-500">
                ★ {item.mediaExtra.rating} / 5.0
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed space-y-3 mb-5">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {item.description}
            </p>
            <p>{item.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-[#161924] border border-zinc-200 dark:border-[#1E2230] text-zinc-600 dark:text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-zinc-100 dark:border-[#1E2230]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isFavorite
                    ? 'text-rose-500 bg-rose-500/10 border border-rose-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-[#161924] hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-[#161924] hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
              >
                <span>Visit Source</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
