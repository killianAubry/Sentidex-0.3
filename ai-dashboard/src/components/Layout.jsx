import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans selection:bg-zinc-700">
      <div className="max-w-[1440px] mx-auto space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
