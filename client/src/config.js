const getApiUrl = () => {
    // 1. Check if an explicit environment variable is provided (Standard)
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // 2. Production auto-detection (Specific to this project's Railway setup)
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        // If we are on Vercel or a live site, but VITE_API_URL is missing,
        // we can try to default to the known Railway production backend
        return 'https://shyamvertex-production.up.railway.app';
    }

    // 3. Development Fallback
    return 'http://localhost:5000';
};

const API_URL = getApiUrl();

export default API_URL;
