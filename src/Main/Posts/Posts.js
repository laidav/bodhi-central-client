import React, { Component } from "react";
import "./Posts.scss";
import { connect } from "react-redux";
import { getPostsPractices } from "actions";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import PostsContainer from "./PostsContainer/PostsContainer";
import SubjectTab from "./SubjectTab/SubjectTab";
import * as Constants from "services/constantsSrvc";

const mapStateToProps = state => ({
  pagination: state.pagination.postsPractices,
  practices: state.pagination.postsPractices.ids.map(
    practiceId => state.entities.practices[practiceId]
  )
});

const mapDispatchToProps = dispatch => ({
  getPostsPractices: page => dispatch(getPostsPractices(page))
});

class Posts extends Component {
  state = {
    activeSubjectTab: Constants.subjects.WISDOM
  };

  componentWillMount() {
    if (!this.props.pagination.ids.length) {
      this.getPractices();
    }
  }

  getPractices = () => {
    const { getPostsPractices, pagination } = this.props;
    getPostsPractices(pagination.page);
  };

  selectSubject = subject => {
    this.setState({ activeSubjectTab: subject });
  };

  render() {
    const { activeSubjectTab } = this.state;
    const { match, practices, pagination } = this.props;
    const { getPractices } = this;

    return (
      <div className={"posts"}>
        <div className={"posts__body"}>
          <div className={"posts__nav"}>
            <ul>
              <SubjectTab
                isActive={activeSubjectTab === Constants.subjects.WISDOM}
                clickHandler={this.selectSubject}
                subject={Constants.subjects.WISDOM}
              />
              <SubjectTab
                isActive={activeSubjectTab === Constants.subjects.ETHICS}
                clickHandler={this.selectSubject}
                subject={Constants.subjects.ETHICS}
              />
              <SubjectTab
                isActive={activeSubjectTab === Constants.subjects.MEDITATION}
                clickHandler={this.selectSubject}
                subject={Constants.subjects.MEDITATION}
              />
            </ul>
          </div>
          <div className={"posts__content"}>
            <div className={"posts__content-inner"}>
              <div className={"transition-border"} />
              <div className={"transition-border-hider"} />
              <PostsContainer subject={activeSubjectTab} match={{ match }} />
            </div>
          </div>
        </div>
        <div className={"posts__side-bar"}>
          <PracticesContainer
            getPractices={getPractices}
            practices={practices}
            pagination={pagination}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
