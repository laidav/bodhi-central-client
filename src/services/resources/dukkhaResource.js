import * as Constants from "../constantsSrvc";
import axios from "axios";

const dukkhaResource = {
  getDukkhas() {
    return axios({
      method: "get",
      url: Constants.API_V1 + "/dukkhas",
    })
  }
};

export default dukkhaResource