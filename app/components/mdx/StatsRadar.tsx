"use client";

import { motion } from "framer-motion";

export function StatsRadar({ data, color = "#3B82F6" }: { data: Record<string, number>; color?: string }) {
  const keys = Object.keys(data);
  const max = 100;
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) * 0.65; // Leave room for labels

  const points = keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const val = data[key];
    const r = (val / max) * radius;
    return { 
      x: center + r * Math.cos(angle), 
      y: center + r * Math.sin(angle), 
      labelX: center + (radius + 25) * Math.cos(angle), 
      labelY: center + (radius + 20) * Math.sin(angle), 
      label: key, 
      value: val 
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Grid circles
  const circles = [0.25, 0.5, 0.75, 1].map((scale) => (
    <circle key={scale} cx={center} cy={center} r={radius * scale} fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" />
  ));

  // Axes
  const axes = points.map((p, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    return (
      <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" />
    );
  });

  return (
    <div className="flex justify-center items-center my-8 p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {circles}
        {axes}
        <motion.polygon
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15 }}
          points={polygonPoints}
          fill={color}
          stroke={color}
          strokeWidth="2"
          style={{ transformOrigin: `${center}px ${center}px` }}
        />
        {points.map((p, i) => (
          <motion.circle key={`dot-${i}`} initial={{ r: 0 }} whileInView={{ r: 4 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05 }} cx={p.x} cy={p.y} fill={color} />
        ))}
        {points.map((p, i) => (
          <text key={`label-${i}`} x={p.labelX} y={p.labelY} textAnchor="middle" dominantBaseline="middle" className="text-[11px] font-semibold fill-zinc-600 dark:fill-zinc-400">
            {p.label} ({p.value})
          </text>
        ))}
      </svg>
    </div>
  );
}