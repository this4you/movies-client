import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

export const AUTH_LOCAL_STORAGE_TOKEN = 'auth_token';
export const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL as string });

const AxiosInterceptorProvider = ({ children }) => {
    const [isAxiosReady, setIsAxiosReady] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        const reqInterceptor = request => {
            const token = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);
            if (token) {
                request.headers.common["Authorization"] = token;
            }
            return request;
        }

        const resInterceptor = response => {
            debugger
            enqueueSnackbar("Response!");
            console.log("RESPONSE");
            return response;
        }

        const errInterceptor = error => {
            console.log("ERROR");
            return Promise.reject(error);
        }


        const interceptorRes = instance.interceptors.response.use(resInterceptor, errInterceptor);
        const interceptorReq = instance.interceptors.request.use(reqInterceptor);

        setIsAxiosReady(true);

        return () => {
            instance.interceptors.response.eject(interceptorReq)
            instance.interceptors.response.eject(interceptorRes)
        };

    }, [enqueueSnackbar])

    return isAxiosReady ? children : <div></div>;
}

export default AxiosInterceptorProvider;