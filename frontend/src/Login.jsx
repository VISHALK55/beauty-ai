import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { api } from './api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login(username, password);
            if (response.token) {
                // Pass the whole response or token/role/salonId to AuthContext
                login(response.token, response.role, response.salonId);
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-gold-500/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-content mb-2">Partner Portal</h2>
                    <p className="text-muted">Log in to manage your salon, or access Super Admin tools.</p>
                </div>
                
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Salon ID (or 'admin')</label>
                        <input 
                            type="text" 
                            placeholder="e.g. pihu-makeover"
                            className="w-full bg-secondary border border-divider-strong rounded-xl px-4 py-3 text-content focus:outline-none focus:border-gold-500 transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Secure PIN / Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••"
                            className="w-full bg-secondary border border-divider-strong rounded-xl px-4 py-3 text-content tracking-widest focus:outline-none focus:border-gold-500 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-accent hover:bg-gold-400 text-primary font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
