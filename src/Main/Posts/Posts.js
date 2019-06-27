import React, { Component } from "react";
import "./Posts.scss";
import practiceResource from "services/resources/practiceResource";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import PostsContainer from "./PostsContainer/PostsContainer";
import SubjectTab from "./SubjectTab/SubjectTab";
import * as Constants from "services/constantsSrvc";
import { paginateReducer } from "reducers/pagination";
import { practicesReducer } from "reducers/entities";
import { practiceSuccessResponse } from "actions";

const paginatePracticesReducer = paginateReducer({
  types: {
    requestType: Constants.actionConstants.PRACTICE_REQUEST,
    refreshRequestType: Constants.actionConstants.PRACTICE_REFRESH_REQUEST,
    successType: Constants.actionConstants.PRACTICE_SUCCESS,
    failureType: Constants.actionConstants.PRACTICE_FAILURE
  }
});

class Posts extends Component {
  state = {
    activeSubjectTab: Constants.subjects.WISDOM,
    practicesMap: {},
    pagination: {
      practices: {
        isFetching: false,
        has_next: undefined,
        page: 1,
        ids: []
      }
    }
  };

  componentWillMount() {
    this.getPractices();
  }

  getPractices = () => {
    this.setState(prevState => ({
      ...prevState,
      pagination: {
        practices: practicesReducer(prevState.pagination.practices, {
          type: Constants.actionConstants.PRACTICE_REQUEST
        })
      }
    }));

    const { page } = this.state.pagination.practices;

    practiceResource.getPractices({ page }).then(response => {
      this.setState(prevState => ({
        ...prevState,
        practicesMap: practicesReducer(
          prevState.practicesMap,
          practiceSuccessResponse(
            Constants.actionConstants.PRACTICE_SUCCESS,
            response
          )
        ),
        pagination: {
          practices: paginatePracticesReducer(
            prevState.pagination.practices,
            practiceSuccessResponse(
              Constants.actionConstants.PRACTICE_SUCCESS,
              response
            )
          )
        }
      }));
    });
  };

  selectSubject = subject => {
    this.setState({ activeSubjectTab: subject });
  };

  render() {
    const { activeSubjectTab, pagination, practicesMap } = this.state;
    const practicesPagination = pagination.practices;
    const { match } = this.props;
    const practices = practicesPagination.ids.map(
      practiceId => practicesMap[practiceId]
    );

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
            pagination={practicesPagination}
            practices={practices}
            getPractices={getPractices}
          />
        </div>
      </div>
    );
  }
}

export default Posts;
