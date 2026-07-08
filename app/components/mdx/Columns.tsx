import { ReactNode } from "react";

export function Columns({
  children,
  columns = 2,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns] || "md:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-6 my-6 w-full items-start`}>
      {children}
    </div>
  );
}

export function Column({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 min-w-0">{children}</div>;
}
