import React, { useState } from 'react';
import { Search, Menu, Server, HelpCircle, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { USER_STATS } from '../data/dsaData';

export default function Header({ 
  onToggleSidebar, 
  onSearch, 
  searchTerm = '', 
  onOpenBackendGuide,
  isMock,
  onToggleMock,
  onSelectTopic
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full h-14 border-b border-zinc-200 dark:border-white/10 bg-[#FAFAFA]/90 dark:bg-[#08080A]/90 backdrop-blur-md transition-colors duration-150">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile Nav Toggle + Monogram Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 -ml-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Refined Monogram Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onSelectTopic && onSelectTopic(null)}
          >
            <div className="w-7 h-7 rounded-md border border-zinc-300 dark:border-white/20 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-xs">
              AM
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-semibold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
                AlgoMentor
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono -mt-0.5">
                DSA Engine
              </span>
            </div>
          </div>
        </div>

        {/* Center: Minimal Search Input */}
        <div className="flex-1 max-w-sm mx-2 sm:mx-6 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search topics, problems & complexity..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Right: Live Status + Mode Switcher + Theme Toggle + Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Subtle Live Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Online</span>
          </div>

          {/* Minimal Backend Pill Button */}
          <button
            type="button"
            onClick={onOpenBackendGuide}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors ${
              isMock
                ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                : 'border-zinc-800 dark:border-zinc-300 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:opacity-90'
            }`}
            title="Configure / Switch Backend"
          >
            <Server className="w-3 h-3" />
            <span className="hidden sm:inline">
              {isMock ? 'Mock API' : 'Live Express'}
            </span>
          </button>

          {/* Minimalist Theme Switcher */}
          <ThemeToggle />

          {/* Minimal Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(prev => !prev)}
              className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-md border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-white/20 transition-colors text-xs"
            >
              <div className="w-5 h-5 rounded bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold">
                RN
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-lg bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/10 shadow-lg py-1.5 z-50 text-xs animate-fade-in">
                <div className="px-3.5 py-2 border-b border-zinc-100 dark:border-white/5">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Full-Stack Engineer</p>
                  <p className="text-[10px] text-zinc-400 font-mono">Streak: {USER_STATS.streakDays} Days</p>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenBackendGuide();
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <Server className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Backend Pipeline Guide</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleMock(!isMock);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Toggle: {isMock ? 'Live Backend' : 'Mock Mode'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
