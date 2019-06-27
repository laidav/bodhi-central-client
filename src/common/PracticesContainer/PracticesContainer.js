import React, { Component } from "react";
import { connect } from "react-redux";
import "./PracticesContainer.scss";
import List from "common/List/List";
import Modal from "react-modal";
import PracticeFormModal from "./PracticeFormModal/PracticeFormModal";
import PracticeCard from "./PracticeCard/PracticeCard";
import addButton from "assets/bc-add-button.svg";
import { reactModal } from "services/constantsSrvc";
import { Switch, Route } from "react-router-dom";

Modal.defaultStyles.overlay.backgroundColor = reactModal.overlayBg;
Modal.setAppElement("#root");

const mapStateToProps = state => ({
  allPractices: state.entities.practices,
  pagination: state.pagination.practiceExplorer
});

class PracticesContainer extends Component {
  state = {
    selectedPractice: null,
    showPracticeForm: false
  };

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

    const { showPracticeForm, selectedPractice } = this.state;
    const {
      postFromSinglePost,
      match,
      pagination,
      allPractices,
      getPractices
    } = this.props;
    const { openPracticeForm, hidePracticeForm, handleAddPracticeClick } = this;

    const practices = pagination.ids.map(
      practiceId => allPractices[practiceId]
    );

    const onPracticeExplorer = match && match.path === "/practices";
    const modalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        padding: "0"
      }
    };

    return (
      <div className={"practices-container"}>
        <div className={"practices-container__header"}>
          <h4 className={"practices-container__title"}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <span>Recent Practices</span>}
              />
              <Route
                path="/post"
                render={() => <span>Practices from this post</span>}
              />
            </Switch>
          </h4>
          <img
            className={"practices-container__add-practice"}
            src={addButton}
            alt={"add practice"}
            onClick={handleAddPracticeClick}
          />
        </div>
        <div className={"practices-container__content"}>
          <div className={"practices-container__content-inner"}>
            <div className={"transition-border"} />
            <div className={"transition-border-hider"} />
            <List
              className={`practices-container__practice-cards ${
                onPracticeExplorer
                  ? "practices-container__practice-cards--grid"
                  : ""
              }`}
              component={PracticeCard}
              uniqueKey="id"
              list={practices}
              listItemProps={{ openPracticeForm }}
            />
            {pagination.has_next && (
              <span onClick={getPractices}>Load More</span>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps)(PracticesContainer);
