"use client";

import { useRef, ReactNode } from "react";

export function HoloCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    glareRef.current.style.opacity = "1";
    glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "rotateX(0) rotateY(0)";
    glareRef.current.style.opacity = "0";
  };

  return (
    <div className="not-in-toc flex justify-center my-8 perspective-[1000px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-sm min-h-[300px] bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col p-6 cursor-pointer transition-transform duration-100 ease-out transform-style-3d"
      >
        <div ref={glareRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0" />
        <div className="relative z-10 h-full flex flex-col text-white prose prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}