// components/Gauge.tsx
"use client";

interface GaugeProps {
  trust: number;
}

export default function Gauge({ trust }: GaugeProps) {
  const percent = Math.min(100, Math.max(0, trust));
  const height = `${percent}%`;
  let color = "bg-yellow-400";
  if (trust <= 30) color = "bg-red-500";
  else if (trust >= 70) color = "bg-green-500";

  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-64 bg-gray-800 rounded-md overflow-hidden">
      <div className={`w-full ${color}`} style={{ height }}></div>
    </div>
  );
}
