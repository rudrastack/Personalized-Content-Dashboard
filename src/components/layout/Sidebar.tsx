import React from 'react';
import { ActiveTab } from '@/types';
import {
  Compass,
  TrendingUp,
  Bookmark,
  SlidersHorizontal,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  X,
  Radio,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  trendingCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  liveUpdates: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  trendingCount,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  liveUpdates,
}) => {
  const mainNavItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'feed',
      label: 'Personalized Stream',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'trending',
      label: 'Trending Velocity',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: trendingCount,
    },
    {
      id: 'favorites',
      label: 'Saved Bookmarks',
      icon: <Bookmark className="w-4 h-4" />,
      badge: favoritesCount,
    },
  ];

  const secondaryNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'analytics',
      label: 'Telemetry & Stats',
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: 'preferences',
      label: 'Content Preferences',
      icon: <SlidersHorizontal className="w-4 h-4" />,
    },
  ];

  const content = (
    <div className="flex flex-col h-full justify-between py-4 px-3">
      {/* Workspace Brand / Identity */}
      <div>
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2.5">
            {/* Minimalist Geometric Logo */}
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/60 dark:border-white/[0.12] flex items-center justify-center text-white shrink-0 shadow-xs">
              <div className="w-3.5 h-3.5 bg-blue-500 rounded-sm rotate-45" />
            </div>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
                  PrismFlow
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-1 py-0.2">
                  v2.4
                </span>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Navigation Group */}
        <div className="space-y-4">
          <div>
            {!isCollapsed && (
              <p className="px-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                DISCOVER
              </p>
            )}
            <nav className="space-y-0.5">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-200/80 dark:bg-white/[0.08] text-zinc-900 dark:text-white border border-zinc-300/80 dark:border-white/[0.08] shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.03]'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className={isActive ? 'text-blue-500' : 'text-zinc-400'}>
                      {item.icon}
                    </div>

                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}

                    {!isCollapsed && typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/40">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Secondary Navigation Group */}
          <div>
            {!isCollapsed && (
              <p className="px-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                WORKSPACE
              </p>
            )}
            <nav className="space-y-0.5">
              {secondaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-200/80 dark:bg-white/[0.08] text-zinc-900 dark:text-white border border-zinc-300/80 dark:border-white/[0.08] shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.03]'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className={isActive ? 'text-blue-500' : 'text-zinc-400'}>
                      {item.icon}
                    </div>

                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer / System Status & Collapse */}
      <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-800/80">
        {!isCollapsed && (
          <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.04] text-[11px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {liveUpdates && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    liveUpdates ? 'bg-emerald-500' : 'bg-zinc-500'
                  }`}
                />
              </span>
              <span className="text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
                {liveUpdates ? 'STREAM ACTIVE' : 'STREAM PAUSED'}
              </span>
            </div>
            <Radio className={`w-3 h-3 ${liveUpdates ? 'text-emerald-500' : 'text-zinc-500'}`} />
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex w-full items-center justify-center p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.03] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 border-r border-zinc-200 dark:border-[#1E2230] bg-white dark:bg-[#090A0F] transition-all duration-200 z-40 ${
          isCollapsed ? 'w-16' : 'w-56'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={onCloseMobile}
        >
          <div
            className="w-64 h-full bg-white dark:bg-[#090A0F] border-r border-zinc-200 dark:border-[#1E2230] shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
};
