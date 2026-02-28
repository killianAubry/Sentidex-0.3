import React from 'react';
import Card from './Card';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const ratioData = [
  { time: '1', long: 40, short: 60 },
  { time: '2', long: 45, short: 55 },
  { time: '3', long: 42, short: 58 },
  { time: '4', long: 48, short: 52 },
  { time: '5', long: 50, short: 50 },
  { time: '6', long: 47, short: 53 },
  { time: '7', long: 52, short: 48 },
];

const VolumeRatio = ({ className, onMoveUp, onMoveDown }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {/* Buys/Sells Volume */}
      <Card
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        title="Buys/Sells Volume"
        extra={
          <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
            {['1D', '7D', '1M', '1Y', 'All'].map((t) => (
              <button key={t} className={`px-2 py-0.5 text-[10px] ${t === '1M' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {t}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-4 gap-2 mt-2">
           <div>
              <p className="text-[6px] text-zinc-600 uppercase font-bold mb-1">Tans</p>
              <p className="text-sm font-bold">45,447</p>
           </div>
           <div>
              <p className="text-[6px] text-zinc-600 uppercase font-bold mb-1">Vol</p>
              <p className="text-sm font-bold">150M$</p>
           </div>
           <div>
              <p className="text-[6px] text-zinc-600 uppercase font-bold mb-1">Chain Fees</p>
              <p className="text-sm font-bold">2.1M$</p>
           </div>
           <div>
              <p className="text-[6px] text-zinc-600 uppercase font-bold mb-1">Net Buy</p>
              <p className="text-sm font-bold text-[#22c55e]">+15,256$</p>
           </div>
        </div>

        <div className="mt-6 flex justify-between items-end h-16 px-4">
           {[30, 70, 40, 60, 50, 80, 45, 75, 55, 90].map((h, i) => (
             <div key={i} className="flex gap-1">
                <div className={`w-2 rounded-t-sm ${i % 2 === 0 ? 'bg-zinc-800/50 h-8' : 'bg-white h-12'}`} />
             </div>
           ))}
        </div>
      </Card>

      {/* Long/Short Ratio */}
      <Card
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        title="Long/Short Ratio"
        extra={
          <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
            {['24H', '1D', '7D', 'All'].map((t) => (
              <button key={t} className={`px-2 py-0.5 text-[10px] ${t === '7D' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {t}
              </button>
            ))}
          </div>
        }
      >
        <div className="h-24 w-full mt-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ratioData}>
              <defs>
                <linearGradient id="colorLong" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', fontSize: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="long"
                stroke="#ffffff"
                fillOpacity={1}
                fill="url(#colorLong)"
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="absolute top-0 right-0 bg-[#141414] border border-[#262626] rounded-sm p-1.5 shadow-xl">
             <p className="text-[6px] text-zinc-500 mb-1">10 JUL 2025, 8:00</p>
             <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-[7px] text-zinc-400">Long: 43.42%</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[7px] text-zinc-400">Long/Short: 1.1052</span>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VolumeRatio;
