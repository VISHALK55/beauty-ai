const envUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (envUrl ? envUrl.replace(/\/$/, '') : 'https://api.beautyai.makeup');

export const api = {

    getSalons: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons`);
            if (!res.ok) throw new Error('Failed to fetch salons');
            const data = await res.json();
            
            const salonsMap = {};
            if (data && Array.isArray(data)) {
                data.forEach(salon => {
                    if (salon.sk && salon.sk !== 'METADATA') return;
                    salonsMap[salon.id] = {
                        ...salon,
                        image: salon.image || salon.heroImage || salon.hero_image,
                        streetAddress: salon.address || salon.city || ''
                    };
                });
            } else if (data && typeof data === 'object') {
                // Handle cases where the API might return an object directly or a different shape
                const arr = data.salons || (Object.values(data));
                if (Array.isArray(arr)) {
                    arr.forEach(salon => {
                        if (salon.sk && salon.sk !== 'METADATA') return;
                        salonsMap[salon.id] = {
                            ...salon,
                            image: salon.image || salon.heroImage || salon.hero_image,
                            streetAddress: salon.address || salon.city || ''
                        };
                    });
                }
            }
            return salonsMap;
        } catch (e) {
            console.error('API Error:', e);
            throw e;
        }
    },

    getSalon: async (id) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${id}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error('Failed to fetch salon');
            const data = await res.json();
            
            if (data) {
                 return {
                    ...data,
                    image: data.hero_image || data.image,
                    streetAddress: data.address || data.city || ''
                };
            }
            return null;
        } catch (e) {
            console.error('API Error:', e);
            throw e;
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

    createAppointment: async (salonId, data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${salonId}/appointments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
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

    getGallery: async (salonId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/${salonId}/gallery`);
            if (!res.ok) throw new Error('Failed to fetch gallery');
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return [];
        }
    }
}
