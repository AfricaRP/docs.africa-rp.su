"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors duration-200 bg-zinc-100/50 hover:bg-blue-50 dark:bg-zinc-800/50 dark:hover:bg-blue-900/20 py-1.5 px-3 rounded-full border border-zinc-200 dark:border-zinc-700/50"
      title="Скопировать ссылку на эту страницу"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Link2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-45" />
      )}
      <span>{copied ? "Скопировано!" : "Копировать ссылку"}</span>
    </button>
  );
}
