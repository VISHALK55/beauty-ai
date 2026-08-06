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
    </div>
  );
};

export default Services;
