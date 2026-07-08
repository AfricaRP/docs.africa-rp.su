"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { NavItem } from "../lib/content";
import { SearchModal } from "./components/Search";

function IconRenderer({
  name,
  isActive,
}: {
  name?: string;
  isActive?: boolean;
}) {
  if (!name) return null;
  const Icon = (LucideIcons as any)[name];
  if (!Icon)
    return (
      <LucideIcons.FileText
        className={`w-4 h-4 mr-3 shrink-0 ${isActive ? "text-blue-500" : ""}`}
      />
    );
  return (
    <Icon
      className={`w-4 h-4 mr-3 shrink-0 transition-colors duration-300 ${isActive ? "text-blue-500 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""}`}
    />
  );
}

function CollapsibleSection({
  section,
  pathname,
}: {
  section: NavItem;
  pathname: string;
}) {
  const isActive = section.items?.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
  );
  const [isOpen, setIsOpen] = useState(isActive || false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full text-[11px] uppercase tracking-[0.2em] font-extrabold text-zinc-400 dark:text-zinc-500 mb-3 flex items-center justify-between hover:text-zinc-800 dark:hover:text-zinc-300 transition-all duration-300 text-left px-2"
      >
        <span className="flex-1 min-w-0 drop-shadow-sm">{section.title}</span>
        <LucideIcons.ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-500 ease-out ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="flex flex-col gap-1.5 overflow-hidden">
          {section.items?.map((item, j) => {
            const isItemActive = pathname === item.href;
            return (
              <li key={j} className="relative group/item">
                <Link
                  href={item.href}
                  className={`relative flex items-start py-2 px-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    isItemActive
                      ? "text-blue-600 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-500/10 shadow-sm border border-blue-100 dark:border-blue-500/20"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  {isItemActive && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.8)] z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-400/10 opacity-50" />
                    </>
                  )}
                  <div className="relative mt-0.5 transition-transform duration-300 group-hover/item:translate-x-1">
                    <IconRenderer name={item.icon} isActive={isItemActive} />
                  </div>
                  <span className="relative flex-1 min-w-0 leading-snug transition-transform duration-300 group-hover/item:translate-x-1">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SidebarClient({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsSearchOpen(true)}
        className="group relative flex items-center gap-3 w-full mb-8 px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-500/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <LucideIcons.Search className="w-4 h-4 shrink-0 transition-colors duration-300 group-hover:text-blue-500" />
        <span className="flex-1 text-left font-medium transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">Поиск...</span>
        <kbd className="hidden sm:flex items-center justify-center px-2 py-0.5 text-[10px] uppercase font-sans font-bold text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm transition-all duration-300 group-hover:border-blue-200 dark:group-hover:border-blue-500/30 group-hover:text-blue-500">
          Ctrl+K
        </kbd>
      </button>

      <nav className="flex flex-col">
        {nav.map((section, i) => {
          if (section.items) {
            return (
              <CollapsibleSection
                key={i}
                section={section}
                pathname={pathname}
              />
            );
          }

          const isItemActive = pathname === section.href;
          return (
            <div key={i} className="mb-2 relative group/item">
              <Link
                href={section.href}
                className={`relative flex items-start py-2 px-3 rounded-xl transition-all duration-300 overflow-hidden ${
                  isItemActive
                    ? "text-blue-600 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-500/10 shadow-sm border border-blue-100 dark:border-blue-500/20"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent"
                }`}
              >
                {isItemActive && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.8)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-400/10 opacity-50" />
                  </>
                )}
                <div className="relative mt-0.5 transition-transform duration-300 group-hover/item:translate-x-1">
                  <IconRenderer name={section.icon} isActive={isItemActive} />
                </div>
                <span className="relative flex-1 min-w-0 leading-snug transition-transform duration-300 group-hover/item:translate-x-1">
                  {section.title}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
