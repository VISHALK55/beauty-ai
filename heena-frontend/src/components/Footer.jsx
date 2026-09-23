import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0a0a0a', color: '#fff', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Heena Makeover</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Katari Hill Rd, near Rose Palace, Upadhayay Bigha, Gaya, Bihar 824231
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.1rem' }}>Local Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/bridal-makeup-Gaya" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Bridal Makeup in Gaya</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/beauty-academy-Gaya" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Cosmetology Academy Gaya</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Party Makeup & Hair Styling</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-ribbon">
        LOCAL AREA COVERAGE | Gaya | GAYA | BIHAR
      </div>
    </footer>
  );
};

export default Footer;

