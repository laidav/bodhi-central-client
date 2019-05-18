import React, { Component } from "react";
import "./Post.scss";
import postResource from "services/resources/postResource";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import List from "common/List/List";
import SubjectTag from "common/SubjectTag/SubjectTag";
import moment from "moment";
import { dateFormats } from "services/constantsSrvc";

class Post extends Component {
  state = {
    post: null,
    loading: true
  };

  componentWillMount() {
    postResource.getSinglePost(this.props.match.params.id).then(
      response => {
        this.setState({
          post: response.data,
          loading: false
        });
      },
      error => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { post, loading } = this.state;

    if (loading) {
      return <div>loading</div>;
    }

    return (
      <div className={"post"}>
        <div className="post__card border">
          <h5 className={"post__title"}>{post.title}</h5>
          <div className="post__body">
            <div className={"post__image"}>
              <iframe />
            </div>
            <div className={"post__description"}>{post.description}</div>
          </div>
          <List
            className="post__subject-tags"
            component={SubjectTag}
            uniqueKey="id"
            list={post.subjects}
          />
          <div className="post__create-date">
            Created On: {moment(post.created).format(dateFormats.short)}
          </div>
          <a
            className={"post__source ellipsis"}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: {post.link}
          </a>
        </div>
        {post && <PracticesContainer postFromSinglePost={post} />}
      </div>
    );
  }
}

export default Post;
