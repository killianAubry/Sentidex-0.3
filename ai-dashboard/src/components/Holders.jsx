import React from 'react';
import Card from './Card';

const Holders = () => {
  return (
    <Card
      className="col-span-1"
      title="Holders"
      extra={
        <span className="text-[10px] text-zinc-500">Time Held / Holdings / Whale</span>
      }
    >
      <div className="flex items-center gap-4 mb-4 mt-2">
        <div className="flex-1">
           <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Cruisers</p>
           <div className="flex items-baseline gap-1">
             <span className="text-xl font-bold">20%</span>
           </div>
        </div>
        <div className="flex-1 border-l border-[#262626] pl-4">
           <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Holders</p>
           <div className="flex items-baseline gap-1">
             <span className="text-xl font-bold">75%</span>
           </div>
        </div>
        <div className="flex-1 border-l border-[#262626] pl-4 opacity-50">
           <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Traders</p>
           <div className="flex items-baseline gap-1">
             <span className="text-xl font-bold">5%</span>
           </div>
        </div>
      </div>

      <div className="relative h-12 w-full mt-6 bg-[#1a1a1a] rounded overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-[20%] bg-zinc-700"></div>
        <div className="absolute left-[20%] top-0 h-full w-[75%] bg-zinc-500"></div>
        <div className="absolute left-[95%] top-0 h-full w-[5%] bg-zinc-800"></div>
        <div className="absolute inset-0 flex items-center justify-between px-2">
           <div className="flex flex-wrap gap-0.5">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="w-[1px] h-6 bg-zinc-400 opacity-20" />
              ))}
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-4">
         <div className="flex gap-4">
           <span>Whales <span className="text-zinc-300">20.47%</span></span>
           <span>Others <span className="text-zinc-300">79.53%</span></span>
         </div>
         <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">See all</span>
      </div>
    </Card>
  );
};

export default Holders;
