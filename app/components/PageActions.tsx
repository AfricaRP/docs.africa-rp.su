"use client";

import { useState, useRef, useEffect } from "react";
import { Link2, Maximize, FileCode, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../../lib/config";

export function PageActions({ relativePath }: { relativePath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocusChange = (e: CustomEvent) => {
      setIsFocused(e.detail.isFocused);
    };
    window.addEventListener("focusModeChanged" as any, handleFocusChange);
    return () => window.removeEventListener("focusModeChanged" as any, handleFocusChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  const toggleFocus = () => {
    const newFocusState = !isFocused;
    setIsFocused(newFocusState);
    if (newFocusState) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    const event = new CustomEvent("focusModeChanged", {
      detail: { isFocused: newFocusState },
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        title="Действия со страницей"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              <button
                onClick={handleCopyLink}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <Link2 className={`w-4 h-4 ${copied ? "text-green-500" : "text-zinc-400 group-hover:text-blue-500"}`} />
                <span className="font-medium">{copied ? "Ссылка скопирована!" : "Скопировать ссылку"}</span>
              </button>

              <button
                onClick={toggleFocus}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <Maximize className={`w-4 h-4 text-zinc-400 ${isFocused ? "text-blue-500" : "group-hover:text-blue-500"}`} />
                <span className="font-medium">{isFocused ? "Выключить Дзен" : "Режим Дзен"}</span>
              </button>

              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2" />

              <a
                href={`https://github.com/${siteConfig.githubRepo}/blob/${siteConfig.githubBranch}/content/${relativePath}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <FileCode className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                <span className="font-medium">Открыть в MDX (GitHub)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
