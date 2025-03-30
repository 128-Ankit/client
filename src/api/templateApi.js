import axios from 'axios';

const API_URL = 'https://portfolio-builder-production-8a98.up.railway.app';

// getTemplates
export const getTemplates = async () => {
    const response = await axios.get(`${API_URL}/templates`);
    return response.data;
};

// getTemplatesId
export const getTemplatesId = async (id) => {
    const response = await axios.get(`${API_URL}/templates/${id}`);
    return response.data;
};
// User Login
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};
