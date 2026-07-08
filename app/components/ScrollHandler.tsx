"use client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ScrollHandlerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const targetTitle = sessionStorage.getItem("search-target-title");

    if (hash || targetTitle) {
      setTimeout(() => {
        let target = hash ? document.getElementById(hash) : null;

        if (!target && targetTitle) {
          const headings = Array.from(
            document.querySelectorAll(
              "article h1, article h2, article h3, article h4",
            ),
          );
          target = headings.find(
            (h) =>
              h.textContent?.trim().toLowerCase() === targetTitle.toLowerCase(),
          ) as HTMLElement;
        }

        if (target) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          target.classList.add(
            "bg-blue-500/20",
            "transition-colors",
            "duration-1000",
            "rounded",
            "px-1",
          );
          setTimeout(() => {
            target?.classList.remove("bg-blue-500/20");
          }, 2000);
        }

        sessionStorage.removeItem("search-target-title");
      }, 500);
    }
  }, [pathname, searchParams]);

  return null;
}

export function ScrollHandler() {
  return (
    <Suspense fallback={null}>
      <ScrollHandlerInner />
    </Suspense>
  );
}
