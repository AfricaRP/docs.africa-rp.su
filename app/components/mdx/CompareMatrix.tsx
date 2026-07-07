"use client";

import { useEffect, useRef } from "react";

export function CompareMatrix({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cells = ref.current.querySelectorAll("td");
    cells.forEach((cell) => {
      const text = cell.textContent?.trim().toLowerCase() || "";
      if (text === "+" || text === "yes" || text === "да" || text === "true") {
        cell.innerHTML = `<span class="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></span>`;
        cell.classList.add("text-center");
      } else if (text === "-" || text === "no" || text === "нет" || text === "false") {
        cell.innerHTML = `<span class="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg></span>`;
        cell.classList.add("text-center");
      }
    });
  }, [children]);

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-950">
      <div 
        ref={ref} 
        className="min-w-[600px] [&_table]:m-0 [&_table]:w-full [&_table]:border-collapse [&_th]:bg-zinc-50 [&_th]:dark:bg-zinc-900 [&_th]:p-4 [&_th]:text-center [&_th:first-child]:text-left [&_th]:font-semibold [&_th]:text-zinc-700 [&_th]:dark:text-zinc-300 [&_td]:p-4 [&_td]:text-center [&_tr]:border-b [&_tr]:border-zinc-200 [&_tr]:dark:border-zinc-800 [&_tr:last-child]:border-0 [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10 [&_td:first-child]:sticky [&_td:first-child]:left-0 [&_td:first-child]:bg-white [&_td:first-child]:dark:bg-zinc-950 [&_td:first-child]:font-medium [&_td:first-child]:text-left [&_td:first-child]:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] [&_td:first-child]:dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]"
      >
        {children}
      </div>
    </div>
  );
}