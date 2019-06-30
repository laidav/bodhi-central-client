import React, { Component } from "react";
import "./PracticeFormModal.scss";
import { connect } from "react-redux";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import practiceResource from "services/resources/practiceResource";
import {
  subjects as staticSubjects,
  actionConstants
} from "services/constantsSrvc";
import { NavLink } from "react-router-dom";
import DeleteWarning from "common/DeleteWarning/DeleteWarning";
import checkedSubjectsReducer from "reducers/checkedSubjectsReducer";
import { practiceAdded, practiceEdited, practiceDeleted } from "actions";

const mapDispatchToProps = dispatch => ({
  dispatchPracticeAdded: response => dispatch(practiceAdded(response)),
  dispatchPracticeEdited: practice => dispatch(practiceEdited(practice)),
  dispatchPracticeDeleted: practice => dispatch(practiceDeleted(practice))
});

class PracticeFormModal extends Component {
  state = this.initState();

  initState() {
    const { selectedPractice } = this.props;

    const initialState = {
      teaching_point: selectedPractice ? selectedPractice.teaching_point : "",
      application: selectedPractice ? selectedPractice.application : "",
      checkedSubjects: new Map(),
      errors: {},
      showDeleteWarning: false
    };

    const subjects = selectedPractice
      ? selectedPractice.subjects.map(subject => {
          return subject.id;
        })
      : [];

    for (let key in staticSubjects) {
      const subject = staticSubjects[key];
      initialState.checkedSubjects.set(subject, subjects.indexOf(subject) > -1);
    }

    return initialState;
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

    const { teaching_point, application } = this.state;
    const { dispatchPracticeAdded, dispatchPracticeEdited } = this.props;

    let subjects = [];

    for (const [key, value] of this.state.checkedSubjects) {
      if (value) {
        subjects.push(key);
      }
    }

    const validationItems = {
      teaching_point: {
        value: teaching_point,
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
      const { action, hidePracticeForm } = this.props;

      const params = {
        data: { teaching_point, application, subjects }
      };

      let resource, successDispatch;

      if (action === "Edit") {
        resource = this.getEditPracticeRequest(params);
        successDispatch = dispatchPracticeEdited;
      } else {
        resource = this.getAddPracticeRequest(params);
        successDispatch = dispatchPracticeAdded;
      }

      resource
        .then(result => {
          hidePracticeForm();
          successDispatch(result);
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

  deletePractice = () => {
    const {
      selectedPractice,
      hidePracticeForm,
      dispatchPracticeDeleted
    } = this.props;

    practiceResource
      .deletePractice({ practiceId: selectedPractice.id })
      .then(() => {
        hidePracticeForm();
        dispatchPracticeDeleted(selectedPractice);
      });
  };

  getEditPracticeRequest(params) {
    const { selectedPractice } = this.props;

    params.practiceId = selectedPractice.id;

    if (selectedPractice.post) {
      params.data = Object.assign({}, params.data, {
        post_id: selectedPractice.post.id
      });
    }

    return practiceResource.editPractice(params).then(response => params);
  }

  getAddPracticeRequest(params) {
    const { postFromSinglePost } = this.props;

    if (postFromSinglePost) {
      params.data = Object.assign({}, params.data, {
        post_id: postFromSinglePost.id
      });
    }

    return practiceResource.addPractice(params);
  }

  render() {
    const {
      handleSubmit,
      handleTextChange,
      handleSubjectChange,
      openDeleteWarning,
      hideDeleteWarning,
      deletePractice
    } = this;

    const {
      hidePracticeForm,
      selectedPractice,
      action,
      postFromSinglePost
    } = this.props;

    const {
      teaching_point,
      application,
      checkedSubjects,
      errors,
      showDeleteWarning
    } = this.state;

    const title = action === "Edit" ? "Edit Practice" : "Add Practice";
    const submitBtnText = action === "Edit" ? "Save Practice" : "Add Practice";

    let originPost;

    if (action === "Edit") {
      originPost = selectedPractice.post;
    } else {
      originPost = postFromSinglePost || null;
    }

    return (
      <div className={"practice-form-modal"}>
        <h2 className={"practice-form-modal__title"}>{title}</h2>
        <form className={"practice-form-modal__form"} onSubmit={handleSubmit}>
          <div className={"practice-form-modal__notes"}>
            <div className={"control-group"}>
              <label className={"sub-heading"} htmlFor="teaching-point">
                Teaching Point:
              </label>
              <textarea
                id="teaching-point"
                className={"control"}
                name="teaching_point"
                onChange={handleTextChange}
                value={teaching_point}
              />
              <p
                className={`form-error ${
                  errors.teaching_point === vt.isRequired
                    ? "form-error--visible"
                    : ""
                }`}
              >
                Teaching point is required
              </p>
            </div>
            <div className={"control-group"}>
              <label className={"sub-heading"} htmlFor="application">
                Application:
              </label>
              <textarea
                id="application"
                className={"control"}
                name="application"
                onChange={handleTextChange}
                value={application}
              />
              <p className={"form-error"}>&nbsp</p>
            </div>
          </div>
          <div className={"practice-form-modal__subjects"}>
            <div className={"control-group"}>
              <label className={"sub-heading"}>Subjects</label>
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
          <div className={"practice-form-modal__footer"}>
            {originPost && (
              <NavLink
                className={"practice-form-modal__post"}
                to={`/post/${originPost.id}`}
              >
                Post: {originPost.title}
              </NavLink>
            )}
            <div className={"practice-form-modal__action-btns"}>
              {selectedPractice && (
                <button
                  onClick={openDeleteWarning}
                  className={"btn btn-inverted-gray"}
                  type={"button"}
                >
                  Delete
                </button>
              )}
              <button
                className={"btn btn-secondary"}
                onClick={hidePracticeForm}
                type={"button"}
              >
                Cancel
              </button>
              <button className={"btn btn-primary"} type="submit">
                {submitBtnText}
              </button>
            </div>
          </div>
        </form>
        {showDeleteWarning && (
          <DeleteWarning
            warningText={"Are you sure you want to delete this practice?"}
            hideDeleteWarning={hideDeleteWarning}
            handleDelete={deletePractice}
          />
        )}
      </div>
    );
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(PracticeFormModal);
