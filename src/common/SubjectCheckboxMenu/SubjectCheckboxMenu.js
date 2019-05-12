import React from "react";
import List from "common/List/List";
import { subjectsList } from "services/constantsSrvc";
import SubjectCheckbox from "./SubjectCheckbox/SubjectCheckbox";

const SubjectCheckboxMenu = ({ checkedSubjects, handleSubjectChange }) => {
  return (
    <div className={"subject-checkbox-menu"}>
      <label className={"sub-heading"}>Subjects</label>
      <List
        component={SubjectCheckbox}
        uniqueKey="id"
        list={subjectsList}
        listItemProps={{ checkedSubjects, handleSubjectChange }}
      />
    </div>
  );
};

export default SubjectCheckboxMenu;
