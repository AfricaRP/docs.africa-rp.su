"use client";

import { motion } from "framer-motion";

export function StatsRadar({ data, color = "#3B82F6" }: { data: Record<string, number>; color?: string }) {
  const keys = Object.keys(data);
  const max = 100;
  const size = 450;
  const center = size / 2;
  const radius = 130;
  const labelRadius = radius + 20;

  const points = keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const val = data[key];
    const r = (val / max) * radius;

    const isTop = Math.sin(angle) < -0.1;
    const isBottom = Math.sin(angle) > 0.1;
    const isLeft = Math.cos(angle) < -0.1;
    const isRight = Math.cos(angle) > 0.1;

    const textAnchor = isRight ? "start" : isLeft ? "end" : "middle";
    const baseline = isBottom ? "hanging" : isTop ? "auto" : "middle";

    return { 
      x: center + r * Math.cos(angle), 
      y: center + r * Math.sin(angle), 
      labelX: center + labelRadius * Math.cos(angle), 
      labelY: center + labelRadius * Math.sin(angle), 
      label: key, 
      value: val,
      textAnchor,
      baseline
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const circles = [0.25, 0.5, 0.75, 1].map((scale) => (
    <circle key={scale} cx={center} cy={center} r={radius * scale} fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" />
  ));

  const axes = points.map((p, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    return (
      <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" />
    );
  });

  return (
    <div className="flex justify-center items-center my-8 p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm w-full overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible max-w-[450px] mx-auto">
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
          <text 
            key={`label-${i}`} 
            x={p.labelX} 
            y={p.labelY} 
            textAnchor={p.textAnchor as "start" | "middle" | "end"} 
            dominantBaseline={p.baseline} 
            className="text-[12px] font-semibold fill-zinc-600 dark:fill-zinc-400"
          >
            {p.label} ({p.value})
          </text>
        ))}
      </svg>
    </div>
  );
}