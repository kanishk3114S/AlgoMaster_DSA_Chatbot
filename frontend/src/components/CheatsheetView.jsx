import React from 'react';
import { ArrowRight } from 'lucide-react';

const COMPLEXITIES = [
  { name: 'Array Access', timeAvg: 'O(1)', timeWorst: 'O(1)', space: 'O(1)', note: 'Direct indexing by contiguous RAM memory offset' },
  { name: 'Array Linear Search', timeAvg: 'O(N)', timeWorst: 'O(N)', space: 'O(1)', note: 'Exhaustive sequential scan on unsorted arrays' },
  { name: 'Hash Table Lookup', timeAvg: 'O(1)', timeWorst: 'O(N)', space: 'O(N)', note: 'Degrades to linear under hash collision saturation' },
  { name: 'Binary Search Tree Lookup', timeAvg: 'O(log N)', timeWorst: 'O(N)', space: 'O(1)', note: 'Worst case when tree degenerates into a singly linked list' },
  { name: 'Balanced BST (AVL / Red-Black)', timeAvg: 'O(log N)', timeWorst: 'O(log N)', space: 'O(1)', note: 'Strict height balanced invariant guaranteed via rotations' },
  { name: 'Merge Sort', timeAvg: 'O(N log N)', timeWorst: 'O(N log N)', space: 'O(N)', note: 'Stable divide-and-conquer; gold standard for linked lists' },
  { name: 'Quick Sort', timeAvg: 'O(N log N)', timeWorst: 'O(N^2)', space: 'O(log N)', note: 'In-place partition with superior CPU cache locality' },
  { name: 'Heap Sort', timeAvg: 'O(N log N)', timeWorst: 'O(N log N)', space: 'O(1)', note: 'In-place selection sort utilizing a binary heap' },
  { name: 'Breadth First Search (BFS)', timeAvg: 'O(V + E)', timeWorst: 'O(V + E)', space: 'O(V)', note: 'Queue-based level-order traversal for shortest unweighted paths' },
  { name: 'Dijkstra (with Binary Heap)', timeAvg: 'O((V + E) log V)', timeWorst: 'O((V + E) log V)', space: 'O(V)', note: 'Greedy single-source shortest path for non-negative weights' },
  { name: '0/1 Knapsack (DP)', timeAvg: 'O(N * W)', timeWorst: 'O(N * W)', space: 'O(W)', note: 'Pseudo-polynomial dynamic programming with 1D space reduction' },
];

export default function CheatsheetView({ onAskAi }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-white/10">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            Reference Specification
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Asymptotic Complexity Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Formal Time and Auxiliary Space bounds for standard data structures & algorithms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAskAi('Compare all common sorting algorithms in terms of CPU cache locality, stability, and worst-case bounds.')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold tracking-tight transition-colors shadow-xs w-fit"
        >
          <span>Deconstruct Sorting Tradeoffs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4 font-semibold">Algorithm / Structure</th>
              <th className="py-3 px-4 font-semibold">Average Time</th>
              <th className="py-3 px-4 font-semibold">Worst Time</th>
              <th className="py-3 px-4 font-semibold">Aux Space</th>
              <th className="py-3 px-4 font-semibold">Algorithmic Note</th>
              <th className="py-3 px-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/5 font-mono">
            {COMPLEXITIES.map((item, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/60 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100 font-sans">
                  {item.name}
                </td>
                <td className="py-3 px-4">
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900">
                    {item.timeAvg}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {item.timeWorst}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {item.space}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 max-w-xs font-sans text-xs">
                  {item.note}
                </td>
                <td className="py-3 px-4 text-right font-sans">
                  <button
                    type="button"
                    onClick={() => onAskAi(`Explain mathematical proof for why ${item.name} has time ${item.timeAvg} and space ${item.space}`)}
                    className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-2"
                  >
                    Proof
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
