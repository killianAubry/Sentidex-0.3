import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { Download, MoreHorizontal, Send } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: 'user',
    text: 'Give me a forecast for the SUI coin',
    time: '15:01',
  },
  {
    id: 2,
    type: 'ai',
    text: 'Sure! SUI is currently trading at $7.35, with a 24h change of +2.8%. Based on recent trends and volume inflows, short-term momentum appears bullish',
    time: '15:01',
  },
];

const AIAssistant = ({ className }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: input, time: now }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'ai', text: 'Analyzing the latest on-chain data and market signals for your query...', time: now },
      ]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col p-0 overflow-hidden"
      title="AI Assistant"
      extra={
        <div className="flex items-center gap-2 text-zinc-600">
          <Download size={11} className="hover:text-white cursor-pointer transition-colors" />
          <MoreHorizontal size={11} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      }
    >
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'user' ? (
              <div className="max-w-[85%]">
                <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl rounded-tr-sm px-3 py-2">
                  <p className="text-[11px] text-zinc-200 leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-[9px] text-zinc-700 text-right mt-0.5">{msg.time}</p>
              </div>
            ) : (
              <div className="max-w-[95%]">
                <div className="bg-[#161616] border border-[#262626] rounded-xl rounded-tl-sm px-3 py-2">
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-[9px] text-zinc-700 mt-0.5">{msg.time}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-[#1f1f1f] px-3 py-2.5 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a message..."
          className="flex-1 bg-transparent text-[11px] text-zinc-300 placeholder:text-zinc-700 outline-none"
        />
        <button
          onClick={handleSend}
          className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-white transition-colors"
        >
          <Send size={11} />
        </button>
      </div>
    </Card>
  );
};

export default AIAssistant;
