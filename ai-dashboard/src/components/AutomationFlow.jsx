import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import Card from './Card';
import { Zap, Trash2, Plus, X } from 'lucide-react';

const NodeWrapper = ({ label, type, children, id, data }) => {
  const typeStyles = {
    trigger: 'bg-[#3b82f6]/10 text-[#3b82f6]',
    condition: 'bg-[#22c55e]/10 text-[#22c55e] border-l-2 border-l-[#22c55e]',
    action: 'bg-white/10 text-white',
    notification: 'bg-[#ef4444]/10 text-[#ef4444]'
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 w-[220px] shadow-lg relative group">
       <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-zinc-700 !border-2 !border-[#1a1a1a]" />
       <div className="flex items-center justify-between mb-3">
          <div className={`${typeStyles[type] || 'bg-zinc-800 text-zinc-400'} px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider`}>
            {type}
          </div>
          <div className="flex gap-2 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={10} className="hover:text-red-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); data.onDelete(id); }} />
          </div>
       </div>
       <p className="text-xs font-bold mb-1 text-white">{label}</p>
       <p className="text-[10px] text-zinc-500">{data.description}</p>

       {type === 'condition' ? (
         <div className="absolute -right-2 top-0 bottom-0 flex flex-col justify-center gap-6">
            <div className="relative">
               <Handle type="source" position={Position.Right} id="true" className="!w-2 !h-2 !bg-[#22c55e] !border-2 !border-[#1a1a1a] !top-auto" />
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[6px] font-bold text-[#22c55e]">TRUE</span>
            </div>
            <div className="relative">
               <Handle type="source" position={Position.Right} id="false" className="!w-2 !h-2 !bg-[#ef4444] !border-2 !border-[#1a1a1a] !top-auto" />
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[6px] font-bold text-[#ef4444]">FALSE</span>
            </div>
         </div>
       ) : (
         <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-zinc-700 !border-2 !border-[#1a1a1a]" />
       )}
    </div>
  );
};

const CustomNode = ({ id, data }) => (
  <NodeWrapper label={data.label} type={data.type} id={id} data={data} />
);

const nodeTypes = {
  custom: CustomNode,
};

const INITIAL_NODES = [
  {
    id: '1',
    type: 'custom',
    position: { x: 50, y: 150 },
    data: {
      label: 'Price Alert',
      type: 'trigger',
      description: 'USD/EUR drops to 0.9200',
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 350, y: 150 },
    data: {
      label: 'Wallet Balance Check',
      type: 'condition',
      description: 'Balance is greater than 1,000 USDT',
    }
  },
];

const AutomationFlow = () => {
  const onDelete = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES.map(n => ({...n, data: {...n.data, onDelete}})));
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      type: ConnectionLineType.SmoothStep,
      animated: true,
      style: { stroke: params.sourceHandle === 'false' ? '#ef4444' : params.sourceHandle === 'true' ? '#22c55e' : '#52525b' },
      markerEnd: { type: MarkerType.ArrowClosed, color: params.sourceHandle === 'false' ? '#ef4444' : params.sourceHandle === 'true' ? '#22c55e' : '#52525b' }
    }, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const id = Date.now().toString();
    const newNode = {
      id,
      type: 'custom',
      position: { x: 100, y: 100 },
      data: {
        label: `New ${type}`,
        type,
        description: `Configuration for ${type}...`,
        onDelete
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowAddMenu(false);
  };

  return (
    <Card
      className="col-span-3 mt-4 h-[600px] relative"
      title={
        <div className="flex items-center gap-2">
           <Zap size={14} className="text-[#22c55e]" />
           <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Automations Flow Builder</span>
        </div>
      }
      extra={
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="flex items-center gap-1 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 px-3 py-1 rounded text-[10px] hover:bg-[#22c55e]/20 transition-all z-50"
        >
          <Plus size={12} />
          Add Node
        </button>
      }
    >
      <div className="absolute inset-0 top-12">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          className="bg-[#0a0a0a]"
        >
          <Background color="#262626" gap={20} />
          <Controls className="bg-[#141414] border-[#262626] fill-white" />
        </ReactFlow>
      </div>

      {showAddMenu && (
        <div className="absolute top-14 right-4 bg-[#141414] border border-[#262626] rounded-lg p-2 z-[100] shadow-2xl w-40">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[8px] font-bold text-zinc-500 uppercase">Select Type</span>
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
    </Card>
  );
};

export default AutomationFlow;
