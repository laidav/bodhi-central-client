import React, { Component } from "react";
import "./PracticeExplorer.scss";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

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
      <div>
        <SubjectNodeCheckbox
          data={subjectTreeSrvc.root}
          checkedSubjects={checkedSubjects}
          handleSubjectChange={handleSubjectChange}
        />
        <PracticesContainer checkedSubjects={checkedSubjects} />
      </div>
    );
  }
}

export default PracticeExplorer;
