"use client";

import { useRef, useState } from "react";

export function Magnifier({
  src,
  alt,
  zoom = 2,
}: {
  src: string;
  alt?: string;
  zoom?: number;
}) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  return (
    <div
      className="relative my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-crosshair inline-block w-full max-w-full"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt || ""}
        className="w-full h-auto block m-0"
      />
      {show && imgRef.current && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 bg-no-repeat bg-white dark:bg-zinc-900"
          style={{
            width: "150px",
            height: "150px",
            left: pos.x - 75,
            top: pos.y - 75,
            backgroundImage: `url(${src})`,
            backgroundSize: `${imgRef.current.width * zoom}px ${imgRef.current.height * zoom}px`,
            backgroundPosition: `-${pos.x * zoom - 75}px -${pos.y * zoom - 75}px`,
          }}
        />
      )}
    </div>
  );
}
