"use client";

import dynamic from "next/dynamic";
import "plyr/dist/plyr.css";

const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.Plyr), {
  ssr: false,
});

export function VideoPlayer({
  src,
  title = "Video",
  poster,
}: {
  src: string;
  title?: string;
  poster?: string;
}) {
  const plyrProps = {
    source: {
      type: "video" as const,
      title: title,
      poster: poster,
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
        restart: "Перезапустить",
        rewind: "Назад на {seektime}с",
        play: "Пуск",
        pause: "Пауза",
        fastForward: "Вперед на {seektime}с",
        seek: "Поиск",
        seekLabel: "{currentTime} из {duration}",
        played: "Воспроизведено",
        buffered: "Буферизация",
        currentTime: "Текущее время",
        duration: "Продолжительность",
        volume: "Громкость",
        mute: "Выключить звук",
        unmute: "Включить звук",
        enableCaptions: "Включить субтитры",
        disableCaptions: "Выключить субтитры",
        download: "Скачать",
        enterFullscreen: "Полный экран",
        exitFullscreen: "Обычный экран",
        frameTitle: "Плеер для {title}",
        captions: "Субтитры",
        settings: "Настройки",
        pip: "Картинка в картинке",
        menuBack: "Назад",
        speed: "Скорость",
        normal: "Обычная",
        quality: "Качество",
        loop: "Зациклить",
        start: "Начало",
        end: "Конец",
        all: "Все",
        reset: "Сброс",
        disabled: "Выключено",
        enabled: "Включено",
        advertisement: "Реклама",
      },
    },
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black">
      <Plyr {...plyrProps} />
    </div>
  );
}
