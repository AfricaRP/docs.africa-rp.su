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
      className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors ml-2"
      title={isZen ? "Выйти из режима Дзен" : "Режим Дзен (Скрыть панели)"}
    >
      {isZen ? (
        <Minimize className="w-4 h-4" />
      ) : (
        <Maximize className="w-4 h-4" />
      )}
    </button>
  );
}
