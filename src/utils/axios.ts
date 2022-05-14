import axios from 'axios';
export const AUTH_LOCAL_STORAGE_TOKEN = 'auth_token';

const instance = axios.create({baseURL: process.env.REACT_APP_API_BASE_URL as string});

const token = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);

if (token) {
    instance.defaults.headers.common["Authorization"] = token;
}

export default instance