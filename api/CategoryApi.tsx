import AxiosClient from "./AxiosClient";

const CategoryApi = {
    getAll: () => {
        const url = '/categories'
        return AxiosClient.get(url);
    },

    getCategory: (id : any) => {
        const url = `/category/${id}`;
        return AxiosClient.get(url);
    },
}

export default CategoryApi;