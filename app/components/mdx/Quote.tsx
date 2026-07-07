export function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <blockquote className="relative my-8 border-none pl-12 pr-6 py-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl italic text-zinc-700 dark:text-zinc-300">
      <svg className="absolute top-4 left-4 w-6 h-6 text-zinc-200 dark:text-zinc-800 select-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <div className="relative z-10 text-lg leading-relaxed">
        {children}
      </div>
      {author && (
        <div className="relative z-10 mt-5 text-sm font-semibold text-zinc-500 dark:text-zinc-500 not-italic">
          — {author}
        </div>
      )}
    </blockquote>
  );
}