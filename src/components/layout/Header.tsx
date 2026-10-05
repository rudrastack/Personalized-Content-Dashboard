import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Sun,
  Moon,
  Bell,
  SlidersHorizontal,
  Menu,
  Radio,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSearchQuery, toggleLiveUpdates } from '@/redux/slices/contentSlice';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { setPreferencesModalOpen } from '@/redux/slices/preferencesSlice';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const liveUpdates = useAppSelector((state) => state.content.liveUpdates);
  const preferences = useAppSelector((state) => state.preferences.preferences);
  const currentQuery = useAppSelector((state) => state.content.searchQuery);

  const [localSearch, setLocalSearch] = useState(currentQuery);
  const [showNotifications, setShowNotifications] = useState(false);

  // Debounced search effect (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, dispatch]);

  const handleClearSearch = () => {
    setLocalSearch('');
    dispatch(setSearchQuery(''));
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-zinc-200 dark:border-[#1E2230] transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 gap-4">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Command Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by keyword, author, or #tag..."
              className="w-full pl-9 pr-14 py-1.5 rounded-lg border border-zinc-200 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#0E1017] text-zinc-900 dark:text-zinc-100 text-xs placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/60 focus:bg-white dark:focus:bg-[#12151F] focus:ring-1 focus:ring-blue-500/20 transition-all shadow-2xs"
            />
            {localSearch ? (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute right-2.5 text-[10px] font-mono text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-300/40 dark:border-zinc-700/50">
                /
              </span>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live Sync Toggle */}
          <button
            onClick={() => dispatch(toggleLiveUpdates())}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              liveUpdates
                ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-100 dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-[#1E2230] hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
            title="Toggle live stream ingestion"
          >
            <Radio
              className={`w-3 h-3 ${
                liveUpdates ? 'text-emerald-500 animate-pulse' : 'text-zinc-400'
              }`}
            />
            <span className="font-mono text-[11px]">
              {liveUpdates ? 'LIVE' : 'SYNC'}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-1.5 rounded-md border border-zinc-200 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#0E1017] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#151824] transition-all"
            title={themeMode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            aria-label="Toggle theme"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-700" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-md border border-zinc-200 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#0E1017] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#151824] transition-all"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#0E1017] border border-zinc-200 dark:border-[#1E2230] shadow-xl p-3 z-40 animate-in fade-in duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Activity Stream
                  </span>
                  <span className="text-[10px] text-blue-500 font-medium cursor-pointer">
                    Clear
                  </span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-zinc-800 dark:text-zinc-200 text-xs">
                        Preferences synced
                      </p>
                      <p className="text-zinc-500 text-[11px]">
                        Saved in localStorage across sessions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-zinc-800 dark:text-zinc-200 text-xs">
                        Data Ingestion Ready
                      </p>
                      <p className="text-zinc-500 text-[11px]">
                        Aggregated from news & media feeds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preferences Button */}
          <button
            onClick={() => dispatch(setPreferencesModalOpen(true))}
            className="p-1.5 rounded-md border border-zinc-200 dark:border-[#1E2230] bg-zinc-50 dark:bg-[#0E1017] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#151824] transition-all"
            title="Configure Preferences"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* User Profile */}
          <div
            onClick={() => dispatch(setPreferencesModalOpen(true))}
            className="cursor-pointer shrink-0 ml-1"
            title={preferences.name}
          >
            <img
              src={preferences.avatar}
              alt={preferences.name}
              className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-white/[0.12]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
