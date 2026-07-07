export function ParallaxWindow({ src, height = "400px", children }: { src: string, height?: string, children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl my-8 border border-zinc-200 dark:border-zinc-800" style={{ height }}>
      <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
        <div className="text-white drop-shadow-lg max-w-2xl prose prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}