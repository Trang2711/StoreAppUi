import AxiosClient from "./AxiosClient";

const SearchAndFiltersApi = {
    // getSearchHistory: () => {
    //     const url = '/searchHistory';
    //     return AxiosClient.get(url);
    // },

    getSuggestedValues: (data : any) => {
        const url = `/api/search_keyword/`;
        return AxiosClient.post(url, data);
    },

    getProductList: (data : any) => {
        // const query = JSON.stringify(data)
        const url = `/api/search_product/`;
        return AxiosClient.post(url, data);
    },

    getFilterFields: () => {
        const url = `/filterFeilds`
        return AxiosClient.get(url)
    }
}

export default SearchAndFiltersApi;