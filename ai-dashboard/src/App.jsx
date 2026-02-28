import React, { useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import PriceChart from './components/PriceChart';
import Heatmap from './components/Heatmap';
import Holders from './components/Holders';
import Unlocks from './components/Unlocks';
import VolumeRatio from './components/VolumeRatio';
import AutomationFlow from './components/AutomationFlow';

function App() {
  const [modules, setModules] = useState([
    { id: 'PriceChart', component: PriceChart, className: 'col-span-2' },
    { id: 'Portfolio', component: Portfolio, className: 'col-span-1' },
    { id: 'Heatmap', component: Heatmap, className: 'col-span-1' },
    { id: 'Holders', component: Holders, className: 'col-span-1' },
    { id: 'VolumeRatio', component: VolumeRatio, className: 'col-span-1' },
    { id: 'Unlocks', component: Unlocks, className: 'col-span-1' },
  ]);

  const moveUp = (index) => {
    if (index === 0) return;
    const newModules = [...modules];
    [newModules[index - 1], newModules[index]] = [newModules[index], newModules[index - 1]];
    setModules(newModules);
  };

  const moveDown = (index) => {
    if (index === modules.length - 1) return;
    const newModules = [...modules];
    [newModules[index + 1], newModules[index]] = [newModules[index], newModules[index + 1]];
    setModules(newModules);
  };

  return (
    <Layout>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((module, index) => {
          const Component = module.component;
          return (
            <Component
              key={module.id}
              className={module.className}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          );
        })}

        {/* Automations Flow - Always at the bottom for now as it's full-width */}
        <AutomationFlow />
      </div>
    </Layout>
  );
}

export default App;
