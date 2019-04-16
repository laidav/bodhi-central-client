const SubjectCheckbox = ({ data: subject, listItemProps }) => {
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

export default SubjectCheckbox;