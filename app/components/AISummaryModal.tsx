"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
}

export function AISummaryModal({ isOpen, onClose, slug }: AISummaryModalProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const fetchSummary = async () => {
      setLoading(true);
      setError(false);
      try {
        const slugStr = slug.replace(/\//g, "-") || "index";
        const res = await fetch(`/summaries/${slugStr}.json`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSummary(data.summary);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!summary) {
      fetchSummary();
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, slug, summary]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Кратко с ИИ
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
                  <p className="font-medium">Загрузка сводки...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-red-500 dark:text-red-400 text-center">
                  <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="max-w-sm font-medium">
                    Не удалось получить данные от ИИ.
                  </p>
                </div>
              ) : (
                <div className="prose prose-zinc dark:prose-invert prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-li:marker:text-blue-500">
                  <ReactMarkdown>{summary || ""}</ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
