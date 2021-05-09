import axios from "axios";
import queryString from "query-string";
import UserApi from './UserApi'
import { token, expiry, setToken } from '../redux/features/loginSlice'

import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import ImgSlider from "../components/itemDetailScreen/itemProp/ImgSlider";

export const baseUrl = "http://13.55.8.176:8080";

const refreshToken = () => {
  console.log("Refesh token\n")
  return new Promise(resolve => {
    setTimeout(async() => {
      /**
       * get new token
       */
      // const newToken = await UserApi.getNewToken()
      // if(new)
      resolve('yes, this is a new token')
    }, 3000)
  })

}

const AxiosClient = axios.create({
  baseURL: `${baseUrl}/`,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

const isTokenExpried = false
let refreshTokenRequest: any = null

AxiosClient.interceptors.request.use(async (config) => {
  // const jwt_token = useAppSelector(token)
  // if (jwt_token !== '') {
  //   config.headers.common['Authorization'] = 'Bearer ' + jwt_token
  // }


  return config;
});

AxiosClient.interceptors.response.use(async (response) => {
  if (response) {
    // if(response.status === 401) {
    //   refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshToken()
    //   const newToken = await refreshTokenRequest
    //   refreshTokenRequest = null
            
    //   return response;
    // }

    if(response.status === 200) {
      return response.data
    }
  }
  return response;
},
  (error) => {
    throw error;
  }
);

export default AxiosClient;
