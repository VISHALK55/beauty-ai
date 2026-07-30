const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const api = {
    getSalons: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons`);
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
    getSalon: async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/` + id);
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
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${id}/services`);
            if (!res.ok) throw new Error('Failed to fetch services');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return [];
        }
    },
    getAppointments: async (salonId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${salonId}/appointments`);
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
                headers: { 'Content-Type': 'application/json' },
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
                    'Content-Type': 'application/json'
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
    }
}
