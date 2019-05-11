import React from "react";
import "./PracticeCard.scss";
import bcDhammaWheel from "assets/bc-dhamma-wheel.svg";
import mockUser from "assets/bc-mock-user.svg";
import SubjectTag from "common/SubjectTag/SubjectTag";
import List from "common/List/List";

function PracticeCard({ data: practice, listItemProps }) {
  const { openPracticeForm } = listItemProps;

  const handleEditClick = () => openPracticeForm(practice);

  return (
    <div className={"practice-card border"}>
      <div className={"practice-card__teaching-point"}>
        <img src={bcDhammaWheel} alt="dhamma-wheel" />
        <p>{practice.teaching_point}</p>
      </div>
      <div className={"practice-card__application"}>
        <img src={mockUser} alt="mockUser" />
        <p>{practice.application}</p>
      </div>
      <List
        className="practice-card__subject-tags"
        component={SubjectTag}
        uniqueKey="id"
        list={practice.subjects}
      />
      {practice.post && <p>Origin Post: {practice.post.title}</p>}
      <p>Created On: {practice.created}</p>
      <button onClick={handleEditClick}>Edit Practice</button>
    </div>
  );
}

export default PracticeCard;
