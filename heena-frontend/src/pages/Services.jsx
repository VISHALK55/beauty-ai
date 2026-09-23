import React from 'react';

const Services = () => {
  return (
    <div className="section container">
      <div className="section-tag">
        <span style={{ marginRight: '8px' }}>✨</span>
        EXQUISITE INDULGENCE
      </div>
      <h1 className="section-title">
        Our Luxury <span className="italic">Services</span>
      </h1>
      <p style={{ letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
        BRIDAL • HAIR • SKIN • ESSENTIALS • NAILS
      </p>

      <div className="stats-row">
        <div className="stat-item">
          <h3>5+</h3>
          <p>Service Categories</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Premium Treatments</p>
        </div>
        <div className="stat-item">
          <h3>200+</h3>
          <p>Local Target Areas</p>
        </div>
        <div className="stat-item">
          <h3>1000+</h3>
          <p>Happy Clients</p>
        </div>
      </div>

      <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          { title: 'Bridal Makeup', desc: 'HD & Airbrush bridal makeup tailored for your special day.' },
          { title: 'Hair Styling', desc: 'Expert cuts, coloring, and treatments for luxurious locks.' },
          { title: 'Skin Aesthetics', desc: 'Advanced facials and skin rejuvenation therapies.' }
        ].map((service, idx) => (
          <div key={idx} style={{ 
            padding: '2rem', 
            border: '1px solid rgba(212,175,55,0.1)', 
            background: 'rgba(255,255,255,0.02)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Competitor Takedown: Comparison Matrix */}
      <div style={{ marginTop: '7rem', marginBottom: '3rem' }}>
        <h2 className="section-title text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
          Why Choose <span className="text-gold">Heena Makeover?</span>
        </h2>
        
        <div style={{ 
          background: 'rgba(0,0,0,0.4)', 
          border: '1px solid rgba(212,175,55,0.3)', 
          borderRadius: '12px', 
          overflow: 'hidden' 
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(212,175,55,0.1)' }}>
                <th style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)' }}>Feature</th>
                <th style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)', color: 'var(--color-primary)', fontSize: '1.2rem' }}>Heena Makeover</th>
                <th style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)', color: 'var(--color-text-muted)' }}>Standard Family Salons</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Experience & Leadership', Heena: '15+ Years Expert (Heena)', standard: 'Rotating General Staff' },
                { feature: 'Products Used', Heena: '100% International Premium Brands (MAC, Huda)', standard: 'Generic / Bulk Products' },
                { feature: 'Specialization', Heena: 'High-Definition (HD) & Airbrush Bridal', standard: 'Basic Threading & Haircuts' },
                { feature: 'Atmosphere', Heena: 'Exclusive, Serene & Luxurious', standard: 'Crowded, Noisy Waiting Areas' }
              ].map((row, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>{row.feature}</td>
                  <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>
                    <span style={{ color: '#4ade80', marginRight: '8px' }}>✓</span> {row.Heena}
                  </td>
                  <td style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-muted)' }}>
                    <span style={{ color: '#f87171', marginRight: '8px' }}>✕</span> {row.standard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Services;

