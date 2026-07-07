export function Properties({ children }: { children: React.ReactNode }) {
  return <ul className="my-6 flex flex-col gap-3 p-0 m-0">{children}</ul>;
}

export function Property({ name, type, required, children }: { name: string; type?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <li className="list-none border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900/50 m-0">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
        {type && (
          <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">
            {type}
          </span>
        )}
        {required && (
          <span className="text-[10px] uppercase tracking-wider font-bold text-red-500 border border-red-200 dark:border-red-900/50 px-1.5 py-0.5 rounded-md">
            Обязательно
          </span>
        )}
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 text-sm [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </li>
  );
}