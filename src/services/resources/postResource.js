import * as Constants from "../constantsSrvc";
import axios from "axios";

const postResource = {
  url: Constants.API_V1 + "/post",
  getPosts() {
    return axios({
      method: "get",
      url: this.url,
    })
  },
  getSinglePost(postId) {
    return axios({
      method: "get",
      url: `${this.url}/${postId}`
    })
  }
};

export default postResource