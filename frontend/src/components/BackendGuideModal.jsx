import React, { useState } from 'react';
import { X, Server, Copy, Check, RefreshCw, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { API_CONFIG } from '../api/chatService';

const SAMPLE_SERVER_CODE = `// server.js (Express Backend + Gemini DSA Instructor)
import express from 'express';
import cors from 'cors';
import { router } from './dsa.routes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Mount the route: POST /api/chat
app.use(router);

app.listen(5000, () => console.log('🚀 AlgoMentor Backend: http://localhost:5000'));
`;

export default function BackendGuideModal({ isOpen, onClose, isMock, onToggleMock }) {
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState(null);
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_SERVER_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Pinging http://localhost:5000/api/chat...');

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(API_CONFIG.BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Ping test' }),
        signal: controller.signal
      });
      clearTimeout(id);

      if (res.ok) {
        setTestStatus('success');
        setTestMessage('Connected. Express backend is active and responding on port 5000.');
      } else {
        setTestStatus('failed');
        setTestMessage(`Server returned HTTP ${res.status}. Check endpoint route.`);
      }
    } catch (err) {
      setTestStatus('failed');
      setTestMessage('Unable to reach http://localhost:5000. Server offline or CORS issue.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111114] rounded-xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
              <Server className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                Backend Pipeline Architecture
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

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Active Mode Controller */}
          <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-0.5">
                Current Pipeline Status
              </div>
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {isMock ? 'Mock API Sandbox (Offline Simulation)' : 'Live Express Service (Production)'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleMock(!isMock)}
                className="px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-zinc-300 dark:border-white/20 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 transition-colors shadow-xs"
              >
                Switch to {isMock ? 'Live Backend' : 'Mock Mode'}
              </button>
              <button
                type="button"
                onClick={handleTestConnection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-zinc-300 dark:border-white/20 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 transition-colors shadow-xs"
              >
                <RefreshCw className={`w-3 h-3 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                <span>Test Ping</span>
              </button>
            </div>
          </div>

          {/* Test Status feedback */}
          {testStatus && (
            <div
              className={`p-3 rounded-md text-xs font-mono flex items-center gap-2 border ${
                testStatus === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  : testStatus === 'failed'
                  ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/40'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-white/10'
              }`}
            >
              {testStatus === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
              {testStatus === 'failed' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />}
              {testStatus === 'testing' && <RefreshCw className="w-3.5 h-3.5 animate-spin flex-shrink-0" />}
              <span>{testMessage}</span>
            </div>
          )}

          {/* Code Spec */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Express Mounting Specification</span>
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 rounded-lg font-mono text-xs bg-[#0A0A0C] text-zinc-200 overflow-x-auto border border-zinc-800 leading-relaxed">
              <code>{SAMPLE_SERVER_CODE}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
          <p className="text-[11px] font-mono text-zinc-400">
            Target Endpoint: <code className="text-zinc-300 font-mono">http://localhost:5000/api/chat</code>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
