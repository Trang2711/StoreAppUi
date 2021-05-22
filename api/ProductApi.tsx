import AxiosClient from "./AxiosClient";

const ProductApi = {
  getAllProducts: () => {
    const url = `/api/products`;
    return AxiosClient.get(url);
  },
  getProductDetails: (id: any) => {
    const url = `/api/product/${id}/`;
    return AxiosClient.get(url);
  },
  getFlashProducts: () => {
    const url = `/api/flashsale_product`
    return AxiosClient.get(url)
  },
  
  getSpecifiedProduct: (id: any) => {
    const url = `/api/product/${id}`;
    return AxiosClient.get(url);
  },
  
  getCommentsOfProduct: (data: any) => {
    const url = `/api/get_review`
    return AxiosClient.post(url, data)
  },
};

export default ProductApi;
