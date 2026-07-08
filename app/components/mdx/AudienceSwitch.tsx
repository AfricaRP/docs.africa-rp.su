"use client";

import { useState, ReactNode, Children, isValidElement } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AudienceSwitch({ children }: { children: ReactNode }) {
  const audiences: { id: string; title: string; content: ReactNode }[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.props as any).title) {
      audiences.push({
        id: (child.props as any).title,
        title: (child.props as any).title,
        content: (child.props as any).children,
      });
    }
  });

  const [active, setActive] = useState(audiences[0]?.id);

  if (!audiences.length) return null;

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            Я читаю как:
          </span>
        </div>
        <div className="flex flex-wrap bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-xl gap-1 overflow-x-auto">
          {audiences.map((aud) => (
            <button
              key={aud.id}
              onClick={() => setActive(aud.id)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                active === aud.id
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
              }`}
            >
              {aud.title}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 relative">
        <AnimatePresence mode="wait">
          {audiences.map(
            (aud) =>
              active === aud.id && (
                <motion.div
                  key={aud.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {aud.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Audience({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return <>{children}</>;
}
