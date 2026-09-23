import React, { useState } from 'react';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      author: "Sneha Kumari",
      rating: 5,
      text: "Got my bridal makeup done here and it was absolutely flawless! Thank you Pihu Makeover.",
      aiReply: "Thank you so much, Sneha! We absolutely loved doing your bridal makeup. It was an honor to be part of your special day here in Bodhgaya. Come back and see us soon! 💕",
      time: "2 hours ago"
    },
    {
      id: "rev-2",
      author: "Pooja Singh",
      rating: 2,
      text: "The haircut was okay but I had to wait 45 minutes past my appointment time.",
      aiReply: "Dear Pooja, we are so incredibly sorry that you had to wait past your appointment time. We hold ourselves to a high standard and failed to meet it today. Please contact our manager at (911) 371-5558 so we can make this right.",
      time: "1 day ago"
    }
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simRating, setSimRating] = useState(5);
  const [simName, setSimName] = useState('Rahul Verma');
  const [simText, setSimText] = useState('Amazing facial treatment! Very relaxing.');

  const triggerGoogleWebhook = async (e) => {
    e.preventDefault();
    setIsSimulating(true);

    const payload = {
      reviewId: `sim-${Date.now()}`,
      locationId: "loc-123",
      reviewerName: simName,
      starRating: simRating,
      reviewText: simText,
      timestamp: Date.now()
    };

    try {
      // In development, this points to our local monolith webhook endpoint
      const response = await fetch('http://localhost:8080/api/v1/ai/google-reviews/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add it to the top of the feed
        setReviews([{
          id: payload.reviewId,
          author: payload.reviewerName,
          rating: payload.starRating,
          text: payload.reviewText,
          aiReply: data.generatedReply,
          time: "Just now"
        }, ...reviews]);
      }
    } catch (err) {
      console.error("Simulation failed. Make sure the Spring Boot backend is running.", err);
      alert("Failed to reach the backend webhook. Make sure Spring Boot is running on port 8080.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>AI Auto-Responder 🤖</h1>
          <p style={{ color: '#a1a1aa', marginTop: '0.5rem' }}>Automatically replying to Google Reviews for Pihu Makeover</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>Google API Connected</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Simulator Panel */}
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#f59e0b' }}>Webhook Simulator</h2>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Simulate a new review hitting the Google My Business API.
          </p>

          <form onSubmit={triggerGoogleWebhook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Reviewer Name</label>
              <input type="text" value={simName} onChange={e => setSimName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #52525b', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Star Rating (1-5)</label>
              <input type="number" min="1" max="5" value={simRating} onChange={e => setSimRating(Number(e.target.value))} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #52525b', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Review Text</label>
              <textarea value={simText} onChange={e => setSimText(e.target.value)} rows="3" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #52525b', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            </div>

            <button type="submit" disabled={isSimulating} style={{ padding: '1rem', borderRadius: '6px', border: 'none', backgroundColor: isSimulating ? '#52525b' : '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: isSimulating ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
              {isSimulating ? 'Processing via Spring AI...' : 'Fire Webhook Event'}
            </button>
          </form>
        </div>

        {/* Live Feed Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Live Auto-Reply Feed</h2>
          
          {reviews.map(review => (
            <div key={review.id} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{review.author}</strong>
                  <div style={{ color: '#f59e0b', letterSpacing: '2px', marginTop: '0.25rem' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <span style={{ color: '#71717a', fontSize: '0.85rem' }}>{review.time}</span>
              </div>
              
              <p style={{ color: '#e4e4e7', fontStyle: 'italic', marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '3px solid #52525b' }}>
                "{review.text}"
              </p>

              <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ backgroundColor: '#3b82f6', color: '#fff', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>AI AUTO-REPLY</span>
                  <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Published to Google instantly</span>
                </div>
                <p style={{ color: '#fff', margin: 0, lineHeight: '1.5' }}>
                  {review.aiReply}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewManager;
