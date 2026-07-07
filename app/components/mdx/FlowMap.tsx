"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Node = { id: string; title: string; desc: string };

export function FlowMap({ nodes }: { nodes: Node[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="my-8 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={() => setActive(active === node.id ? null : node.id)}
              className={`relative px-6 py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                active === node.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 scale-105 shadow-md"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              {node.title}
            </button>
            {i < nodes.length - 1 && (
              <div className="text-zinc-300 dark:text-zinc-700">
                <svg className="w-6 h-6 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <svg className="w-6 h-6 md:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          className="mt-8 p-4 bg-white dark:bg-zinc-950 border border-blue-200 dark:border-blue-900/50 rounded-xl shadow-sm text-sm text-zinc-600 dark:text-zinc-300 text-center"
        >
          {nodes.find(n => n.id === active)?.desc}
        </motion.div>
      )}
    </div>
  );
}