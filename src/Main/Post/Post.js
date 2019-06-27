import React, { Component } from "react";
import "./Post.scss";
import postResource from "services/resources/postResource";
import practiceResource from "services/resources/practiceResource";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";
import List from "common/List/List";
import SubjectTag from "common/SubjectTag/SubjectTag";
import moment from "moment";
import { dateFormats, actionConstants } from "services/constantsSrvc";
import { getYoutubeEmbedUrl } from "services/helpersSrvc";
import { paginateReducer } from "reducers/pagination";
import { practicesReducer } from "reducers/entities";
import { practiceSuccessResponse } from "actions";

const paginatePracticesReducer = paginateReducer({
  types: {
    requestType: actionConstants.PRACTICE_REQUEST,
    refreshRequestType: actionConstants.PRACTICE_REFRESH_REQUEST,
    successType: actionConstants.POST_PRACTICE_SUCCESS,
    failureType: actionConstants.PRACTICE_FAILURE
  }
});

class Post extends Component {
  state = {
    post: null,
    loading: true,
    practicesMap: {},
    pagination: {
      practices: {
        isFetching: false,
        has_next: undefined,
        page: 1,
        ids: []
      }
    }
  };

  componentWillMount() {
    postResource.getSinglePost(this.props.match.params.id).then(
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

    this.getPractices();
  }

  getPractices = () => {
    this.setState(prevState => ({
      ...prevState,
      pagination: {
        practices: practicesReducer(prevState.pagination.practices, {
          type: actionConstants.PRACTICE_REQUEST
        })
      }
    }));

    const { page } = this.state.pagination.practices;

    practiceResource
      .getPractices({ page, postId: this.props.match.params.id })
      .then(response => {
        this.setState(prevState => ({
          ...prevState,
          practicesMap: practicesReducer(
            prevState.practicesMap,
            practiceSuccessResponse(
              actionConstants.POST_PRACTICE_SUCCESS,
              response
            )
          ),
          pagination: {
            practices: paginatePracticesReducer(
              prevState.pagination.practices,
              practiceSuccessResponse(
                actionConstants.POST_PRACTICE_SUCCESS,
                response
              )
            )
          }
        }));
      });
  };

  render() {
    const { post, loading, pagination, practicesMap } = this.state;
    const practicesPagination = pagination.practices;

    const practices = practicesPagination.ids.map(
      practiceId => practicesMap[practiceId]
    );

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
          <PracticesContainer
            pagination={practicesPagination}
            practices={practices}
            getPractices={getPractices}
            postFromSinglePost={post}
          />
        </div>
      </div>
    );
  }
}

export default Post;
