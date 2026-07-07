import { ReactNode } from "react";

export function MarginNote({ title = "На заметку", children }: { title?: string, children: ReactNode }) {
  return (
    <aside className="float-none xl:float-right xl:w-72 xl:ml-8 xl:-mr-16 mb-6 p-5 text-sm border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-400 rounded-r-xl clear-right mt-2 shadow-sm">
      <strong className="block mb-2 text-blue-700 dark:text-blue-300 font-semibold">{title}</strong>
      <div className="text-zinc-600 dark:text-zinc-400 prose-sm m-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}