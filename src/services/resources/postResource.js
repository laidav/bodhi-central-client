import * as Constants from "../constantsSrvc";
import axios from "axios";

const postResource = {
  url: Constants.API_V1 + "/post",
  getPosts(params) {
    return axios({
      method: "get",
      url: this.url,
      params: params
    })
  },
  getSinglePost(postId) {
    return axios({
      method: "get",
      url: `${this.url}/${postId}`
    })
  },
  addPost({ data }) {
    return axios({
      method: "post",
      url: this.url,
      data
    });
  },
  editPost({ postId, data }) {
    return axios({
      method: "put",
      url: `${this.url}/${ postId }`,
      data
    });
  }
};

export default postResource