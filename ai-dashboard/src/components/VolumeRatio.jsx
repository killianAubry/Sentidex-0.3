import React from 'react';
import Card from './Card';
import { BarChart, Bar, ResponsiveContainer, XAxis, AreaChart, Area, Tooltip, YAxis } from 'recharts';

const volumeData = [
  { month: 'Sep', vol: 200, net: 150 },
  { month: 'Dec', vol: 150, net: 120 },
  { month: 'Nov', vol: 180, net: 160 },
  { month: 'Oct', vol: 120, net: 100 },
  { month: 'Aug', vol: 220, net: 190 },
];

const ratioData = [
  { day: '5 Jul', long: 60, short: 40 },
  { day: '6 Jul', long: 55, short: 45 },
  { day: '7 Jul', long: 65, short: 35 },
  { day: '8 Jul', long: 45, short: 55 },
  { day: '9 Jul', long: 50, short: 50 },
  { day: '10 Jul', long: 75, short: 25 },
  { day: '11 Jul', long: 70, short: 30 },
];

const VolumeRatio = () => {
  return (
    <div className="grid grid-cols-2 gap-4 col-span-2">
      <Card
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
        <div className="grid grid-cols-4 gap-4 mb-4">
           <div>
             <span className="text-[8px] text-zinc-500 uppercase font-bold">Tans</span>
             <p className="text-xs font-bold">45,447</p>
           </div>
           <div>
             <span className="text-[8px] text-zinc-500 uppercase font-bold">Vol</span>
             <p className="text-xs font-bold">150M$</p>
           </div>
           <div>
             <span className="text-[8px] text-zinc-500 uppercase font-bold">Chain Fees</span>
             <p className="text-xs font-bold">2.1M$</p>
           </div>
           <div>
             <span className="text-[8px] text-zinc-500 uppercase font-bold">Net Buy</span>
             <p className="text-xs font-bold text-[#22c55e]">+15,256$</p>
           </div>
        </div>
        <div className="h-24 mt-4">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={volumeData}>
               <XAxis dataKey="month" hide />
               <Bar dataKey="vol" fill="#3f3f46" radius={[2, 2, 0, 0]} barSize={12} />
               <Bar dataKey="net" fill="#ffffff" radius={[2, 2, 0, 0]} barSize={12} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </Card>

      <Card
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
        <div className="h-40 mt-4 relative">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={ratioData}>
                <defs>
                   <linearGradient id="colorLong" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <Area type="monotone" dataKey="long" stroke="#ffffff" fillOpacity={1} fill="url(#colorLong)" strokeWidth={1} />
                <Area type="monotone" dataKey="short" stroke="#262626" fillOpacity={0.1} fill="#141414" strokeWidth={1} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '4px', fontSize: '10px' }}
                />
             </AreaChart>
          </ResponsiveContainer>
          <div className="absolute top-0 right-0 p-2 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-md border border-[#262626] text-[8px] pointer-events-none">
             <div className="flex flex-col gap-1">
                <span className="text-zinc-500 uppercase mb-1">10 Jul 2025, 8:00</span>
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 bg-white rounded-full"></div>
                   <span>Long: 43.42%</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 bg-zinc-500 rounded-full"></div>
                   <span>Long/Short: 1.1052</span>
                </div>
             </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 px-1">
           {['5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul'].map((d) => (
             <span key={d} className="text-[8px] text-zinc-600">{d}</span>
           ))}
        </div>
      </Card>
    </div>
  );
};

export default VolumeRatio;
