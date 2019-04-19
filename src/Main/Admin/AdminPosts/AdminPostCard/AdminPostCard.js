import React from "react";
import List from "common/List/List";
import SubjectTag from "Main/Posts/PostCard/SubjectTag/SubjectTag";
import { NavLink } from "react-router-dom";

const AdminPostCard = ({ data }) => {
  return (
    <div className="post-card" key={data.id}>
      <p>Post Card</p>
      <p>Title: {data.title}</p>
      <p>Description: {data.description}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer">
        Source: {data.link}
      </a>
      <p>Author: {data.author.username}</p>
      <p>Subjects</p>
      <List
        className="post-card__subject-tags"
        component={SubjectTag}
        uniqueKey="id"
        list={data.subjects}
      />
      <NavLink to={`/admin/post/${data.id}`}>Edit {data.title}</NavLink>
    </div>
  );
};

export default AdminPostCard;
