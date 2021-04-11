import AxiosClient from "./AxiosClient";

const SearchAndFiltersApi = {
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

    getFilterFields: () => {
        const url = `/filterFeilds`
        return AxiosClient.get(url)
    }
}

export default SearchAndFiltersApi;