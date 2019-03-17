import authResource from "./resources/authResource";
import axios from "axios";

const authSrvc = {
  isAuthenticated: false,
  signIn({ email, password }, cb) {
    authResource.getToken(email, password).then((response) => {
      this.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = response.token;
      cb(true)
    }, (error) => {
      cb(false)
    })
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100)
  }
};

export default authSrvc;
