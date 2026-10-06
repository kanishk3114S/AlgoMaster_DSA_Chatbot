import React, { useState } from 'react';
import { X, Code2, ArrowRight } from 'lucide-react';

const LANGUAGES = ['javascript', 'cpp', 'java', 'python', 'typescript'];
const GOALS = [
  { id: 'optimize', label: 'Optimize asymptotic time / space bounds' },
  { id: 'explain', label: 'Derive state transition logic step-by-step' },
  { id: 'complexity', label: 'Prove formal Big-O bounds' },
  { id: 'debug', label: 'Inspect edge cases & off-by-one invariants' },
];

export default function CodeSnippetModal({ isOpen, onClose, onSubmit }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [goal, setGoal] = useState('optimize');
  const [additionalNote, setAdditionalNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const goalObj = GOALS.find(g => g.id === goal);
    const goalText = goalObj ? goalObj.label : 'Analyze';

    let prompt = `Here is my ${language.toUpperCase()} implementation for a DSA problem.\n`;
    prompt += `Objective: ${goalText}.\n\n`;
    if (additionalNote.trim()) {
      prompt += `Constraints / Context: ${additionalNote.trim()}\n\n`;
    }
    prompt += `\`\`\`${language}\n${code.trim()}\n\`\`\``;

    onSubmit(prompt);
    setCode('');
    setAdditionalNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-[#111114] rounded-xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                Attach Implementation Snippet
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 mb-1">
                Target Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30 font-mono"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 mb-1">
                Evaluation Objective
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30"
              >
                {GOALS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              Source Code
            </label>
            <textarea
              rows={7}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`// Paste your ${language} solution here...`}
              className="w-full p-3 font-mono text-xs rounded-lg bg-[#0A0A0C] text-zinc-200 border border-zinc-800 focus:outline-none focus:border-zinc-600 placeholder-zinc-600 leading-relaxed resize-y"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              Constraints or Notes (Optional)
            </label>
            <input
              type="text"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="e.g. Memory limit 256MB, array size up to 10^5"
              className="w-full px-2.5 py-1.5 text-xs rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-200 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!code.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 disabled:opacity-40 transition-colors shadow-xs"
            >
              <span>Submit to AlgoMentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
