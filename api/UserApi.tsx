import AxiosClient from "./AxiosClient";

const UserApi = {
    getUser: (id : any) => {
        const url = `users/${id}`;
        return AxiosClient.get(url);
    },

    signUp: (data: any) => {
        const url = '/api/register/'
        return AxiosClient.post(url, data);
    },

    signIn: (data : any) => {
        const url = '/api/login/';
        return AxiosClient.post(url, data);
    },

    signOut: () => {
        const url = '/api/logout/';
        return AxiosClient.get(url);
    },

    getNewToken: () => {
        const url = 'api/new_token'
        return AxiosClient.get(url)
    }
}

export default UserApi;