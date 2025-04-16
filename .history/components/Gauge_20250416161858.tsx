// components/Gauge.tsx
import React from "react";

const getColorByTrust = (trust: number) => {
  if (trust < 40) return "bg-red-500";
  if (trust < 70) return "bg-yellow-400";
  return "bg-green-500";
};

export default function Gauge({ trust }: { trust: number }) {
  return (
    <div className="absolute top-4 left-4 h-48 w-3 bg-gray-800 rounded z-20 overflow-hidden">
      <div
        className={`w-full ${getColorByTrust(trust)}`}
        style={{
          height: `${trust}%`,
          marginTop: `${100 - trust}%`,
          transition: "height 0.3s ease, margin-top 0.3s ease",
        }}
      />
    </div>
  );
}