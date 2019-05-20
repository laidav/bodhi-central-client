import React, { Component } from "react";
import postResource from "services/resources/postResource";
import { subjects as staticSubjects } from "services/constantsSrvc";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import { NavLink, Redirect } from "react-router-dom";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import "./AdminPostForm.scss";

class AdminPostForm extends Component {
  state = this.initState();

  initState() {
    const initialState = {
      title: "",
      description: "",
      link: "",
      checkedSubjects: new Map(),
      redirectBack: false,
      errors: {},
      loadingPost: false
    };

    for (let key in staticSubjects) {
      const subject = staticSubjects[key];
      initialState.checkedSubjects.set(subject, false);
    }

    return initialState;
  }

  componentWillMount() {
    const { id: postId } = this.props.match.params;

    if (postId) {
      this.setState({ loadingPost: true });
      postResource.getSinglePost(postId).then(response => {
        const { title, description, link } = response.data;

        const subjects = response.data.subjects.map(subject => {
          return subject.id;
        });

        this.setState(prevState => {
          for (let i = 0; i < subjects.length; i++) {
            prevState.checkedSubjects.set(subjects[i], true);
          }

          return {
            title,
            description,
            link,
            checkedSubjects: prevState.checkedSubjects,
            loadingPost: false
          };
        });
      });
    }
  }

  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubjectChange = e => {
    const { name, checked } = e.target;

    this.setState(prevState => {
      const checkedSubjects = new Map(prevState.checkedSubjects);
      checkedSubjects.set(parseInt(name), checked);

      return { checkedSubjects };
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { title, description, link } = this.state;

    let subjects = [];

    for (const [key, value] of this.state.checkedSubjects) {
      if (value) {
        subjects.push(key);
      }
    }

    const validationItems = {
      title: {
        value: title,
        validators: [vt.isRequired]
      },
      description: {
        value: description,
        validators: [vt.isRequired]
      },
      subjects: {
        value: subjects,
        validators: [vt.arrayNotEmpty]
      }
    };

    const errors = validatorSrvc.validateItems(validationItems);

    if (Object.keys(errors).length) {
      this.setState({ errors });
    } else {
      const { id: postId } = this.props.match.params;

      const params = {
        data: {
          title,
          description,
          link,
          subjects
        }
      };

      const resource = postId
        ? this.getEditPostRequest(params)
        : this.getAddPostRequest(params);

      resource
        .then(() => {
          this.setState({ redirectBack: true });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getEditPostRequest(params) {
    params.postId = this.props.match.params.id;
    return postResource.editPost(params);
  }

  getAddPostRequest(params) {
    return postResource.addPost(params);
  }

  render() {
    if (this.state.redirectBack) {
      return <Redirect to={"/admin/post"} />;
    }

    if (this.state.loadingPost) {
      return <div>loading post</div>;
    }

    const { handleSubmit, handleTextChange, handleSubjectChange } = this;
    const submitBtnText = this.props.match.params.id ? "Save Post" : "Add Post";
    const pageTitle = this.props.match.params.id ? "Edit Post" : "Add Post";
    const { title, description, link, checkedSubjects, errors } = this.state;

    return (
      <div className={"admin-post-form"}>
        <h1 className={"page-title"}>{pageTitle}</h1>
        <form
          className={"admin-post-form__form border"}
          onSubmit={handleSubmit}
        >
          <div className={"admin-post-form__text-fields"}>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Title:</label>
              <input
                className={"control"}
                type="text"
                onChange={handleTextChange}
                name="title"
                value={title}
              />
              <p
                className={`form-error ${
                  errors.title === vt.isRequired ? "form-error--visible" : ""
                }`}
              >
                Title is required
              </p>
            </div>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Description:</label>
              <textarea
                className={"admin-post-form__description control"}
                onChange={handleTextChange}
                name="description"
                value={description}
              />
              <p
                className={`form-error ${
                  errors.description === vt.isRequired
                    ? "form-error--visible"
                    : ""
                }`}
              >
                Description is required
              </p>
            </div>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Link:</label>
              <input
                className={"control"}
                type="text"
                onChange={handleTextChange}
                name="link"
                value={link}
              />
              <p className={"form-error"}>&nbsp;</p>
            </div>
          </div>
          <div className={"admin-post-form__subjects"}>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Subjects:</label>
              <SubjectNodeCheckbox
                data={subjectTreeSrvc.root}
                checkedSubjects={checkedSubjects}
                handleSubjectChange={handleSubjectChange}
              />
              <p
                className={`form-error ${
                  errors.subjects === vt.arrayNotEmpty
                    ? "form-error--visible"
                    : ""
                }`}
              >
                Please select at least one subject
              </p>
            </div>
          </div>
          <div className={"admin-post-form__footer"}>
            <NavLink className={"btn btn-secondary"} to={"/admin/post"}>
              Cancel
            </NavLink>
            <button className={"btn btn-primary"} type="submit">
              {submitBtnText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AdminPostForm;
