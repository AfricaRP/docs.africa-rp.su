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
      className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
      title="Скопировать ссылку на страницу"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
    </button>
  );
}
