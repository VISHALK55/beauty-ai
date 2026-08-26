import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SalonProvider } from './context/SalonContext';

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
const AdCampaign = React.lazy(() => import('./AdCampaignLauncher'));
const Login = React.lazy(() => import('./Login'));
const ProtectedRoute = React.lazy(() => import('./ProtectedRoute'));
const SuperAdminSettings = React.lazy(() => import('./SuperAdminSettings'));
const Settings = React.lazy(() => import('./Settings'));
const AiPremiumPlans = React.lazy(() => import('./AiPremiumPlans'));
const WebsiteContentManager = React.lazy(() => import('./WebsiteContentManager'));
const SalonHome = React.lazy(() => import('./SalonHome'));
const Academy = React.lazy(() => import('./Academy'));
const PublicServicesPage = React.lazy(() => import('./PublicServicesPage'));
const PublicBlogPage = React.lazy(() => import('./PublicBlogPage'));
const PublicContactPage = React.lazy(() => import('./PublicContactPage'));
const B2BLandingPage = React.lazy(() => import('./B2BLandingPage'));

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

const MagicLogin = () => {
  const { login } = useAuth();
  useEffect(() => {
    login("mock-jwt-token-super-admin", "SUPER_ADMIN", "SUPER-ADMIN");
    window.location.href = "/dashboard/salons";
  }, [login]);
  return <div className="flex items-center justify-center h-screen bg-black text-gold-500">Authenticating Super Admin...</div>;
};

function App() {
  return (
    <AuthProvider>
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
          
          {/* B2B SaaS Landing Page */}
          <Route path="/" element={<B2BLandingPage />} />

          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Magic Direct Login Route */}
          <Route path="/superadmin-login" element={<MagicLogin />} />

        {/* Public Programmatic SEO Routes */}
        <Route path="/salon/:salonId/:serviceSlug" element={<PublicSalonPage />} />
        <Route path="/salon/:salonId/:serviceSlug/:neighborhoodSlug" element={<PublicSalonPage />} />
        
        {/* Smart Review Scanner Route */}
        <Route path="/review/:salonId" element={<SmartReview />} />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Navigate to="appointments" replace />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ai-premium" element={<AiPremiumPlans />} />
            <Route path="content" element={<WebsiteContentManager />} />
            
            {/* Super Admin Only Routes */}
            <Route element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
              <Route path="salons" element={<SalonDirectory />} />
              <Route path="google-preview" element={<GoogleSearchSimulator />} />
              <Route path="speed-control" element={<HyperSpeedControlCenter />} />
              <Route path="ai-receptionist" element={<AiChat />} />
              <Route path="voice-calls" element={<VoiceCalls />} />
              <Route path="geo-rank" element={<GeoRank />} />
              <Route path="onboard-partner" element={<PartnerOnboarding />} />
              <Route path="super-admin-settings" element={<SuperAdminSettings />} />
              <Route path="ad-campaigns" element={<div className="p-8 h-full overflow-y-auto"><AdCampaign salonName="All Platform Salons (Super Admin)" salonId="SUPER-ADMIN" /></div>} />
            </Route>
          </Route>
          
          <Route path="*" element={
            <div className="flex items-center justify-center h-full text-muted">
              <p>Page coming soon...</p>
            </div>
          } />
        </Route>
      </Routes>
    </Suspense>
    </AuthProvider>
  );
}

export default App;
