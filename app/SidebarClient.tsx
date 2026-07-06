"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import * as LucideIcons from "lucide-react"
import { NavItem } from "../lib/content"

function IconRenderer({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.FileText className="w-5 h-5 mr-3 shrink-0" />;
  return <Icon className="w-5 h-5 mr-3 shrink-0" />;
}

function CollapsibleSection({ section, pathname }: { section: NavItem; pathname: string }) {
  const isActive = section.items?.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
  const [isOpen, setIsOpen] = useState(isActive || false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full font-semibold text-zinc-800 dark:text-zinc-100 mb-2 flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-left"
      >
        <div className="flex items-center transition-transform duration-200 group-hover:translate-x-1 break-words flex-1 min-w-0 pr-2">
          <IconRenderer name={section.icon} />
          <span className="flex-1 min-w-0 break-words leading-tight">{section.title}</span>
        </div>
        <LucideIcons.ChevronDown 
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
        />
      </button>
      
      <div 
        className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="flex flex-col gap-1 border-l border-zinc-200 dark:border-zinc-800 ml-4 overflow-hidden py-1">
          {section.items?.map((item, j) => {
            const isItemActive = pathname === item.href;
            return (
              <li key={j} className="relative">
                {isItemActive && (
                  <div className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-blue-600 dark:bg-blue-500 rounded-r-full z-10" />
                )}
                <Link 
                  href={item.href} 
                  className={`group relative flex items-center py-1.5 pl-6 pr-3 rounded-r-md transition-all duration-200 ${
                    isItemActive 
                      ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-500/10 dark:bg-blue-500/20" 
                      : "text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <span className="flex items-center transition-transform duration-200 group-hover:translate-x-1 break-words w-full">
                    <IconRenderer name={item.icon} />
                    <span className="flex-1 min-w-0 break-words leading-tight">{item.title}</span>
                  </span>
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

  return (
    <nav className="flex flex-col gap-2">
      {nav.map((section, i) => {
        if (section.items) {
          return <CollapsibleSection key={i} section={section} pathname={pathname} />;
        }

        const isItemActive = pathname === section.href;
        return (
          <div key={i} className="mb-1 relative">
            {isItemActive && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 dark:bg-blue-500 rounded-r-full z-10" />
            )}
            <Link 
              href={section.href}
              className={`group relative font-semibold flex items-center py-2 px-2 rounded-r-md transition-all duration-200 ${
                isItemActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20"
                  : "text-zinc-800 hover:text-blue-600 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="flex items-center transition-transform duration-200 group-hover:translate-x-1 break-words w-full">
                <IconRenderer name={section.icon} />
                <span className="flex-1 min-w-0 break-words leading-tight">{section.title}</span>
              </span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}