import axios from 'axios';

const API_BASE_URL = 'https://8gdksjm9lj.execute-api.us-east-1.amazonaws.com/api/v1';
const API_URL = 'https://8gdksjm9lj.execute-api.us-east-1.amazonaws.com';
const DEFAULT_SALON_ID = 'salon-pihu-makeover';

export const getSalonId = async () => {
    return DEFAULT_SALON_ID;
};

export const fetchServices = async () => {
    const response = await axios.get(`${API_URL}/services?salonId=${DEFAULT_SALON_ID}`);
    return response.data;
};

export const createAppointment = async (appointmentData) => {
    // MOCK for local testing
    console.log("MOCK: Creating appointment", appointmentData);
    return new Promise((resolve) => setTimeout(() => resolve({ id: "mock-appt-123", ...appointmentData }), 1000));
};
