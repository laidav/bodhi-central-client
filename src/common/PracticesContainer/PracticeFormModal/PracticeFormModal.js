import React, { Component } from "react";
import "./PracticeFormModal.scss";
import { validationTypes as vt, validationErrorCodes as ve, validatorSrvc } from "services/validatorSrvc";
import practiceResource from "services/resources/practiceResource";

class PracticeFormModal extends Component {
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  state = this.initializeState();

  initializeState() {
    const { selectedPractice } = this.props;
    return {
      fields: {
        teaching_point: selectedPractice ? selectedPractice.teaching_point: "",
        application:  selectedPractice ? selectedPractice.application : "",
      },
      errors: {}
    }
  }

  handleChange(e) {
    const { fields } = this.state;

    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleSubmit(e) {
    e.preventDefault();

    const { teaching_point } = this.state.fields;

    let errors = {
      teaching_point: validatorSrvc.validate(teaching_point, vt.isRequired)
    };

    for (let key in errors) {
      if(errors[key] === ve.success) {
        delete errors[key]
      }
    }

    if(Object.keys(errors).length) {
      this.setState({ errors: errors });
    } else {
      const { selectedPractice } = this.props;

      const resource = selectedPractice ? this.getEditPracticeRequest() :
        this.getAddPracticeRequest();

      resource.then(() => {
        this.props.hidePracticeForm();
        this.setState({ errors: {} });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getEditPracticeRequest() {
    const { fields: data } = this.state;
    const { selectedPractice } = this.props;
    const params = { practiceId: selectedPractice.id, data };

    if (selectedPractice.post) {
      params.data = Object.assign({}, params.data, { post_id: selectedPractice.post.id });
    }

    return practiceResource.editPractice(params)
  }

  getAddPracticeRequest() {
    const { fields: data } = this.state;
    const { post } = this.props;
    const params = { data };

    if (post) {
      params.data = Object.assign({}, params.data, { post_id: post });
    }

    return practiceResource.addPractice(params);
  }



  render() {

    const { post, className, hidePracticeForm } = this.props;
    const { teaching_point, application } = this.state.fields;
    const { errors } = this.state;
    const submitBtnText = this.props.selectedPractice ? "Save Practice" : "Add Practice";

    return (
      <div className={ className }>
        { post && <p>Origin Post: { post.title }</p> }
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="teaching-point">Teaching Point:</label>
          <input id="teaching-point" type="text" name="teaching_point" onChange={ this.handleChange } value={ teaching_point } />
          {
            errors.teaching_point === ve.isRequired &&
            <p className="form-error">Teaching point is required</p>
          }
          <label htmlFor="application">Application</label>
          <textarea id="application" name="application" onChange={ this.handleChange } value={ application }/>
          <button type="submit">{ submitBtnText }</button>
        </form>
        <button onClick={ hidePracticeForm }>Cancel</button>
      </div>
    );
  }
}

export default PracticeFormModal;
