import React, { Component } from "react";
import postResource from "services/resources/postResource";
import List from "common/List/List";
import AdminPostCard from "./AdminPostCard/AdminPostCard";
import { NavLink } from "react-router-dom";

class AdminPosts extends Component {
  state = {
    posts: [],
    loading: false
  };

  componentWillMount() {
    this.getPosts();
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

  render() {
    const { loading, posts } = this.state;
    return (
      <div>
        { loading && <div>Loading</div> }
        {
          !loading &&
            <div>
              <NavLink to={ "/admin/post/add" }>Add New Post</NavLink>
              <List className={ "admin-post-cards"} component={ AdminPostCard } list={ posts } uniqueKey={ "id" } />
            </div>
        }
      </div>
    );
  }
}

export default AdminPosts;