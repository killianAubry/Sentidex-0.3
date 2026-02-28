import React from 'react';
import Card from './Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Unlocked', value: 34 },
  { name: 'Locked', value: 66 },
];
const COLORS = ['#ffffff', '#262626'];

const Unlocks = () => {
  return (
    <Card
      className="col-span-1"
      title="Unlocks"
      extra={
        <span className="text-[10px] text-zinc-500">Time Held / Holdings / Whale</span>
      }
    >
      <div className="flex items-center gap-6 mt-4">
        <div className="h-[120px] w-[120px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={55}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-xl font-bold">34%</span>
             <span className="text-[8px] text-zinc-500 uppercase">Unlocked</span>
          </div>
        </div>

        <div className="flex-1 space-y-2 mt-2">
           <div className="flex items-center justify-between text-[10px]">
             <div className="flex items-center gap-1.5 font-medium">
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Total Locked
             </div>
             <span className="text-zinc-500 font-bold">13.85%</span>
           </div>
           <div className="flex items-center justify-between text-[10px]">
             <div className="flex items-center gap-1.5 font-medium">
               <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div> TBD locked
             </div>
             <span className="text-zinc-500 font-bold">52.17%</span>
           </div>
           <div className="flex items-center justify-between text-[10px]">
             <div className="flex items-center gap-1.5 font-medium">
               <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div> Unlocked
             </div>
             <span className="text-zinc-500 font-bold">33.98%</span>
           </div>
           <div className="flex items-center justify-between text-[10px]">
             <div className="flex items-center gap-1.5 font-medium">
               <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></div> Untracked
             </div>
             <span className="text-zinc-500 font-bold">0.00%</span>
           </div>
        </div>
      </div>
    </Card>
  );
};

export default Unlocks;
