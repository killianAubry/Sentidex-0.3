import React from 'react';
import { Search, Bell, Zap } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
            <Zap size={18} className="text-white fill-white" />
          </div>
          Numora
        </div>

        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input
            type="text"
            placeholder="Search any token"
            className="bg-[#141414] border border-[#262626] rounded-md py-1.5 pl-10 pr-4 text-sm w-[280px] focus:outline-none focus:border-zinc-700 transition-all placeholder:text-zinc-600"
          />
        </div>

        <nav className="flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-white transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Automations</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#0a0a0a]"></span>
        </button>
        <div className="flex items-center gap-3 bg-[#141414] border border-[#262626] rounded-md px-3 py-1.5">
          <div className="w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nollan" alt="avatar" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-tight">Nollan</span>
            <span className="text-[10px] text-zinc-500 font-mono leading-tight">0x6a78...Cef1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
