import React from "react";
import "./PracticeCard.scss";
import bcDhammaWheel from "assets/bc-dhamma-wheel.svg";
import mockUser from "assets/bc-mock-user.svg";

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
      <p>Created On: {practice.created}</p>
      {practice.post && <p>Origin Post: {practice.post.title}</p>}
      <button onClick={handleEditClick}>Edit Practice</button>
    </div>
  );
}

export default PracticeCard;
