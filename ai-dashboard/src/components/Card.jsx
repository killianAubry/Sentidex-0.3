import React from 'react';
import { ChevronDown } from 'lucide-react';

const Card = ({ title, children, extra, className = "", onMoveUp, onMoveDown }) => {
  return (
    <div className={`bg-[#141414] border border-[#262626] rounded-xl overflow-hidden flex flex-col transition-all ${className}`}>
      {/* Header */}
      {(title || extra) && (
        <div className="px-4 py-3 flex items-center justify-between border-b border-[#262626]/50">
          <div className="flex items-center gap-2">
            {onMoveUp && (
              <div className="flex flex-col -space-y-1">
                <button onClick={onMoveUp} className="text-zinc-600 hover:text-white transition-colors rotate-180">
                   <ChevronDown size={12} />
                </button>
                <button onClick={onMoveDown} className="text-zinc-600 hover:text-white transition-colors">
                   <ChevronDown size={12} />
                </button>
              </div>
            )}
            {typeof title === 'string' ? (
              <h3 className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">{title}</h3>
            ) : (
              title
            )}
          </div>
          {extra && (
            <div className="flex items-center gap-2">
              {extra}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
