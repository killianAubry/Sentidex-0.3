import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, Zap, Plus, Settings, Trash2, Clock, X,
  Play, Save, Activity, GitBranch, AlertCircle, Bell
} from 'lucide-react';

const INITIAL_NODES = [
  { id: '1', type: 'trigger', title: 'Price Alert', description: 'USD/EUR drops to 0.9200', meta: 'Runs hourly' },
  { id: '2', type: 'condition', title: 'Wallet Balance Check', description: 'Balance is greater than 1,000 USDT' },
  { id: '3', type: 'action', title: 'Execute Trade', description: 'Buy SUI with 500 USDT' },
  { id: '4', type: 'notification', title: 'Alert Mobile App', description: 'Send push: "Trade executed"' },
];

const TYPE_CONFIG = {
  trigger: {
    label: 'Trigger',
    badge: 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/25',
    accent: 'border-l-[#3b82f6]',
    icon: Zap,
  },
  condition: {
    label: 'Condition',
    badge: 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/25',
    accent: 'border-l-[#22c55e]',
    icon: GitBranch,
  },
  action: {
    label: 'Action',
    badge: 'bg-white/10 text-white border border-white/20',
    accent: 'border-l-white/40',
    icon: Activity,
  },
  notification: {
    label: 'Notification',
    badge: 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/25',
    accent: 'border-l-[#ef4444]',
    icon: Bell,
  },
};

const NodeConnector = () => (
  <div className="flex-shrink-0 flex items-center w-14">
    <div className="flex-1 h-px bg-[#303030]" />
    <div
      className="w-0 h-0 flex-shrink-0"
      style={{
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '7px solid #303030',
      }}
    />
  </div>
);

const FlowNode = ({ node, onDelete }) => {
  const config = TYPE_CONFIG[node.type] || TYPE_CONFIG.action;
  const Icon = config.icon;

  return (
    <div className="flex-shrink-0 group relative">
      <div
        className={`bg-[#161616] border border-[#2a2a2a] border-l-2 ${config.accent} rounded-xl p-4 w-[220px] shadow-xl hover:border-[#333] transition-all`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className={`${config.badge} px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider flex items-center gap-1`}>
            <Icon size={8} />
            {config.label}
          </div>
          <div className="flex gap-2 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings size={11} className="hover:text-zinc-300 cursor-pointer transition-colors" />
            <Trash2
              size={11}
              className="hover:text-red-400 cursor-pointer transition-colors"
              onClick={() => onDelete(node.id)}
            />
          </div>
        </div>

        <p className="text-[13px] font-semibold text-white mb-1 leading-tight">{node.title}</p>
        <p className="text-[11px] text-zinc-500 leading-relaxed">{node.description}</p>

        {node.meta && (
          <div className="mt-3 pt-3 border-t border-[#262626] flex items-center gap-2 text-[10px] text-zinc-600">
            <Clock size={10} />
            <span>{node.meta}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const STATS = [
  { label: 'Active Automations', value: '2', color: 'text-[#22c55e]' },
  { label: 'Total Nodes', value: '4', color: 'text-white' },
  { label: 'Last Run', value: '2m ago', color: 'text-zinc-300' },
  { label: 'Status', value: '● Active', color: 'text-[#22c55e]' },
  { label: 'Executions Today', value: '18', color: 'text-white' },
  { label: 'Avg Duration', value: '340ms', color: 'text-zinc-300' },
];

const AutomationPage = () => {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const deleteNode = (id) => setNodes(nodes.filter((n) => n.id !== id));

  const addNode = (type) => {
    const config = TYPE_CONFIG[type];
    const descriptions = {
      trigger: 'When price hits target...',
      condition: 'If balance is enough...',
      action: 'Execute market buy...',
      notification: 'Notify via Telegram...',
    };
    setNodes([
      ...nodes,
      { id: Math.random().toString(36).slice(2), type, title: `New ${config.label}`, description: descriptions[type] },
    ]);
    setShowAddMenu(false);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#0a0a0a] text-white">

      {/* Top bar */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft size={15} />
            Dashboard
          </Link>
          <div className="w-px h-4 bg-[#262626]" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-[#22c55e]" />
            </div>
            <span className="text-sm font-semibold">Automation Flow</span>
          </div>
          <div className="flex items-center gap-1 bg-[#1a1a1a] border border-[#22c55e]/30 rounded-full px-2.5 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] text-[#22c55e] font-medium">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 text-xs text-zinc-400 border border-[#262626] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all">
            <Save size={12} />
            Save
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-xs text-white bg-[#22c55e]/15 border border-[#22c55e]/30 rounded-lg hover:bg-[#22c55e]/25 transition-all font-medium">
            <Play size={12} className="text-[#22c55e]" />
            Run Flow
          </button>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-2 px-4 py-1.5 text-xs text-zinc-400 border border-[#262626] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all relative"
          >
            <Plus size={12} />
            Add Node
            {showAddMenu && (
              <div className="absolute top-full mt-2 right-0 bg-[#141414] border border-[#262626] rounded-xl p-2 z-50 shadow-2xl w-44 text-left">
                <div className="flex justify-between items-center mb-2 px-2 py-1">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Node Type</span>
                  <X size={10} className="text-zinc-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowAddMenu(false); }} />
                </div>
                {['trigger', 'condition', 'action', 'notification'].map((type) => {
                  const cfg = TYPE_CONFIG[type];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={type}
                      onClick={(e) => { e.stopPropagation(); addNode(type); }}
                      className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#1e1e1e] flex items-center gap-2.5 transition-colors"
                    >
                      <div className={`${cfg.badge} w-5 h-5 rounded flex items-center justify-center flex-shrink-0`}>
                        <Icon size={10} />
                      </div>
                      <span className="text-[11px] text-zinc-300 capitalize">{type}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex-shrink-0 px-6 py-2.5 border-b border-[#141414] flex items-center gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-600">{stat.label}</span>
            <span className={`text-[10px] font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0 relative dot-grid overflow-hidden">
        {/* Corner hint */}
        <div className="absolute top-4 right-4 text-[10px] text-zinc-700 flex items-center gap-1.5 z-10">
          <AlertCircle size={10} />
          Scroll horizontally to view all nodes
        </div>

        <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide flex items-center px-12 gap-0">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <FlowNode node={node} onDelete={deleteNode} />
              {index < nodes.length - 1 && <NodeConnector />}
            </React.Fragment>
          ))}

          {/* Connector to add button */}
          {nodes.length > 0 && <NodeConnector />}

          {/* Add Node placeholder */}
          <div className="flex-shrink-0 relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-12 h-12 rounded-full border border-dashed border-[#2a2a2a] flex items-center justify-center text-zinc-700 hover:text-zinc-400 hover:border-zinc-500 transition-all group"
            >
              <Plus size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#141414] border border-[#262626] rounded-2xl flex items-center justify-center">
              <Zap size={20} className="text-zinc-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-400">No automation nodes yet</p>
              <p className="text-xs text-zinc-600 mt-1">Click "Add Node" to build your first automation</p>
            </div>
            <button
              onClick={() => setShowAddMenu(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-lg hover:bg-[#22c55e]/20 transition-all"
            >
              <Plus size={12} />
              Add First Node
            </button>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex-shrink-0 px-6 py-2 border-t border-[#141414] flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-zinc-600">
          <span>{nodes.length} node{nodes.length !== 1 ? 's' : ''} in flow</span>
          <span>·</span>
          <span>Last saved: just now</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-700">
          <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-zinc-600">⌘</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-zinc-600">S</kbd>
          <span className="ml-1">to save</span>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
