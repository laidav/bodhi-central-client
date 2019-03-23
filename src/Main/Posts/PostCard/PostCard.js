import React from 'react';
import List from "../../../common/List/List";
import SubjectTag from "./SubjectTag/SubjectTag";
import './PostCard.scss';


const PostCard = ({ data }) => {

  return (
    <div className="post-card" key={ data.id }>
      <p>Post Card</p>
      <p>Title: { data.title }</p>
      <p>Description: { data.description }</p>
      <a href={ data.link } target="_blank" rel="noopener noreferrer">Source: { data.link }</a>
      <p>Author: { data.author.username }</p>
      <p>Subjects</p>
      <List className="post-card__subject-tags" component={ SubjectTag } uniqueKey="id" list={ data.subjects } />
    </div>
  )
};

export default PostCard;