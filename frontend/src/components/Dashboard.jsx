import React from 'react';
import { ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { DSA_TOPICS, USER_STATS, QUESTION_OF_THE_DAY } from '../data/dsaData';

export default function Dashboard({ 
  onStartChatWithPrompt, 
  onSelectTopic, 
  searchTerm = '' 
}) {
  const filteredTopics = DSA_TOPICS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Editorial Header & Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-white/10">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            AlgoMentor Executive
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Algorithmic Mastery Index
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
            Structured algorithmic analysis, Big-O proofs, and formal interview problem decompositions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onStartChatWithPrompt('Provide a structured DSA study roadmap for Staff & Senior Technical interviews.')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold tracking-tight transition-colors shadow-xs w-fit"
        >
          <span>Consult AI Instructor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Minimalist Stat Cards (Typography-First) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Mastery Index */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Mastery Index
          </div>
          <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-1">
            {USER_STATS.masteryIndex}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Across 7 foundational topics
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full" style={{ width: '74.2%' }} />
          </div>
        </div>

        {/* Card 2: Streak */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Consecutive Days
          </div>
          <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-1">
            {USER_STATS.streakDays} <span className="text-sm font-normal text-zinc-400">days</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Daily deliberate practice
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Card 3: Problems Solved */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Problems Solved
          </div>
          <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-1">
            {USER_STATS.questionsSolved}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Optimal complexity verified
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full" style={{ width: '71%' }} />
          </div>
        </div>

        {/* Card 4: Deep AI Consultations */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            AI Consultations
          </div>
          <div className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-1">
            {USER_STATS.aiQueriesAsked}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Mathematical proofs generated
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full" style={{ width: '58%' }} />
          </div>
        </div>
      </div>

      {/* Featured Daily Challenge Card (Executive Architectural Box) */}
      <div className="p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                Daily Focus • {QUESTION_OF_THE_DAY.code}
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-850 text-zinc-900 dark:text-zinc-100">
                {QUESTION_OF_THE_DAY.difficulty}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {QUESTION_OF_THE_DAY.topic}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              {QUESTION_OF_THE_DAY.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {QUESTION_OF_THE_DAY.summary}
            </p>

            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
              Architecture: {QUESTION_OF_THE_DAY.recommendedApproach}
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => onStartChatWithPrompt(QUESTION_OF_THE_DAY.prompt, QUESTION_OF_THE_DAY.topic)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold tracking-tight shadow-xs transition-colors"
            >
              <span>Solve with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Topic Mastery Breakdown (Monochrome Progress Bars) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-white/5">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white uppercase font-mono">
            Topic Curricula
          </h2>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            {filteredTopics.length} Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] hover:border-zinc-300 dark:hover:border-white/20 transition-colors shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">
                      SEC-{topic.code}
                    </span>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">
                      {topic.name}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {topic.progress}%
                  </span>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
                  {topic.description}
                </p>

                {/* Razor-thin hairline progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Solved {topic.solved}/{topic.total}</span>
                    <span>{topic.difficulty}</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onStartChatWithPrompt(`Deconstruct the essential patterns and invariants for ${topic.name}.`, topic.name)}
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Deconstruct Topic</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
