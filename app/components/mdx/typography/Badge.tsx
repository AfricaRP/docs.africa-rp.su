export function Badge({
  children,
  type = "default",
  variant,
}: {
  children: React.ReactNode;
  type?: "default" | "new" | "deprecated" | "beta";
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const styles: Record<string, string> = {
    default:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    new: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
    success: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
    deprecated:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
    danger:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
    beta: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    warning: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
  };

  const actualType = variant || type;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[actualType] || styles.default}`}
    >
      {children}
    </span>
  );
}
