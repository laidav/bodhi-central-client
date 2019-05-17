import React, { Component } from "react";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import List from "common/List/List";

class SubjectNodeCheckbox extends Component {
  render() {
    const {
      data: subjectNode,
      handleSubjectChange,
      checkedSubjects
    } = this.props;

    return (
      <div>
        <label>{subjectNode.name}</label>
        <input
          type="checkbox"
          onChange={handleSubjectChange}
          checked={checkedSubjects.get(subjectNode.id)}
          name={subjectNode.id}
        />
        <List
          component={SubjectNodeCheckbox}
          uniqueKey={"id"}
          list={subjectTreeSrvc.getChildren(subjectNode)}
          listItemProps={{ handleSubjectChange, checkedSubjects }}
        />
      </div>
    );
  }
}

export default SubjectNodeCheckbox;
