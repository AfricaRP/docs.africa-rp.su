"use client";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export function VoiceBox({ src, title }: { src: string; title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    }
  };

  return (
    <div className="inline-flex items-center gap-3 p-1.5 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full my-4 shadow-sm w-fit">
      <button 
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
      </button>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
          {title || "Аудиозапись"}
        </span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
          {isPlaying ? "Воспроизведение..." : "Нажмите для прослушивания"}
        </span>
      </div>
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}