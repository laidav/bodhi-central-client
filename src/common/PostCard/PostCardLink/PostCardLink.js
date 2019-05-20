import React from "react";
import buddhistPath from "assets/buddhist-path.jpg";
import { NavLink } from "react-router-dom";

const PostCardLink = ({ post, match }) => {
  let body = (
    <div>
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
    </div>
  );

  if (match.path === "/") {
    return (
      <NavLink className={"post-card__link"} to={`/post/${post.id}`}>
        {body}
      </NavLink>
    );
  }

  return body;
};

export default PostCardLink;
