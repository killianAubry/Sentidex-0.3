import React from 'react';
import Header from '../components/Header';
import PriceChart from '../components/PriceChart';
import Portfolio from '../components/Portfolio';
import Heatmap from '../components/Heatmap';
import Holders from '../components/Holders';
import Unlocks from '../components/Unlocks';
import BuysSellsVolume from '../components/BuysSellsVolume';
import LongShortRatio from '../components/LongShortRatio';
import AIAssistant from '../components/AIAssistant';

const DashboardPage = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[#1a1a1a]">
        <Header />
      </div>

      {/* Dashboard grid — no scroll */}
      <div
        className="flex-1 min-h-0 p-3 grid gap-2"
        style={{
          gridTemplateAreas: '"chart chart portfolio" "heatmap holders unlocks" "buys long ai"',
          gridTemplateColumns: '2fr 1.5fr 1.5fr',
          gridTemplateRows: '10fr 6fr 7fr',
        }}
      >
        <div style={{ gridArea: 'chart' }} className="min-h-0">
          <PriceChart className="h-full" />
        </div>
        <div style={{ gridArea: 'portfolio' }} className="min-h-0">
          <Portfolio className="h-full" />
        </div>
        <div style={{ gridArea: 'heatmap' }} className="min-h-0">
          <Heatmap className="h-full" />
        </div>
        <div style={{ gridArea: 'holders' }} className="min-h-0">
          <Holders className="h-full" />
        </div>
        <div style={{ gridArea: 'unlocks' }} className="min-h-0">
          <Unlocks className="h-full" />
        </div>
        <div style={{ gridArea: 'buys' }} className="min-h-0">
          <BuysSellsVolume className="h-full" />
        </div>
        <div style={{ gridArea: 'long' }} className="min-h-0">
          <LongShortRatio className="h-full" />
        </div>
        <div style={{ gridArea: 'ai' }} className="min-h-0">
          <AIAssistant className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
