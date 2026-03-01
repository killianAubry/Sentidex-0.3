import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import Card from './Card';
import { Maximize2, ChevronDown } from 'lucide-react';

const PriceChart = ({ className, onMoveUp, onMoveDown, socket }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const [range, setRange] = useState('1M');

  useEffect(() => {
    if (!socket || !seriesRef.current) return;

    const handlePriceUpdate = (data) => {
      // data: { symbol: 'SUI', price: 7.65, timestamp: 1625000000 }
      // In a real candlestick chart, we'd update the current candle or start a new one
      // For this mockup, we'll update the last candle with the new price
      seriesRef.current.update({
        time: Math.floor(data.timestamp / 1000),
        value: data.price, // update requires {time, value} for Line or specific candle fields for Candlestick
        // However, update() on Candlestick series can take {time, open, high, low, close}
        open: data.price - 0.02,
        high: data.price + 0.05,
        low: data.price - 0.05,
        close: data.price
      });
    };

    socket.on('priceUpdate', handlePriceUpdate);
    return () => socket.off('priceUpdate', handlePriceUpdate);
  }, [socket]);

  useEffect(() => {
    const handleResize = () => {
      chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#1f1f1f' },
        horzLines: { color: '#1f1f1f' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      timeScale: {
        borderColor: '#262626',
      },
      rightPriceScale: {
        borderColor: '#262626',
      },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Mock initial data
    const initialData = [];
    let baseTime = Math.floor(Date.now() / 1000) - (100 * 3600);
    let lastPrice = 7.5520;

    for (let i = 0; i < 100; i++) {
      const open = lastPrice;
      const close = open + (Math.random() - 0.5) * 0.1;
      initialData.push({
        time: baseTime + (i * 3600),
        open: open,
        high: Math.max(open, close) + Math.random() * 0.05,
        low: Math.min(open, close) - Math.random() * 0.05,
        close: close,
      });
      lastPrice = close;
    }

    seriesRef.current.setData(initialData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartRef.current.remove();
    };
  }, []);

  // Update data based on range
  useEffect(() => {
    if (!seriesRef.current) return;

    // In a real app, fetch new data for the selected range here
    const newData = [];
    let baseTime = Math.floor(Date.now() / 1000) - (100 * 3600);
    let lastPrice = 7.5520;

    const count = range === '1D' ? 24 : range === '7D' ? 168 : 100;
    const interval = range === '1D' ? 3600 : 3600;

    for (let i = 0; i < count; i++) {
      const open = lastPrice;
      const close = open + (Math.random() - 0.5) * 0.1;
      newData.push({
        time: baseTime + (i * interval),
        open: open,
        high: Math.max(open, close) + Math.random() * 0.05,
        low: Math.min(open, close) - Math.random() * 0.05,
        close: close,
      });
      lastPrice = close;
    }
    seriesRef.current.setData(newData);
  }, [range]);

  return (
    <Card
      className={className}
      bodyClassName="flex flex-col"
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[9px] font-bold text-zinc-300">S</div>
            <span className="text-white font-semibold text-[11px]">SUI</span>
            <span className="text-[9px] text-zinc-600">·</span>
            <span className="text-[9px] text-zinc-500">$7.5520</span>
            <span className="text-[9px] text-[#22c55e] font-medium">+2.8%</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 bg-[#0e0e0e] border border-[#1e1e1e] rounded-md px-2 py-0.5 text-[9px] text-zinc-500 cursor-pointer hover:border-[#333] transition-colors">
            Indicators
            <ChevronDown size={9} />
          </div>
          <span className="hidden lg:block text-[9px] text-zinc-600">Price / Market cap</span>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
          <div className="flex bg-[#1a1a1a] rounded overflow-hidden border border-[#262626]">
            {['1D', '7D', '1M', '1Y', 'All'].map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-2 py-0.5 text-[10px] ${range === t ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <Maximize2 size={11} className="text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors" />
        </div>
      }
    >
      <div ref={chartContainerRef} className="h-[350px] w-full mt-2" />
    </Card>
  );
};

export default PriceChart;
