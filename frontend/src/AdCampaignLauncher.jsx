import React, { useState, useEffect } from 'react';
import { Megaphone, Target, DollarSign, Calendar, CheckCircle2, Play, Upload, Settings } from 'lucide-react';
import { api } from './api';

export default function AdCampaignLauncher({ salonName, salonId }) {
  const [metaStatus, setMetaStatus] = useState('NOT_CONNECTED'); // NOT_CONNECTED, ASSET_SELECTION, READY, DRAFTING, DRAFTED, PUBLISHED
  const [campaignId, setCampaignId] = useState(null);
  
  // Asset State
  const [discoveredAssets, setDiscoveredAssets] = useState(null);
  const [selectedAdAccount, setSelectedAdAccount] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedInstagram, setSelectedInstagram] = useState('');
  
  // Campaign Form State
  const [campaignName, setCampaignName] = useState('Pihu Makeover - Bridal Makeup');
  const [objective, setObjective] = useState('LEADS');
  const [dailyBudget, setDailyBudget] = useState('300');
  const [duration, setDuration] = useState('3');
  const [location, setLocation] = useState('Bodh Gaya');
  const [latitude, setLatitude] = useState(24.6961);
  const [longitude, setLongitude] = useState(84.9911);
  const [radiusKm, setRadiusKm] = useState('15');
  const [ageMin, setAgeMin] = useState('18');
  const [ageMax, setAgeMax] = useState('45');
  const [gender, setGender] = useState('WOMEN'); // ALL, WOMEN, MEN
  
  // Creative Form State
  const [creativeImageUrl, setCreativeImageUrl] = useState('');
  const [adCreativeFile, setAdCreativeFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [primaryText, setPrimaryText] = useState('✨ Make your special day unforgettable!\nBridal • Engagement • Party Makeup\n📍 Bodh Gaya\n📲 Book your appointment today.');
  const [headline, setHeadline] = useState('Bridal Makeup at Pihu Makeover');
  const [callToAction, setCallToAction] = useState('SEND_MESSAGE');

  // Load status on mount
  useEffect(() => {
    // Check if coming back from OAuth
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('meta_connect') === 'success') {
      setMetaStatus('ASSET_SELECTION');
      fetchAssets();
    } else {
      fetchStatus();
    }
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/meta/status?businessId=${salonId}`);
      const data = await response.json();
      if (data.status) {
        setMetaStatus(data.status);
      }
    } catch (e) {
      console.error("Failed to fetch meta status", e);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/meta/assets?businessId=${salonId}`);
      const data = await response.json();
      setDiscoveredAssets(data);
      if (data.adAccounts && data.adAccounts.data && data.adAccounts.data.length > 0) {
        setSelectedAdAccount(data.adAccounts.data[0].account_id);
      }
      if (data.pages && data.pages.data && data.pages.data.length > 0) {
        setSelectedPage(data.pages.data[0].id);
      }
      if (data.connectedInstagramAccounts && data.connectedInstagramAccounts.data && data.connectedInstagramAccounts.data.length > 0) {
        setSelectedInstagram(data.connectedInstagramAccounts.data[0].id);
      }
    } catch (e) {
      console.error("Failed to fetch assets", e);
    }
  };

  const handleSaveAssets = async () => {
    try {
      await fetch('http://localhost:8080/api/v1/meta/select-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: salonId,
          adAccountId: selectedAdAccount,
          pageId: selectedPage,
          instagramUserId: selectedInstagram
        })
      });
      setMetaStatus('READY');
    } catch (e) {
      alert("Error saving assets.");
    }
  };

  const handleConnectMeta = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/meta/connect?businessId=${salonId}`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      alert("Error connecting to Meta");
    }
  };

  const handleReview = () => {
    setMetaStatus('REVIEW');
  };

  const handleCreateDraft = async () => {
    setIsUploading(true);
    let finalImageUrl = creativeImageUrl;
    
    // Upload image if file provided
    if (adCreativeFile) {
      try {
        const uploadData = await api.getUploadUrl(adCreativeFile.name, adCreativeFile.type);
        await api.uploadFileToS3(uploadData.uploadUrl, adCreativeFile, adCreativeFile.type);
        finalImageUrl = uploadData.fileUrl || uploadData.uploadUrl.split('?')[0];
        setCreativeImageUrl(finalImageUrl);
      } catch (e) {
        alert("Failed to upload image.");
        setIsUploading(false);
        return;
      }
    }

    try {
      setMetaStatus('CREATING');
      const payload = {
        salonId,
        name: campaignName,
        objective,
        dailyBudget: parseFloat(dailyBudget),
        durationDays: parseInt(duration),
        currency: 'INR',
        latitude,
        longitude,
        radiusKm: parseInt(radiusKm),
        ageMin: parseInt(ageMin),
        ageMax: parseInt(ageMax),
        gender,
        creativeImageUrl: finalImageUrl,
        primaryText,
        headline,
        callToAction
      };
      
      const response = await fetch('http://localhost:8080/api/v1/meta/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (data.success) {
        setCampaignId(data.campaignId);
        setMetaStatus('CREATED_PAUSED');
      } else {
        alert("Failed to create campaign: " + data.message);
        setMetaStatus('READY');
      }
    } catch (error) {
      alert("Error reaching backend.");
      setMetaStatus('READY');
    }
    setIsUploading(false);
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/meta/campaigns/${campaignId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salonId })
      });
      const data = await response.json();
      if (data.success) {
        setMetaStatus('PUBLISHED');
      } else {
        alert("Failed to publish: " + data.message);
      }
    } catch (e) {
      alert("Network error while publishing.");
    }
  };

  if (['NOT_CONNECTED', 'META_CONNECTED', 'FACEBOOK_PAGE_REQUIRED', 'INSTAGRAM_REQUIRED'].includes(metaStatus)) {
    const isMetaConn = metaStatus !== 'NOT_CONNECTED';
    const isPageReq = metaStatus === 'FACEBOOK_PAGE_REQUIRED';
    const isIgReq = metaStatus === 'INSTAGRAM_REQUIRED';

    return (
      <div className="glass-panel p-10 border border-accent-light rounded-2xl bg-dark-900 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Megaphone size={48} className="text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-content mb-2">
            {isMetaConn ? 'Meta Ads account connected' : 'Real Meta Ads Integration'}
          </h2>
          {isPageReq && <h3 className="text-xl text-red-400 font-bold mb-2">Facebook Page required</h3>}
          {isIgReq && <h3 className="text-xl text-red-400 font-bold mb-2">Instagram Professional Account required</h3>}
          
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            {isMetaConn 
              ? "To create Instagram ads through BeautyAI, connect your business's Facebook Page to your Instagram Professional account and give BeautyAI the required Meta permissions." 
              : "Connect your Facebook and Instagram accounts to launch real targeted ad campaigns directly from your dashboard."}
          </p>
          
          {!isMetaConn && (
            <button
              onClick={handleConnectMeta}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all"
            >
              Connect Meta Account
            </button>
          )}
        </div>

        {isMetaConn && (
          <div className="bg-dark-950 p-6 rounded-xl border border-divider">
            <h4 className="font-bold text-content mb-4 uppercase text-xs tracking-wider">Connection Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="text-sm text-content">Meta account connected</span>
              </div>
              <div className="flex items-center gap-3">
                {metaStatus !== 'META_CONNECTED' ? <CheckCircle2 size={18} className="text-green-500" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-muted" />}
                <span className="text-sm text-content">Ad Account connected</span>
              </div>
              <div className="flex items-center gap-3">
                {(metaStatus === 'INSTAGRAM_REQUIRED' || metaStatus === 'READY_FOR_INSTAGRAM_ADS') ? <CheckCircle2 size={18} className="text-green-500" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-muted" />}
                <span className="text-sm text-content">Facebook Page connected</span>
              </div>
              <div className="flex items-center gap-3">
                {metaStatus === 'READY_FOR_INSTAGRAM_ADS' ? <CheckCircle2 size={18} className="text-green-500" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-muted" />}
                <span className="text-sm text-content">Instagram Professional Account connected</span>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-divider">
                {metaStatus === 'READY_FOR_INSTAGRAM_ADS' ? <CheckCircle2 size={18} className="text-green-500" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-muted" />}
                <span className="text-sm font-bold text-content">Ready for Instagram advertising</span>
              </div>
            </div>
            <button
              onClick={handleConnectMeta}
              className="mt-6 w-full py-2 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-xl text-sm transition-all border border-divider"
            >
              Reconnect to Meta
            </button>
          </div>
        )}
      </div>
    );
  }

  if (metaStatus === 'ASSET_SELECTION') {
    return (
      <div className="glass-panel p-6 border border-accent-light rounded-2xl bg-dark-900">
        <h2 className="text-xl font-serif text-content mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Meta Connected!</h2>
        <p className="text-muted text-sm mb-6">Please select the assets you want to link to this salon.</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Ad Account</label>
            <select 
              value={selectedAdAccount} onChange={e => setSelectedAdAccount(e.target.value)}
              className="w-full bg-dark-950 border border-divider p-3 rounded-lg text-sm text-content outline-none">
              {discoveredAssets?.adAccounts?.data?.map(acc => (
                <option key={acc.account_id} value={acc.account_id}>{acc.name} ({acc.account_id})</option>
              )) || <option value="">No Ad Accounts Found</option>}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Facebook Page</label>
            <select 
              value={selectedPage} onChange={e => setSelectedPage(e.target.value)}
              className="w-full bg-dark-950 border border-divider p-3 rounded-lg text-sm text-content outline-none">
              {discoveredAssets?.pages?.data?.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
              )) || <option value="">No Pages Found</option>}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Instagram Professional Account</label>
            <select 
              value={selectedInstagram} onChange={e => setSelectedInstagram(e.target.value)}
              className="w-full bg-dark-950 border border-divider p-3 rounded-lg text-sm text-content outline-none">
              {discoveredAssets?.connectedInstagramAccounts?.data?.length === 0 ? (
                 <option value="">No Instagram Accounts Found - Please link to your Facebook Page in Meta</option>
              ) : discoveredAssets?.connectedInstagramAccounts?.data?.map(ig => (
                 <option key={ig.id} value={ig.id}>{ig.username || ig.id}</option>
              )) || <option value="">[ None Selected ]</option>}
            </select>
          </div>
        </div>

        <button onClick={handleSaveAssets} className="px-6 py-3 bg-accent text-primary font-bold rounded-xl text-sm w-full">
          SAVE ASSETS
        </button>
      </div>
    );
  }

  if (metaStatus === 'REVIEW') {
    return (
      <div className="glass-panel p-8 border border-accent-light rounded-2xl bg-dark-900 max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif text-content mb-2 text-center">Review Campaign Summary</h2>
        <p className="text-muted text-sm text-center mb-6">Review your settings before creating the campaign.</p>
        
        <div className="bg-dark-950 p-6 rounded-xl border border-divider-strong space-y-4 mb-6">
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Campaign</span>
            <span className="text-content font-bold">{campaignName}</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Instagram</span>
            <span className="text-content font-bold">@pihu_makeover22</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Location</span>
            <span className="text-content font-bold text-right">{location}<br/>Radius: {radiusKm} km</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Budget</span>
            <span className="text-accent font-bold">₹{dailyBudget} / day</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Duration</span>
            <span className="text-content font-bold">{duration} days</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Planned budget</span>
            <span className="text-accent font-bold">₹{parseFloat(dailyBudget) * parseInt(duration)}</span>
          </div>
          <div className="flex justify-between border-b border-divider pb-2">
            <span className="text-muted">Platform</span>
            <span className="text-content font-bold">Instagram</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-muted">Status after creation</span>
            <span className="text-yellow-400 font-bold">PAUSED</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setMetaStatus('READY')} className="flex-1 py-3 bg-dark-800 text-content font-bold rounded-xl border border-divider">
            Cancel
          </button>
          <button onClick={handleCreateDraft} className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            Create Paused Campaign
          </button>
        </div>
      </div>
    );
  }

  if (metaStatus === 'CREATED_PAUSED') {
    return (
      <div className="glass-panel p-8 border border-yellow-500/50 rounded-2xl bg-dark-900 max-w-2xl mx-auto text-center">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-content mb-2">Campaign created successfully and is PAUSED.</h2>
        <p className="text-muted text-sm mb-6">No delivery will occur until you activate it.</p>
        
        <button onClick={handlePublish} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          Activate Campaign
        </button>
      </div>
    );
  }

  if (metaStatus === 'PUBLISHED') {
    return (
      <div className="glass-panel p-10 border border-green-500/50 rounded-2xl text-center bg-dark-900">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-content mb-2">Campaign Published!</h2>
        <p className="text-muted text-sm mb-6">Your real Meta campaign is now pending review and will be active shortly.</p>
        <button onClick={() => setMetaStatus('READY')} className="px-8 py-3 bg-accent text-primary font-bold rounded-xl text-sm">
          Create Another Campaign
        </button>
      </div>
    );
  }

  // READY / DRAFTING State
  return (
    <div className="glass-panel p-6 border border-accent-light rounded-2xl bg-dark-900">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-divider">
        <h2 className="text-xl font-serif text-content flex items-center gap-2">
          <Megaphone className="text-accent" /> Meta Campaign Builder
        </h2>
        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
          Real Mode Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Campaign Name</label>
            <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Objective</label>
              <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none">
                <option value="LEADS">Leads</option>
                <option value="OUTCOME_TRAFFIC">Traffic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Daily Budget (₹)</label>
              <input type="number" value={dailyBudget} onChange={e => setDailyBudget(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Duration (Days)</label>
              <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
            </div>
          </div>
          
          <div className="border-t border-divider pt-4 mt-2">
            <h3 className="text-sm font-bold text-content mb-3 flex items-center gap-1"><Target size={14} className="text-accent"/> Targeting</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs font-bold text-muted mb-1">Location Name</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted mb-1">Radius (KM)</label>
                <select value={radiusKm} onChange={e => setRadiusKm(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none">
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="15">15 km</option>
                  <option value="20">20 km</option>
                  <option value="25">25 km</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-muted mb-1">Age Min</label>
                <input type="number" value={ageMin} onChange={e => setAgeMin(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted mb-1">Age Max</label>
                <input type="number" value={ageMax} onChange={e => setAgeMax(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted mb-1">Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none">
                  <option value="ALL">All</option>
                  <option value="WOMEN">Women</option>
                  <option value="MEN">Men</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Creative Image</label>
            <div className="bg-dark-950 border border-divider border-dashed p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden h-32">
              <input type="file" onChange={e => setAdCreativeFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
              {adCreativeFile ? (
                <span className="text-green-400 font-bold text-sm flex items-center gap-1"><CheckCircle2 size={16}/> {adCreativeFile.name} Selected</span>
              ) : (
                <>
                  <Upload className="text-muted mb-2" size={24} />
                  <span className="text-xs text-muted">Click to upload image</span>
                </>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Primary Text</label>
            <textarea value={primaryText} onChange={e => setPrimaryText(e.target.value)} rows="3" className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none resize-none"></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Headline</label>
              <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Call to Action</label>
              <select value={callToAction} onChange={e => setCallToAction(e.target.value)} className="w-full bg-dark-950 border border-divider p-2.5 rounded-lg text-sm text-content outline-none">
                <option value="SEND_MESSAGE">Send Message</option>
                <option value="LEARN_MORE">Learn More</option>
                <option value="BOOK_TRAVEL">Book Now</option>
                <option value="CONTACT_US">Contact Us</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-divider flex justify-end">
        <button
          onClick={handleReview}
          disabled={metaStatus === 'CREATING' || isUploading}
          className={`px-8 py-3 bg-accent text-primary font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 ${(metaStatus === 'CREATING' || isUploading) ? 'opacity-70 cursor-wait' : 'hover:bg-accent-light'}`}
        >
          {metaStatus === 'CREATING' ? 'Creating...' : 'Review Campaign'}
        </button>
      </div>
    </div>
  );
}
