import * as Constants from "../constantsSrvc";
import bodhiCentralApiSrvc from "services/bodhiCentralApiSrvc";

const practiceResource = {
  url: Constants.API_V1 + "/practice",
  getPractices({ postId, subjects, page }) {
    console.log(page, "in resource");
    return bodhiCentralApiSrvc({
      method: "get",
      url: this.url,
      params: {
        post_id: postId,
        subject_id: subjects,
        page
      }
    });
  },
  addPractice({ data }) {
    return bodhiCentralApiSrvc({
      method: "post",
      url: this.url,
      data
    });
  },
  editPractice({ practiceId, data }) {
    return bodhiCentralApiSrvc({
      method: "put",
      url: `${this.url}/${practiceId}`,
      data
    });
  },
  deletePractice({ practiceId }) {
    return bodhiCentralApiSrvc({
      method: "delete",
      url: `${this.url}/${practiceId}`
    });
  }
};

export default practiceResource;
