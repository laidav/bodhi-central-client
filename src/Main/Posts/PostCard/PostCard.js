import React from "react";
import List from "../../../common/List/List";
import SubjectTag from "./SubjectTag/SubjectTag";
import "./PostCard.scss";
import { NavLink } from "react-router-dom";
import buddhistPath from "images/buddhist-path.jpg";

const PostCard = ({ data: post }) => {
  return (
    <div className="post-card" key={post.id}>
      <h5 className={"post-card__title"}>{post.title}</h5>
      <div className="post-card__body">
        <div className={"post-card__description"}>{post.description}</div>
        <div className={"post-card__image"}>
          <div
            className={"post-card__image-inner"}
            style={{ backgroundImage: `url(${buddhistPath})` }}
          />
        </div>
      </div>
      <List
        className="post-card__subject-tags"
        component={SubjectTag}
        uniqueKey="id"
        list={post.subjects}
      />
      <a href={post.link} target="_blank" rel="noopener noreferrer">
        Source: {post.link}
      </a>
      <NavLink to={`/post/${post.id}`}>Go to {post.title}</NavLink>
    </div>
  );
};

export default PostCard;
