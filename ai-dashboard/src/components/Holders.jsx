import React from 'react';
import Card from './Card';

const Holders = ({ className, onMoveUp, onMoveDown }) => {
  return (
    <Card
      className={className}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      title="Holders"
      extra={<span className="text-[8px] text-zinc-500 uppercase tracking-tighter">Time Held / Holdings / Whale</span>}
    >
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-[8px] text-zinc-600 uppercase font-bold">Cruisers</p>
          <p className="text-xl font-bold">20%</p>
        </div>
        <div>
          <p className="text-[8px] text-zinc-600 uppercase font-bold">Holders</p>
          <p className="text-xl font-bold">75%</p>
        </div>
        <div>
          <p className="text-[8px] text-zinc-600 uppercase font-bold">Traders</p>
          <p className="text-xl font-bold">5%</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full h-8 bg-[#1a1a1a] rounded flex overflow-hidden border border-[#262626]/30">
          <div className="h-full bg-zinc-700/50 w-[20%]" />
          <div className="h-full bg-zinc-600/30 w-[60%]" />
          <div className="h-full bg-zinc-500/20 w-[20%]" />
        </div>
        <div className="flex justify-between mt-2 text-[8px] font-bold">
           <span className="text-zinc-500">Whales <span className="text-white">20.47%</span></span>
           <span className="text-zinc-500">Others <span className="text-white">79.53%</span></span>
           <span className="text-zinc-600 hover:text-white cursor-pointer transition-colors">See all</span>
        </div>
      </div>
    </Card>
  );
};

export default Holders;
