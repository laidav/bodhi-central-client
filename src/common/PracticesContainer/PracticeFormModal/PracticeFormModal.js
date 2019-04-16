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
      teaching_point: selectedPractice ? selectedPractice.teaching_point: "",
      application:  selectedPractice ? selectedPractice.application : "",
      checkedSubjects: new Map(),
      errors: {}
    };

    const subjects = selectedPractice ? selectedPractice.subjects : [];

    for (let key in staticSubjects) {
      const subject = staticSubjects[key];
      initialState.checkedSubjects.set(subject, subjects.indexOf(subject) > -1);
    }

    return initialState;
  };

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

    const { teaching_point, application } = this.state;

    let subjects = [];

    for (const [key, value] of this.state.checkedSubjects) {
      if(value) {
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

      const resource = selectedPractice ? this.getEditPracticeRequest(params) :
        this.getAddPracticeRequest(params);

      resource.then(() => {
        this.props.hidePracticeForm();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  getEditPracticeRequest(params) {
    const { selectedPractice } = this.props;

    params.practiceId = selectedPractice.id;

    if (selectedPractice.post) {
      params.data = Object.assign({}, params.data, { post_id: selectedPractice.post.id });
    }

    return practiceResource.editPractice(params)
  }

  getAddPracticeRequest(params) {

    const { post } = this.props;

    if (post) {
      params.data = Object.assign({}, params.data, { post_id: post.id });
    }

    return practiceResource.addPractice(params);
  };

  render() {
    const { handleSubmit, handleTextChange, handleSubjectChange } = this;
    const { post, className, hidePracticeForm } = this.props;
    const { teaching_point, application, checkedSubjects, errors } = this.state;
    const submitBtnText = this.props.selectedPractice ? "Save Practice" : "Add Practice";

    return (
      <div className={ className }>
        { post && <p>Origin Post: { post.title }</p> }
        <form onSubmit={ handleSubmit }>
          <label htmlFor="teaching-point">Teaching Point:</label>
          <input id="teaching-point" type="text" name="teaching_point" onChange={ handleTextChange } value={ teaching_point } />
          {
            errors.teaching_point === vt.isRequired &&
            <p className="form-error">Teaching point is required</p>
          }
          <SubjectCheckboxMenu checkedSubjects={ checkedSubjects } handleSubjectChange={ handleSubjectChange }/>
          {
            errors.subjects === vt.arrayNotEmpty &&
            <p className="form-error">Please select at least one subject</p>
          }
          <label htmlFor="application">Application</label>
          <textarea id="application" name="application" onChange={ handleTextChange } value={ application }/>
          <button type="submit">{ submitBtnText }</button>
        </form>
        <button onClick={ hidePracticeForm }>Cancel</button>
      </div>
    );
  };
}

export default PracticeFormModal;
