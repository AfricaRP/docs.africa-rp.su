export function Rutube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-6 shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
      <iframe
        src={`https://rutube.ru/play/embed/${id}`}
        allow="clipboard-write; autoplay"
        allowFullScreen
        title={title || "Rutube video player"}
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
}
