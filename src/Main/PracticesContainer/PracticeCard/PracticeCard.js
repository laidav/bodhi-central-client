import React from 'react';
import './PracticeCard.scss';

function PracticeCard ({ data, listItemProps }) {
  const { post, openPracticeForm } = listItemProps;

  const handleEditClick = () =>
    openPracticeForm(data);

  return (
    <div>
      <p>Teaching Point: { data.teaching_point }</p>
      <p>Application: { data.application }</p>
      <p>Created On: { data.created }</p>
      <p>Origin Post: { post.title }</p>
      <button onClick={ handleEditClick }>Edit Practice</button>
    </div>
  );
}

export default PracticeCard;
