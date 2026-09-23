import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Pihu Makeover Beauty Salon",
    "image": "https://pihu.beautyai.makeup/hero-bg.jpg",
    "url": "https://pihu.beautyai.makeup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rajapur, Sujata Rd, near Govt. Middle School, Upadhayay Bigha",
      "addressLocality": "Bodhgaya",
      "addressRegion": "Bihar",
      "postalCode": "824231",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7068881,
      "longitude": 84.9942657
    },
    "founder": {
      "@type": "Person",
      "name": "Bindu Sharma"
    }
  };

  return (
    <>
      <div className="hero">
        <SEO 
          title="Best Bridal Makeup Artist & Academy in Bodhgaya | Pihu Makeover" 
          description="Pihu Makeover is Bodhgaya's premier destination for high-end bridal makeup, advanced skin aesthetics, and certified professional training by Bindu Sharma." 
          schema={schema} 
        />
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
          
          {/* Authority Block Section */}
          <div style={{ 
            marginTop: '5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2.5rem', 
            background: 'linear-gradient(90deg, rgba(212,175,55,0.05) 0%, transparent 100%)',
            padding: '2rem',
            borderRadius: '12px',
            borderLeft: '4px solid var(--color-primary)'
          }}>
            <img 
              src="/owner.jpg" 
              alt="Bindu Sharma - 15 Years Experience Bridal Artist" 
              className="floating-photo"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Bindu Sharma</h3>
                <span style={{ background: 'var(--color-primary)', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  15+ YEARS EXPERIENCE
                </span>
              </div>
              <p className="text-gold" style={{ fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Master Makeup Artist & Cosmetologist
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '500px' }}>
                Unlike standard parlours, Pihu Makeover is led by an industry veteran. With over 15 years of specialized experience in high-definition bridal transformations and advanced skin aesthetics, Bindu guarantees a luxury, personalized experience that generic salons simply cannot match.
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
      
      {/* Location Section */}
      <div className="section container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Visit Us in Bodhgaya</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Rajapur, Sujata Rd, near Govt. Middle School, Upadhayay Bigha, Bodhgaya, Bihar 824231
        </p>
        <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.8341604924736!2d84.99169077610667!3d24.70689295328229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32dfdf38f62e3%3A0xe61b49ce05b6a398!2sPihu%20Makeover!5e0!3m2!1sen!2sin!4v1709493214812!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </>
  );
};

export default Home;
