import React from "react";
import "./PracticeCard.scss";
import bcDhammaWheel from "assets/bc-dhamma-wheel.svg";
import mockUser from "assets/bc-mock-user.svg";
import SubjectTag from "common/SubjectTag/SubjectTag";
import List from "common/List/List";
import moment from "moment";
import { dateFormats } from "services/constantsSrvc";
import { NavLink } from "react-router-dom";

function PracticeCard({ data: practice, openPracticeForm }) {
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
      <div className={"practice-card__bottom-content"}>
        <List
          className="practice-card__subject-tags"
          component={SubjectTag}
          uniqueKey="id"
          list={practice.subjects}
        />
        {practice.post && (
          <NavLink
            className={"practice-card__post"}
            to={`/post/${practice.post.id}`}
          >
            Post: {practice.post.title}
          </NavLink>
        )}
      </div>
      <div className={"practice-card__footer"}>
        <div className={"practice-card__created-date"}>
          {moment(practice.created).format(dateFormats.short)}
        </div>
        <button
          className={"practice-card__edit btn btn-secondary"}
          onClick={handleEditClick}
        >
          View/Edit
        </button>
      </div>
    </div>
  );
}

export default PracticeCard;
