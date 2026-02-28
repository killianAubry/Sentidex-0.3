import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AutomationPage from './pages/AutomationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/automations" element={<AutomationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
