import React, { Component } from "react";
import "./PracticeExplorer.scss";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import { subjects as staticSubjects } from "services/constantsSrvc";

class PracticeExplorer extends Component {
  state = {
    checkedSubjects: new Map()
  };

  handleSubjectChange = e => {
    const { name, checked } = e.target;

    this.setState(prevState => {
      const checkedSubjects = new Map(prevState.checkedSubjects);
      checkedSubjects.set(parseInt(name), checked);

      return { checkedSubjects };
    });
  };

  render() {
    const { checkedSubjects } = this.state;
    const { handleSubjectChange } = this;
    return (
      <SubjectNodeCheckbox
        data={subjectTreeSrvc.root}
        checkedSubjects={checkedSubjects}
        handleSubjectChange={handleSubjectChange}
      />
    );
  }
}

export default PracticeExplorer;
