import React, { Component } from "react";
import "./Posts.scss";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import PostsContainer from "./PostsContainer/PostsContainer";
import SubjectTab from "./SubjectTab/SubjectTab";
import * as Constants from "services/constantsSrvc";

class Posts extends Component {
  state = {
    activeSubjectTab: Constants.subjects.WISDOM
  };

  selectSubject = subject => {
    this.setState({ activeSubjectTab: subject });
  };

  render() {
    const { activeSubjectTab } = this.state;
    const { match } = this.props;

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
          <PracticesContainer />
        </div>
      </div>
    );
  }
}

export default Posts;
