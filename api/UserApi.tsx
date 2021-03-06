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
  getInfo: () => {
    const url = "/api/get_info/";
    return AxiosClient.get(url);
  },
  changeInfo: (data: any) => {
    const url = "/api/change_info/";
    return AxiosClient.post(url, data);
  },
  confirmPassword: (data: any) => {
    const url = "/api/verify_password/";
    return AxiosClient.post(url, data);
  },
  getListOfChatCustomer: () => {
    const url = "/api/chat_customer/";
    return AxiosClient.get(url);
  },
  getListOfChatSeller: () => {
    const url = "api/chat_seller/";
    return AxiosClient.get(url);
  },
  getUserAvatar: (data: any) => {
    const url = "/api/get_avatar/";
    return AxiosClient.post(url, data);
  },
  addAddress: (data: any) => {
    const url = "/api/set_address/";
    return AxiosClient.post(url, data);
  },
  setAddress: (data: any) => {
    const url = "/api/order_address/";
    return AxiosClient.post(url, data);
  },
  makeStripePayment: (data: any) => {
    const url = "/api/payment/";
    return AxiosClient.post(url, data);
  },
  makePayment: (data: any) => {
    const url = "api/payment_cod/";
    return AxiosClient.post(url, data);
  }
};

export default UserApi;
