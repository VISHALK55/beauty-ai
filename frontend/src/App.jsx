import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SalonProvider } from './context/SalonContext';
const PublicSalonPage = React.lazy(() => import('./PublicSalonPage'));
const SmartReview = React.lazy(() => import('./SmartReview'));
const SalonHome = React.lazy(() => import('./SalonHome'));
const Academy = React.lazy(() => import('./Academy'));
const PublicServicesPage = React.lazy(() => import('./PublicServicesPage'));
const PublicBlogPage = React.lazy(() => import('./PublicBlogPage'));
const PublicContactPage = React.lazy(() => import('./PublicContactPage'));
const B2BLandingPage = React.lazy(() => import('./B2BLandingPage'));
const AdCampaignLauncher = React.lazy(() => import('./AdCampaignLauncher'));
import { useParams } from 'react-router-dom';

const AdsManagerWrapper = () => {
  const { salonId } = useParams();
  return (
    <div className="min-h-screen bg-dark-950 p-8 text-white">
      <AdCampaignLauncher salonId={salonId} salonName={salonId} />
    </div>
  );
};

// Fallback Loading UI
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-black/90">
    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};



const RootRoute = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('pihu')) {
    return (
      <SalonProvider defaultSalonId="pihu-makeover">
        <SalonHome />
      </SalonProvider>
    );
  }
  return <B2BLandingPage />;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Tenant specific routes */}
          <Route path="/s/:salonId" element={<SalonProvider />}>
            <Route index element={<SalonHome />} />
            <Route path="academy" element={<Academy />} />
            <Route path="services" element={<PublicServicesPage />} />
            <Route path="blog" element={<PublicBlogPage />} />
            <Route path="contact" element={<PublicContactPage />} />
          </Route>
          
          {/* Main Entry Point (B2B SaaS or Custom Domain) */}
          <Route path="/" element={<RootRoute />} />



        {/* Public Programmatic SEO Routes */}
        <Route path="/salon/:salonId/:serviceSlug" element={<PublicSalonPage />} />
        <Route path="/salon/:salonId/:serviceSlug/:neighborhoodSlug" element={<PublicSalonPage />} />
        
        {/* Smart Review Scanner Route */}
        <Route path="/review/:salonId" element={<SmartReview />} />
        
        {/* Ads Manager Route */}
        <Route path="/ads-manager/:salonId" element={<AdsManagerWrapper />} />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;
