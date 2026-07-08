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

// Глобальный кэш, чтобы при переходе между страницами статус не сбрасывался
let cachedData: ServerData | null = null;
let lastFetchTime: number = 0;
const CACHE_TTL = 30000; // 30 секунд

export function ServerStatus() {
  const [data, setData] = useState<ServerData | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!siteConfig.serverIp) {
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      const now = Date.now();
      if (cachedData && now - lastFetchTime < CACHE_TTL) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://mcstats.tickhosting.com/api/status?ip=${siteConfig.serverIp}&type=java`
        );
        const json = await res.json();
        cachedData = json;
        lastFetchTime = Date.now();
        setData(json);
      } catch (e) {
        console.error("Failed to fetch server status", e);
        if (!cachedData) {
          setData({ online: false });
        }
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
    navigator.clipboard.writeText(siteConfig.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center justify-between w-full py-1.5 px-2 mb-8 -mt-2 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
      title="Нажмите, чтобы скопировать IP сервера"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-3 h-3">
          {loading ? (
            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 animate-pulse" />
          ) : data?.online ? (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
          )}
        </div>

        <div className="flex flex-col items-start leading-none gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300">
            IP: {siteConfig.serverIp.split(":")[0]}
          </span>
          <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors duration-300">
            {loading
              ? "Загрузка..."
              : data?.online
              ? `Онлайн: ${data.players?.online || 0} / ${data.players?.max || 0}`
              : "Сервер выключен"}
          </span>
        </div>
      </div>

      <div className="pr-1 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </button>
  );
}
