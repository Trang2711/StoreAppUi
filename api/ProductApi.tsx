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
    const url = `/api/get_review/`
    return AxiosClient.post(url, data)
  },

  sendReview: (data: any) => {
    const url = '/api/send_review/'
    return AxiosClient.post(url, data)
  },

  getPurchaseDetails: (data: any) => {
    const url = '/api/order_info/'
    return AxiosClient.post(url, data)
  },
  
  getAllPurchase: () => {
    const url = '/api/get_orders/'
    return AxiosClient.get(url)
  }
};

export default ProductApi;
