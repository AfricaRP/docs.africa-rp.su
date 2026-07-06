"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, ArrowUp } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll("article h1, article h2, article h3"))
        .map((elem) => ({
          id: elem.id,
          text: elem.textContent || "",
          level: Number(elem.tagName.charAt(1)),
        }))
        .filter((item) => item.id);

      setHeadings(elements);

      const handleScroll = () => {
        const headingElements = Array.from(document.querySelectorAll("article h1, article h2, article h3"))
          .filter(elem => elem.id);
        
        if (headingElements.length === 0) return;

        const scrollPosition = window.scrollY + 150;

        let currentActiveId = headingElements[0].id;
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const elem = headingElements[i] as HTMLElement;
          if (elem.offsetTop <= scrollPosition) {
            currentActiveId = elem.id;
            break;
          }
        }

        const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50;
        if (isAtBottom && headingElements.length > 0) {
          currentActiveId = headingElements[headingElements.length - 1].id;
        }

        setActiveId(currentActiveId);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-10 flex flex-col gap-4 w-full shrink-0 hidden xl:flex text-sm">
      <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 mb-2">
        <List className="w-4 h-4" />
        На этой странице
      </div>
      
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`relative block py-1.5 pl-4 pr-2 transition-colors
                ${heading.level === 3 ? "ml-4 text-xs" : ""}
                ${isActive 
                  ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-500/10 dark:bg-blue-500/20 rounded-r-md" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-blue-600 dark:bg-blue-500 rounded-r-full animate-fade-in" />
              )}
              {heading.text}
            </a>
          );
        })}
      </div>

      <button 
        onClick={scrollToTop}
        className="group flex items-center gap-2 mt-4 text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors duration-300"
      >
        <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
        Наверх
      </button>
    </div>
  );
}