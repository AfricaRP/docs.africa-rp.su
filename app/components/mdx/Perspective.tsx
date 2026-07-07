"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { motion } from "framer-motion";

const PerspectiveContext = createContext<{ active: string; setActive: (v: string) => void } | null>(null);

export function Perspective({ tabs, children }: { tabs: string[]; children: ReactNode }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <PerspectiveContext.Provider value={{ active, setActive }}>
      <div className="my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
        <div className="flex gap-2 p-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                active === tab
                  ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </PerspectiveContext.Provider>
  );
}

export function PerspectiveItem({ tab, children }: { tab: string; children: ReactNode }) {
  const ctx = useContext(PerspectiveContext);
  if (ctx?.active !== tab) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}