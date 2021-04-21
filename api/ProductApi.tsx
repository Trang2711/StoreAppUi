import AxiosClient from "./AxiosClient";

const ProductApi = {
  getAllProducts: () => {
    const url = `/api/products`;
    return AxiosClient.get(url);
  },
  getProductDetails: (id: any) => {
    const url = `/api/product/102870779/`;
    return AxiosClient.get(url);
  },
  getFlashProducts: () => {
    const url = `/api/flashsale_product`
    return AxiosClient.get(url)
  },
  getCommentsOfProduct: (data: any) => {
    const url = `/api/comments`
    return AxiosClient.post(url, data)
  },
};

export default ProductApi;
