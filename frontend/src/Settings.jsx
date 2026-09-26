import React, { useState } from 'react';
import { Settings as SettingsIcon, CheckCircle2, Lock, KeyRound } from 'lucide-react';
import { api } from './api';
import { useAuth } from './context/AuthContext';

export default function Settings() {
    const { userRole, salonId } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const [metaAppId, setMetaAppId] = useState('');
    const [metaAppSecret, setMetaAppSecret] = useState('');
    const [metaAdAccountId, setMetaAdAccountId] = useState('');
    const [metaPageId, setMetaPageId] = useState('');
    const [metaStatus, setMetaStatus] = useState('idle');

    if (userRole !== 'SALON_OWNER' && userRole !== 'SUPER_ADMIN') {
        return (
            <div className="flex items-center justify-center h-full text-red-500 font-bold">
                Access Denied.
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPin !== confirmPin) {
            setErrorMessage("New PIN and Confirm PIN do not match.");
            setStatus('error');
            return;
        }

        if (newPin.length < 6) {
            setErrorMessage("New PIN must be at least 6 characters.");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            await api.changeSalonPin(phoneNumber, newPin);
            setStatus('success');
            setPhoneNumber('');
            setNewPin('');
            setConfirmPin('');
        } catch (error) {
            setErrorMessage(error.message || "Failed to change PIN.");
            setStatus('error');
        }
    };

    const handleMetaSubmit = async (e) => {
        e.preventDefault();
        setMetaStatus('loading');
        try {
            await api.updateMetaSettings(salonId, {
                metaAccessToken: metaAppId,
                metaAdAccountId: metaAdAccountId,
                metaPageId: metaPageId,
                metaAppSecret: metaAppSecret
            });
            setMetaStatus('success');
        } catch (error) {
            console.error(error);
            setMetaStatus('error');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto h-full overflow-y-auto pb-20">
            <div className="flex items-center gap-3 mb-8">
                <SettingsIcon size={32} className="text-accent" />
                <div>
                    <h1 className="text-3xl font-serif text-content">Account Settings</h1>
                    <p className="text-muted">Manage your salon account security and credentials.</p>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-divider-strong relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h2 className="text-xl font-bold text-content mb-6 flex items-center gap-2">
                    <KeyRound className="text-accent" size={20}/>
                    Change Secure PIN
                </h2>

                {status === 'success' && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-xl mb-6 flex items-start gap-3">
                        <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="font-bold text-sm">PIN successfully updated!</p>
                            <p className="text-xs opacity-80 mt-1">Please use your new PIN the next time you log in to {salonId}.</p>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">Owner Phone Number</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input 
                                type="text" 
                                className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="e.g. 9876543210"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-divider-strong">
                        <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">New PIN</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="••••••"
                                value={newPin}
                                onChange={(e) => setNewPin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">Confirm New PIN</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="••••••"
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className={`mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-content font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <SettingsIcon size={18} />
                        )}
                        {status === 'loading' ? 'Updating...' : 'Update Secure PIN'}
                    </button>
                </form>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-divider-strong relative overflow-hidden mt-8">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
                
                <h2 className="text-xl font-bold text-content mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Meta (Facebook/Instagram) Ads Integration
                </h2>
                <p className="text-sm text-muted mb-6">Connect your Meta Business Manager to publish ads directly from Beauty AI.</p>

                {metaStatus === 'success' && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-xl mb-6 flex items-start gap-3">
                        <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="font-bold text-sm">Meta Integration Saved!</p>
                            <p className="text-xs opacity-80 mt-1">Your Ad Campaign Launcher is now officially connected to the live Meta API.</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleMetaSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">System User Access Token</label>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input 
                                    type="password" 
                                    className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="EAAL..."
                                    value={metaAppId}
                                    onChange={(e) => setMetaAppId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">Ad Account ID</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="act_123456789"
                                    value={metaAdAccountId}
                                    onChange={(e) => setMetaAdAccountId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">Facebook Page ID</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="987654321"
                                    value={metaPageId}
                                    onChange={(e) => setMetaPageId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-muted mb-1.5 uppercase tracking-wider">Instagram Account ID (Optional)</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-secondary border border-divider-strong rounded-xl pl-12 pr-4 py-3 text-content focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="178414..."
                                    value={metaAppSecret}
                                    onChange={(e) => setMetaAppSecret(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={metaStatus === 'loading'}
                        className={`mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-content font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {metaStatus === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <SettingsIcon size={18} />
                        )}
                        {metaStatus === 'loading' ? 'Verifying...' : 'Save Meta Credentials'}
                    </button>
                </form>
            </div>
        </div>
    );
}
