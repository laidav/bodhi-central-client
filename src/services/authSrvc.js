import authResource from "./resources/authResource";
import bodhiCentralApiSrvc from "services/bodhiCentralApiSrvc";

const authSrvc = {
  isAuthenticated: false,
  signIn({ email, password }) {
    const promise = new Promise((resolve, reject) => {
      authResource.getToken(email, password).then(
        response => {
          this.isAuthenticated = true;
          bodhiCentralApiSrvc.defaults.headers.common["Authorization"] =
            "Basic " + btoa(response.data.token + ":");
          localStorage.setItem("bl_token", response.data.token);
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });

    return promise;
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
  verifyToken() {
    const token = localStorage.getItem("bl_token");
    const ctx = this;
    const promise = new Promise((resolve, reject) => {
      if (token) {
        authResource.verifyToken(token).then(
          ({ data }) => {
            bodhiCentralApiSrvc.defaults.headers.common["Authorization"] =
              "Basic " + btoa(token + ":");
            ctx.isAuthenticated = true;
            if (data.error && data.error === 200) {
              resolve(token);
            } else {
              //in prod a bad token still returns an HTTP 200 so have to check response
              reject();
            }
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject();
      }
    });

    return promise;
  }
};

export default authSrvc;
