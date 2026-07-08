import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";

export interface CalloutProps {
  type?: "note" | "tip" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  note: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-900",
    text: "text-blue-800 dark:text-blue-300",
    icon: Info,
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  tip: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-900",
    text: "text-green-800 dark:text-green-300",
    icon: Lightbulb,
    iconColor: "text-green-500 dark:text-green-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-900",
    text: "text-amber-800 dark:text-amber-300",
    icon: AlertTriangle,
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  danger: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-900",
    text: "text-red-800 dark:text-red-300",
    icon: AlertCircle,
    iconColor: "text-red-500 dark:text-red-400",
  },
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = styles[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 flex gap-3 rounded-xl border p-4 ${config.bg} ${config.border}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        {title && (
          <div className={`font-semibold mb-1 ${config.text}`}>{title}</div>
        )}
        <div
          className={`prose-sm ${config.text} [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 leading-relaxed [&_strong]:text-current [&_li]:text-current [&_p]:text-current [&_ol]:text-current [&_ul]:text-current [&_li::marker]:text-current`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
