import React, { Component } from "react";
import "./PostsContainer.scss";
import postResource from "services/resources/postResource";
import List from "common/List/List";
import PostCard from "common/PostCard/PostCard";

class PostsContainer extends Component {
  state = {
    posts: [],
    loading: false,
    error: false
  };

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
        this.setState({
          loading: false,
          error: true
        });
      }
    );
  }

  componentWillMount() {
    this.getPosts({ subject_id: this.props.subject });
  }

  render() {
    const { loading, posts } = this.state;
    const { match } = this.props;

    return (
      <div className={"posts-container"}>
        {loading && <div>Loading</div>}
        {!loading && (
          <List
            className={"posts__wrapper"}
            component={PostCard}
            uniqueKey="id"
            list={posts}
            listItemProps={match}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const { subject } = this.props;

    if (prevProps.subject !== subject) {
      this.getPosts({ subject_id: subject });
    }
  }
}

export default PostsContainer;
