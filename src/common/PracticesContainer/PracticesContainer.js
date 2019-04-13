import React, { Component } from "react";
import "./PracticesContainer.scss";
import practiceResource from "services/resources/practiceResource";
import List from "common/List/List";
import Modal from "react-modal";
import PracticeFormModal from "./PracticeFormModal/PracticeFormModal"
import PracticeCard from "./PracticeCard/PracticeCard";

Modal.setAppElement("#root");

class PracticesContainer extends Component {
  state = {
    practices: [],
    selectedPractice: null,
    showPracticeForm: false,
    loading: true
  };

  openPracticeForm = this.openPracticeForm.bind(this);
  hidePracticeForm = this.hidePracticeForm.bind(this);
  handleAddPracticeClick = this.handleAddPracticeClick.bind(this);

  componentWillMount () {
    const params = {};

    if(this.props.post) {
      params.postId = this.props.post.id;
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
    const { openPracticeForm, hidePracticeForm, handleAddPracticeClick } = this;
    const listItemProps = { openPracticeForm };

    return (
      <div>
        { practices.length > 0 &&
          <div>
            <h1>Practices</h1>
            <List className="practices-wrapper"
                  component={ PracticeCard }
                  uniqueKey="id"
                  list={ practices }
                  listItemProps={ listItemProps } />
          </div>
        }
        <button onClick={ handleAddPracticeClick }> Add Practice </button>
        <Modal isOpen={ showPracticeForm }
               onRequestClose={ hidePracticeForm }>
          <PracticeFormModal post={ post } hidePracticeForm={ hidePracticeForm } selectedPractice={ selectedPractice }/>
        </Modal>
      </div>
    );
  }
}

export default PracticesContainer;
