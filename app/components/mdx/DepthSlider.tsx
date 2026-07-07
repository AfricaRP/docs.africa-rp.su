"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DepthContext = createContext<{ level: number }>({ level: 1 });

export function DepthSection({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState(1);
  const labels = ["TL;DR", "Стандарт", "Deep Dive"];

  return (
    <div className="my-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Уровень детализации:</span>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full sm:w-32 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-500"
          />
          <span className="text-sm font-bold w-20 text-right text-zinc-900 dark:text-white">{labels[level]}</span>
        </div>
      </div>
      <div className="p-6">
        <DepthContext.Provider value={{ level }}>{children}</DepthContext.Provider>
      </div>
    </div>
  );
}

export function DepthLevel({ showAt, children }: { showAt: "tldr" | "standard" | "deep"; children: ReactNode }) {
  const { level } = useContext(DepthContext);
  
  // Logic: 
  // tldr: shows only at level 0
  // standard: shows at level 1 and 2
  // deep: shows only at level 2
  const isVisible = 
    showAt === "tldr" ? level === 0 : 
    showAt === "standard" ? level >= 1 : 
    level === 2;

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className={showAt === "deep" ? "pl-4 border-l-2 border-blue-500/50 my-4 text-zinc-600 dark:text-zinc-400" : ""}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}