import * as Constants from "../constantsSrvc";
import axios from "axios";

const postResource = {
  getPosts() {
    return axios({
      method: "get",
      url: Constants.API_V1 + "/post",
    })
  }
};

export default postResource