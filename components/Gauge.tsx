// components/Gauge.tsx
"use client";
import React from "react";

type GaugeProps = {
  trust: number;
};

const Gauge: React.FC<GaugeProps> = ({ trust }) => {
  const getColor = () => {
    if (trust < 40) return "bg-red-500";
    if (trust < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
      <div className="w-4 h-40 bg-gray-800 rounded-full overflow-hidden flex flex-col justify-end">
        <div
          className={`w-full ${getColor()} transition-all duration-300`}
          style={{ height: `${trust}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Gauge;
