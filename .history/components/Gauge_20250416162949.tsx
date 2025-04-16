// components/Gauge.tsx

interface GaugeProps {
  trust: number;
}

export default function Gauge({ trust }: GaugeProps) {
  const getColor = (value: number) => {
    if (value < 40) return "bg-red-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="absolute top-10 left-4 w-4 h-48 bg-gray-800 rounded-md overflow-hidden z-20">
      <div
        className={`w-full ${getColor(trust)}`}
        style={{
          height: `${trust}%`,
          marginTop: `${100 - trust}%`,
          transition: "height 0.3s ease",
        }}
      />
    </div>
  );
}
