import axios from 'axios';
export const AUTH_LOCAL_STORAGE_TOKEN = 'auth_token';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL as string });


instance.interceptors.request.use(function (request) {
    const token = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);
    if (token) {
        request.headers.common["Authorization"] = token;
    }
    return request;
});

export default instance