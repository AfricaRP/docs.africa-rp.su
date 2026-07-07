import Link from "next/link";
import * as LucideIcons from "lucide-react";

export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  );
}

export interface CardProps {
  title: string;
  href: string;
  icon?: string;
  children: React.ReactNode;
}

export function Card({ title, href, icon, children }: CardProps) {
  // @ts-ignore
  const IconComponent = icon && LucideIcons[icon] ? LucideIcons[icon] : null;

  return (
    <Link 
      href={href}
      className="block group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0d1117] hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {IconComponent && (
        <div className="w-10 h-10 mb-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 mt-0">
        {title}
      </h3>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 m-0 leading-relaxed">
        {children}
      </div>
    </Link>
  );
}
