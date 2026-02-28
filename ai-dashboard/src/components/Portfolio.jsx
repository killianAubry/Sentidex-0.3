import React from 'react';
import Card from './Card';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Share2 } from 'lucide-react';

const Portfolio = () => {
  return (
    <Card
      className="col-span-1"
      title="Portfolio"
      extra={
        <div className="flex items-center gap-2">
           <button className="text-[10px] bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 px-2 py-0.5 rounded flex items-center gap-1">
             Buy SUI
           </button>
           <Share2 size={12} className="text-zinc-500" />
           <MoreHorizontal size={12} className="text-zinc-500" />
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
           <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Today</p>
           <div className="flex items-baseline gap-2">
             <span className="text-lg font-bold">3,585$</span>
           </div>
           <div className="flex items-center gap-1 text-[#22c55e] text-[10px]">
             <ArrowUpRight size={10} />
             <span>25.50%</span>
           </div>
        </div>
        <div>
           <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Month</p>
           <div className="flex items-baseline gap-2">
             <span className="text-lg font-bold">12,005$</span>
           </div>
           <div className="flex items-center gap-1 text-[#ef4444] text-[10px]">
             <ArrowDownRight size={10} />
             <span>5.50%</span>
           </div>
        </div>
        <div>
           <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Year</p>
           <div className="flex items-baseline gap-2">
             <span className="text-lg font-bold">125,000$</span>
           </div>
           <div className="flex items-center gap-1 text-[#22c55e] text-[10px]">
             <ArrowUpRight size={10} />
             <span>25.50%</span>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-1">
           {Array.from({ length: 40 }).map((_, i) => (
             <div
               key={i}
               className={`w-3.5 h-3.5 rounded-sm ${i < 15 ? 'bg-zinc-700' : 'bg-zinc-800 opacity-50'}`}
             />
           ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-500">
           <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>USDT <span className="text-zinc-300">35%</span></div>
           <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>ETH <span className="text-zinc-300">32.5%</span></div>
           <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-white rounded-full"></div>SUI <span className="text-zinc-300">20.5%</span></div>
           <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>UNI <span className="text-zinc-300">10.2%</span></div>
        </div>
      </div>
    </Card>
  );
};

export default Portfolio;
