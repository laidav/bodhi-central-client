import React, { Component } from "react";
import './Posts.scss';
import PostsContainer from "./PostsContainer/PostsContainer";
import SubjectTab from "./SubjectTab/SubjectTab";
import * as Constants from "../../services/constantsSrvc";

class Posts extends Component {
  state = {
    activeTab: Constants.subjects.WISDOM
  };

  selectSubject = this.selectSubject.bind(this);


  selectSubject(subject) {
    this.setState({ activeTab: subject })
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className={ "posts" }>
        <div className={ "posts__body" }>
          <div className={ "posts__nav" }>
            <ul>
              <SubjectTab isActiveTab={ activeTab === Constants.subjects.WISDOM }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.WISDOM }>Wisdom</SubjectTab>
              <SubjectTab isActiveTab={ activeTab === Constants.subjects.ETHICS }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.ETHICS }>Ethics</SubjectTab>
              <SubjectTab isActiveTab={ activeTab === Constants.subjects.MEDITATION }
                          clickHandler={ this.selectSubject }
                          value={ Constants.subjects.MEDITATION }>Meditation</SubjectTab>
            </ul>
          </div>
          <div className={ "posts__content" }>
            { activeTab === Constants.subjects.WISDOM && <PostsContainer subject={ Constants.subjects.WISDOM }/> }
            { activeTab === Constants.subjects.ETHICS && <PostsContainer subject={ Constants.subjects.WISDOM }/> }
            { activeTab === Constants.subjects.MEDITATION && <PostsContainer subject={ Constants.subjects.WISDOM }/> }
          </div>
        </div>
        <div className={ "posts__side-bar" }>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
        </div>
      </div>
    );
  }
}

export default Posts;
