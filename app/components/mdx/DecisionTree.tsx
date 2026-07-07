"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const DecisionContext = createContext<{ current: string; setStep: (s: string) => void } | null>(null);

export function DecisionTree({ initial, children }: { initial: string; children: ReactNode }) {
  const [current, setStep] = useState(initial);
  return (
    <DecisionContext.Provider value={{ current, setStep }}>
      <div className="not-in-toc border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 my-6 bg-white dark:bg-zinc-900/30 shadow-sm relative overflow-hidden">
        {children}
      </div>
    </DecisionContext.Provider>
  );
}

export function DecisionStep({ step, children }: { step: string; children: ReactNode }) {
  const ctx = useContext(DecisionContext);
  if (ctx?.current !== step) return null;
  return <div className="animate-fade-in-up">{children}</div>;
}

export function DecisionButton({ target, children }: { target: string; children: ReactNode }) {
  const ctx = useContext(DecisionContext);
  return (
    <button 
      onClick={() => ctx?.setStep(target)}
      className="mt-4 mr-3 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-xl font-medium transition-all shadow-sm active:scale-95 text-sm"
    >
      {children}
    </button>
  );
}