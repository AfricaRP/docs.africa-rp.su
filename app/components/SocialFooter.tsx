"use client";

import { siteConfig } from "../../lib/config";
import * as LucideIcons from "lucide-react";

export function SocialFooter() {
  if (!siteConfig.footerLinks || siteConfig.footerLinks.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-6 py-6 border-t border-zinc-200 dark:border-zinc-800/60">
      {siteConfig.footerLinks.map((link, i) => {
        const Icon = (LucideIcons as any)[link.icon] || LucideIcons.Link;
        return (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            title={link.icon}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}
