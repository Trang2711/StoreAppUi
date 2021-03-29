import AxiosClient from "./AxiosClient";

const ProductApi = {
  getAllProducts: () => {
    const url = `/products`;
    return AxiosClient.get(url);
  },
  getSpecifiedProduct: (id: any) => {
    const url = `/products/${id}`;
    return AxiosClient.get(url);
  },
};

export default ProductApi;
