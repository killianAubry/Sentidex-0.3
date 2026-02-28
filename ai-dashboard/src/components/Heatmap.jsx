import React from 'react';
import Card from './Card';
import { Download, Maximize2 } from 'lucide-react';

const months = ['Sep', 'Dec', 'Nov', 'Oct', 'Aug', 'Jul'];

const Heatmap = () => {
  return (
    <Card
      className="col-span-1"
      title="Transactions Heatmap"
      extra={
        <div className="flex items-center gap-2">
          <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
            {['1D', '7D', '1M', 'All'].map((t) => (
              <button key={t} className={`px-2 py-0.5 text-[10px] ${t === '1M' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {t}
              </button>
            ))}
          </div>
          <Download size={12} className="text-zinc-500" />
          <Maximize2 size={12} className="text-zinc-500" />
        </div>
      }
    >
      <div className="flex gap-4 items-end mt-4 h-[120px]">
        {months.map((month, idx) => (
          <div key={month} className="flex flex-col gap-1 items-center flex-1 h-full">
             <div className="grid grid-cols-2 gap-1 w-full flex-grow content-end">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isActive = Math.random() > 0.6;
                  return (
                    <div
                      key={i}
                      className={`h-2.5 rounded-sm transition-all duration-500 ${isActive ? 'bg-white opacity-90' : 'bg-[#1a1a1a] border border-[#262626] opacity-40'}`}
                    />
                  );
                })}
             </div>
             <span className="text-[10px] text-zinc-500 mt-2">{month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Heatmap;
