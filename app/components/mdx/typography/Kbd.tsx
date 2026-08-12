export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-sm font-sans font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-[0_2px_0_rgba(212,212,216,1)] dark:shadow-[0_2px_0_rgba(39,39,42,1)] translate-y-[-2px]">
      {children}
    </kbd>
  );
}
