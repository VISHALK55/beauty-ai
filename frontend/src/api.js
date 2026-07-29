import { salonsDatabase } from './salonsData';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://80oueey8cc.execute-api.us-east-1.amazonaws.com';

export const api = {
    getSalons: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons`);
            if (!res.ok) throw new Error('Failed to fetch salons');
            const data = await res.json();
            
            const salonsMap = {};
            data.forEach(salon => {
                // Merge with static data for UI fields not yet in DB (images, ratings, neighborhoods)
                const staticData = salonsDatabase[salon.id] || {};
                salonsMap[salon.id] = {
                    ...salon,
                    city: staticData.city || 'Gaya',
                    rating: staticData.rating || '4.5',
                    reviews: staticData.reviews || 10,
                    image: staticData.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
                    neighborhoods: staticData.neighborhoods || ['Local Area'],
                    phone: staticData.phone || '+91 90000 00000',
                    streetAddress: salon.address || staticData.streetAddress || ''
                };
            });
            return salonsMap;
        } catch (e) {
            console.error('API Error, falling back to static data:', e);
            return salonsDatabase;
        }
    },
    getSalon: async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/salons/` + id);
            if (!res.ok) throw new Error('Failed to fetch salon');
            const salon = await res.json();
            const staticData = salonsDatabase[id] || {};
            return {
                ...salon,
                city: staticData.city || 'Gaya',
                rating: staticData.rating || '4.5',
                reviews: staticData.reviews || 10,
                image: staticData.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
                neighborhoods: staticData.neighborhoods || ['Local Area'],
                phone: staticData.phone || '+91 90000 00000',
                streetAddress: salon.address || staticData.streetAddress || ''
            };
        } catch (e) {
            console.error('API Error, falling back to static data:', e);
            return salonsDatabase[id] || salonsDatabase['pihu-makeover'];
        }
    }
}
