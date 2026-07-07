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
    
    // Do NOT set crossOrigin for same-origin URLs, it causes CORS failures on static servers
    if (src.startsWith('http')) {
      video.crossOrigin = "anonymous";
    }
    
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";

    const handleLoadedMetadata = () => {
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
            }
          }
          
          setPosterUrl(dataUrl);
        }
      } catch (e) {
        console.warn("Failed to generate video poster:", e);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.src = src;

    return () => {
      isMounted = false;
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
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
          src: src, 
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
    <div ref={wrapperRef} className="my-8 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black">
      <Plyr {...plyrProps} />
    </div>
  );
}