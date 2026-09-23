import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AcademyGaya = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Professional Cosmetology & Makeup Artistry Course",
    "description": "Learn professional bridal makeup, hair styling, and skin aesthetics at Gaya's premier beauty academy.",
    "provider": {
      "@type": "Organization",
      "name": "Heena Makeover Academy",
      "sameAs": "https://Heena.beautyai.makeup"
    }
  };

  return (
    <div className="section container">
      <SEO 
        title="Beauty Parlour Course & Makeup Academy in Gaya"
        description="Enroll in Gaya's top Beauty Academy. Get certified in professional makeup, hair styling, and cosmetology by Heena at Heena Makeover."
        schema={schema}
      />
      
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>
          Top Beauty Academy in <span className="text-gold">Gaya</span>
        </h1>
        <p className="section-subtitle">
          Start your career with the best cosmetology and makeup training in Bihar
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <div style={{ order: 2 }}>
          <img 
            src="/academy-bg.jpg" 
            alt="Beauty Academy in Gaya" 
            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1000";
            }}
          />
        </div>
        <div style={{ order: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Professional Certification Courses
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Looking for a beauty parlour course near you in Gaya? The Heena Makeover Academy offers hands-on, practical training designed to make you industry-ready. Taught directly by founder Heena, our courses cover everything from basic grooming to advanced bridal artistry.
          </p>
          <ul style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
            <li>🎓 Basic to Advanced Bridal Makeup Course</li>
            <li>💇‍♀️ Hair Styling and Chemical Treatments</li>
            <li>🧖‍♀️ Professional Skin Care and Aesthetics</li>
            <li>💼 Salon Management & Client Handling</li>
          </ul>
          <Link to="/academy">
            <button className="btn-solid" style={{ width: '100%' }}>VIEW COURSE DETAILS</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcademyGaya;

