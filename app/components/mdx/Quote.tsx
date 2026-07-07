export function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <blockquote className="relative my-8 border-none pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl italic text-zinc-700 dark:text-zinc-300">
      <span className="absolute top-2 left-4 text-6xl text-zinc-200 dark:text-zinc-800 font-serif leading-none select-none">"</span>
      <div className="relative z-10 text-lg">
        {children}
      </div>
      {author && (
        <div className="relative z-10 mt-4 text-sm font-semibold text-zinc-500 dark:text-zinc-500 not-italic">
          — {author}
        </div>
      )}
    </blockquote>
  );
}