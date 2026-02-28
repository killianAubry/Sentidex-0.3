import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from './Card';
import { Maximize2 } from 'lucide-react';

const data = [
  { time: '10am', price: 7.2000, volume: 100 },
  { time: '12pm', price: 7.4000, volume: 120 },
  { time: '2pm', price: 7.3000, volume: 90 },
  { time: '4pm', price: 7.5000, volume: 150 },
  { time: '6pm', price: 8.1000, volume: 200 },
  { time: '8pm', price: 7.8000, volume: 130 },
  { time: '10pm', price: 8.4000, volume: 250 },
  { time: '12am', price: 7.9000, volume: 110 },
  { time: '2am', price: 7.6000, volume: 80 },
  { time: '4am', price: 7.5520, volume: 100 },
  { time: '6am', price: 7.6000, volume: 140 },
  { time: '8am', price: 7.5520, volume: 120 },
];

const PriceChart = ({ className, onMoveUp, onMoveDown }) => {
  return (
    <Card
      className={className}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      title={
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[8px] border border-zinc-700">S</div>
            <span className="text-white font-bold text-xs">SUI</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded px-2 py-0.5 border border-[#262626] text-[10px] text-zinc-400">
             <span>Indicators</span>
          </div>
          <span className="text-[10px] text-zinc-500">Price / Market cap</span>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
          <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
            {['1D', '7D', '1M', '1Y', 'All'].map((t) => (
              <button key={t} className={`px-2 py-0.5 text-[10px] ${t === '1M' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {t}
              </button>
            ))}
          </div>
          <Maximize2 size={12} className="text-zinc-500" />
        </div>
      }
    >
      <div className="h-[350px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#1f1f1f" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{fill: '#52525b', fontSize: 10}}
              interval="preserveStartEnd"
            />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{fill: '#52525b', fontSize: 10}}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#141414', borderColor: '#262626', color: '#fff', fontSize: '10px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar
              dataKey="volume"
              fill="#262626"
              opacity={0.5}
              yAxisId={0}
              barSize={30}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ffffff"
              strokeWidth={1.5}
              dot={false}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PriceChart;
