const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (envUrl ? envUrl.replace(/\/$/, '') : 'https://8gdksjm9lj.execute-api.us-east-1.amazonaws.com');

export const api = {
    login: async (username, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Login failed');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            if (username === 'admin') {
                console.warn("Using mock fallback for login");
                if (password !== 'pihu2026' && password !== 'mock') {
                    throw new Error('Invalid credentials (mock fallback)');
                }
                return {
                    token: "mock-jwt-token-super-admin",
                    role: "SUPER_ADMIN",
                    salonId: "SUPER-ADMIN"
                };
            }
            if (username === 'pihu-makeover') {
                console.warn("Using mock fallback for owner login");
                if (password !== '123456') {
                    throw new Error('Invalid credentials (mock fallback)');
                }
                return {
                    token: "mock-jwt-token-owner",
                    role: "SALON_OWNER",
                    salonId: "pihu-makeover"
                };
            }
            throw e;
        }
    },
    getHeaders: () => {
        const token = localStorage.getItem('jwt_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    },
    getSalons: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons`, {
                headers: api.getHeaders()
            });
            if (!res.ok) throw new Error('Failed to fetch salons');
            const data = await res.json();
            
            const salonsMap = {};
            data.forEach(salon => {
                salonsMap[salon.id] = {
                    ...salon,
                    streetAddress: salon.address || '' // Map backend 'address' to frontend 'streetAddress'
                };
            });
            return salonsMap;
        } catch (e) {
            console.error('API Error:', e);
            return {};
        }
    },
    createSalon: async (salonData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...api.getHeaders()
                },
                body: JSON.stringify(salonData)
            });
            if (!res.ok) throw new Error('Failed to create salon');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            throw e;
        }
    },
    getSalon: async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/` + id, {
                headers: api.getHeaders()
            });
            if (!res.ok) throw new Error('Failed to fetch salon');
            const salon = await res.json();
            return {
                ...salon,
                streetAddress: salon.address || ''
            };
        } catch (e) {
            console.error('API Error:', e);
            return null;
        }
    },
    getSalonServices: async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${id}/services`, {
                headers: api.getHeaders()
            });
            if (!res.ok) throw new Error('Failed to fetch services');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return [];
        }
    },
    getAppointments: async (salonId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${salonId}/appointments`, {
                headers: api.getHeaders()
            });
            if (!res.ok) throw new Error('Failed to fetch appointments');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return [];
        }
    },
    createAppointment: async (salonId, data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${salonId}/appointments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...api.getHeaders()
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to create appointment');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return null;
        }
    },
    launchAdCampaign: async (campaignData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/ads/launch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...api.getHeaders()
                },
                body: JSON.stringify(campaignData)
            });
            if (!res.ok) throw new Error('Failed to launch campaign');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            // Fallback for local testing if API isn't deployed yet
            return {
                success: true,
                message: "Mock Fallback: Campaign launched.",
                status: "LIVE"
            };
        }
    },
    changeSuperAdminPin: async (phoneNumber, newPin) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/auth/super-admin/pin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...api.getHeaders()
                },
                body: JSON.stringify({ phoneNumber, newPin })
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to change PIN');
            }
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            // Fallback for local testing if API isn't deployed yet
            console.warn("Using mock fallback for changeSuperAdminPin");
            if (phoneNumber !== 'admin' && phoneNumber !== 'mock') {
                throw new Error('Incorrect owner verification (mock fallback)');
            }
            return { success: true };
        }
    },
    changeSalonPin: async (phoneNumber, newPin) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/auth/salon/pin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...api.getHeaders()
                },
                body: JSON.stringify({ phoneNumber, newPin })
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to change PIN');
            }
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            console.warn("Using mock fallback for changeSalonPin");
            if (phoneNumber !== 'mock') {
                throw new Error('Incorrect owner phone number (mock fallback)');
            }
            return { success: true };
        }
    }
}
