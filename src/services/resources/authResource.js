import * as Constants from "../constantsSrvc";
import axios from "axios";

const authResource = {
  getToken(username, password) {
    return axios({
      method: "get",
      url: Constants.API_V1 + "/token",
      auth: { username, password }
    })
  }
}

export default authResource