import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const _api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 400;
    }
})

_api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

_api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/api/refresh/`, {withCredentials: true})
            localStorage.setItem('token', response.data.access_token)
            return _api.request(originalRequest)
        } catch (e) {
            console.log('Not auth');
        }
    }
})
