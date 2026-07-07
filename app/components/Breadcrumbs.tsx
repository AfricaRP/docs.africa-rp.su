"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1 sm:space-x-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6 whitespace-nowrap overflow-x-auto pb-2 -mb-2 no-scrollbar">
      <Link 
        href="/" 
        className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-1 sm:space-x-2">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {index === items.length - 1 ? (
            <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {item.title}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
