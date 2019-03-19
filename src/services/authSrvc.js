import authResource from "./resources/authResource";
import axios from "axios";

const authSrvc = {
  isAuthenticated: false,
  signIn({ email, password }) {
    const promise = new Promise((resolve, reject) => {
      authResource.getToken(email, password).then((response) => {
        this.isAuthenticated = true;
        axios.defaults.headers.common['Authorization'] = response.token;
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });

    return promise
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100)
  }
};

export default authSrvc;
