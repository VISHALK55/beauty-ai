import React from 'react';

const Academy = () => {
  return (
    <div className="section container text-center">
      <div className="section-tag" style={{ margin: '0 auto 1.5rem auto' }}>
        <span style={{ marginRight: '8px' }}>🎓</span>
        EMPOWERING ARTISTRY
      </div>
      <h1 className="section-title" style={{ fontSize: '4.5rem' }}>
        Pihu Makeover <span className="italic text-gold">Academy</span>
      </h1>
      <p className="section-subtitle" style={{ margin: '0 auto 3rem auto', color: 'var(--color-text)' }}>
        Bodhgaya's Premier Cosmetology Institute
      </p>
      
      <div style={{
        marginTop: '4rem',
        padding: '4rem',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '8px',
        background: 'linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%)'
      }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
          ✦ FUTURE-PROOF CAREERS ✦
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
          Learn from industry expert Bindu Sharma. Our comprehensive curriculum covers bridal makeup, hair styling, skin aesthetics, and salon management. Get certified and start your career in the beauty industry.
        </p>
        <button className="btn-solid">ENROLL NOW</button>
      </div>
    </div>
  );
};

export default Academy;
