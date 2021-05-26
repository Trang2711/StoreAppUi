import AxiosClient from "./AxiosClient";

const CartApi = {
  changeCart: (data: any) => {
    const url = `/api/change_cart/`;
    return AxiosClient.post(url, data);
  },

  getAll: () => {
    const url = "/api/get_cart/";
    return AxiosClient.get(url);
  },
};

export default CartApi;
