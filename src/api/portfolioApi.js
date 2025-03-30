import axios from 'axios';

const API_URL = 'https://portfolio-builder-production-8a98.up.railway.app';

// Create Portfolio
export const createPortfolio = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/portfolios`, userData, config);
    return response.data;
};

// getUserPortfolios
export const getUserPortfolios = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/portfolios`, config);
    return response;
};
