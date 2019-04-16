import React, { Component } from "react";
import postResource from "services/resources/postResource";
import { subjects as staticSubjects } from "services/constantsSrvc";
import SubjectCheckboxMenu from "common/SubjectCheckboxMenu/SubjectCheckboxMenu";
import { NavLink, Redirect } from "react-router-dom";
import {validationTypes as vt, validatorSrvc} from "services/validatorSrvc";

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

    return initialState
  }

  componentWillMount() {
    const { id: postId } = this.props.match.params;

    if (postId) {
      this.setState({ loadingPost: true });
      postResource.getSinglePost(postId).then((response) => {
        const { title, description, link } = response.data;

        const subjects = response.data.subjects.map((subject) => {
          return subject.id;
        });

        this.setState((prevState) => {
          for (let i = 0; i < subjects.length; i++) {
            prevState.checkedSubjects.set(subjects[i], true);
          }

          return {
            title,
            description,
            link,
            checkedSubjects: prevState.checkedSubjects,
            loadingPost: false
          }
        })
      });
    }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubjectChange = (e) => {
    const { name, checked } = e.target;

    this.setState(prevState => ({
        checkedSubjects: prevState.checkedSubjects.set(
          parseInt(name),
          checked)
      })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, link } = this.state;

    let subjects = [];

    for (const [key, value] of this.state.checkedSubjects) {
      if(value) {
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

    if(Object.keys(errors).length) {
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

      const resource = postId ? this.getEditPostRequest(params) : this.getAddPostRequest(params);

      resource.then(() => {
        this.setState({ redirectBack: true });
      }).catch((error) => {
        console.log(error);
      })
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

    if(this.state.redirectBack) {
      return <Redirect to={ "/admin/post" } />
    }

    if(this.state.loadingPost) {
      return <div>loading post</div>
    }

    const { handleSubmit, handleTextChange, handleSubjectChange } = this;
    const submitBtnText = this.props.match.params.id ? "Save Post" : "Add Post";
    const { title, description, link, checkedSubjects, errors } = this.state;

    return (
      <div>
        <NavLink to={ "/admin/post" }>Back to Admin Posts</NavLink>
        <form onSubmit={ handleSubmit }>
          <label>Title:</label>
          <input type="text" onChange={ handleTextChange } name="title" value={ title } />
          {
            errors.title === vt.isRequired &&
            <p className="form-error">Title is required</p>
          }
          <label>Description:</label>
          <input type="text" onChange={ handleTextChange } name="description" value={ description } />
          {
            errors.description === vt.isRequired &&
            <p className="form-error">Description is required</p>
          }
          <label>Link:</label>
          <input type="text" onChange={ handleTextChange } name="link" value={ link }/>
          <SubjectCheckboxMenu checkedSubjects={ checkedSubjects }
                               handleSubjectChange={ handleSubjectChange } />
          {
            errors.subjects === vt.arrayNotEmpty &&
            <p className="form-error">Please select at least one subject</p>
          }
          <button type="submit">{ submitBtnText }</button>
        </form>
      </div>
    )
  }
}

export default AdminPostForm;
