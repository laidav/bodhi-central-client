import React, { Component } from "react";
import "./PracticeExplorer.scss";
import SubjectNodeCheckbox from "common/SubjectNodeCheckbox/SubjectNodeCheckbox";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import { subjects as staticSubjects } from "services/constantsSrvc";

class PracticeExplorer extends Component {
  state = this.initState();

  initState() {
    const initialState = { checkedSubjects: new Map() };

    for (let key in staticSubjects) {
      initialState.checkedSubjects.set(staticSubjects[key], false);
    }

    return initialState;
  }

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
    const { match } = this.props;
    const { handleSubjectChange } = this;

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
          <PracticesContainer match={match} checkedSubjects={checkedSubjects} />
        </div>
      </div>
    );
  }
}

export default PracticeExplorer;
