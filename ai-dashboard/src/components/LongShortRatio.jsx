import React, { useState } from 'react';
import Card from './Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const ratioData = [
  { time: '5 Jul', long: 48, short: 52 },
  { time: '6 Jul', long: 45, short: 55 },
  { time: '7 Jul', long: 42, short: 58 },
  { time: '8 Jul', long: 50, short: 50 },
  { time: '9 Jul', long: 47, short: 53 },
  { time: '10 Jul', long: 43.42, short: 56.58 },
  { time: '11 Jul', long: 52, short: 48 },
];

const TIMEFRAMES = ['24H', '1D', '7D', 'All'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161616] border border-[#262626] rounded-lg p-2 shadow-xl">
      <p className="text-[9px] text-zinc-500 mb-1.5">{label}</p>
      <div className="flex items-center gap-1.5 mb-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="text-[10px] text-zinc-300">Long: {payload[0]?.value?.toFixed(2)}%</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <span className="text-[10px] text-zinc-400">L/S: {(payload[0]?.value / payload[1]?.value).toFixed(4)}</span>
      </div>
    </div>
  );
};

const LongShortRatio = ({ className }) => {
  const [activeTimeframe, setActiveTimeframe] = useState('7D');

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title="Long/Short Ratio"
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
      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ratioData} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="gradLong" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradShort" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52525b" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3f3f46', fontSize: 8 }}
              interval="preserveStartEnd"
            />
            <YAxis axisLine={false} tickLine={false} tick={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="long"
              stroke="#ffffff"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#gradLong)"
            />
            <Area
              type="monotone"
              dataKey="short"
              stroke="#3f3f46"
              strokeWidth={1}
              fillOpacity={1}
              fill="url(#gradShort)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LongShortRatio;
