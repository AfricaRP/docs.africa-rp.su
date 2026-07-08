"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import { Maximize2 } from "lucide-react";

export function LightboxImage({ src, alt }: { src: string; alt?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col m-0 p-0">
      <span
        className="relative group block w-full cursor-pointer shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-shadow duration-500"
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt || "Image"}
          className="!m-0 w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ maxHeight: "600px" }}
        />
        <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <span className="flex flex-col items-center text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white/20 p-3 rounded-full mb-2 backdrop-blur-md border border-white/30 shadow-lg">
              <Maximize2 className="w-6 h-6" />
            </span>
            <span className="font-medium text-sm tracking-wide drop-shadow-md">
              Нажмите, чтобы увеличить
            </span>
          </span>
        </span>
      </span>
      {alt && alt !== "Image" && (
        <span className="block text-center text-sm text-zinc-500 dark:text-zinc-400 mt-3 italic">
          {alt}
        </span>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        plugins={[Zoom, Fullscreen]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
        }}
        labels={{
          Close: "Закрыть",
          Previous: "Назад",
          Next: "Вперед",
          "Zoom in": "Приблизить",
          "Zoom out": "Отдалить",
          "Enter Fullscreen": "На весь экран",
          "Exit Fullscreen": "Обычный экран",
        }}
      />
    </div>
  );
}
