import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User Signup
export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
};

// User Login
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};
