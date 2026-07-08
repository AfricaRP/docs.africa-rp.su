"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function Heading({ as: Tag, id, children, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!id) return;
    const url = new URL(window.location.href);
    url.hash = decodeURIComponent(id);
    navigator.clipboard.writeText(decodeURI(url.toString()));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMainTitle = Tag === "h1";

  return (
    <Tag id={id} className={`group relative ${props.className || ''}`} {...props}>
      {id && !isMainTitle && (
        <button
          onClick={handleCopy}
          className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 p-1 md:p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:outline-none"
          aria-label="Скопировать ссылку на заголовок"
          title="Скопировать ссылку"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
        </button>
      )}
      {children}
    </Tag>
  );
}
