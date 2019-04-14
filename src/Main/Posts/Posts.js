import React, { Component } from "react";
import './Posts.scss';
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import PostsContainer from "./PostsContainer/PostsContainer";
import SubjectTab from "./SubjectTab/SubjectTab";
import * as Constants from "services/constantsSrvc";

class Posts extends Component {
  state = {
    activeTab: Constants.subjects.WISDOM
  };

  selectSubject = (subject) => {
    this.setState({ activeTab: subject });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className={ "posts" }>
        <div className={ "posts__body" }>
          <div className={ "posts__nav" }>
            <ul>
              <SubjectTab isActive={ activeTab === Constants.subjects.WISDOM }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.WISDOM }>Wisdom</SubjectTab>
              <SubjectTab isActive={ activeTab === Constants.subjects.ETHICS }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.ETHICS }>Ethics</SubjectTab>
              <SubjectTab isActive={ activeTab === Constants.subjects.MEDITATION }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.MEDITATION }>Meditation</SubjectTab>
            </ul>
          </div>
          <div className={ "posts__content" }>
            <PostsContainer isActive={ activeTab === Constants.subjects.WISDOM } subject={ Constants.subjects.WISDOM }/>
            <PostsContainer isActive={ activeTab === Constants.subjects.ETHICS } subject={ Constants.subjects.ETHICS }/>
            <PostsContainer isActive={ activeTab === Constants.subjects.MEDITATION } subject={ Constants.subjects.MEDITATION }/>
          </div>
        </div>
        <div className={ "posts__side-bar" }>
          <PracticesContainer/>
        </div>
      </div>
    );
  }
}

export default Posts;
