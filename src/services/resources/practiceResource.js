import * as Constants from "../constantsSrvc";
import axios from "axios";

const practiceResource = {
  url: Constants.API_V1 + "/practice",
  getPractices({ postId }) {
    return axios({
      method: "get",
      url: this.url,
      params: {
        post_id: postId
      }
    });
  },
  addPractice({ data }) {
    return axios({
      method: "post",
      url: this.url,
      data
    });
  },
  editPractice({ practiceId, data }) {
    return axios({
      method: "put",
      url: `${this.url}/${practiceId}`,
      data
    });
  }
};

export default practiceResource;
