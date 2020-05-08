import axios from "axios";
import { store } from "../store/store";

export const http = axios.create({
  baseURL: "https://transit-api-spring.herokuapp.com/api/",
  //baseURL: "https://transit-api-spring-test.herokuapp.com/api/",
  headers: {
    "x-access-token": store.getters.token
  },
  validateStatus: function (status) {
    if (status === 401 || status === 403) {
      store.commit("changeToken", "");
      store.commit("changeAdmin", false);
      window.location = "#/login"; //send em to the home page
      return Promise.reject(status);
    } else {
      return status;
    }
  }
});

http.interceptors.request.use(request => {
  // eslint-disable-next-line no-console
  //console.log(request);
  return request;
});

http.interceptors.response.use(response => {
  // eslint-disable-next-line no-console
  //console.log(response);
  if (response.status === 401 || response.status === 403) {
    this.$store.commit("changeToken", "");
    this.$store.commit("changeAdmin", false);
    window.location = "#/login"; //send em to the home page
    return Promise.reject(response);
  } else {
    return response;
  }
});
