export function DropCap({ children }: { children: React.ReactNode }) {
  return (
    <span className="float-left text-[3.5rem] font-bold text-blue-500 leading-[0.8] pr-2 pt-1 pb-1">
      {children}
    </span>
  );
}
