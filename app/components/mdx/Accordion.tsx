"use client";
import { ChevronRight } from "lucide-react";

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border border-zinc-200 dark:border-zinc-800 rounded-xl mb-4 overflow-hidden [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900/50">
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
        <span>{title}</span>
        <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <div className="px-4 pb-4 pt-1 text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50 prose-sm sm:prose-base">
        {children}
      </div>
    </details>
  );
}