import React, { useMemo } from 'react';
import Card from './Card';

const MONTHS = ['Sep', 'Dec', 'Nov', 'Oct', 'Aug', 'Jul'];
const TIMEFRAMES = ['1D', '7D', '1M', 'All'];

function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(s) / 0xffffffff;
  };
}

const Heatmap = ({ className }) => {
  const data = useMemo(() => {
    const rng = seedRandom(42);
    return MONTHS.map(() =>
      Array(15).fill(0).map(() => {
        const v = rng();
        if (v > 0.8) return 'high';
        if (v > 0.55) return 'med';
        if (v > 0.35) return 'low';
        return 'none';
      })
    );
  }, []);

  const colorMap = {
    high: 'bg-white',
    med: 'bg-zinc-500/70',
    low: 'bg-zinc-700/50',
    none: 'bg-[#1a1a1a]',
  };

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title="Transactions Heatmap"
      extra={
        <div className="flex bg-[#0e0e0e] rounded-lg overflow-hidden border border-[#1e1e1e]">
          {TIMEFRAMES.map((t) => (
            <button
              key={t}
              className={`px-2.5 py-1 text-[9px] transition-all ${
                t === '1M' ? 'bg-[#242424] text-white font-medium' : 'text-zinc-600 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex-1 flex items-center">
        <div className="w-full flex justify-between gap-1">
          {MONTHS.map((month, mIdx) => (
            <div key={month} className="flex flex-col items-center gap-1 flex-1">
              <div className="grid grid-cols-3 gap-0.5 w-full">
                {data[mIdx].map((level, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-sm transition-colors ${colorMap[level]}`}
                  />
                ))}
              </div>
              <span className="text-[7px] text-zinc-700 uppercase tracking-wide">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Heatmap;
