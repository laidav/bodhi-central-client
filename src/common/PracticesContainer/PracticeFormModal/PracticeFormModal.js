import React, { Component } from "react";
import "./PracticeFormModal.scss";
import SubjectCheckboxMenu from "common/SubjectCheckboxMenu/SubjectCheckboxMenu";
import { validationTypes as vt, validatorSrvc } from "services/validatorSrvc";
import practiceResource from "services/resources/practiceResource";
import { subjects as staticSubjects } from "services/constantsSrvc";

class PracticeFormModal extends Component {
  state = this.initState();

  initState() {
    const { selectedPractice } = this.props;

    const initialState = {
      teaching_point: selectedPractice ? selectedPractice.teaching_point : "",
      application: selectedPractice ? selectedPractice.application : "",
      checkedSubjects: new Map(),
      errors: {}
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

  handleSubjectChange = e => {
    const { name, checked } = e.target;

    this.setState(prevState => ({
      checkedSubjects: prevState.checkedSubjects.set(parseInt(name), checked)
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { teaching_point, application } = this.state;

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
      const { selectedPractice } = this.props;

      const params = {
        data: { teaching_point, application, subjects }
      };

      const resource = selectedPractice
        ? this.getEditPracticeRequest(params)
        : this.getAddPracticeRequest(params);

      resource
        .then(() => {
          this.props.hidePracticeForm();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getEditPracticeRequest(params) {
    const { selectedPractice } = this.props;

    params.practiceId = selectedPractice.id;

    if (selectedPractice.post) {
      params.data = Object.assign({}, params.data, {
        post_id: selectedPractice.post.id
      });
    }

    return practiceResource.editPractice(params);
  }

  getAddPracticeRequest(params) {
    const { post } = this.props;

    if (post) {
      params.data = Object.assign({}, params.data, { post_id: post.id });
    }

    return practiceResource.addPractice(params);
  }

  render() {
    const { handleSubmit, handleTextChange, handleSubjectChange } = this;
    const { hidePracticeForm, selectedPractice, title } = this.props;
    const { teaching_point, application, checkedSubjects, errors } = this.state;
    const submitBtnText = this.props.selectedPractice
      ? "Save Practice"
      : "Add Practice";

    //TODO: refactor edit and add action state for this component
    const post = selectedPractice ? selectedPractice.post : null;

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
                Application
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
              <SubjectCheckboxMenu
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
            {post && <p>Origin Post: {post.title}</p>}
            <button onClick={hidePracticeForm}>Cancel</button>
            <button type="submit">{submitBtnText}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PracticeFormModal;
