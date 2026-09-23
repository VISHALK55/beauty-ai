import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Academy from './pages/Academy';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BridalMakeupGaya from './pages/BridalMakeupGaya';
import AcademyGaya from './pages/AcademyGaya';

// Utility for scrolling to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        {/* Local SEO Landing Pages */}
        <Route path="/bridal-makeup-Gaya" element={<BridalMakeupGaya />} />
        <Route path="/beauty-academy-Gaya" element={<AcademyGaya />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

