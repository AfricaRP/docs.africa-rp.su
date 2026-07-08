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
      className="group inline-flex items-center px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors relative"
      title="Нажмите, чтобы скопировать"
    >
      <span>{children}</span>
      <span
        className={`grid transition-all duration-300 ease-out ${copied ? "grid-rows-[1fr] grid-cols-[1fr] opacity-100 ml-1.5" : "grid-rows-[1fr] grid-cols-[0fr] opacity-0 ml-0 group-hover:grid-cols-[1fr] group-hover:opacity-100 group-hover:ml-1.5"}`}
      >
        <div className="overflow-hidden flex items-center justify-end">
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          )}
        </div>
      </span>
    </span>
  );
}
