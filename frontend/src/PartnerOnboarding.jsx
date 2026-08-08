import React, { useState } from 'react';
import { Store, MapPin, Link2, Sparkles, PlusCircle, CheckCircle2, Key, Phone } from 'lucide-react';
import { api } from './api';

export default function PartnerOnboarding() {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [generatedPin, setGeneratedPin] = useState(null);
  const [generatedId, setGeneratedId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    googleMapsUrl: '',
    phone: '',
    instagram: '',
    heroImage: null,
    galleryImages: []
  });

  const handleHeroUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setFormData(prev => ({ ...prev, heroImage: event.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.readAsDataURL(file);
    }))).then(images => {
      setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...images] }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Generate a secure 6 digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
      const response = await api.createSalon({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          googleMapsLink: formData.googleMapsUrl,
          phone: formData.phone,
          instagram: formData.instagram,
          heroImage: formData.heroImage,
          galleryImages: formData.galleryImages,
          accessPin: pin,
          neighborhoods: [formData.city],
          workingHours: { "Monday": "09:00 - 18:00", "Tuesday": "09:00 - 18:00" },
          aiSystemPrompt: `You are an AI assistant for ${formData.name}.`
      });
      
      setGeneratedPin(pin);
      setGeneratedId(response.id);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Failed to create salon. Check the backend connection.");
    }
  };

  return (
    <div className="p-8">
      <header className="mb-10 border-b border-divider-strong pb-6">
        <h1 className="text-4xl font-serif text-accent mb-2 flex items-center gap-3">
          <Store className="text-accent" />
          Partner Onboarding Engine
        </h1>
        <p className="text-muted text-lg">
          Add a new salon to the platform. The AI will instantly generate their Programmatic SEO pages and activate their automated WhatsApp Review Engine.
        </p>
      </header>

      {status === 'success' ? (
        <div className="glass-panel p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
          <CheckCircle2 size={64} className="text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-content mb-4">Partner Successfully Onboarded!</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            {formData.name} is now live on the network. The AI has generated their localized schema markup for {formData.city} and activated their Voice AI system.
          </p>

          <div className="bg-secondary border border-accent-light rounded-2xl p-8 mb-8 max-w-md mx-auto">
            <h3 className="text-content font-semibold mb-4 flex items-center justify-center gap-2">
                <Key className="text-accent" size={20} />
                Secure Login Credentials
            </h3>
            <p className="text-muted text-sm mb-6">Send these credentials to the parlour owner so they can log in to their dashboard.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-muted uppercase font-bold tracking-wider">Salon ID (Username)</label>
                    <div className="text-xl font-mono text-accent font-bold bg-black/50 py-2 rounded-lg mt-1 border border-divider">{generatedId}</div>
                </div>
                <div>
                    <label className="text-xs text-muted uppercase font-bold tracking-wider">Secure PIN (Password)</label>
                    <div className="text-3xl font-mono text-content font-bold tracking-[0.2em] bg-black/50 py-2 rounded-lg mt-1 border border-divider">{generatedPin}</div>
                </div>
            </div>
          </div>

          <button 
            onClick={() => { setStatus('idle'); setGeneratedPin(null); setGeneratedId(null); setFormData({name: '', address: '', city: '', googleMapsUrl: ''}); }}
            className="btn-primary px-6 py-3"
          >
            Onboard Another Salon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-8">
            <h2 className="text-2xl font-serif text-content mb-6">Salon Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-muted text-sm mb-2">Salon Name</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Pihu Makeover Saloon" 
                    className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 pl-12 pr-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-muted text-sm mb-2">City / Neighborhood</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Bodhgaya" 
                      className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 pl-12 pr-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-2">Full Address</label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      placeholder="Main Road, Near Temple" 
                      className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 px-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-muted text-sm mb-2">Google Maps Business URL (For Reviews)</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input 
                    required
                    type="url" 
                    placeholder="https://maps.google.com/..." 
                    className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 pl-12 pr-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({...formData, googleMapsUrl: e.target.value})}
                  />
                </div>
                <p className="text-xs text-muted mt-2">
                  The AI will automatically send this link via WhatsApp to customers after their appointments.
                </p>
              </div>

              <div className="pt-4 border-t border-divider-strong">
                <h3 className="text-lg font-serif text-content mb-4">Contact & Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-muted text-sm mb-2">Phone Number (WhatsApp)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="e.g. +91 9876543210" 
                        className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 pl-12 pr-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-muted text-sm mb-2">Instagram URL</label>
                    <div className="relative">
                      <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                      <input 
                        type="url" 
                        placeholder="https://instagram.com/..." 
                        className="w-full bg-tertiary border border-divider-strong rounded-lg py-3 pl-12 pr-4 text-content focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-divider-strong">
                <h3 className="text-lg font-serif text-content mb-4">Brand Assets & Portfolio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-muted text-sm mb-2">Hero (Main) Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleHeroUpload}
                      className="w-full bg-tertiary border border-divider-strong rounded-lg p-2 text-content text-sm"
                    />
                    {formData.heroImage && (
                      <div className="mt-2 w-32 h-20 rounded overflow-hidden">
                        <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-muted text-sm mb-2">Photo Gallery (Select Multiple)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="w-full bg-tertiary border border-divider-strong rounded-lg p-2 text-content text-sm"
                    />
                    {formData.galleryImages.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.galleryImages.map((img, idx) => (
                          <div key={idx} className="w-16 h-16 rounded overflow-hidden border border-divider">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-divider-strong">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="btn-primary w-full py-4 flex justify-center items-center gap-2 text-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse flex items-center gap-2"><Sparkles size={20} /> Provisioning AI Engine...</span>
                  ) : (
                    <><PlusCircle size={20} /> Inject Salon into Network</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6 bg-gold-500/5 border-gold-500/20">
              <h3 className="text-accent font-semibold mb-2 flex items-center gap-2">
                <Sparkles size={16} /> Auto-Generated Features
              </h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                  <span>Programmatic Local SEO Pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                  <span>GeoCircle JSON-LD Schema</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                  <span>WhatsApp Review Automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                  <span>AI Voice Receptionist Prompt</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="text-content font-semibold mb-2">Network Status</h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted">Total Partners</span>
                <span className="text-accent font-mono">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Indexed Pages</span>
                <span className="text-accent font-mono">1,402</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
