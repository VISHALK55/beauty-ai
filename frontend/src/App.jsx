import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import Dashboard from './Dashboard';
import AiChat from './AiChat';
import Services from './Services';
import VoiceCalls from './VoiceCalls';
import GeoRank from './GeoRank';
import PublicSalonPage from './PublicSalonPage';
import PartnerOnboarding from './PartnerOnboarding';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Programmatic SEO Routes */}
          <Route path="/salon/:salonId/:serviceSlug" element={<PublicSalonPage />} />
          <Route path="/salon/:salonId/:serviceSlug/:neighborhoodSlug" element={<PublicSalonPage />} />

          {/* Admin Dashboard Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="ai-receptionist" element={<AiChat />} />
            <Route path="voice-calls" element={<VoiceCalls />} />
            <Route path="services" element={<Services />} />
            <Route path="geo-rank" element={<GeoRank />} />
            <Route path="onboard-partner" element={<PartnerOnboarding />} />
            
            <Route path="*" element={
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Page coming soon...</p>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
