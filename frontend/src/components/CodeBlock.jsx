import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-zinc-800 bg-[#0A0A0C] text-zinc-100 shadow-xs">
      {/* Editorial Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-850 bg-[#0E0E12] text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
            {language}
          </span>
          <span className="text-[10px] text-zinc-600 font-mono">
            {lines.length} lines
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-zinc-200" />
              <span className="text-zinc-200 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="overflow-x-auto p-4 text-xs font-mono leading-relaxed bg-[#0A0A0C]">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="pr-4 text-right select-none text-zinc-600 font-mono text-[11px] w-8 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre overflow-x-auto font-mono text-zinc-250 selection:bg-white/20 selection:text-white">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
