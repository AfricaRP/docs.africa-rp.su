export function HoverCard({ title, description, image, children }: { title: string; description: string; image?: string; children: React.ReactNode }) {
  return (
    <span className="relative inline-block group cursor-help text-blue-600 dark:text-blue-400 border-b border-dashed border-blue-400/50 hover:border-blue-500 transition-colors">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left cursor-default">
        {image && <img src={image} className="w-full h-24 object-cover rounded-md mb-2" alt={title} />}
        <span className="block font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">{title}</span>
        <span className="block text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">{description}</span>
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-b border-r border-zinc-200 dark:border-zinc-800 rotate-45" />
      </span>
    </span>
  );
}