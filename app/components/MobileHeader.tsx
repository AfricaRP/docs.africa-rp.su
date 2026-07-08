"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileHeader({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 sticky top-0 z-40">
        <a href="/" className="block">
          <img
            src="/media/logo.png"
            alt="AfricaRP Logo"
            className="h-12 w-auto object-contain"
          />
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto p-4 flex flex-col border-t border-zinc-200 dark:border-zinc-800">
          {children}
        </div>
      )}
    </>
  );
}
