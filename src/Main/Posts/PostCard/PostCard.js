import React from "react";
import List from "common/List/List";
import SubjectTag from "common/SubjectTag/SubjectTag";
import "./PostCard.scss";
import { NavLink } from "react-router-dom";
import buddhistPath from "assets/buddhist-path.jpg";
import moment from "moment";
import { dateFormats } from "services/constantsSrvc";

const PostCard = ({ data: post }) => {
  return (
    <div className="post-card border" key={post.id}>
      <NavLink className={"post-card__link"} to={`/post/${post.id}`}>
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
      </NavLink>
      <List
        className="post-card__subject-tags"
        component={SubjectTag}
        uniqueKey="id"
        list={post.subjects}
      />
      <div className="post-card__create-date">
        Created On: {moment(post.created).format(dateFormats.short)}
      </div>
      <a
        className={"post-card__source ellipsis"}
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source: {post.link}
      </a>
      {/* <NavLink to={`/post/${post.id}`}>Go to {post.title}</NavLink> */}
    </div>
  );
};

export default PostCard;
