import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
    baseURL: 'https://969267d1a066.ngrok.io/',
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config) => {
    //config.headers.common['Authorization'] = AUTH_TOKEN;
    return config;
})

AxiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default AxiosClient;