import axios from "axios";

export const signup = (user) => {
    return axios.post('/api/v1.0/users', user);
};