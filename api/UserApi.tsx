import AxiosClient from "./AxiosClient";

const UserApi = {
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
  pushingChatMsg: (data: any) => {
    const url = "/api/send_message/";
    return AxiosClient.post(url, data);
  },
  getMsgHistory: (data: any) => {
    const url = "api/chat_history/";
    return AxiosClient.post(url, data);
  },
  getUsername: () => {
    const url = "/api/get_username/";
    return AxiosClient.get(url);
  },
};

export default UserApi;
