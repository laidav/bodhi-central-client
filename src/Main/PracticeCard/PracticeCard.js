import React from 'react';
import './PracticeCard.scss';

function PracticeCard ({ data }) {
  return (
    <div>
      <p>Teaching Point: { data.teaching_point }</p>
      <p>Application { data.application }</p>
      <p>Created On: { data.created }</p>
    </div>
  );
}

export default PracticeCard;
