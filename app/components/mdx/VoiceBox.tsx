"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function VoiceBox({ src, title }: { src: string; title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const isSetup = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setupAudio = () => {
    if (!audioRef.current || isSetup.current) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // Gives 32 frequency bins
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      
      analyserRef.current = analyser;
      isSetup.current = true;
    } catch (e) {
      console.warn("AudioContext setup failed:", e);
    }
  };

  const updateEqualizer = () => {
    if (analyserRef.current && barsRef.current && !audioRef.current?.paused) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      const bars = barsRef.current.children;
      for (let i = 0; i < Math.min(bars.length, dataArray.length); i++) {
        // Value is 0-255. Map to 3px - 24px height.
        const height = Math.max(3, (dataArray[i] / 255) * 24);
        (bars[i] as HTMLElement).style.height = `${height}px`;
      }
      
      rafRef.current = requestAnimationFrame(updateEqualizer);
    }
  };

  const toggle = () => {
    if (audioRef.current) {
      setupAudio();
      
      if (isPlaying) {
        audioRef.current.pause();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        
        if (barsRef.current) {
          const bars = barsRef.current.children;
          for (let i = 0; i < bars.length; i++) {
            (bars[i] as HTMLElement).style.height = '3px';
          }
        }
      } else {
        if (analyserRef.current?.context.state === 'suspended') {
          (analyserRef.current.context as AudioContext).resume();
        }
        audioRef.current.play();
        rafRef.current = requestAnimationFrame(updateEqualizer);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 p-1.5 pr-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full my-4 shadow-sm w-full max-w-[400px] overflow-hidden">
      <button 
        onClick={toggle}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
      </button>
      
      <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
          {title || "Аудиозапись"}
        </span>
        <div className="relative h-6 flex items-end mt-0.5 w-full">
          <div 
            ref={barsRef} 
            className={`absolute bottom-0 left-0 right-0 flex items-end gap-[2px] w-full transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="flex-1 bg-blue-500 rounded-sm transition-all duration-75" style={{ height: '3px' }} />
            ))}
          </div>
          <span className={`absolute bottom-0 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            Нажмите Play
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-zinc-800 flex-shrink-0">
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
        crossOrigin="anonymous"
        onEnded={() => {
          setIsPlaying(false);
          if (barsRef.current) {
            const bars = barsRef.current.children;
            for (let i = 0; i < bars.length; i++) {
              (bars[i] as HTMLElement).style.height = '3px';
            }
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}