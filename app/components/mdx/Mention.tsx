import {
  ShieldAlert,
  ShieldCheck,
  Crown,
  Wrench,
  User,
  Star,
} from "lucide-react";

export function Mention({
  children,
  role = "user",
}: {
  children: React.ReactNode;
  role?: "admin" | "moderator" | "developer" | "vip" | "user";
}) {
  const styles = {
    admin: {
      bg: "bg-red-500/10 dark:bg-red-500/20",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-900/50",
      icon: <Crown className="w-3.5 h-3.5" />,
    },
    moderator: {
      bg: "bg-green-500/10 dark:bg-green-500/20",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-900/50",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    developer: {
      bg: "bg-orange-500/10 dark:bg-orange-500/20",
      text: "text-orange-700 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-900/50",
      icon: <Wrench className="w-3.5 h-3.5" />,
    },
    vip: {
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-900/50",
      icon: <Star className="w-3.5 h-3.5" />,
    },
    user: {
      bg: "bg-zinc-100 dark:bg-zinc-800",
      text: "text-zinc-700 dark:text-zinc-300",
      border: "border-zinc-200 dark:border-zinc-700",
      icon: <User className="w-3.5 h-3.5" />,
    },
  };

  const style = styles[role] || styles.user;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-sm font-medium border ${style.bg} ${style.text} ${style.border} mx-0.5 align-baseline shadow-sm`}
    >
      {style.icon}
      {children}
    </span>
  );
}
