import AxiosClient from "./AxiosClient";

const UserApi = {
  getUser: (id: any) => {
    const url = `users/${id}`;
    return AxiosClient.get(url);
  },

  signUp: (data: any) => {
    const url = "/api/register/";
    return AxiosClient.post(url, data);
  },

  signIn: (data: any) => {
    const url = "/api/login/";
    return AxiosClient.post(url, data);
  },

  signOut: () => {
    const url = "/api/logout/";
    return AxiosClient.get(url);
  },
  facebookPost: (data: any) => {
    const url = "rest-auth/facebook/";
    return AxiosClient.post(url, data);
  },
  googlePost: (data: any) => {
    const url = "/rest-auth/google/";
    return AxiosClient.post(url, data);
  },
};

export default UserApi;
