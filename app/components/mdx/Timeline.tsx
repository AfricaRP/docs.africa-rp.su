export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 my-8 flex flex-col gap-8">
      {children}
    </div>
  );
}

export function TimelineItem({
  date,
  title,
  children,
}: {
  date: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-6 md:pl-8">
      <div className="absolute w-4 h-4 bg-zinc-200 dark:bg-zinc-700 border-4 border-white dark:border-zinc-950 rounded-full -left-[9px] top-1.5 shadow-sm" />
      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
        <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
          {date}
        </span>
        {title && (
          <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 m-0">
            {title}
          </h4>
        )}
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base prose-sm sm:prose-base dark:prose-invert [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
