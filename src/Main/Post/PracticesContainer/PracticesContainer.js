import React, { Component } from "react";
import "./PracticesContainer.scss";
import practiceResource from "../../../services/resources/practiceResource";
import List from "../../../common/List/List";
import PracticeFormModal from "../../../common/PracticeFormModal/PracticeFormModal"
import PracticeCard from "../../PracticeCard/PracticeCard";


class PracticesContainer extends Component {
  state = {
    practices: null,
    selectedPractice: null,
    showPracticeForm: false,
    loading: true
  };

  openPracticeForm = this.openPracticeForm.bind(this);
  hidePracticeForm = this.hidePracticeForm.bind(this);
  handleAddPracticeClick = this.handleAddPracticeClick.bind(this);

  componentWillMount() {
    const params = {}

    if(this.props.postId) {
      params.postId = this.props.postId
    }

    practiceResource.getPractices(params).then((response) => {
      this.setState({
        practices: response.data.practices,
        loading: false
      });
    }, (error) => {
      this.setState({ loading: false });
    });
  };

  openPracticeForm(selectedPractice) {
    this.setState({
      showPracticeForm: true,
      selectedPractice
    });

  };

  handleAddPracticeClick() {
    this.openPracticeForm(null);
  }

  hidePracticeForm() {
    this.setState({
      showPracticeForm: false,
      selectedPractice: null
    });
  };

  render() {
    if(this.state.loading) {
      return <div>loading</div>
    }

    const { practices, showPracticeForm, selectedPractice } = this.state;
    const { post } = this.props;
    const ctx = this;
    const listItemProps = {
      openPracticeForm: ctx.openPracticeForm,
      post
    };

    return (
      <div>
        { practices.length &&
        <div>
          <h1>Practices</h1>
          <List className="practices-wrapper"
                component={ PracticeCard }
                uniqueKey="id"
                list={ practices }
                listItemProps={ listItemProps } />
        </div>
        }
        <button onClick={ this.handleAddPracticeClick }> Add Practice </button>
        { showPracticeForm &&
        <PracticeFormModal post={ post } hidePracticeForm={ this.hidePracticeForm } selectedPractice={ selectedPractice }/>
        }
      </div>
    );
  }
}

export default PracticesContainer;
