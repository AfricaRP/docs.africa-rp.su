"use client";

import { useRef, ReactNode } from "react";

export function GlowGrid({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".glow-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <div ref={gridRef} onMouseMove={handleMouseMove} className="flex flex-wrap gap-4 my-8 relative group">
      {children}
    </div>
  );
}

export function GlowCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="glow-card relative w-full md:w-[calc(50%-0.5rem)] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 cursor-pointer overflow-hidden transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
      <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
        background: "radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59,130,246,0.6), transparent 40%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude"
      }} />
      <div className="relative z-10">
        {title && <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white mt-0">{title}</h3>}
        <div className="text-zinc-600 dark:text-zinc-400 text-sm prose-sm m-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}