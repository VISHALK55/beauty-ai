import React, { useState } from 'react';
import { 
  Image, 
  FileText, 
  Scissors, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

const WebsiteContentManager = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock Data States
  const [galleryItems] = useState([
    { id: 1, src: '/gallery/gallery_1.jpg', title: 'Bridal HD Makeup' },
    { id: 2, src: '/gallery/gallery_2.jpg', title: 'Airbrush Reception Look' },
    { id: 3, src: '/gallery/gallery_3.jpg', title: 'Party Glam' },
    { id: 4, src: '/gallery/gallery_4.jpg', title: 'Haldi Ceremony' },
    { id: 5, src: '/gallery/gallery_5.jpg', title: 'Hair Treatment' }
  ]);

  const [blogPosts] = useState([
    { id: 1, title: 'Bridal Makeup Trends for Bihar Weddings', category: 'BRIDAL GLAM', date: 'Aug 15, 2026' },
    { id: 2, title: 'How to Build a Successful Makeup Artist Career', category: 'EDUCATION', date: 'Jul 22, 2026' },
    { id: 3, title: 'AP Colony Gaya me Bridal Makeup Price kitna hai?', category: 'BRIDAL GLAM', date: 'Jun 10, 2026' },
  ]);

  const [services] = useState([
    { id: 1, name: 'Bridal HD Makeup', price: '₹15,000', category: 'Makeup' },
    { id: 2, name: 'Keratin Treatment', price: '₹4,999', category: 'Hair Care' },
    { id: 3, name: 'HydraFacial', price: '₹2,500', category: 'Skin Therapy' },
    { id: 4, name: 'Airbrush Bridal', price: '₹20,000', category: 'Makeup' },
    { id: 5, name: 'Hair Botox', price: '₹6,500', category: 'Hair Care' },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const renderGalleryManager = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Gallery Images</h2>
          <p className="text-sm text-gray-400">Manage the photos displayed on your homepage gallery.</p>
        </div>
        <button className="flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500 hover:bg-gold-500 hover:text-dark-950 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
          <Plus size={16} /> Upload New Photo
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {galleryItems.map(item => (
          <div key={item.id} className="relative group bg-dark-800 rounded-xl border border-white/5 overflow-hidden shadow-lg">
            <div className="h-40 w-full overflow-hidden">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <input 
                type="text" 
                defaultValue={item.title} 
                className="w-full bg-dark-900 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
            <button className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500" title="Delete Image">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlogManager = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Blog Posts</h2>
          <p className="text-sm text-gray-400">Create and edit articles for your beauty journal.</p>
        </div>
        <button className="flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500 hover:bg-gold-500 hover:text-dark-950 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
          <Plus size={16} /> Create Post
        </button>
      </div>

      <div className="space-y-3">
        {blogPosts.map(post => (
          <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-dark-800 border border-white/5 p-4 rounded-xl hover:border-gold-500/30 transition-colors group gap-4">
            <div>
              <h3 className="font-bold text-white text-lg">{post.title}</h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs">
                <span className="text-gold-500 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded">{post.category}</span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-gray-400">{post.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white bg-dark-900 rounded-lg border border-white/5 transition-colors">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-400 bg-dark-900 rounded-lg border border-white/5 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesManager = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Services Menu</h2>
          <p className="text-sm text-gray-400">Manage pricing and service offerings across your branches.</p>
        </div>
        <button className="flex items-center gap-2 bg-gold-500/20 text-gold-400 border border-gold-500 hover:bg-gold-500 hover:text-dark-950 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-dark-900/50 border-b border-white/5 text-gray-400 text-sm">
              <th className="py-3 px-4 font-medium">Service Name</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Price</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-3 px-4 font-medium text-white">{service.name}</td>
                <td className="py-3 px-4 text-gray-400">{service.category}</td>
                <td className="py-3 px-4 text-gold-400 font-medium">{service.price}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-white rounded transition-colors bg-dark-900 border border-white/5">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-colors bg-dark-900 border border-white/5">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full flex flex-col animate-fade-in overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Website Content</h1>
          <p className="text-gray-400 text-sm md:text-base">Manage the public-facing content for your salon website.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-950 px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {isSaving ? <RefreshCw className="animate-spin" size={18} /> : saveSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
          {isSaving ? 'Saving Changes...' : saveSuccess ? 'Saved Successfully!' : 'Save All Changes'}
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start sm:items-center gap-3 text-emerald-400 animate-fade-in">
          <CheckCircle2 size={20} className="shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm font-medium">Your website content has been successfully updated and published to the live site.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-800 p-1 rounded-xl w-full max-w-xl mb-8 overflow-x-auto custom-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'gallery' ? 'bg-dark-900 text-white shadow-sm border border-white/5' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
        >
          <Image size={16} /> Gallery
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'blog' ? 'bg-dark-900 text-white shadow-sm border border-white/5' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
        >
          <FileText size={16} /> Blog Posts
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'services' ? 'bg-dark-900 text-white shadow-sm border border-white/5' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
        >
          <Scissors size={16} /> Services
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 pb-12">
        {activeTab === 'gallery' && renderGalleryManager()}
        {activeTab === 'blog' && renderBlogManager()}
        {activeTab === 'services' && renderServicesManager()}
      </div>
    </div>
  );
};

export default WebsiteContentManager;
