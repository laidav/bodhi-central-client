import React, { Component } from "react";
import postResource from "services/resources/postResource";
import {
  subjects as staticSubjects,
  actionConstants
} from "services/constantsSrvc";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import DeleteWarning from "common/DeleteWarning/DeleteWarning";
import { NavLink, Redirect } from "react-router-dom";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import checkedSubjectsReducer from "reducers/checkedSubjectsReducer";
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
      loadingPost: false,
      showDeleteWarning: false
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

  handleSubjectChange = subject => {
    const action = { type: actionConstants.TOGGLE_SUBJECT_FILTER, subject };
    const reducer = prevState => {
      return {
        checkedSubjects: checkedSubjectsReducer(
          prevState.checkedSubjects,
          action
        )
      };
    };
    this.setState(reducer);
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

  openDeleteWarning = () => {
    this.setState({ showDeleteWarning: true });
  };

  hideDeleteWarning = () => {
    this.setState({ showDeleteWarning: false });
  };

  deletePost = () => {
    const { id: postId } = this.props.match.params;

    postResource.deletePost({ postId }).then(() => {
      this.setState({ redirectBack: true });
    });
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

    const {
      handleSubmit,
      handleTextChange,
      handleSubjectChange,
      deletePost,
      hideDeleteWarning,
      openDeleteWarning
    } = this;

    const submitBtnText = this.props.match.params.id ? "Save Post" : "Add Post";
    const pageTitle = this.props.match.params.id ? "Edit Post" : "Add Post";
    const {
      title,
      description,
      link,
      checkedSubjects,
      errors,
      showDeleteWarning
    } = this.state;

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
              {errors.title && (
                <p className={"form-error"}>
                  {errors.title === vt.isRequired && (
                    <span>Title is required</span>
                  )}
                </p>
              )}
            </div>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Description:</label>
              <textarea
                className={"admin-post-form__description control"}
                onChange={handleTextChange}
                name="description"
                value={description}
              />
              {errors.description && (
                <p className={"form-error"}>
                  {errors.description === vt.isRequired && (
                    <span>Description is required</span>
                  )}
                </p>
              )}
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
            </div>
          </div>
          <div className={"admin-post-form__subjects"}>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Subjects:</label>
              <div className={"control"}>
                <SubjectNodeCheckbox
                  data={subjectTreeSrvc.root}
                  checkedSubjects={checkedSubjects}
                  handleSubjectChange={handleSubjectChange}
                />
              </div>
              {errors.subjects && (
                <p className={"form-error"}>
                  {errors.subjects === vt.arrayNotEmpty && (
                    <span>Please select at least one subject</span>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className={"admin-post-form__footer"}>
            <button
              className={"btn btn-inverted-gray"}
              type={"button"}
              onClick={openDeleteWarning}
            >
              Delete
            </button>
            <NavLink className={"btn btn-secondary"} to={"/admin/post"}>
              Cancel
            </NavLink>
            <button className={"btn btn-primary"} type="submit">
              {submitBtnText}
            </button>
          </div>
        </form>
        {showDeleteWarning && (
          <DeleteWarning
            warningText={"Are you sure you want to delete this post?"}
            hideDeleteWarning={hideDeleteWarning}
            handleDelete={deletePost}
          />
        )}
      </div>
    );
  }
}

export default AdminPostForm;
