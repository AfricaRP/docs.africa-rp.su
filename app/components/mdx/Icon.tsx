import * as LucideIcons from "lucide-react";

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    console.warn(`Icon ${name} not found in lucide-react`);
    return <span className="text-red-500 font-mono text-xs border border-red-500 rounded px-1">[{name}?]</span>;
  }
  
  return <IconComponent className={`inline-block w-[1.2em] h-[1.2em] align-text-bottom ${className}`} />;
}