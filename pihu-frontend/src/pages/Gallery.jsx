import React from 'react';

const Gallery = () => {
  const images = [
    '/salon-1.jpg',
    '/salon-2.jpg',
    '/salon-3.jpg',
    '/salon-4.jpg'
  ];

  return (
    <div className="section container text-center">
      <div className="section-tag" style={{ margin: '0 auto 1.5rem auto' }}>
        <span style={{ marginRight: '8px' }}>✨</span>
        VISUAL PORTFOLIO
      </div>
      <h1 className="section-title">
        Our Luxury <span className="italic">Gallery</span>
      </h1>
      <p className="section-subtitle" style={{ margin: '0 auto 4rem auto' }}>
        Explore our portfolio of bridal transformations, professional hair 
        makeovers and academy masterclass moments.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '1rem'
      }}>
        {images.map((src, index) => (
          <div key={index} style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px',
            aspectRatio: '3/4',
            border: '1px solid rgba(212,175,55,0.2)'
          }}>
            <img 
              src={src} 
              alt={`Pihu Makeover Gallery ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x600?text=Salon+Image+${index + 1}`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
