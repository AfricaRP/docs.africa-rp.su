"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxWindow({ src, height = "400px", children }: { src: string, height?: string, children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="not-in-toc relative overflow-hidden rounded-2xl my-8 border border-zinc-200 dark:border-zinc-800" style={{ height }}>
      <motion.div 
        className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center pointer-events-none" 
        style={{ 
          backgroundImage: `url(${src})`,
          y 
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