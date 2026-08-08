import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { api } from '../api';

const SalonContext = createContext();

export const SalonProvider = () => {
    const { salonId } = useParams();
    const [salon, setSalon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        
        const fetchSalon = async () => {
            setLoading(true);
            try {
                let sData = await api.getSalon(salonId);
                
                // Fallback mechanism if API fails or returns null for local dev/preview
                if (!sData) {
                    console.log("Using fallback data for salon: " + salonId);
                    sData = {
                        id: salonId,
                        name: salonId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                        city: "Gaya, Bihar 824231",
                        streetAddress: "Sujata Bypass Road, Near Govt. Middle School Rajapur, Bodhgaya",
                        theme: salonId === 'pihu-makeover' ? 'dark' : 'light' // Pihu is dark & gold, new salons get light luxury!
                    };
                }
                
                // Ensure required contact fields exist
                sData.phone = sData.phone || "+919113715558";
                sData.email = sData.email || "hello@" + salonId + ".com";
                sData.instagram = sData.instagram || (salonId === 'pihu-makeover' ? "https://www.instagram.com/pihu_makeover22?igsh=ODZqc3U0M2JsY3pt" : "https://www.instagram.com/" + salonId);
                sData.image = sData.heroImage || sData.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600";

                if (isMounted) {
                    setSalon(sData);
                    setError(null);
                }
            } catch (err) {
                console.error("Failed to fetch salon:", err);
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (salonId) {
            fetchSalon();
        }

        return () => { isMounted = false; };
    }, [salonId]);

    // Apply Theme Side Effect
    useEffect(() => {
        if (salon?.theme) {
            if (salon.theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        } else {
            // Default to dark mode for dashboard/un-tenant routes (which is the :root default)
            document.documentElement.removeAttribute('data-theme');
        }
        
        return () => {
            document.documentElement.removeAttribute('data-theme');
        };
    }, [salon?.theme]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black/90 text-[#d4af37]">
                <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !salon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-content">
                <h2 className="text-2xl font-serif text-accent mb-4">Salon Not Found</h2>
                <p className="text-muted">We couldn't find the salon you're looking for.</p>
                <a href="/" className="mt-8 px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-primary transition-colors rounded">Return Home</a>
            </div>
        );
    }

    return (
        <SalonContext.Provider value={{ salon, loading, error }}>
            <Outlet />
        </SalonContext.Provider>
    );
};

export const useSalon = () => useContext(SalonContext);
