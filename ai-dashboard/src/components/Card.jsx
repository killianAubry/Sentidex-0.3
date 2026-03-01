import React from 'react';

const Card = ({ title, children, extra, className = "", bodyClassName = "", onMoveUp, onMoveDown }) => {
  return (
    <div className={`bg-[#141414] border border-[#1e1e1e] rounded-xl overflow-hidden flex flex-col transition-all ${className}`}>
      {/* Header */}
      {(title || extra) && (
        <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-[#1e1e1e] flex-shrink-0">
          <div className="flex items-center gap-2">
            {typeof title === 'string' ? (
              <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">{title}</h3>
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
      <div className={`flex-1 p-3.5 overflow-hidden ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
