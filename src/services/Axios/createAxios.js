import axios from 'axios';

const defaultConfig = {
    withAuthToken: true,
};

export function createAxios(config) {
    const configValues = config ? { ...defaultConfig, ...config } : defaultConfig;

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
    };

    // const baseURL = 'http://localhost:8088/api/v1.0'
    const baseURL = 'http://54.179.84.136:8088/api/v1.0';


    const client = axios.create({
        baseURL,
        headers,
    });

    if (configValues.withAuthToken) {
        client.interceptors.request.use((requestConfig) => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                return requestConfig;
            }
            if (requestConfig.headers) {
                requestConfig.headers.Authorization = `Bearer ${accessToken}`;
            }

            return requestConfig;
        });
    }

    return client;
}