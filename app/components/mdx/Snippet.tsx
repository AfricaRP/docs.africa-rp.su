"use client";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function Snippet({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span 
      onClick={handleCopy}
      className="group inline-flex items-center px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors relative overflow-hidden"
      title="Нажмите, чтобы скопировать"
    >
      <span>{children}</span>
      <span className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${copied ? 'max-w-[20px] ml-1.5 opacity-100' : 'max-w-0 ml-0 opacity-0 group-hover:max-w-[20px] group-hover:ml-1.5 group-hover:opacity-100'}`}>
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        )}
      </span>
    </span>
  );
}