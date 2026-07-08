"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../../lib/config";
import { Copy, Check } from "lucide-react";

interface ServerData {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
}

export function ServerStatus() {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!siteConfig.serverIp) {
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://mcstats.tickhosting.com/api/status?ip=${siteConfig.serverIp}&type=java`
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Failed to fetch server status", e);
        setData({ online: false });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (!siteConfig.serverIp) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanIp = siteConfig.serverIp.split(":")[0]; // Copy without port if desired, but user said IP so let's copy the full IP
    navigator.clipboard.writeText(siteConfig.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center justify-between w-full p-2.5 mb-8 -mt-2 bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl transition-all duration-300"
      title="Нажмите, чтобы скопировать IP сервера"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-5 h-5">
          {loading ? (
            <div className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
          ) : data?.online ? (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-red-500" />
          )}
        </div>

        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-500 mb-0.5">
            AfricaRP
          </span>
          <span className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
            {loading
              ? "Загрузка..."
              : data?.online
              ? `Онлайн: ${data.players?.online || 0} / ${data.players?.max || 0}`
              : "Сервер выключен"}
          </span>
        </div>
      </div>

      <div className="pr-1 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </button>
  );
}
