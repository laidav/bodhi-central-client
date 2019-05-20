import React, { Component } from "react";
import postResource from "services/resources/postResource";
import List from "common/List/List";
import PostCard from "common/PostCard/PostCard";
import { NavLink } from "react-router-dom";
import "./AdminPosts.scss";

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

    postResource.getPosts(params).then(
      response => {
        this.setState({
          posts: response.data.posts,
          loading: false
        });
      },
      error => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { loading, posts } = this.state;
    const { match } = this.props;

    return (
      <div className={"admin-posts"}>
        {loading && <div>Loading</div>}
        {!loading && (
          <div className={"admin-posts__inner"}>
            <div className={"admin-posts__top-bar"}>
              <h1 className={"page-title"}>Manage Posts</h1>
              <NavLink
                className={"admin-posts__add-post btn btn-primary"}
                to={"/admin/post/add"}
              >
                Add New Post
              </NavLink>
            </div>
            <div className={"admin-posts__post-cards"}>
              <div className={"admin-posts__post-cards-inner"}>
                <div className={"transition-border"} />
                <div className={"transition-border-hider"} />
                <List
                  className={"admin-posts__post-cards-grid"}
                  component={PostCard}
                  list={posts}
                  listItemProps={{ match }}
                  uniqueKey={"id"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdminPosts;
