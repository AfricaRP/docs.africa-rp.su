"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

export function MarkerDraw({ color = "#facc15", children }: { color?: string; children: ReactNode }) {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    }, { threshold: 0.8 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const rgba = `rgba(${r}, ${g}, ${b}, 0.5)`;

  return (
    <span
      ref={ref}
      className="inline transition-all duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-no-repeat rounded px-1 text-inherit"
      style={{
        backgroundImage: `linear-gradient(to right, ${rgba}, ${rgba})`,
        backgroundSize: drawn ? "100% 100%" : "0% 100%",
        backgroundPosition: "0 100%"
      }}
    >
      {children}
    </span>
  );
}