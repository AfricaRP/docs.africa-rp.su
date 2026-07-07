"use client";

import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";

export interface ImageCompareProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageCompare({ 
  before, 
  after, 
  beforeLabel = "Было", 
  afterLabel = "Стало" 
}: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPosition = Math.max(0, Math.min(100, ((x - container.left) / container.width) * 100));
    
    setPosition(newPosition);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="my-8">
      <div 
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden shadow-lg select-none cursor-ew-resize border border-zinc-200 dark:border-zinc-800"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e);
        }}
        style={{ aspectRatio: '16/9' }}
      >
        <img 
          src={after} 
          alt={afterLabel} 
          className="absolute inset-0 w-full h-full object-cover !m-0 pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm pointer-events-none whitespace-nowrap">
          {afterLabel}
        </div>

        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <img 
            src={before} 
            alt={beforeLabel} 
            className="absolute inset-0 w-[100vw] h-full object-cover !m-0"
            style={{ maxWidth: 'none', width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm whitespace-nowrap">
            {beforeLabel}
          </div>
        </div>

        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transform -translate-x-1/2 flex items-center justify-center pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="w-8 h-8 bg-white text-zinc-800 rounded-full flex items-center justify-center shadow-lg">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
