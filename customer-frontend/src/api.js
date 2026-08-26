import axios from 'axios';

const API_BASE_URL = 'https://api.beautyai.makeup/api/v1';
const API_URL = 'https://api.beautyai.makeup';
const DEFAULT_SALON_ID = 'salon-pihu-makeover';

export const getSalonId = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('salon') || DEFAULT_SALON_ID;
};

export const fetchSalon = async (salonId) => {
    const response = await axios.get(`${API_BASE_URL}/salons/${salonId}`);
    return response.data;
};

export const fetchServices = async (salonId) => {
    const response = await axios.get(`${API_BASE_URL}/services?salonId=${salonId}`);
    return response.data;
};

export const createAppointment = async (appointmentData) => {
    // MOCK for local testing
    console.log("MOCK: Creating appointment", appointmentData);
    return new Promise((resolve) => setTimeout(() => resolve({ id: "mock-appt-123", ...appointmentData }), 1000));
};
