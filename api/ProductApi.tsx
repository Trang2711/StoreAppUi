import AxiosClient from "./AxiosClient";

const ProductApi = {
  getProductDetails: (id: any) => {
    const url = `/api/product/${id}`;
    return AxiosClient.get(url);
  },
  getFlashProducts: () => {
    const url = `/api/flashsale_product`
    return AxiosClient.get(url)
  },
  
};

export default ProductApi;
