import React, { Component } from 'react';
import './Posts.scss';
import postResource from "../../services/resources/postResource";
import List from "../../common/List/List";
import PostCard from "./PostCard/PostCard"

class Posts extends Component {
  state = {
    posts: [],
    loading: true
  }

  componentWillMount() {
    postResource.getPosts().then((response) => {
      this.setState({
        posts: response.data.posts,
        loading: false
      });
    }, (error) => {
      this.setState({ loading: false });
    });
  }

  render() {

    if(this.state.loading) {
      return <div>loading</div>
    }

    const { posts } = this.state;

    return (
      <div>
        <div>Posts!</div>
        <List className="posts__wrapper" component={ PostCard } uniqueKey="id" list={ posts } />
      </div>
    );
  }
}

export default Posts;
