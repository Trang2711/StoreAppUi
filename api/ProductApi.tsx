import AxiosClient from "./AxiosClient";

const ProductApi = {
  getAllProducts: () => {
    const url = `/api/all_products`;
    return AxiosClient.get(url);
  },
  getProductDetails: (id: any) => {
    const url = `/products/${id}`;
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
  // getProductByPagination: (id: any) => {
  //   const url = `/api/products?_page=${id}&_limit=10`;
  //   return AxiosClient.get(url);
  // },
};

export default ProductApi;
