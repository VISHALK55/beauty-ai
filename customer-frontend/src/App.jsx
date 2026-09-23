import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';

import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-rose-50 font-sans selection:bg-rose-200">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
