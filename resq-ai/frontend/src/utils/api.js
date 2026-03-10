import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8888/api',
    timeout: 15000,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.warn('API Error:', error.message);
        return Promise.reject(error);
    }
);

export const donationAPI = {
    verify: (data) => API.post('/donate/verify', data),
    create: (data) => API.post('/donate', data),
    getAll: () => API.get('/donate'),
    updateStatus: (id, status) => API.patch(`/donate/${id}/status`, { status }),
};

export const aiAPI = {
    shelfLife: (data) => API.post('/ai/shelf-life', data),
    imageCheck: (formData) => API.post('/ai/image-check', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    wastePredict: (data) => API.post('/ai/waste-predict', data),
};

export const riderAPI = {
    getFeed: () => API.get('/rider/feed'),
    accept: (data) => API.post('/rider/accept', data),
    complete: (data) => API.post('/rider/complete', data),
    leaderboard: () => API.get('/rider/leaderboard'),
    create: (data) => API.post('/rider', data),
};

export const ngoAPI = {
    matchDemand: (data) => API.post('/ngos/match-demand', data),
    getAll: () => API.get('/ngos'),
    create: (data) => API.post('/ngos', data),
};

export const communityAPI = {
    createPost: (data) => API.post('/community/post', data),
    getFeed: () => API.get('/community/feed'),
    like: (id) => API.patch(`/community/${id}/like`),
    comment: (id, data) => API.post(`/community/${id}/comment`, data),
};

export const corporateAPI = {
    predictSurplus: (data) => API.post('/corporate/predict-surplus', data),
    getDashboard: (name) => API.get(`/corporate/dashboard/${name}`),
};

export const adminAPI = {
    getStats: () => API.get('/admin/stats'),
    exportReport: () => API.get('/admin/export-report', { responseType: 'blob' }),
    getWasteAnalytics: () => API.get('/admin/waste-analytics'),
    wastePredict: (data) => API.post('/admin/waste-predict', data),
};

export const emailAPI = {
    sendCertificate: (data) => API.post('/email/send-certificate', data),
};

export const logisticsAPI = {
    match: (data) => API.post('/logistics/match', data),
    getActive: () => API.get('/logistics/active'),
};

export default API;