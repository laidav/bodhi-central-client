import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSubjectFilter, getExplorerPractices } from "actions";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import { compareMaps } from "services/helpersSrvc";

import "./PracticeExplorer.scss";

const mapStateToProps = state => ({
  checkedSubjects: state.practiceExplorerCheckedSubjects,
  pagination: state.pagination.practiceExplorer
});

const mapDispatchToProps = dispatch => ({
  handleSubjectChange: subject => dispatch(toggleSubjectFilter(subject)),
  getExplorerPractices: getExplorerPractices,
  dispatch
});

class PracticeExplorer extends Component {
  componentWillMount() {
    this.getPractices();
  }

  componentDidUpdate(prevProps) {
    const { checkedSubjects } = this.props;

    if (
      checkedSubjects &&
      !compareMaps(checkedSubjects, prevProps.checkedSubjects)
    ) {
      console.log("fire again");
    }
  }

  getPractices = () => {
    const {
      dispatch,
      getExplorerPractices,
      checkedSubjects,
      pagination
    } = this.props;

    console.log(pagination, "in Component");
    dispatch(getExplorerPractices(checkedSubjects, pagination.page));
  };

  render() {
    const {
      checkedSubjects,
      handleSubjectChange,
      match,
      pagination
    } = this.props;

    const { getPractices } = this;

    return (
      <div className={"practice-explorer"}>
        <div className={"practice-explorer__side-bar"}>
          <h1 className={"practice-explorer__title page-title"}>
            Your practice
          </h1>
          <div className={"practice-explorer__filters control-group border"}>
            <label className={"sub-heading"}>Subjects</label>
            <SubjectNodeCheckbox
              data={subjectTreeSrvc.root}
              checkedSubjects={checkedSubjects}
              handleSubjectChange={handleSubjectChange}
            />
          </div>
        </div>
        <div className={"practice-explorer__content"}>
          <PracticesContainer
            match={match}
            checkedSubjects={checkedSubjects}
            getPractices={getPractices}
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
)(PracticeExplorer);
