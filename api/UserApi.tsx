import AxiosClient from "./AxiosClient";

const UserApi = {
    getUser: (id : any) => {
        const url = `users/${id}`;
        return AxiosClient.get(url);
    },

    signIn: (data : any) => {
        const url = 'auth/login';
        return AxiosClient.post(url, data);
    },

    signOut: () => {
        const url = 'auth/logout';
        return AxiosClient.get(url);
    },
}

export default UserApi;