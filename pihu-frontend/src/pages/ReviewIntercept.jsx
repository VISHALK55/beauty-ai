import React, { useState } from 'react';

const ReviewIntercept = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ** IMPORTANT **
  // Replace this placeholder link with the actual URL from your Google QR Code!
  const GOOGLE_REVIEW_LINK = "https://g.page/r/your-google-review-link"; 

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
    
    // If 4 or 5 stars, redirect to Google immediately
    if (selectedRating >= 4) {
      setTimeout(() => {
        window.location.href = GOOGLE_REVIEW_LINK;
      }, 800); // Short delay to show the stars filling up
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the feedback to your backend API
    console.log("Private feedback received:", feedback);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#fdfaee', // Soft warm background
      fontFamily: '"Outfit", sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '3rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        
        {/* Salon Logo / Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#b0891d', 
            margin: '0 0 0.5rem 0',
            fontWeight: '600'
          }}>
            Pihu Makeover
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
            How was your experience with us today?
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Star Rating Area */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '2rem 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    fontSize: '3rem',
                    color: star <= (hover || rating) ? '#f59e0b' : '#e4e4e7',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                    transform: star <= (hover || rating) ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Dynamic Message based on rating */}
            <div style={{ minHeight: '60px' }}>
              {rating === 0 && (
                <p style={{ color: '#a1a1aa' }}>Tap a star to rate us</p>
              )}
              {rating >= 4 && (
                <p style={{ color: '#10b981', fontWeight: 'bold', animation: 'fadeIn 0.5s' }}>
                  Awesome! Redirecting you to Google... 🚀
                </p>
              )}
            </div>

            {/* Private Feedback Form for 1-3 Stars */}
            {rating > 0 && rating < 4 && (
              <form onSubmit={handleFeedbackSubmit} style={{ marginTop: '1rem', animation: 'fadeIn 0.5s' }}>
                <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: '500' }}>
                  We're so sorry to hear that. How can we improve?
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what went wrong... (This is kept private)"
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #e4e4e7',
                    backgroundColor: '#fafafa',
                    fontSize: '1rem',
                    resize: 'none',
                    marginBottom: '1rem',
                    outlineColor: '#b0891d'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#b0891d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#9a7516'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#b0891d'}
                >
                  Send Private Feedback
                </button>
              </form>
            )}
          </>
        ) : (
          <div style={{ padding: '2rem 0', animation: 'fadeIn 0.5s' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🙏</div>
            <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>Thank You</h2>
            <p style={{ color: '#666' }}>
              We appreciate your feedback and will use it to improve our services immediately.
            </p>
          </div>
        )}
        
        {/* CSS for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />

      </div>
    </div>
  );
};

export default ReviewIntercept;
