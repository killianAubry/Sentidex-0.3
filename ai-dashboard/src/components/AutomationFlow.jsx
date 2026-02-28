import React, { useState } from 'react';
import Card from './Card';
import { Plus, Settings, Zap, Trash2, Clock, X } from 'lucide-react';

const INITIAL_NODES = [
  { id: '1', type: 'trigger', title: 'Price Alert', description: 'USD/EUR drops to 0.9200', meta: 'Runs hourly' },
  { id: '2', type: 'condition', title: 'Wallet Balance Check', description: 'Balance is greater than 1,000 USDT' },
  { id: '3', type: 'action', title: 'Execute Trade', description: 'Buy SUI with 500 USDT' },
  { id: '4', type: 'notification', title: 'Alert Mobile App', description: 'Send push: "Trade executed"' }
];

const Node = ({ node, onDelete }) => {
  const typeStyles = {
    trigger: 'bg-[#3b82f6]/10 text-[#3b82f6]',
    condition: 'bg-[#22c55e]/10 text-[#22c55e] border-l-2 border-l-[#22c55e]',
    action: 'bg-white/10 text-white',
    notification: 'bg-[#ef4444]/10 text-[#ef4444] opacity-80'
  };

  return (
    <div className="flex-shrink-0 relative group">
      <div className={`bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 w-[220px] shadow-lg relative z-10 ${node.type === 'condition' ? 'border-l-2 border-l-[#22c55e]' : ''}`}>
         <div className="flex items-center justify-between mb-3">
            <div className={`${typeStyles[node.type] || 'bg-zinc-800 text-zinc-400'} px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider`}>
              {node.type}
            </div>
            <div className="flex gap-2 text-zinc-600">
              <Settings size={10} className="hover:text-white cursor-pointer" />
              <Trash2 size={10} className="hover:text-red-500 cursor-pointer" onClick={() => onDelete(node.id)} />
            </div>
         </div>
         <p className="text-xs font-bold mb-1">{node.title}</p>
         <p className="text-[10px] text-zinc-500">{node.description}</p>
         {node.meta && (
           <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-400">
              <Clock size={10} />
              <span>{node.meta}</span>
           </div>
         )}
      </div>
      {/* Connector line to next node (simplified logic: just a line to the right) */}
      <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-[#262626] group-last:hidden"></div>
    </div>
  );
};

const AutomationFlow = () => {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const deleteNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const addNode = (type) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const titles = {
      trigger: 'New Trigger',
      condition: 'New Condition',
      action: 'New Action',
      notification: 'New Notification'
    };
    const descriptions = {
      trigger: 'When price hits target...',
      condition: 'If balance is enough...',
      action: 'Execute market buy...',
      notification: 'Notify via Telegram...'
    };

    setNodes([...nodes, {
      id: newId,
      type,
      title: titles[type],
      description: descriptions[type]
    }]);
    setShowAddMenu(false);
  };

  return (
    <Card
      className="col-span-3 mt-4"
      title={
        <div className="flex items-center gap-2">
           <Zap size={14} className="text-[#22c55e]" />
           <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Automations Flow</span>
        </div>
      }
      extra={
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="flex items-center gap-1 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 px-3 py-1 rounded text-[10px] hover:bg-[#22c55e]/20 transition-all"
        >
          <Plus size={12} />
          Create New Automation
        </button>
      }
    >
      <div className="min-h-[250px] relative flex items-center justify-start overflow-x-auto py-8 px-4 gap-8 scrollbar-hide">

        {nodes.map((node) => (
          <Node key={node.id} node={node} onDelete={deleteNode} />
        ))}

        {/* Add Node Placeholder */}
        <div className="flex-shrink-0 relative">
           <button
             onClick={() => setShowAddMenu(!showAddMenu)}
             className="w-12 h-12 rounded-full border border-dashed border-[#262626] flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-400 transition-all group"
           >
             <Plus size={20} className="group-hover:scale-110 transition-transform" />
           </button>

           {showAddMenu && (
             <div className="absolute top-full mt-2 left-0 bg-[#141414] border border-[#262626] rounded-lg p-2 z-50 shadow-2xl w-40">
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Add Node</span>
                  <X size={10} className="text-zinc-500 cursor-pointer" onClick={() => setShowAddMenu(false)} />
                </div>
                <div className="flex flex-col gap-1">
                  {['trigger', 'condition', 'action', 'notification'].map(type => (
                    <button
                      key={type}
                      onClick={() => addNode(type)}
                      className="text-left px-2 py-1.5 rounded hover:bg-[#262626] text-[10px] capitalize text-zinc-300 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
             </div>
           )}
        </div>
      </div>
    </Card>
  );
};

export default AutomationFlow;
