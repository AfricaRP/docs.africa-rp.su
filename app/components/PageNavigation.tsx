import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavLink {
  title: string;
  href: string;
  category: string | null;
}

interface PageNavigationProps {
  prev: NavLink | null;
  next: NavLink | null;
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch">
      {prev ? (
        <Link 
          href={prev.href}
          className="!no-underline group flex flex-col justify-center items-start p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-transparent hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 flex-1 min-w-0"
        >
          <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Назад
          </div>
          <div className="text-zinc-900 dark:text-zinc-100 text-lg font-medium truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {prev.title}
          </div>
          {prev.category && (
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider font-medium">
              {prev.category}
            </div>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link 
          href={next.href}
          className="!no-underline group flex flex-col justify-center items-end text-right p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-transparent hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 flex-1 min-w-0"
        >
          <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            Вперед
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          <div className="text-zinc-900 dark:text-zinc-100 text-lg font-medium truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {next.title}
          </div>
          {next.category && (
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider font-medium">
              {next.category}
            </div>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
