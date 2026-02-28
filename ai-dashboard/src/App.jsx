import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import PriceChart from './components/PriceChart';
import Portfolio from './components/Portfolio';
import Heatmap from './components/Heatmap';
import Holders from './components/Holders';
import Unlocks from './components/Unlocks';
import VolumeRatio from './components/VolumeRatio';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <Layout>
      <Header />

      <div className="flex gap-4 items-start">
        {/* Left Column (2/3 width) */}
        <div className="w-2/3 space-y-4">
          <PriceChart />

          <div className="grid grid-cols-2 gap-4">
            <Heatmap />
            <Holders />
          </div>

          <VolumeRatio />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="w-1/3 space-y-4 h-full">
          <Portfolio />
          <Unlocks />
          <AIAssistant />
        </div>
      </div>
    </Layout>
  );
}

export default App;
