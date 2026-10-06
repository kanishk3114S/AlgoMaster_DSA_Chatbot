import React from 'react';
import { User, AlertCircle, ArrowRight } from 'lucide-react';
import CodeBlock from './CodeBlock';
import BigOCallout from './BigOCallout';

/**
 * Parses markdown-like text into structured editorial blocks
 */
function renderEditorialContent(text) {
  if (!text) return null;

  // Split by code blocks ```lang\ncode\n```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }

    parts.push({
      type: 'code',
      language: match[1] || 'javascript',
      content: match[2].trimEnd()
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }

  return (
    <div className="space-y-3 text-[13.5px] leading-relaxed">
      {parts.map((part, i) => {
        if (part.type === 'code') {
          return <CodeBlock key={i} code={part.content} language={part.language} />;
        }

        const lines = part.content.split('\n');
        return (
          <div key={i} className="space-y-2">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lineIdx} className="h-1" />;

              // Main section headers
              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={lineIdx} className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-400 mt-4 mb-1">
                    {trimmed.replace('### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h3 key={lineIdx} className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-5 mb-2">
                    {trimmed.replace('## ', '')}
                  </h3>
                );
              }

              // Bullet item with minimal square/dot
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2.5 pl-1.5 text-zinc-700 dark:text-zinc-300">
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs mt-1">•</span>
                    <span className="flex-1">{formatInlineElements(trimmed.slice(2))}</span>
                  </div>
                );
              }

              // Numbered item
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2.5 pl-1.5 text-zinc-700 dark:text-zinc-300">
                    <span className="font-mono text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 min-w-4 mt-0.5">
                      {numMatch[1]}.
                    </span>
                    <span className="flex-1">{formatInlineElements(numMatch[2])}</span>
                  </div>
                );
              }

              return (
                <p key={lineIdx} className="text-zinc-700 dark:text-zinc-300">
                  {formatInlineElements(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Handles inline **bold**, *italics*, and `code` tags
 */
function formatInlineElements(str) {
  if (!str) return '';

  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\$[^\$]+\$)/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIdx) {
      parts.push(str.substring(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-zinc-900 dark:text-zinc-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 text-xs font-mono rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-850 text-zinc-900 dark:text-zinc-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push(
        <span key={match.index} className="font-mono text-zinc-800 dark:text-zinc-200 font-medium">
          {token.slice(1, -1)}
        </span>
      );
    }

    lastIdx = match.index + token.length;
  }

  if (lastIdx < str.length) {
    parts.push(str.substring(lastIdx));
  }

  return parts;
}

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <div
      className={`group flex gap-3 my-5 transition-opacity duration-150 ${
        isUser ? 'flex-row-reverse pl-12 sm:pl-20' : 'flex-row pr-6 sm:pr-14'
      }`}
    >
      {/* Monogram Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-7 h-7 rounded-md border border-zinc-300 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-mono">
            <User className="w-3.5 h-3.5" />
          </div>
        ) : isError ? (
          <div className="w-7 h-7 rounded-md border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-md border border-zinc-300 dark:border-white/15 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold tracking-tight shadow-xs">
            AM
          </div>
        )}
      </div>

      {/* Message Surface */}
      <div
        className={`flex-1 min-w-0 ${
          isUser
            ? 'bg-zinc-900 dark:bg-zinc-900 text-white dark:text-zinc-100 border border-zinc-800 dark:border-white/10 rounded-2xl rounded-tr-sm p-3.5 sm:p-4 shadow-xs'
            : isError
            ? 'bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 rounded-2xl rounded-tl-sm p-4'
            : 'bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/10 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-xs'
        }`}
      >
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium tracking-tight ${isUser ? 'text-zinc-300' : 'text-zinc-900 dark:text-zinc-200'}`}>
              {isUser ? 'User' : 'AlgoMentor'}
            </span>
            {message.topic && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                {message.topic}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
            {message.time}
          </span>
        </div>

        {/* Content Body */}
        <div className="overflow-hidden">
          {isUser ? (
            <div className="text-[13.5px] leading-relaxed whitespace-pre-wrap font-normal">
              {message.text}
            </div>
          ) : (
            <>
              {renderEditorialContent(message.text)}
              {(message.timeComplexity || message.spaceComplexity) && (
                <BigOCallout
                  timeComplexity={message.timeComplexity}
                  spaceComplexity={message.spaceComplexity}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
