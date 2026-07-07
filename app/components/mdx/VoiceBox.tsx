"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function VoiceBox({ src, title }: { src: string; title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    }
  };

  return (
    <div className="flex items-center gap-4 p-1.5 pr-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full my-4 shadow-sm w-fit max-w-full overflow-hidden">
      <button 
        onClick={toggle}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
      </button>
      
      <div className="flex flex-col justify-center min-w-[120px]">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
          {title || "Аудиозапись"}
        </span>
        <div className="h-4 flex items-center mt-0.5">
          {isPlaying ? (
            <div className="flex items-center gap-[3px] h-full pt-1">
              <span className="w-1 bg-blue-500 rounded-full animate-soundwave" style={{ animationDelay: "0ms" }} />
              <span className="w-1 bg-blue-500 rounded-full animate-soundwave" style={{ animationDelay: "150ms" }} />
              <span className="w-1 bg-blue-500 rounded-full animate-soundwave" style={{ animationDelay: "300ms" }} />
              <span className="w-1 bg-blue-500 rounded-full animate-soundwave" style={{ animationDelay: "450ms" }} />
            </div>
          ) : (
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              Нажмите Play
            </span>
          )}
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-zinc-800">
        <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-zinc-400 hover:text-blue-500 transition-colors">
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-16 accent-blue-600 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
        />
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