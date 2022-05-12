import axios from 'axios';

const instance = axios.create({baseURL: process.env.REACT_APP_API_HOST as string});

export default instance