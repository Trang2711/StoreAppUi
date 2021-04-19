import AxiosClient from "./AxiosClient";

const ProductApi = {
  getAllProducts: () => {
    const url = `/products`;
    return AxiosClient.get(url);
  },
  getProductDetails: (id: any) => {
    const url = `/products/${id}`;
    return AxiosClient.get(url);
  },
  getFlashProducts: () => {
    const url = `/flashsale_product`
    return AxiosClient.get(url)
  },
  getBestsellerProduct: () => {
    const url = `/bestseller_product`
  }
};

export default ProductApi;
