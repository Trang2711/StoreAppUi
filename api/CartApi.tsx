import AxiosClient from "./AxiosClient";

const CartApi = {
  getCart: (id: any) => {
    const url = `/carts/${id}`;
    return AxiosClient.get(url);
  },

  getAll: () => {
    const url = "/carts";
    return AxiosClient.get(url);
  },
};

export default CartApi;
