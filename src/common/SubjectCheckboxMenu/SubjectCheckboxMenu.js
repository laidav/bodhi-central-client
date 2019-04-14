import React from "react";
import List from "common/List/List";
import { subjectsList } from "services/constantsSrvc";

const checkboxInput = ({ data: subject, listItemProps }) => {
  const { checkedSubjects, handleSubjectChange } = listItemProps

  return (
    <div>
      <label>{ subject.name }</label>
      <input type="checkbox"
             onChange={ handleSubjectChange }
             checked={ checkedSubjects.get(subject.id) }
             name={ subject.id }/>
    </div>

  )
};

const SubjectCheckboxMenu = ({ checkedSubjects, handleSubjectChange }) => {
  return (
    <div className={ "subject-checkbox-menu" }>
      <h2>Subjects</h2>
      <List component={ checkboxInput }
            uniqueKey="id"
            list={ subjectsList }
            listItemProps={{ checkedSubjects, handleSubjectChange }} />
    </div>
  )
};

export default SubjectCheckboxMenu;
