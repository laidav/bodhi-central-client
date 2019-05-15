import React from "react";
import List from "common/List/List";
import { subjectsList } from "services/constantsSrvc";
import SubjectCheckbox from "./SubjectCheckbox/SubjectCheckbox";
import "./SubjectCheckboxMenu.scss";
import SubjectTree from "services/subjectTreeSrvc";

const SubjectCheckboxMenu = ({ checkedSubjects, handleSubjectChange }) => {
  console.log(SubjectTree);
  console.log(SubjectTree.getChildren(SubjectTree.root));

  return (
    <div className={"subject-checkbox-menu border"}>
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
