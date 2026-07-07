"use client";

import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";

export function FocusToggle() {
  const [isZen, setIsZen] = useState(false);

  useEffect(() => {
    if (isZen) {
      document.body.classList.add("zen-mode");
    } else {
      document.body.classList.remove("zen-mode");
    }
    return () => document.body.classList.remove("zen-mode");
  }, [isZen]);

  return (
    <button
      onClick={() => setIsZen(!isZen)}
      className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ml-2"
      title={isZen ? "Выйти из режима Дзен" : "Режим Дзен (Скрыть панели)"}
    >
      {isZen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
    </button>
  );
}