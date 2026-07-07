"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, FileText, Hash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface SearchResult {
  title: string;
  href: string;
  content: string;
}

function HighlightedText({ text, query, isContent = false }: { text: string; query: string; isContent?: boolean }) {
  if (!query.trim()) return <>{isContent ? text.substring(0, 100) + '...' : text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return <>{isContent ? text.substring(0, 100) + '...' : text}</>;
  }

  let start = 0;
  let end = text.length;

  if (isContent) {
    const windowSize = 50;
    start = Math.max(0, index - windowSize);
    end = Math.min(text.length, index + query.length + windowSize);
    
    // Adjust start to not cut a word in half if possible
    if (start > 0) {
      const nextSpace = text.indexOf(' ', start);
      if (nextSpace !== -1 && nextSpace < index) {
        start = nextSpace + 1;
      }
    }
  }

  const before = text.substring(start, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length, end);

  return (
    <>
      {isContent && start > 0 && "..."}
      {before}
      <mark className="bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold rounded-sm px-0.5">
        {match}
      </mark>
      {after}
      {isContent && end < text.length && "..."}
    </>
  );
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [docs, setDocs] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (docs.length === 0) {
        fetch("/search.json")
          .then((res) => res.json())
          .then((data) => setDocs(data))
          .catch(console.error);
      }
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = docs
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(lowerQuery) ||
          doc.content.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5);
    setResults(filtered);
  }, [query, docs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 sm:pt-32 px-4 animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <SearchIcon className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            placeholder="Поиск по документации..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            results.map((res: any) => {
              const isSection = !!res.pageTitle;
              return (
                <Link
                  key={res.href}
                  href={res.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                >
                  <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                    {isSection ? <Hash className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      <HighlightedText text={res.title} query={query} />
                    </div>
                    {isSection && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">
                        {res.pageTitle}
                      </div>
                    )}
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      <HighlightedText text={res.content} query={query} isContent={true} />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : query.trim().length > 1 ? (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
              По запросу «{query}» ничего не найдено.
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
              Начните вводить текст для поиска...
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
