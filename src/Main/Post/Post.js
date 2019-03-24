import React, { Component } from 'react';
import './Post.scss';
import postResource from "../../services/resources/postResource";
import practiceResource from "../../services/resources/practiceResource";
import List from "../../common/List/List";
import PracticeCard from "../PracticeCard/PracticeCard";

class Post extends Component {
  state = {
    post: null,
    practices: null,
    loading: true
  }

  componentWillMount() {
    const post = postResource.getSinglePost(this.props.match.params.id);
    const practices = practiceResource.getPractices(this.props.match.params.id);

    Promise.all([post, practices]).then((response) => {
      this.setState({
        post: response[0].data,
        practices: response[1].data.practices,
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

    const { post, practices } = this.state;

    return (
      <div>
        <div>
          <h1>Post</h1>
          <p>Title: { post.title }</p>
          <p>Description: { post.description }</p>
          <a href={ post.link } target="_blank" rel="noopener noreferrer">Source: { post.link }</a>
          <p>Author: { post.author.username }</p>
          <p>Created on: { post.created }</p>
        </div>
        { practices.length &&
          <div>
            <h1>Practices</h1>
            <List className="practices-wrapper" component={ PracticeCard } uniqueKey="id" list={ practices } />
          </div>
        }
      </div>
    );
  }
}

export default Post;
