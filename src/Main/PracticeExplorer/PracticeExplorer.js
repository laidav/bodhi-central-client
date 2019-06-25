import React from "react";
import { connect } from "react-redux";
import { toggleSubjectFilter } from "actions";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

import "./PracticeExplorer.scss";

const mapStateToProps = state => ({
  checkedSubjects: state.practiceExplorerCheckedSubjects
});

const mapDispatchToProps = dispatch => ({
  handleSubjectChange: subject => dispatch(toggleSubjectFilter(subject))
});

const PracticeExplorer = ({ checkedSubjects, handleSubjectChange, match }) => {
  return (
    <div className={"practice-explorer"}>
      <div className={"practice-explorer__side-bar"}>
        <h1 className={"practice-explorer__title page-title"}>Your practice</h1>
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
        <PracticesContainer match={match} checkedSubjects={checkedSubjects} />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeExplorer);
