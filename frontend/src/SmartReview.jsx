import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MessageSquare } from 'lucide-react';
import { salonsDatabase } from './salonsData';

export default function SmartReview() {
  const { salonId } = useParams();
  const salon = salonsDatabase[salonId] || salonsDatabase['pihu-makeover'];
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Replace this with the actual Google Review Link from the QR code!
  const GOOGLE_REVIEW_LINK = "https://g.page/r/pihu-makeover/review";

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmitPrivateFeedback = () => {
    // In a real app, this would save to the database/Dashboard
    console.log("Private feedback saved for Dashboard:", feedback);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-6">
        <div className="bg-dark-800 p-8 rounded-2xl border border-gold-500/20 max-w-md text-center">
          <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={32} className="fill-gold-400" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Thank You!</h2>
          <p className="text-gray-400">
            Your feedback is extremely valuable to us. We will use it to improve our services at {salon.name}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-dark-800 rounded-2xl border border-gray-800 p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">{salon.name}</h1>
          <p className="text-gray-400">How was your experience today?</p>
        </div>

        {/* Star Rating System */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRatingClick(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star 
                size={48} 
                className={`transition-colors duration-200 ${
                  (hoveredRating || rating) >= star 
                    ? 'text-gold-500 fill-gold-500' 
                    : 'text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Smart Routing Logic */}
        {rating > 0 && (
          <div className="animate-fade-in-up">
            {rating >= 4 ? (
              /* 4 or 5 Stars -> Send directly to Google */
              <div className="text-center space-y-4">
                <p className="text-green-400 font-medium">
                  We're so happy you loved it! 
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Could you take 10 seconds to share this on Google? It really helps our salon grow!
                </p>
                <a 
                  href={GOOGLE_REVIEW_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all text-lg"
                >
                  Post on Google
                </a>
              </div>
            ) : (
              /* 1, 2, or 3 Stars -> Intercept Privately */
              <div className="space-y-4 text-left">
                <p className="text-gold-400 text-sm flex items-center gap-2">
                  <MessageSquare size={16} /> 
                  We're sorry it wasn't perfect. Let us fix it.
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What could we have done better?"
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl p-4 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none h-32 resize-none"
                ></textarea>
                <button 
                  onClick={handleSubmitPrivateFeedback}
                  disabled={!feedback.trim()}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 rounded-xl font-bold transition-colors"
                >
                  Send Private Feedback
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
