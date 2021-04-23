import axios from "axios";
import queryString from "query-string";

export const baseUrl = 'http://13.55.8.176:8080'

const AxiosClient = axios.create({
    baseURL: `${baseUrl}/`,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config) => {
  if(localStorage.token){
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
    }
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  }
  
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default AxiosClient;
