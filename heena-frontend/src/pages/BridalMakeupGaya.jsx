import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const BridalMakeupGaya = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bridal Makeup",
    "provider": {
      "@type": "BeautySalon",
      "name": "Heena Makeover",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Katari Hill Rd, near Rose Palace, Upadhayay Bigha",
        "addressLocality": "Gaya",
        "addressRegion": "Bihar",
        "postalCode": "824231",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Gaya"
    }
  };

  return (
    <div className="section container">
      <SEO 
        title="Best Bridal Makeup Artist in Gaya | Heena Makeover"
        description="Looking for the best bridal makeup artist in Gaya? Heena at Heena Makeover offers luxury bridal, HD, and airbrush makeup near Mahabodhi Temple."
        schema={schema}
      />
      
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>
          Best Bridal Makeup Artist in <span className="text-gold">Gaya</span>
        </h1>
        <p className="section-subtitle">
          Exquisite Bridal Artistry near the heart of Gaya by Beauty Expert Heena
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <div>
          <img 
            src="/hero-bg.jpg" 
            alt="Bridal Makeup in Gaya" 
            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1000";
            }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Luxury Bridal Packages in Gaya
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Your wedding day in Gaya deserves nothing less than perfection. At Heena Makeover, located conveniently on Sujata Road, we specialize in high-definition (HD) and Airbrush bridal makeup that withstands the Bihar climate and looks flawless in both natural light and wedding photography.
          </p>
          <ul style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
            <li>✓ Custom Bridal Consultations in Gaya</li>
            <li>✓ Premium International Products (MAC, Huda Beauty, Kryolan)</li>
            <li>✓ Long-lasting HD & Airbrush Techniques</li>
            <li>✓ Complete Bridal Styling (Hair, Draping, Makeup)</li>
          </ul>
          <Link to="/">
            <button className="btn-solid" style={{ width: '100%' }}>BOOK YOUR BRIDAL CONSULTATION</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BridalMakeupGaya;

