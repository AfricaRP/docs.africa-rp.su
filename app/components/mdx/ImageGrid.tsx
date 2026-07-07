export function ImageGrid({ columns = 2, children }: { columns?: 2 | 3 | 4, children: React.ReactNode }) {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
  }[columns] || 'sm:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 my-6 items-start [&>p]:contents [&_figure]:contents [&_img]:!aspect-video [&_img]:!object-cover [&_span.relative]:!h-full`}>
      {children}
    </div>
  );
}