// app/components/Copy.tsx
'use client';

import { useState } from 'react';
import { Copy as CopyIcon, Check } from 'lucide-react';

interface CopyProps {
  children: React.ReactNode;
}

export function Copy({ children }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = typeof children === 'string' ? children : String(children);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <span 
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-sm font-mono cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group border border-slate-300 dark:border-slate-600"
      title="Нажмите, чтобы скопировать"
    >
      <span className="select-all">{children}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
      ) : (
        <CopyIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0 transition-colors" />
      )}
    </span>
  );
}