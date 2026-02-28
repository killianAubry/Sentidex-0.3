import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const Card = ({ children, className, title, extra }) => {
  return (
    <div className={twMerge(
      "bg-[#141414] border border-[#262626] rounded-xl overflow-hidden flex flex-col h-full",
      className
    )}>
      {(title || extra) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
          {title && <h3 className="text-sm font-semibold text-zinc-400">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
