import React, { useState } from 'react';
import Card from './Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

const volumeData = [
  { month: 'Sep', buys: 18000, sells: 12000 },
  { month: 'Oct', buys: 32000, sells: 21000 },
  { month: 'Nov', buys: 15000, sells: 24000 },
  { month: 'Dec', buys: 41000, sells: 29000 },
  { month: 'Jan', buys: 27000, sells: 31000 },
  { month: 'Feb', buys: 38000, sells: 19000 },
  { month: 'Mar', buys: 22000, sells: 17000 },
  { month: 'Aug', buys: 45000, sells: 30000 },
];

const TIMEFRAMES = ['1D', '7D', '1M', '1Y', 'All'];

const STATS = [
  { label: 'Txns', value: '45,447' },
  { label: 'Vol', value: '150M$' },
  { label: 'Chain Fees', value: '2.1M$' },
  { label: 'Net Buy', value: '+15,256$', green: true },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161616] border border-[#262626] rounded-lg p-2 shadow-xl">
      <p className="text-[9px] text-zinc-500 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.fill }} />
          <span className="text-[10px] text-zinc-300 capitalize">{p.dataKey}: {(p.value / 1000).toFixed(0)}K</span>
        </div>
      ))}
    </div>
  );
};

const BuysSellsVolume = ({ className }) => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title="Buys/Sells Volume"
      extra={
        <div className="flex bg-[#0e0e0e] rounded-lg overflow-hidden border border-[#1e1e1e]">
          {TIMEFRAMES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTimeframe(t)}
              className={`px-2.5 py-1 text-[9px] transition-all ${
                t === activeTimeframe
                  ? 'bg-[#242424] text-white font-medium'
                  : 'text-zinc-600 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      }
    >
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-2 flex-shrink-0">
        {STATS.map(({ label, value, green }) => (
          <div key={label}>
            <p className="text-[8px] text-zinc-600 uppercase font-bold mb-0.5">{label}</p>
            <p className={`text-xs font-bold leading-tight ${green ? 'text-[#22c55e]' : 'text-white'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volumeData} margin={{ top: 2, right: 0, left: -8, bottom: 0 }} barGap={1}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3f3f46', fontSize: 8 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="buys" fill="#22c55e" opacity={0.7} barSize={5} radius={[2, 2, 0, 0]} />
            <Bar dataKey="sells" fill="#ef4444" opacity={0.6} barSize={5} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BuysSellsVolume;
