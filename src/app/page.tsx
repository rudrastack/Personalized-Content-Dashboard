'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchDashboardContent,
  toggleFavorite,
  clearFavorites,
  reorderItems,
  setSelectedCategory,
  setSelectedType,
  setSearchQuery,
  addLiveItem,
} from '@/redux/slices/contentSlice';
import {
  toggleCategoryPreference,
  setLayoutMode,
  setAutoRefresh,
  resetPreferences,
  setPreferencesModalOpen,
} from '@/redux/slices/preferencesSlice';
import { generateLiveItem } from '@/services/api';
import { ActiveTab } from '@/types';

// Layout & Core Components
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { CategoryPills } from '@/components/feed/CategoryPills';
import { ContentGrid } from '@/components/feed/ContentGrid';
import { TrendingSection } from '@/components/trending/TrendingSection';
import { FavoritesSection } from '@/components/favorites/FavoritesSection';
import { AnalyticsSection } from '@/components/analytics/AnalyticsSection';
import { PreferencesModal } from '@/components/preferences/PreferencesModal';


// Feedback States
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

import { RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  // Redux state selectors
  const {
    items,
    status,
    error,
    searchQuery,
    selectedCategory,
    selectedType,
    favorites,
    liveUpdates,
  } = useAppSelector((state) => state.content);

  const { preferences, isPreferencesModalOpen } = useAppSelector(
    (state) => state.preferences
  );

  // Local navigation & layout state
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveBanner, setLiveBanner] = useState<string | null>(null);

  // Initial Content Load based on User's Preferred Categories
  useEffect(() => {
    dispatch(fetchDashboardContent(preferences.favoriteCategories));
  }, [dispatch, preferences.favoriteCategories]);

  // Real-Time Simulated Stream (WebSockets / SSE Simulation)
  useEffect(() => {
    if (!liveUpdates && !preferences.autoRefresh) return;

    const interval = setInterval(() => {
      const newItem = generateLiveItem();
      dispatch(addLiveItem(newItem));
      setLiveBanner(`Live Ingestion: ${newItem.title}`);
      setTimeout(() => setLiveBanner(null), 4000);
    }, 18000);

    return () => clearInterval(interval);
  }, [liveUpdates, preferences.autoRefresh, dispatch]);

  // Filtered & Searched items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // 2. Filter by Type
    if (selectedType !== 'all') {
      result = result.filter((item) => item.type === selectedType);
    }

    // 3. Filter by Debounced Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [items, selectedCategory, selectedType, searchQuery]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Sidebar Navigation Rail */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'preferences') {
            dispatch(setPreferencesModalOpen(true));
          }
        }}
        favoritesCount={favorites.length}
        trendingCount={items.filter((i) => i.trendingScore > 85).length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        liveUpdates={liveUpdates}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {/* Live Ingestion Alert Banner */}
          {liveBanner && (
            <div className="mb-5 flex items-center justify-between px-3.5 py-2 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="truncate">{liveBanner}</span>
              </div>
              <button
                onClick={() => setLiveBanner(null)}
                className="text-zinc-400 hover:text-white shrink-0 ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* View Tab Switching */}
          {activeTab === 'feed' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Top Title & Sync Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-[#1E2230]">
                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Personalized Stream
                  </h1>
                  <p className="text-xs text-zinc-500">
                    Aggregated real-time news, curated media, and community discussions.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={() => dispatch(fetchDashboardContent(preferences.favoriteCategories))}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#0E1017] hover:bg-zinc-100 dark:hover:bg-[#151824] text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors shadow-2xs"
                    title="Refresh content feed"
                  >
                    <RefreshCw className={`w-3 h-3 text-zinc-400 ${status === 'loading' ? 'animate-spin' : ''}`} />
                    <span>Sync</span>
                  </button>
                </div>
              </div>

              {/* Category & Format Filter Pills */}
              <CategoryPills
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => dispatch(setSelectedCategory(cat))}
                selectedType={selectedType}
                onSelectType={(type) => dispatch(setSelectedType(type))}
                categoryCounts={categoryCounts}
              />

              {/* Loading Skeleton */}
              {status === 'loading' && items.length === 0 && (
                <LoadingSkeleton count={6} layoutMode={preferences.layoutMode} />
              )}

              {/* Error State */}
              {status === 'failed' && items.length === 0 && (
                <ErrorState
                  message={error || 'Failed to fetch content.'}
                  onRetry={() => dispatch(fetchDashboardContent(preferences.favoriteCategories))}
                />
              )}

              {/* Empty Search Results */}
              {filteredItems.length === 0 && status !== 'loading' && (
                <EmptyState
                  type={searchQuery ? 'search' : 'general'}
                  title={searchQuery ? `No results for "${searchQuery}"` : 'No items match filters'}
                  description="Try broadening your category filter or clearing your search keywords."
                  actionText="Clear Filters"
                  onAction={() => {
                    dispatch(setSelectedCategory('all'));
                    dispatch(setSelectedType('all'));
                    dispatch(setSearchQuery(''));
                  }}
                />
              )}

              {/* Content Grid with Drag & Drop */}
              {filteredItems.length > 0 && (
                <ContentGrid
                  items={filteredItems}
                  favorites={favorites}
                  onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  onReorder={(newOrder) => dispatch(reorderItems(newOrder))}
                  layoutMode={preferences.layoutMode}
                  onToggleLayout={(mode) => dispatch(setLayoutMode(mode))}
                />
              )}
            </div>
          )}

          {/* Trending Leaderboard */}
          {activeTab === 'trending' && (
            <TrendingSection
              items={items}
              favorites={favorites}
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          )}

          {/* Bookmarks Section */}
          {activeTab === 'favorites' && (
            <FavoritesSection
              items={items}
              favorites={favorites}
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
              onClearFavorites={() => dispatch(clearFavorites())}
              onNavigateToFeed={() => setActiveTab('feed')}
            />
          )}

          {/* Telemetry / Analytics */}
          {activeTab === 'analytics' && (
            <AnalyticsSection
              items={items}
              favorites={favorites}
              favoriteCategories={preferences.favoriteCategories}
            />
          )}
        </main>
      </div>

      {/* Preferences & Channels Modal */}
      <PreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => dispatch(setPreferencesModalOpen(false))}
        preferences={preferences}
        onToggleCategory={(category) => dispatch(toggleCategoryPreference(category))}
        onUpdateLayout={(mode) => dispatch(setLayoutMode(mode))}
        onToggleAutoRefresh={(enabled) => dispatch(setAutoRefresh(enabled))}
        onResetPreferences={() => dispatch(resetPreferences())}
      />
    </div>
  );
}
