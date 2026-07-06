"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "plyr/dist/plyr.css";

// Dynamically import plyr-react to avoid SSR issues with the plyr library
const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.Plyr), { ssr: false });

export function VideoPlayer({ src, title = "Video", poster }: { src: string; title?: string; poster?: string }) {
  const [posterUrl, setPosterUrl] = useState<string | undefined>(poster);

  // Automatically extract a frame to use as a cover (poster)
  useEffect(() => {
    if (posterUrl || !src) return;

    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    // Set time to extract frame from (e.g. 2.5 seconds)
    video.currentTime = 2.5;

    const handleLoadedData = () => {
      // Fallback if video is shorter than 2.5s
      if (video.duration < 2.5) {
        video.currentTime = video.duration / 2;
      }
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPosterUrl(canvas.toDataURL("image/jpeg", 0.8));
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
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
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black">
      <Plyr {...plyrProps} />
    </div>
  );
}