import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Dashboard';
import AiChat from './AiChat';
import Services from './Services';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="ai-receptionist" element={<AiChat />} />
        <Route path="services" element={<Services />} />
        {/* Placeholders for other routes */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Page coming soon...</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
