export function Secret({ children }: { children: React.ReactNode }) {
  return (
    <span 
      className="blur-sm hover:blur-none transition-all duration-500 cursor-help select-none hover:select-auto bg-zinc-200 dark:bg-zinc-800 hover:bg-transparent dark:hover:bg-transparent rounded px-1"
      title="Наведите, чтобы рассекретить"
    >
      {children}
    </span>
  );
}