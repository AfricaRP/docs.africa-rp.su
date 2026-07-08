"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxWindow({ src, height = "400px", children }: { src: string, height?: string, children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Идеальный параллакс: масштабируем картинку и двигаем по оси Y
  const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

  return (
    <div ref={ref} className="not-in-toc relative overflow-hidden rounded-2xl my-8 border border-zinc-200 dark:border-zinc-800" style={{ height }}>
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none" 
        style={{ 
          backgroundImage: `url(${src})`,
          y,
          scale: 1.3
        }} 
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
        <div className="text-white drop-shadow-lg max-w-2xl prose prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}