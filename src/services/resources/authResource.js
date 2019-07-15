import * as Constants from "../constantsSrvc";
import bodhiCentralApiSrvc from "services/bodhiCentralApiSrvc";

const authResource = {
  getToken(username, password) {
    return bodhiCentralApiSrvc({
      method: "get",
      url: Constants.API_V1 + "/token",
      auth: { username, password }
    });
  },
  verifyToken(token) {
    return bodhiCentralApiSrvc({
      method: "get",
      url: Constants.API_V1 + "/verify-token",
      auth: { username: token }
    });
  },
  signUp({ data }) {
    return bodhiCentralApiSrvc({
      method: "post",
      url: Constants.API_V1 + "/sign-up",
      data
    });
  }
};

export default authResource;
