import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';

// Lazy loaded components for code splitting
const Dashboard = React.lazy(() => import('./Dashboard'));
const AiChat = React.lazy(() => import('./AiChat'));
const Services = React.lazy(() => import('./Services'));
const VoiceCalls = React.lazy(() => import('./VoiceCalls'));
const GeoRank = React.lazy(() => import('./GeoRank'));
const PublicSalonPage = React.lazy(() => import('./PublicSalonPage'));
const PartnerOnboarding = React.lazy(() => import('./PartnerOnboarding'));
const SalonDirectory = React.lazy(() => import('./SalonDirectory'));
const GoogleSearchSimulator = React.lazy(() => import('./GoogleSearchSimulator'));
const HyperSpeedControlCenter = React.lazy(() => import('./HyperSpeedControlCenter'));
const Appointments = React.lazy(() => import('./Appointments'));
const SmartReview = React.lazy(() => import('./SmartReview'));

// Fallback Loading UI
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-black/90">
    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Programmatic SEO Routes */}
        <Route path="/salon/:salonId/:serviceSlug" element={<PublicSalonPage />} />
        <Route path="/salon/:salonId/:serviceSlug/:neighborhoodSlug" element={<PublicSalonPage />} />
        
        {/* Smart Review Scanner Route */}
        <Route path="/review/:salonId" element={<SmartReview />} />

        {/* Admin Dashboard Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="salons" element={<SalonDirectory />} />
          <Route path="google-preview" element={<GoogleSearchSimulator />} />
          <Route path="speed-control" element={<HyperSpeedControlCenter />} />
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
    </Suspense>
  );
}

export default App;
