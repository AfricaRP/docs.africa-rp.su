"use client";

import { useRef, useEffect, useState } from "react";

export function ParallaxWindow({
  src,
  height = "400px",
  children,
}: {
  src: string;
  height?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalScrollDistance = windowHeight + rect.height;
        const currentScroll = windowHeight - rect.top;
        const scrollPercentage = currentScroll / totalScrollDistance;

        const maxOffset = 100;
        const newOffset = (scrollPercentage - 0.5) * (maxOffset * 2);

        setOffsetY(newOffset);
      }
    };

    const tick = () => {
      if (window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        handleScroll();
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    handleScroll();
    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="not-in-toc relative overflow-hidden rounded-2xl my-8 border border-zinc-200 dark:border-zinc-800"
      style={{ height }}
    >
      <div
        className="absolute inset-0 w-full bg-cover bg-center pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url(${src})`,

          height: "130%",
          top: "-15%",
          transform: `translateY(${offsetY}px)`,
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
