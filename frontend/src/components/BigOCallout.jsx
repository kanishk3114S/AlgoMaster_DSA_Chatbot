import React from 'react';
import { Clock, Cpu } from 'lucide-react';

export default function BigOCallout({ timeComplexity = 'O(N)', spaceComplexity = 'O(1)' }) {
  if (!timeComplexity && !spaceComplexity) return null;

  return (
    <div className="my-4 p-3.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50/75 dark:bg-zinc-900/40">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-zinc-500 dark:text-zinc-400">
          Asymptotic Bounds
        </span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
          Tight Upper Bound [O]
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {timeComplexity && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-xs">
            <Clock className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">Time:</span>
            <span className="font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {timeComplexity}
            </span>
          </div>
        )}

        {spaceComplexity && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-xs">
            <Cpu className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">Auxiliary Space:</span>
            <span className="font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {spaceComplexity}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
