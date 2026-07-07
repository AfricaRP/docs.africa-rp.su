"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import "plyr/dist/plyr.css";

const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.Plyr), { ssr: false });

export function VideoPlayer({ src, title = "Video", poster }: { src: string; title?: string; poster?: string }) {
  const [posterUrl, setPosterUrl] = useState<string | undefined>(poster);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (posterUrl || !src) return;

    let isMounted = true;
    const video = document.createElement("video");
    
    // Some browsers require the video to be in the DOM to load metadata/data
    video.style.display = "none";
    video.style.position = "absolute";
    video.style.opacity = "0";
    document.body.appendChild(video);

    if (src.startsWith('http')) {
      video.crossOrigin = "anonymous";
    }
    
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const handleLoadedData = () => {
      if (!isMounted) return;
      // Seek to 0.5 seconds to bypass black frames
      video.currentTime = 0.5;
    };

    const handleSeeked = () => {
      if (!isMounted) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          
          // Force apply to DOM immediately for Plyr
          if (wrapperRef.current) {
            const posterDiv = wrapperRef.current.querySelector('.plyr__poster');
            if (posterDiv) {
              (posterDiv as HTMLElement).style.backgroundImage = `url(${dataUrl})`;
              // Plyr might hide the poster div if poster was initially undefined
              (posterDiv as HTMLElement).style.opacity = "1";
              (posterDiv as HTMLElement).style.visibility = "visible";
              (posterDiv as HTMLElement).style.display = "block";
            }
          }
          
          setPosterUrl(dataUrl);
        }
      } catch (e) {
        console.warn("Failed to generate video poster:", e);
      } finally {
        if (video.parentNode) video.parentNode.removeChild(video);
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);
    video.src = src;

    return () => {
      isMounted = false;
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
      if (video.parentNode) video.parentNode.removeChild(video);
      video.src = "";
    };
  }, [src, posterUrl]);

  const plyrProps = {
    source: {
      type: "video" as const,
      title: title,
      poster: posterUrl,
      sources: [
        {
          src: `${src}#t=0.5`, // Fallback for native poster loading
          type: "video/mp4",
        },
      ],
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      clickToPlay: true,
      ratio: "16:9",
      i18n: {
        restart: 'Перезапустить',
        rewind: 'Назад на {seektime}с',
        play: 'Пуск',
        pause: 'Пауза',
        fastForward: 'Вперед на {seektime}с',
        seek: 'Поиск',
        seekLabel: '{currentTime} из {duration}',
        played: 'Воспроизведено',
        buffered: 'Буферизация',
        currentTime: 'Текущее время',
        duration: 'Продолжительность',
        volume: 'Громкость',
        mute: 'Выключить звук',
        unmute: 'Включить звук',
        enableCaptions: 'Включить субтитры',
        disableCaptions: 'Выключить субтитры',
        download: 'Скачать',
        enterFullscreen: 'Полный экран',
        exitFullscreen: 'Обычный экран',
        frameTitle: 'Плеер для {title}',
        captions: 'Субтитры',
        settings: 'Настройки',
        pip: 'Картинка в картинке',
        menuBack: 'Назад',
        speed: 'Скорость',
        normal: 'Обычная',
        quality: 'Качество',
        loop: 'Зациклить',
        start: 'Начало',
        end: 'Конец',
        all: 'Все',
        reset: 'Сброс',
        disabled: 'Выключено',
        enabled: 'Включено',
        advertisement: 'Реклама',
      },
    },
  };

  return (
    <div ref={wrapperRef} className="my-8 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black relative">
      {!posterUrl && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900 pointer-events-none animate-pulse">
          <div className="w-16 h-16 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <Plyr key={posterUrl || 'loading'} {...plyrProps} />
    </div>
  );
}