import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="section-tag">
          <span role="img" aria-label="crown" style={{ marginRight: '8px' }}>👑</span>
          ELITE BRIDAL & ACADEMY | BODHGAYA
        </div>
        <h1 className="section-title">
          Experience <br />
          <span className="italic">Premium</span> <br />
          Luxury in <span className="italic">Bodhgaya</span>
        </h1>
        <p className="section-subtitle">
          Bodhgaya's premier destination for high-end bridal makeup, 
          advanced skin aesthetics, and certified professional training 
          programs. Indulge in an atmosphere of serene grandeur.
        </p>
        <div className="hero-buttons">
          <Link to="/services">
            <button className="btn-solid">OUR SERVICES</button>
          </Link>
          <Link to="/academy">
            <button className="btn-outline">JOIN ACADEMY</button>
          </Link>
        </div>
        
        {/* Owner Floating Section */}
        <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <img 
            src="/owner.jpg" 
            alt="Bindu Sharma - Owner of Pihu Makeover" 
            className="floating-photo"
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/120x120?text=Owner";
            }}
          />
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Bindu Sharma</h3>
            <p className="text-gold" style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Professional Makeup Artist & Beauty Expert
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', maxWidth: '300px' }}>
              Founder & Director of Pihu Makeover Beauty Salon
            </p>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        {/* Assuming a bridal or salon background photo here */}
        <img 
          src="/hero-bg.jpg" 
          alt="Luxury Salon" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1974";
          }}
        />
      </div>
    </div>
  );
};

export default Home;
