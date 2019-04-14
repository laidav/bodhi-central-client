import React, { Component } from "react";
import "./PracticeFormModal.scss";

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
      error: false
    }
  }

  handleChange(e) {
    const fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.selectedPractice) {
      console.log(this.state, "submit edit post");

    } else {
      console.log(this.state, "submit add post");
    }

    this.props.hidePracticeForm();
  }

  render() {

    const { post, className, hidePracticeForm } = this.props;
    const { teaching_point, application } = this.state.fields
    const submitBtnText = this.props.selectedPractice ? "Save Practice" : "Add Practice";
    let errorMsg;

    if(this.state.error) {
      errorMsg = <p>There was an error saving the practice</p>
    }

    return (
      <div className={ className }>
        { post && <p>Origin Post: { post.title }</p> }
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="teaching-point">Teaching Point:</label>
          <input id="teaching-point" type="text" name="teaching_point" onChange={ this.handleChange } value={ teaching_point } />
          <label htmlFor="application">Application</label>
          <textarea id="application" name="application" onChange={ this.handleChange } value={ application }/>
          <button type="submit">{ submitBtnText }</button>
          { errorMsg }
        </form>
        <button onClick={ hidePracticeForm }>Cancel</button>
      </div>
    );
  }
}

export default PracticeFormModal;
