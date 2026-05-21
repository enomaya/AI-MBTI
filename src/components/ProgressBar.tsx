interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="w-full h-px bg-[#DDD9CE]">
        <div
          className="h-full bg-[#1A1916] transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-xs font-bold tracking-[0.12em] text-[#9A9790]">
          {value} / {max}
        </span>
      </div>
    </div>
  );
}
