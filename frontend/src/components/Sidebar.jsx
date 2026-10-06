import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Layers, 
  BookMarked, 
  ChevronLeft, 
  ChevronRight, 
  History,
  ShieldCheck
} from 'lucide-react';
import { RECENT_CHAT_SESSIONS, USER_STATS } from '../data/dsaData';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  onSelectRecentChat,
  selectedTopic,
  setSelectedTopic
}) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Instructor', icon: MessageSquare, badge: 'Live' },
    { id: 'topics', label: 'Topic Mastery', icon: Layers },
    { id: 'cheatsheet', label: 'Complexity Matrix', icon: BookMarked },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-zinc-200 dark:border-white/10 bg-[#FAFAFA] dark:bg-[#08080A] transition-all duration-200 z-20 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-14 px-3.5 flex items-center justify-between border-b border-zinc-200 dark:border-white/10">
        {!isCollapsed && (
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">
            Workspace
          </span>
        )}

        {/* Minimal Collapse Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors ${
            isCollapsed ? 'mx-auto' : 'ml-auto'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav Items */}
      <div className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-900'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={item.label}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />

              {!isCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      isActive 
                        ? 'border-white/30 dark:border-black/20 text-white dark:text-zinc-950'
                        : 'border-zinc-300 dark:border-white/10 text-zinc-500 dark:text-zinc-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Quiet Streak Stat (when expanded) */}
      {!isCollapsed && (
        <div className="mx-2.5 my-2 p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Consistency
            </span>
            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {USER_STATS.streakDays}d Streak
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-200 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      )}

      {/* Recent Sessions List (Quiet & Collapsible) */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1.5 border-t border-zinc-200 dark:border-white/10">
          <div className="flex items-center justify-between px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <div className="flex items-center gap-1.5">
              <History className="w-3 h-3" />
              <span>Archive</span>
            </div>
            <span>3</span>
          </div>

          <div className="space-y-1">
            {RECENT_CHAT_SESSIONS.map((sess) => (
              <button
                key={sess.id}
                type="button"
                onClick={() => {
                  setActiveTab('chat');
                  onSelectRecentChat && onSelectRecentChat(sess);
                }}
                className="w-full text-left p-2 rounded-md hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 truncate">
                    {sess.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0">
                    {sess.time}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                  {sess.preview}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-3 border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#0A0A0C]">
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>DSA Sandbox</span>
            </div>
            <span>v2.0</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          </div>
        )}
      </div>
    </aside>
  );
}
