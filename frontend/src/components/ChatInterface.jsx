import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Code2, 
  ChevronDown, 
  Loader2,
  ArrowRight
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import CodeSnippetModal from './CodeSnippetModal';
import { QUICK_PROMPTS, DSA_TOPICS } from '../data/dsaData';

export default function ChatInterface({
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  selectedTopic,
  setSelectedTopic,
  prefilledPrompt = '',
  onClearPrefilledPrompt
}) {
  const [input, setInput] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (prefilledPrompt) {
      setInput(prefilledPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      if (onClearPrefilledPrompt) {
        onClearPrefilledPrompt();
      }
    }
  }, [prefilledPrompt, onClearPrefilledPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input.trim(), selectedTopic || 'General DSA');
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleQuickPromptClick = (prompt) => {
    if (isLoading) return;
    onSendMessage(prompt, selectedTopic || 'General DSA');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#FAFAFA] dark:bg-[#08080A]">
      {/* Editorial Sub-Header: Topic Selector & Reset */}
      <div className="h-12 px-4 sm:px-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#0B0B0E]/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 hidden sm:inline">
            Topic Focus:
          </span>
          <div className="relative">
            <select
              value={selectedTopic || 'All Topics'}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none pl-2.5 pr-7 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30 cursor-pointer"
            >
              <option value="All Topics">Universal Scope</option>
              {DSA_TOPICS.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-zinc-400" />
          </div>
        </div>

        <button
          type="button"
          onClick={onClearChat}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Clear session history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Session</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Quiet Loading State */}
        {isLoading && (
          <div className="flex items-center gap-3 my-4 pr-12 animate-fade-in">
            <div className="w-7 h-7 rounded-md border border-zinc-300 dark:border-white/10 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 flex items-center justify-center text-xs font-mono font-bold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121215] text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Deriving optimal algorithmic invariants & complexity bounds...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Minimal Bottom Bar */}
      <div className="p-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-3">
        {/* Minimalist Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex-shrink-0">
            Suggested:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPromptClick(prompt)}
              disabled={isLoading}
              className="flex-shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 text-xs transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Sharp High-Contrast Input Container */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/10 focus-within:border-zinc-400 dark:focus-within:border-white/30 transition-colors p-2 shadow-xs"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about invariants, state transitions, or paste solution code (Press Enter to send)..."
            className="w-full px-2.5 py-1.5 text-xs sm:text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none resize-none leading-relaxed max-h-40"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1.5 px-1 border-t border-zinc-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setIsCodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Attach code snippet"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Attach Code</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                Return to submit
              </span>

              {/* Sharp High-Contrast Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs"
                title="Send query"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <CodeSnippetModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onSubmit={(prompt) => {
          onSendMessage(prompt, selectedTopic || 'Code Review');
        }}
      />
    </div>
  );
}
