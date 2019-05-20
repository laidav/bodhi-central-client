import React from "react";
import List from "common/List/List";
import SubjectTag from "common/SubjectTag/SubjectTag";
import "./PostCard.scss";
import moment from "moment";
import { dateFormats } from "services/constantsSrvc";
import PostCardLink from "./PostCardLink/PostCardLink";

const PostCard = ({ data: post, match }) => {
  return (
    <div className="post-card border" key={post.id}>
      <PostCardLink post={post} match={match} />
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
    </div>
  );
};

export default PostCard;
