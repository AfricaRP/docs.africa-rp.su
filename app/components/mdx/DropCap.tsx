export function DropCap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <span className="float-left text-6xl font-bold text-blue-500 leading-[0.8] mr-3 mt-2 mb-1">
        {typeof children === 'string' ? children.charAt(0) : ''}
      </span>
      <span>
        {typeof children === 'string' ? children.slice(1) : children}
      </span>
    </div>
  );
}