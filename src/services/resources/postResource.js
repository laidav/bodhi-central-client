import * as Constants from "../constantsSrvc";
import bodhiCentralApiSrvc from "services/bodhiCentralApiSrvc";

const postResource = {
  url: Constants.API_V1 + "/post",
  getPosts(params) {
    return bodhiCentralApiSrvc({
      method: "get",
      url: this.url,
      params: params
    });
  },
  getSinglePost(postId) {
    return bodhiCentralApiSrvc({
      method: "get",
      url: `${this.url}/${postId}`
    });
  },
  addPost({ data }) {
    return bodhiCentralApiSrvc({
      method: "post",
      url: this.url,
      data
    });
  },
  editPost({ postId, data }) {
    return bodhiCentralApiSrvc({
      method: "put",
      url: `${this.url}/${postId}`,
      data
    });
  },
  deletePost({ postId }) {
    return bodhiCentralApiSrvc({
      method: "delete",
      url: `${this.url}/${postId}`
    });
  }
};

export default postResource;
