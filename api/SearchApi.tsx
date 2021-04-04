import AxiosClient from "./AxiosClient";

const SearchApi = {
    getSearchHistory: () => {
        const url = '/searchHistory';
        return AxiosClient.get(url);
    },

    getSuggestedValues: (data : any) => {
        const url = `/abc/${data}`;
        return AxiosClient.get(url);
    },

    getProductList: (data : any) => {
        const url = `/search/${data}`;
        return AxiosClient.get(url);
    },
}

export default SearchApi;