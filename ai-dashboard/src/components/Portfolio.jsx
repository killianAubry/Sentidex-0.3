import React from 'react';
import Card from './Card';
import { Share2, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

const STATS = [
  { label: 'Today', value: '3,585$', change: '+25.50%', up: true },
  { label: 'Month', value: '12,005$', change: '-5.50%', up: false },
  { label: 'Year', value: '125,000$', change: '+25.50%', up: true },
];

const ALLOCATIONS = [
  { label: 'USDT', pct: '35%', color: 'bg-white', width: 'w-[35%]' },
  { label: 'ETH', pct: '32.5%', color: 'bg-zinc-500', width: 'w-[32.5%]' },
  { label: 'SUI', pct: '20.5%', color: 'bg-zinc-700', width: 'w-[20.5%]' },
  { label: 'UNI', pct: '12%', color: 'bg-zinc-800', width: 'w-[12%]' },
];

const Portfolio = ({ className }) => {
  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title="Portfolio"
      extra={
        <div className="flex items-center gap-2">
          <button className="bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 px-2.5 py-1 rounded-lg text-[9px] hover:bg-[#22c55e]/20 transition-all font-bold">
            Buy SUI
          </button>
          <Share2 size={11} className="text-zinc-600 hover:text-white cursor-pointer transition-colors" />
          <MoreHorizontal size={11} className="text-zinc-600 hover:text-white cursor-pointer transition-colors" />
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        {STATS.map(({ label, value, change, up }) => (
          <div key={label}>
            <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">{label}</p>
            <p className="text-lg font-bold leading-tight">{value}</p>
            <div className={`flex items-center gap-0.5 mt-0.5 ${up ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              <span className="text-[9px] font-bold">{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pixel allocation map */}
      <div className="flex-1 flex flex-col justify-end gap-2 mt-3">
        <div className="flex gap-0.5 flex-wrap">
          {Array(60).fill(null).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-sm ${
                i < 21 ? 'bg-white/80' :
                i < 40 ? 'bg-zinc-600/70' :
                i < 52 ? 'bg-zinc-700/60' :
                'bg-zinc-800/50'
              }`}
            />
          ))}
        </div>

        {/* Allocation bar */}
        <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full flex overflow-hidden">
          {ALLOCATIONS.map((a) => (
            <div key={a.label} className={`h-full ${a.color} ${a.width}`} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {ALLOCATIONS.map((a) => (
            <div key={a.label} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.color}`} />
              <span className="text-[8px] text-zinc-600">{a.label} <span className="text-zinc-400">{a.pct}</span></span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Portfolio;
