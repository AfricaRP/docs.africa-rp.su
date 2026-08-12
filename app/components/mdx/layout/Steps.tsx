export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="steps-container ml-4 border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 my-6 space-y-6">
      {children}
    </div>
  );
}
