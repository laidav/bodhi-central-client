import React, { Component } from "react";
import "./Post.scss";
import postResource from "services/resources/postResource";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

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
      <div>
        <div>
          <h1>Post</h1>
          <p>Title: {post.title}</p>
          <p>Description: {post.description}</p>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Source: {post.link}
          </a>
          <p>Author: {post.author.username}</p>
          <p>Created on: {post.created}</p>
        </div>
        {post && <PracticesContainer post={post} />}
      </div>
    );
  }
}

export default Post;
