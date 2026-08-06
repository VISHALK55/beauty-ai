import React from 'react';

const Blog = () => {
  return (
    <div className="section container text-center">
      <div className="section-tag" style={{ margin: '0 auto 1.5rem auto' }}>
        <span style={{ marginRight: '8px' }}>✍️</span>
        LUXURY EDITORIAL
      </div>
      <h1 className="section-title">
        Pihu <span className="italic">Beauty Hub</span>
      </h1>
      <p className="section-subtitle" style={{ margin: '0 auto 4rem auto' }}>
        Insights & Inspiration: Beauty & Cosmetology Journal
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '1rem'
      }}>
        {[
          { title: 'Top 5 Bridal Makeup Trends of 2026', date: 'August 1, 2026' },
          { title: 'How to Maintain Healthy Hair in Monsoon', date: 'July 15, 2026' },
          { title: 'The Ultimate Guide to HD Airbrush Makeup', date: 'June 28, 2026' }
        ].map((post, index) => (
          <div key={index} style={{
            padding: '2rem',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.02)',
            textAlign: 'left',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>{post.date}</p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{post.title}</h3>
            <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
