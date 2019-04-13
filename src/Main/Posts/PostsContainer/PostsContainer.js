import React, { Component } from "react";
import './PostsContainer.scss';
import postResource from "../../../services/resources/postResource";
import List from "../../../common/List/List";
import PostCard from "./../PostCard/PostCard"

class PostsContainer extends Component {
  state = {
    posts: [],
    loading: false
  }

  getPosts(params) {
    this.setState({ loading: true });

    postResource.getPosts(params).then((response) => {
      this.setState({
        posts: response.data.posts,
        loading: false
      });
    }, (error) => {
      this.setState({ loading: false });
    });
  }

  componentWillMount() {
    if (this.props.isActive) {
      this.getPosts({ subject_id: this.props.subject });
    }
  }

  render() {
    const { loading, posts } = this.state;
    const { isActive } = this.props;

    return (
      <div className={ `posts-container${ isActive ? " posts-container--active": ""}` }>
        { loading && <div>Loading</div>}
        { !loading && <List className={ "posts__wrapper"} component={ PostCard } uniqueKey="id" list={ posts } />}

      </div>
    );
  }

  componentDidUpdate() {
    const { posts, loading } = this.state;

    if (this.props.isActive && !posts.length && !loading) {
      this.getPosts({ subject_id: this.props.subject });
    }
  }
}

export default PostsContainer;
