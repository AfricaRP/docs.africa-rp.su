"use client";

import { useState, useRef, useEffect } from "react";
import { Link2, Maximize, FileCode, MoreHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../../lib/config";

export function PageActions({ relativePath }: { relativePath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showZenToast, setShowZenToast] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFocused && (e.key === "Escape" || e.key === " ")) {
        if (e.key === " ") {
          e.preventDefault();
        }
        toggleFocus(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setIsOpen(false);
  };

  const toggleFocus = (forceState?: boolean) => {
    const newFocusState = forceState !== undefined ? forceState : !isFocused;
    setIsFocused(newFocusState);
    
    if (newFocusState) {
      document.body.classList.add("zen-mode");
      setShowZenToast(true);
      setTimeout(() => setShowZenToast(false), 3000);
    } else {
      document.body.classList.remove("zen-mode");
      setShowZenToast(false);
    }
    
    const event = new CustomEvent("focusModeChanged", {
      detail: { isFocused: newFocusState },
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Действия со страницей"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-md shadow-lg pointer-events-none flex items-center gap-1.5 z-50"
            >
              <Check className="w-3.5 h-3.5" />
              Ссылка скопирована
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-auto min-w-[200px] origin-top-right rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
            >
              <div className="p-1.5 flex flex-col gap-0.5">
                <button
                  onClick={handleCopyLink}
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors whitespace-nowrap"
                >
                  <Link2 className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  <span className="font-medium">Скопировать ссылку</span>
                </button>

                <button
                  onClick={() => toggleFocus()}
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors whitespace-nowrap"
                >
                  <Maximize className={`w-4 h-4 transition-colors ${isFocused ? "text-blue-500" : "text-zinc-400 group-hover:text-blue-500"}`} />
                  <span className="font-medium">{isFocused ? "Выключить Дзен" : "Режим Дзен"}</span>
                </button>

                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2" />

                <a
                  href={`https://raw.githubusercontent.com/${siteConfig.githubRepo}/${siteConfig.githubBranch}/content/${relativePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="!no-underline group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors whitespace-nowrap"
                >
                  <FileCode className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  <span className="font-medium !no-underline">Открыть в MDX (Raw)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {typeof document !== "undefined" && isFocused && (
        <AnimatePresence>
          {showZenToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-100/90 backdrop-blur-sm text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl z-[100] font-medium text-sm flex items-center gap-3"
            >
              <Maximize className="w-4 h-4 opacity-80" />
              <span>Режим Дзен активирован. Нажмите <kbd className="px-2 py-0.5 bg-zinc-800 dark:bg-zinc-200 rounded text-xs opacity-90 mx-1">Esc</kbd> или <kbd className="px-2 py-0.5 bg-zinc-800 dark:bg-zinc-200 rounded text-xs opacity-90 mx-1">Space</kbd> чтобы выйти.</span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
