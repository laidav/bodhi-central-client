import React, { Component } from "react";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import List from "common/List/List";
import { compareMaps } from "services/helpersSrvc";

class SubjectNodeCheckbox extends Component {
  shouldComponentUpdate(nextProps) {
    return !compareMaps(this.props.checkedSubjects, nextProps.checkedSubjects);
  }

  render() {
    const {
      data: subjectNode,
      handleSubjectChange,
      checkedSubjects
    } = this.props;

    return (
      <div>
        <label>
          {subjectNode.name} depth: {subjectTreeSrvc.getDepth(subjectNode)}
        </label>
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
