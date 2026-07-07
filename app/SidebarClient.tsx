"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import * as LucideIcons from "lucide-react"
import { NavItem } from "../lib/content"
import { SearchModal } from "./components/Search"

function IconRenderer({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.FileText className="w-4 h-4 mr-3 shrink-0" />;
  return <Icon className="w-4 h-4 mr-3 shrink-0" />;
}

function CollapsibleSection({ section, pathname }: { section: NavItem; pathname: string }) {
  const isActive = section.items?.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
  const [isOpen, setIsOpen] = useState(isActive || false);

  return (
    <div className="mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 mb-3 flex items-center justify-between hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200 text-left px-2"
      >
        <span className="flex-1 min-w-0">{section.title}</span>
        <LucideIcons.ChevronDown 
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
        />
      </button>
      
      <div 
        className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="flex flex-col gap-1 overflow-hidden">
          {section.items?.map((item, j) => {
            const isItemActive = pathname === item.href;
            return (
              <li key={j} className="relative">
                {isItemActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 dark:bg-blue-500 rounded-r-full z-10" />
                )}
                <Link 
                  href={item.href} 
                  className={`group relative flex items-start py-2 px-3 rounded-md transition-all duration-200 ${
                    isItemActive 
                      ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-white/5" 
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="mt-0.5 transition-transform duration-200 group-hover:translate-x-0.5">
                    <IconRenderer name={item.icon} />
                  </div>
                  <span className="flex-1 min-w-0 leading-snug transition-transform duration-200 group-hover:translate-x-0.5">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export function SidebarClient({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2 w-full mb-8 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100/50 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all duration-200"
      >
        <LucideIcons.Search className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left">Поиск...</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-sans font-medium text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm">
          Esc
        </kbd>
      </button>

      <nav className="flex flex-col">
        {nav.map((section, i) => {
          if (section.items) {
            return <CollapsibleSection key={i} section={section} pathname={pathname} />;
          }

          const isItemActive = pathname === section.href;
          return (
            <div key={i} className="mb-2 relative">
              {isItemActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 dark:bg-blue-500 rounded-r-full z-10" />
              )}
              <Link 
                href={section.href}
                className={`group relative flex items-start py-2 px-3 rounded-md transition-all duration-200 ${
                  isItemActive
                    ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-white/5"
                    : "text-zinc-800 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                <div className="mt-0.5 transition-transform duration-200 group-hover:translate-x-0.5">
                  <IconRenderer name={section.icon} />
                </div>
                <span className="flex-1 min-w-0 leading-snug transition-transform duration-200 group-hover:translate-x-0.5">{section.title}</span>
              </Link>
            </div>
          );
        })}
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}