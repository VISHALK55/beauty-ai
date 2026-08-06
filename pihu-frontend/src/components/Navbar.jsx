import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? { color: 'var(--color-gold)' } : {};
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <div className="logo-icon">P</div>
        <div>
          <div className="logo-text">PIHU MAKEOVER</div>
          <div className="logo-sub">& BEAUTY SALON</div>
        </div>
      </Link>
      <div className="nav-links">
        <Link to="/" style={isActive('/')}>HOME</Link>
        <Link to="/services" style={isActive('/services')}>SERVICES</Link>
        <Link to="/academy" style={isActive('/academy')}>ACADEMY</Link>
        <Link to="/blog" style={isActive('/blog')}>BLOG</Link>
        <Link to="/gallery" style={isActive('/gallery')}>GALLERY</Link>
        <Link to="/contact" style={isActive('/contact')}>CONTACT</Link>
        <Link to="/admin" style={isActive('/admin')}>ADMIN</Link>
        <button className="btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem' }}>
          ENQUIRE NOW
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
