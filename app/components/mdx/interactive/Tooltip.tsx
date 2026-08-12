"use client";

import { useState } from "react";

export interface TooltipProps {
  text?: string;
  content?: string;
  children: React.ReactNode;
}

export function Tooltip({ text, content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const displayContent = text || content;

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="underline decoration-dashed decoration-zinc-400 dark:decoration-zinc-500 underline-offset-4 decoration-1">
        {children}
      </span>

      {isVisible && displayContent && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs z-50 animate-in fade-in zoom-in-95 duration-200">
          <span className="block px-3 py-2 text-sm text-white bg-zinc-900 dark:bg-zinc-800 rounded-lg shadow-xl text-center">
            {displayContent}
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-800 rotate-45" />
        </span>
      )}
    </span>
  );
}
