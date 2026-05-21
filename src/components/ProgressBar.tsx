interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = (value / max) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 font-medium">진행률</span>
        <span className="text-sm font-bold text-indigo-500">
          {value} / {max}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
