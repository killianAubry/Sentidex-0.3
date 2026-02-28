import React from 'react';
import Card from './Card';
import { Send, Sparkles, Download, MoreHorizontal } from 'lucide-react';

const AIAssistant = () => {
  return (
    <Card
      className="col-span-1"
      title={
        <div className="flex items-center gap-2">
           <Sparkles size={14} className="text-zinc-400" />
           <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">AI Assistant</span>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
           <Download size={12} className="text-zinc-500" />
           <MoreHorizontal size={12} className="text-zinc-500" />
        </div>
      }
    >
      <div className="flex flex-col h-[400px]">
        <div className="flex-grow space-y-4 overflow-y-auto pr-1">
           <div className="flex flex-col items-end gap-1">
             <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl rounded-tr-none px-4 py-2 text-xs max-w-[85%] text-zinc-300">
               Give me a forecast for the SUI coin
             </div>
             <span className="text-[10px] text-zinc-600 px-1">15:01</span>
           </div>

           <div className="flex flex-col items-start gap-1">
             <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl rounded-tl-none px-4 py-2 text-xs max-w-[85%] text-white">
               Sure! SUI is currently trading at $7.55, with a 24h change of +2.8%. Based on recent trends and volume inflows, short-term momentum appears bullish
             </div>
             <span className="text-[10px] text-zinc-600 px-1">15:01</span>
           </div>
        </div>

        <div className="mt-4">
           <div className="relative">
              <input
                type="text"
                placeholder="Enter a message..."
                className="w-full bg-[#141414] border border-[#262626] rounded-lg py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                <Send size={14} />
              </button>
           </div>
        </div>
      </div>
    </Card>
  );
};

export default AIAssistant;
