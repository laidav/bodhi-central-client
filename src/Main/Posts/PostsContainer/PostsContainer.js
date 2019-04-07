import React, { Component } from "react";
import './PostsContainer.scss';
import postResource from "../../../services/resources/postResource";
import List from "../../../common/List/List";
import PostCard from "./../PostCard/PostCard"

class PostsContainer extends Component {
  state = {
    posts: [],
    loading: true
  }

  getPosts() {
    postResource.getPosts().then((response) => {
      this.setState({
        posts: response.data.posts,
        loading: false
      });
    }, (error) => {
      this.setState({ loading: false });
    });
  }

  componentWillMount() {
    this.getPosts();
  }

  render() {

    const { loading, posts } = this.state;

    return (
      <div className={ "posts-container" }>
        { loading && <div>Loading</div>}
        { !loading && <List className={ "posts__wrapper"} component={ PostCard } uniqueKey="id" list={ posts } />}

      </div>
    );
  }
}

export default PostsContainer;
