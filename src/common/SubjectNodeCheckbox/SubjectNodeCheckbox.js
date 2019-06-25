import React, { Component } from "react";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import List from "common/List/List";
import { compareMaps } from "services/helpersSrvc";
import "./SubjectNodeCheckbox.scss";

class SubjectNodeCheckbox extends Component {
  shouldComponentUpdate(nextProps) {
    return !compareMaps(this.props.checkedSubjects, nextProps.checkedSubjects);
  }

  handleOnChange = () => {
    const { handleSubjectChange, data: subjectNode } = this.props;
    handleSubjectChange(subjectNode);
  };

  render() {
    const {
      data: subjectNode,
      handleSubjectChange,
      checkedSubjects
    } = this.props;

    return (
      <div
        className={`subject-node-checkbox subject-node-checkbox--depth-${subjectTreeSrvc.getDepth(
          subjectNode
        )}`}
      >
        <label className={"checkbox"}>
          <input
            type="checkbox"
            onChange={this.handleOnChange}
            checked={checkedSubjects.get(subjectNode.id)}
            name={subjectNode.id}
          />
          <span className={"checkmark"} />
          {subjectNode.name}
        </label>

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
