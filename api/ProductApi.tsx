import AxiosClient from "./AxiosClient";

const ProductApi = {
    getProduct: (id : any) => {
        const url = `/products/${id}`;
        return AxiosClient.get(url);
    },
}

export default ProductApi;