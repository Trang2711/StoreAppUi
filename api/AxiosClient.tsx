import axios from "axios";
import queryString from "query-string";
import { setIsLogged } from '../redux/features/loginSlice'
import { useAppDispatch } from "../redux/app/hook";
import { AsyncStorage } from 'react-native';

export const baseUrl = "http://171.224.236.56:8120";

const AxiosClient = axios.create({
  baseURL: `${baseUrl}/`,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.common['Authorization'] = 'Token ' + token
  }

  return config;
});

AxiosClient.interceptors.response.use(async (response) => {
  if (response) {
    if(response.status === 401) {
      const dispatch = useAppDispatch()
      await AsyncStorage.removeItem('token')
      dispatch(setIsLogged(false))
      return response;
    }

    return response.data
  }
  return response;
},
  (error) => {
    throw error;
  }
);

export default AxiosClient;
