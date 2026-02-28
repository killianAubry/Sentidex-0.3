import React from 'react';
import Card from './Card';

const HOLDER_TYPES = [
  { label: 'Cruisers', value: '20%', num: 20, color: 'bg-zinc-500' },
  { label: 'Holders', value: '75%', num: 75, color: 'bg-white' },
  { label: 'Traders', value: '5%', num: 5, color: 'bg-zinc-700' },
];

const Holders = ({ className }) => {
  return (
    <Card
      className={className}
      bodyClassName="flex flex-col justify-between"
      title="Holders"
      extra={<span className="text-[8px] text-zinc-600 uppercase tracking-tight">Time Held / Holdings / Whale</span>}
    >
      {/* Main stats */}
      <div className="flex justify-between items-end">
        {HOLDER_TYPES.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">{label}</p>
            <p className="text-xl font-bold leading-none">{value}</p>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-6 bg-[#111] rounded-lg flex overflow-hidden border border-[#1e1e1e]">
          {HOLDER_TYPES.map(({ label, num, color }) => (
            <div
              key={label}
              className={`h-full ${color} opacity-60`}
              style={{ width: `${num}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[8px] text-zinc-600">Whales <span className="text-zinc-300 font-bold">20.47%</span></span>
          <span className="text-[8px] text-zinc-600">Others <span className="text-zinc-300 font-bold">79.53%</span></span>
          <button className="text-[8px] text-zinc-600 hover:text-white transition-colors">See all →</button>
        </div>
      </div>
    </Card>
  );
};

export default Holders;
