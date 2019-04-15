import React, { Component } from "react";
import postResource from "services/resources/postResource";
import { subjects as staticSubjects } from "services/constantsSrvc";

class AdminPostForm extends Component {
  state = {
    title: "",
    description: "",
    link: "",
    checkedSubjects: new Map()
  };

  componentWillMount() {
    const { id: postId } = this.props.match.params;

    if (postId) {
      postResource.getSinglePost(postId).then((response) => {
        const { title, description, link } = response.data;

        const subjects = response.data.subjects.map((subject) => {
          return subject.id;
        });

        this.setState((prevState) => {
          for (let key in staticSubjects) {
            const subject = staticSubjects[key];
            prevState.checkedSubjects.set(subject, subjects.indexOf(subject) > -1);
          }

          return {
            title,
            description,
            link,
            checkedSubjects: prevState.checkedSubjects
          }
        })
      });
    }
  };

  render() {
    return (
      <div>hello</div>
    )
  }
}

export default AdminPostForm;