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
        const url = '/auth/login';
        return AxiosClient.post(url, data);
    },

    signOut: () => {
        const url = '/auth/logout';
        return AxiosClient.get(url);
    },

    signUp: (data: any) => {
        const url = 'auth/signup'
        return AxiosClient.post(url, data)
    }
}

export default UserApi;