import React, { Component } from "react";
import { connect } from "react-redux";
import "./Post.scss";
import postResource from "services/resources/postResource";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import List from "common/List/List";
import SubjectTag from "common/SubjectTag/SubjectTag";
import moment from "moment";
import { dateFormats } from "services/constantsSrvc";
import { getYoutubeEmbedUrl } from "services/helpersSrvc";
import { getSinglePostPractices } from "actions";

const mapStateToProps = state => ({
  pagination: state.pagination.singlePostPractices,
  allPractices: state.entities.practices
});

const mapDispatchToProps = dispatch => ({
  getSinglePostPractices: (page, postId) =>
    dispatch(getSinglePostPractices(page, postId))
});

class Post extends Component {
  state = {
    post: null,
    loading: true
  };

  componentWillMount() {
    const { match, pagination } = this.props;
    const postId = match.params.id;

    postResource.getSinglePost(postId).then(
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

    if (!pagination[postId]) {
      this.getPractices();
    }
  }

  getPractices = () => {
    const { getSinglePostPractices, pagination, match } = this.props;
    const postId = match.params.id;
    const page = pagination[postId] ? pagination[postId].page : 1;
    getSinglePostPractices(page, postId);
  };

  render() {
    const { post, loading } = this.state;
    const { pagination, allPractices, match } = this.props;
    const postId = match.params.id;
    const paginationByPostId = pagination[postId];
    const practiceIds = paginationByPostId ? paginationByPostId.ids : [];
    const practices = practiceIds.map(practiceId => allPractices[practiceId]);

    const { getPractices } = this;

    if (loading) {
      return <div>loading</div>;
    }

    return (
      <div className={"post"}>
        <div className={"post__body"}>
          <div className="post__card border">
            <h5 className={"post__title"}>{post.title}</h5>
            <div className="post__card-body">
              <div className={"post__media"}>
                <div className={"post__media-aspect-ratio"} />
                <iframe
                  src={getYoutubeEmbedUrl(post.link)}
                  title="video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className={"post__description"}>{post.description}</div>
            </div>
            <List
              className="post__subject-tags"
              component={SubjectTag}
              uniqueKey="id"
              list={post.subjects}
            />
            <div className="post__create-date">
              Created On: {moment(post.created).format(dateFormats.short)}
            </div>
            <a
              className={"post__source ellipsis"}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source: {post.link}
            </a>
          </div>
        </div>
        <div className={"post__side-bar"}>
          {pagination[postId] && (
            <PracticesContainer
              pagination={paginationByPostId}
              practices={practices}
              getPractices={getPractices}
              postFromSinglePost={post}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
