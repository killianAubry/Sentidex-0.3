import React from 'react';
import Card from './Card';
import { Share2, MoreHorizontal } from 'lucide-react';

const Portfolio = ({ className, onMoveUp, onMoveDown }) => {
  return (
    <Card
      className={className}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      title="Portfolio"
      extra={
        <div className="flex items-center gap-2">
          <button className="bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 px-3 py-1 rounded text-[10px] hover:bg-[#22c55e]/20 transition-all font-bold">
            Buy SUI
          </button>
          <Share2 size={12} className="text-zinc-500 hover:text-white cursor-pointer" />
          <MoreHorizontal size={12} className="text-zinc-500 hover:text-white cursor-pointer" />
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div>
           <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Today</p>
           <p className="text-xl font-bold">3,585$</p>
           <p className="text-[8px] text-[#22c55e] mt-1 font-bold">↗ 25.50%</p>
        </div>
        <div>
           <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Month</p>
           <p className="text-xl font-bold">12,005$</p>
           <p className="text-[8px] text-[#ef4444] mt-1 font-bold">↘ 5.50%</p>
        </div>
        <div>
           <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Year</p>
           <p className="text-xl font-bold">125,000$</p>
           <p className="text-[8px] text-[#22c55e] mt-1 font-bold">↗ 25.50%</p>
        </div>
      </div>

      <div className="mt-6 flex gap-1">
        {Array(20).fill(null).map((_, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${i < 12 ? 'bg-zinc-700/50' : 'bg-zinc-800/30'}`} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[8px] font-bold text-zinc-500">
         <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>USDT <span className="text-white">35%</span></span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <span>ETH <span className="text-white">32.5%</span></span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>SUI <span className="text-white">20.5%</span></span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span>UNI <span className="text-white">10.2%</span></span>
         </div>
      </div>
    </Card>
  );
};

export default Portfolio;
