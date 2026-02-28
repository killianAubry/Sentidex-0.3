import React from 'react';
import Card from './Card';

const Heatmap = ({ className, onMoveUp, onMoveDown }) => {
  const months = ['Sep', 'Dec', 'Nov', 'Oct', 'Aug', 'Jul'];
  const data = Array(6).fill(null).map(() => Array(12).fill(0).map(() => Math.random() > 0.7));

  return (
    <Card
      className={className}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      title="Transactions Heatmap"
      extra={
        <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
          {['1D', '7D', '1M', 'All'].map((t) => (
            <button key={t} className={`px-2 py-0.5 text-[10px] ${t === '1M' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {t}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-wrap gap-4 mt-2 justify-between">
        {months.map((month, mIdx) => (
          <div key={month} className="flex flex-col gap-1 items-center">
             <div className="grid grid-cols-3 gap-1">
                {data[mIdx].map((active, i) => (
                  <div
                    key={i}
                    className={`w-3 h-1.5 rounded-sm ${active ? 'bg-white' : 'bg-zinc-800/50'}`}
                  />
                ))}
             </div>
             <span className="text-[8px] text-zinc-600 mt-1 uppercase">{month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Heatmap;
