"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add('is-404');
    return () => document.body.classList.remove('is-404');
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";
  const catImage = isDark ? "/media/cat_white.png" : "/media/cat_black.png";

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4 !m-0 !max-w-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <h1 className="text-8xl md:text-9xl font-bold mb-4 tracking-widest text-zinc-800 dark:text-zinc-100 drop-shadow-sm">404</h1>
      </motion.div>
      
      {mounted ? (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="my-6"
        >
          <img 
            src={catImage} 
            alt="Растерянный котик" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      ) : (
        <div className="w-48 h-48 md:w-64 md:h-64 my-6 mx-auto" />
      )}

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-6"
      >
        <h2 className="text-xl md:text-2xl font-bold tracking-wide text-zinc-800 dark:text-zinc-100">
          Упс! Страница не найдена.
        </h2>
        
        <Link 
          href="/" 
          className="!no-underline inline-flex items-center justify-center px-8 py-3 rounded-lg text-lg font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Вернуться домой
        </Link>
      </motion.div>
    </div>
  );
}
