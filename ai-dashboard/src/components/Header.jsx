import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'AI Signals', to: '#' },
  { label: 'Stake', to: '#' },
  { label: 'Portfolio', to: '#' },
  { label: 'Automations', to: '/automations' },
  { label: 'Smart Alerts', to: '#' },
];

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-base font-bold tracking-tight hover:opacity-80 transition-opacity flex-shrink-0">
          <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white fill-white" />
          </div>
          Numora
        </Link>

        {/* Search */}
        <div className="relative group">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
          <input
            type="text"
            placeholder="Search any token"
            className="bg-[#0e0e0e] border border-[#1e1e1e] rounded-lg py-1.5 pl-8 pr-8 text-xs w-[220px] focus:outline-none focus:border-[#333] transition-all placeholder:text-zinc-700 text-zinc-300"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-zinc-700 bg-[#1a1a1a] border border-[#262626] rounded px-1">/</kbd>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = to !== '#' && location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                  isActive
                    ? 'text-white bg-white/5 font-medium'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/3'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="p-1.5 text-zinc-600 hover:text-white transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border border-[#0a0a0a]" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 bg-[#0e0e0e] border border-[#1e1e1e] rounded-lg px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
            <img src="https://i.pravatar.cc/24?u=nollan" alt="Nollan" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold leading-tight text-white">Nollan</span>
            <span className="text-[9px] text-zinc-600 font-mono leading-tight">0x6a78...Cef1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
