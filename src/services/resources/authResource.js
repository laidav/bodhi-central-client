import * as Constants from "../constantsSrvc";
import axios from "axios";

const authResource = {
  getToken(username, password) {
    return axios({
      method: "get",
      url: Constants.API_V1 + "/token",
      auth: { username, password }
    });
  },
  verifyToken(token) {
    return axios({
      method: "get",
      url: Constants.API_V1 + "/verify-token",
      auth: { username: token }
    });
  }
};

export default authResource