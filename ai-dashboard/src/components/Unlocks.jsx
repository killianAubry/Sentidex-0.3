import React from 'react';
import Card from './Card';

const UNLOCK_ITEMS = [
  { label: 'Total Locked', value: '13.85%', color: 'bg-white', ring: 'border-white' },
  { label: 'TBD locked', value: '52.17%', color: 'bg-zinc-500', ring: 'border-zinc-500' },
  { label: 'Unlocked', value: '33.98%', color: 'bg-zinc-700', ring: 'border-zinc-700' },
  { label: 'Untracked', value: '0.00%', color: 'bg-zinc-800', ring: 'border-zinc-800' },
];

const UnlockCircle = () => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const unlocked = 0.34;
  const locked = 1 - unlocked;

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        {/* Background track */}
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#1e1e1e" strokeWidth="7" />
        {/* Locked (white) */}
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeDasharray={`${locked * circumference} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        {/* Unlocked (dark) */}
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="7"
          strokeDasharray={`${unlocked * circumference} ${circumference}`}
          strokeDashoffset={`-${locked * circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold leading-none">34%</span>
        <span className="text-[7px] text-zinc-600 uppercase tracking-widest mt-0.5">Unlocked</span>
      </div>
    </div>
  );
};

const Unlocks = ({ className }) => {
  return (
    <Card
      className={className}
      bodyClassName="flex flex-col justify-center"
      title="Unlocks"
      extra={<span className="text-[8px] text-zinc-600 uppercase tracking-tight">Time Held / Holdings / Whale</span>}
    >
      <div className="flex items-center justify-between gap-3">
        <UnlockCircle />

        <div className="flex flex-col gap-2 flex-1">
          {UNLOCK_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color}`} />
                <span className="text-[9px] text-zinc-600 whitespace-nowrap">{item.label}</span>
              </div>
              <span className="text-[9px] text-zinc-300 font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Unlocks;
