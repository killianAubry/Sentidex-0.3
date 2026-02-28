import React from 'react';
import Card from './Card';

const Unlocks = ({ className, onMoveUp, onMoveDown }) => {
  return (
    <Card
      className={className}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      title="Unlocks"
      extra={<span className="text-[8px] text-zinc-500 uppercase tracking-tighter">Time Held / Holdings / Whale</span>}
    >
      <div className="flex justify-center items-center h-full min-h-[150px] relative">
         <div className="text-center">
            <p className="text-2xl font-bold">34%</p>
            <p className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1">Unlocked</p>
         </div>

         <div className="absolute top-0 right-0 h-full flex flex-col justify-center gap-2">
            {[
              { label: 'Total Locked', value: '13.85%', color: 'bg-white' },
              { label: 'TBD locked', value: '52.17%', color: 'bg-zinc-600' },
              { label: 'Unlocked', value: '33.98%', color: 'bg-zinc-700' },
              { label: 'Untracked', value: '0.00%', color: 'bg-zinc-800' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between gap-8 text-[8px] font-bold">
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-zinc-500 whitespace-nowrap">{item.label}</span>
                 </div>
                 <span className="text-white">{item.value}</span>
              </div>
            ))}
         </div>
      </div>
    </Card>
  );
};

export default Unlocks;
