import axios from 'axios';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,  // Send cookies/auth headers cross-origin (required for CORS with credentials)
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && !config.skipAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
                    refresh: refreshToken
                });
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export const login = async (username, password) => {
    const response = await api.post('token/', { username, password });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const getProjects = () => api.get('projects/');
export const getServices = () => api.get('services/services/');
export const getTechnologies = () => api.get('services/technologies/');
export const getCategorizedTechnologies = () => api.get('services/technologies/categorized/');
export const getAbout = () => api.get('about/');
export const calculateEstimate = (data) => api.post('estimation/calculate/', data);
export const getEstimationRules = () => api.get('estimation/rules/');

export const sendChatMessage = (message) => api.post('chatbot/', { message });
export const getSiteConfig = () => api.get('config/');
export const getGlobalData = () => api.get('config/global-data/');

// Cart API
export const getCart = () => api.get('cart/');
export const addToCart = (serviceSlug, quantity) => api.post('cart/add_item/', { service_slug: serviceSlug, quantity });
export const submitContact = (data) => api.post('contact/', data, { skipAuth: true });

export const submitPrivacyConsent = (status) => api.post('config/privacy-consent/', { status });

// ===== NEW BACKEND INTEGRATIONS =====

// Theme API
export const getUserTheme = () => api.get('theme/user/');
export const updateUserTheme = (themeData) => api.post('theme/user/', themeData);
export const getGlobalTheme = () => api.get('theme/global/');
export const updateGlobalTheme = (themeData) => api.post('theme/global/', themeData);

// Colors API
export const getColorPalettes = () => api.get('colors/palettes/');
export const getActiveColorPalettes = () => api.get('colors/palettes/active/');
export const getDefaultColorPalette = () => api.get('colors/palettes/default/');
export const createColorPalette = (paletteData) => api.post('colors/palettes/', paletteData);
export const setDefaultPalette = (id) => api.post(`colors/palettes/${id}/set_default/`);

export const getColorSchemes = () => api.get('colors/schemes/');
export const getColorSchemesByTheme = (themeType) => api.get(`colors/schemes/by_theme/?type=${themeType}`);

export const getCustomColors = () => api.get('colors/custom/');
export const getCustomColorsByCategory = (category) => api.get(`colors/custom/by_category/?category=${category}`);
export const getCSSVariables = () => api.get('colors/custom/css_variables/');

export const getGradientPresets = () => api.get('colors/gradients/');
export const getActiveGradients = () => api.get('colors/gradients/active/');

// Cloudinary API
export const uploadToCloudinary = (file, folder = 'uploads', resourceType = 'auto') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('resource_type', resourceType);

    return api.post('cloudinary/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteFromCloudinary = (publicId, resourceType = 'image') =>
    api.delete('cloudinary/delete/', { data: { public_id: publicId, resource_type: resourceType } });

// Enhanced Services API
export const createService = (serviceData) => api.post('services/', serviceData);
export const getServiceBySlug = (slug) => api.get(`services/${slug}/`);

// Enhanced About API
export const createAbout = (aboutData) => {
    // Support both JSON and FormData
    const headers = aboutData instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };

    return api.post('about/', aboutData, { headers });
};

// Enhanced Projects API
export const createProject = (projectData) => api.post('projects/', projectData);
export const deleteProject = (id) => api.delete(`projects/${id}/`);

export default api;

