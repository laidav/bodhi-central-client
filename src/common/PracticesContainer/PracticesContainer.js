import React, { Component } from "react";
import "./PracticesContainer.scss";
import practiceResource from "services/resources/practiceResource";
import List from "common/List/List";
import Modal from "react-modal";
import PracticeFormModal from "./PracticeFormModal/PracticeFormModal";
import PracticeCard from "./PracticeCard/PracticeCard";
import addButton from "assets/bc-add-button.svg";

Modal.setAppElement("#root");

class PracticesContainer extends Component {
  state = {
    practices: [],
    selectedPractice: null,
    showPracticeForm: false,
    loading: true
  };

  componentWillMount() {
    const params = {};

    if (this.props.post) {
      params.postId = this.props.post.id;
    }

    practiceResource.getPractices(params).then(
      response => {
        this.setState({
          practices: response.data.practices,
          loading: false
        });
      },
      error => {
        this.setState({ loading: false });
      }
    );
  }

  openPracticeForm = selectedPractice => {
    this.setState({
      showPracticeForm: true,
      selectedPractice
    });
  };

  handleAddPracticeClick = () => {
    this.openPracticeForm(null);
  };

  hidePracticeForm = () => {
    this.setState({
      showPracticeForm: false,
      selectedPractice: null
    });
  };

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }

    const { practices, showPracticeForm, selectedPractice } = this.state;
    const { postFromSinglePost } = this.props;
    const { openPracticeForm, hidePracticeForm, handleAddPracticeClick } = this;
    const listItemProps = { openPracticeForm };
    const modalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "70%"
      }
    };

    return (
      <div className={"practices-container"}>
        <div className={"practices-container__header"}>
          <h4 className={"practices-container__title"}>Recent Practices</h4>
          <img
            className={"practices-container__add-practice"}
            src={addButton}
            alt={"add practice"}
            onClick={handleAddPracticeClick}
          />
        </div>
        {practices.length > 0 && (
          <div className={"practices-container__content"}>
            <div className={"practices-container__content-inner"}>
              <div className={"posts__content-top-border"} />
              <div className={"posts__content-top-border-hider"} />
              <List
                component={PracticeCard}
                uniqueKey="id"
                list={practices}
                listItemProps={listItemProps}
              />
            </div>
          </div>
        )}
        <Modal
          isOpen={showPracticeForm}
          onRequestClose={hidePracticeForm}
          style={modalStyles}
        >
          <PracticeFormModal
            postFromSinglePost={postFromSinglePost}
            hidePracticeForm={hidePracticeForm}
            selectedPractice={selectedPractice}
            action={selectedPractice ? "Edit" : "Add"}
          />
        </Modal>
      </div>
    );
  }
}

export default PracticesContainer;
