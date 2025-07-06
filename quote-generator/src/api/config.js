// API Configuration
const API_CONFIG = {
    // API Ninjas Quotes API
    API_NINJAS_BASE_URL: process.env.REACT_APP_API_NINJAS_BASE_URL,
    API_NINJAS_KEY: process.env.REACT_APP_API_NINJAS_KEY,

    // Request timeout
    TIMEOUT: 10000,

    // Default headers for API Ninjas
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': process.env.REACT_APP_API_NINJAS_KEY
    }
};

export default API_CONFIG;
