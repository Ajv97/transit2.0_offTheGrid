import axios from "axios";

export const http = axios.create({
    baseURL: "https://transit-api-spring.herokuapp.com/api/",
    headers: {
        'x-access-token': localStorage.getItem("ISToken"),
        'user-id': localStorage.getItem("ISId")
    }
});

http.interceptors.response.use(async function (response) {
    return response;
}, async function (error) {
    localStorage.removeItem("ISToken");
    return Promise.reject(error);
});