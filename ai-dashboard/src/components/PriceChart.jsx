import React, { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from './Card';
import { Maximize2, ChevronDown } from 'lucide-react';

const data = [
  { time: '10am', price: 7.2000, volume: 80 },
  { time: '11am', price: 7.35, volume: 60 },
  { time: '12pm', price: 7.4000, volume: 120 },
  { time: '1pm', price: 7.28, volume: 70 },
  { time: '2pm', price: 7.3500, volume: 90 },
  { time: '3pm', price: 7.48, volume: 110 },
  { time: '4pm', price: 7.5000, volume: 150 },
  { time: '5pm', price: 7.72, volume: 140 },
  { time: '6pm', price: 8.1000, volume: 200 },
  { time: '7pm', price: 7.92, volume: 160 },
  { time: '8pm', price: 7.8000, volume: 130 },
  { time: '9pm', price: 8.22, volume: 180 },
  { time: '10pm', price: 8.4200, volume: 250 },
  { time: '11pm', price: 8.18, volume: 140 },
  { time: '12am', price: 7.9000, volume: 110 },
  { time: '1am', price: 7.74, volume: 85 },
  { time: '2am', price: 7.6000, volume: 80 },
  { time: '3am', price: 7.55, volume: 65 },
  { time: '4am', price: 7.5520, volume: 100 },
  { time: '5am', price: 7.58, volume: 90 },
  { time: '6am', price: 7.6000, volume: 140 },
  { time: '7am', price: 7.57, volume: 105 },
  { time: '8am', price: 7.5520, volume: 120 },
];

const TIMEFRAMES = ['1D', '7D', '1M', '1Y', 'All'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161616] border border-[#262626] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[9px] text-zinc-500 mb-1">{label}</p>
      <p className="text-[11px] text-white font-bold">${payload[0]?.value?.toFixed(4)}</p>
    </div>
  );
};

const PriceChart = ({ className }) => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[9px] font-bold text-zinc-300">S</div>
            <span className="text-white font-semibold text-[11px]">SUI</span>
            <span className="text-[9px] text-zinc-600">·</span>
            <span className="text-[9px] text-zinc-500">$7.5520</span>
            <span className="text-[9px] text-[#22c55e] font-medium">+2.8%</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 bg-[#0e0e0e] border border-[#1e1e1e] rounded-md px-2 py-0.5 text-[9px] text-zinc-500 cursor-pointer hover:border-[#333] transition-colors">
            Indicators
            <ChevronDown size={9} />
          </div>
          <span className="hidden lg:block text-[9px] text-zinc-600">Price / Market cap</span>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
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
          <Maximize2 size={11} className="text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors" />
        </div>
      }
    >
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#161616" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3f3f46', fontSize: 9 }}
              interval={3}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3f3f46', fontSize: 9 }}
              domain={['auto', 'auto']}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <YAxis
              yAxisId="volume"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={false}
              domain={[0, 'dataMax']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#1e1e1e"
              barSize={6}
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#ffffff"
              strokeWidth={1.5}
              dot={false}
              animationDuration={800}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PriceChart;
