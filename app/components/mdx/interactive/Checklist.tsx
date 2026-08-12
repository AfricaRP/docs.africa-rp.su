"use client";
import { useState } from "react";

export function Checklist({ children }: { children: React.ReactNode }) {
  return <div className="my-6 flex flex-col gap-2">{children}</div>;
}

export function ChecklistItem({
  children,
  defaultChecked = false,
  disabled = false,
}: {
  children: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${
        checked
          ? "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800"
          : `bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700 ${!disabled && "hover:border-blue-300 dark:hover:border-blue-500/50 shadow-sm"}`
      }`}
    >
      <input
        type="checkbox"
        className={`mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        checked={checked}
        disabled={disabled}
        onChange={(e) => !disabled && setChecked(e.target.checked)}
      />
      <div
        className={`flex-1 text-sm sm:text-base transition-all duration-300 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 ${
          checked
            ? "line-through text-zinc-500 dark:text-zinc-500"
            : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {children}
      </div>
    </label>
  );
}
