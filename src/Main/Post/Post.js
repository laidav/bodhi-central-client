import React, { Component } from 'react';
import './Post.scss';
import postResource from "../../services/resources/postResource";
import List from "../../common/List/List";

class Post extends Component {
  state = {
    post: null,
    loading: true
  }

  componentWillMount() {
    postResource.getSinglePost(this.props.match.params.id).then((response) => {
      this.setState({
        post: response.data,
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

    return (
      <div>
        <h1>Single Post Page!</h1>
      </div>
    );
  }
}

export default Post;
