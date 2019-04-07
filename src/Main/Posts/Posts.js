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
      <div className={ "posts" }>
        <div className={ "posts__body" }>
          <div className={ "posts__nav" }>
            <ul>
              <li className={ "posts__nav-item" } href="javascript:void(0)">Wisdom</li>
              <li className={ "posts__nav-item" } href="javascript:void(0)">Ethics</li>
              <li className={ "posts__nav-item" } href="javascript:void(0)">Meditation</li>
            </ul>
          </div>
          <div className={ "posts__content" }>
            <List className="posts__wrapper" component={ PostCard } uniqueKey="id" list={ posts } />
          </div>
        </div>
        <div className={ "posts__side-bar" }>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
          <h1>practice</h1>
        </div>
      </div>
    );
  }
}

export default Posts;
