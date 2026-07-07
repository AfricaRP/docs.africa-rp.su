import { CheckCircle2, XCircle } from "lucide-react";

export function DoDontGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">{children}</div>;
}

export function DoDont({ type, children }: { type: 'do' | 'dont', children: React.ReactNode }) {
  const isDo = type === 'do';
  
  return (
    <div className={`border rounded-2xl p-5 ${
      isDo 
        ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50' 
        : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
    }`}>
      <div className={`flex items-center gap-2 font-bold mb-3 ${
        isDo ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
      }`}>
        {isDo ? <CheckCircle2 className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
        <span>{isDo ? 'Правильно' : 'Неправильно'}</span>
      </div>
      <div className="prose-sm sm:prose-base dark:prose-invert [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}