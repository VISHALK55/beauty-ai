import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AiChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: "Hello! I'm your AI Receptionist. How can I help you and your salon today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLocale, setDetectedLocale] = useState('en-US');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // "Invisible" Detection Method: Automatically detect browser language on load
  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage;
    setDetectedLocale(userLanguage);
    
    // Optional: Log it for debugging so the developer sees the magic happening
    console.log("Invisible Detection: Detected browser language ->", userLanguage);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch((import.meta.env.VITE_API_URL || '') + 'api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salonId: 'salon_123',
          customerId: 'owner_1',
          clientLanguage: detectedLocale, // Sending auto-detected context to backend
          message: userMessage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: data.reply || data.response || "Message received." }]);
      } else {
        // Fallback Mock Demo: AI responding based on invisible language detection or NLP fallback
        setTimeout(() => {
          let mockReply = "I received your message! How can I assist you with booking?";
          const lowerMsg = userMessage.toLowerCase();
          
          // 1. Natural Language Detection (Fallback): If they type in a specific language
          // 2. Invisible Detection: Based on navigator.language
          
          if (lowerMsg.includes('สวัสดี') || detectedLocale.startsWith('th')) {
            mockReply = "สวัสดีค่ะ! ยินดีต้อนรับสู่ Surbhi Beauty Parlour ฉันเห็นว่าคุณมาจากประเทศไทย เรามีแพ็กเกจแต่งหน้าเจ้าสาวในราคา 6,450 บาทค่ะ สนใจจองคิวไหมคะ?";
          } else if (lowerMsg.includes('xin chào') || detectedLocale.startsWith('vi')) {
            mockReply = "Xin chào! Chào mừng bạn đến với Surbhi Beauty Parlour. Chúng tôi có các gói trang điểm cô dâu với giá 4.500.000 VNĐ. Bạn có muốn đặt lịch hẹn không?";
          } else {
            mockReply = "Hello! Welcome to Surbhi Beauty Parlour. We offer bridal HD makeup packages starting at $180. Would you like to check available time slots?";
          }

          setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: mockReply }]);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: "Sorry, a network error occurred." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-10 py-8">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif">AI Receptionist</h1>
          <p className="text-gray-400 mt-1">Talk to your intelligent salon assistant.</p>
        </div>
        
        {/* Visual Indicator of Invisible Detection */}
        <div className="flex items-center gap-2 bg-dark-800/50 border border-white/5 rounded-full px-4 py-2">
          <Sparkles size={16} className="text-gold-500" />
          <span className="text-xs text-gray-300">
            Auto-detected language: <span className="text-gold-400 font-mono">{detectedLocale}</span>
          </span>
        </div>
      </header>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-gold-500 text-dark-900' : 'bg-dark-700 text-gold-400'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gold-500 text-dark-900 rounded-tr-sm' 
                    : 'bg-dark-800 border border-white/5 rounded-tl-sm text-gray-200'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%] flex-row">
                <div className="w-8 h-8 rounded-full bg-dark-700 text-gold-400 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-dark-800 border border-white/5 rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-dark-900/50">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full pl-6 pr-14 py-4 bg-dark-800 border border-white/10 rounded-full focus:outline-none focus:border-gold-500 transition-colors text-white"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 w-10 h-10 bg-gold-500 text-dark-900 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
