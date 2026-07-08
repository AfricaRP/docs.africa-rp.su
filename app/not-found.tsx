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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4 font-sans !m-0 !max-w-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <h1 className="text-8xl md:text-9xl font-bold mb-2 text-zinc-800 dark:text-zinc-100" style={{ fontFamily: 'var(--font-minecraft)' }}>404</h1>
      </motion.div>
      
      {mounted ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="my-8"
        >
          <img 
            src={catImage} 
            alt="Растерянный котик" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      ) : (
        <div className="w-64 h-64 md:w-80 md:h-80 my-8 mx-auto" />
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100" style={{ fontFamily: 'var(--font-minecraft)' }}>
          Упс! Страница не найдена.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
          Котик обыскал все серверы, но так и не смог найти эту страницу. 
          Возможно, она сбежала или её никогда не существовало.
        </p>
        
        <Link 
          href="/" 
          className="!no-underline inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Вернуться домой
        </Link>
      </motion.div>
    </div>
  );
}
