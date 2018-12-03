import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Post from '../Post/Post'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions'

class PostList extends Component {
  render() {
    let content
    if (this.props.fetching) {
      content = <Spinner />
    } else {
      let postsData = []
      for (let postId in this.props.posts) {
        postsData.push({ id: postId, ...this.props.posts[postId] })
      }

      const posts = postsData.map(postData => {
        return (
          <Post
            key={postData.id}
            body={postData.body}
            date={new Date(postData.date)}
            userId={postData.userId}
            userName={postData.userName}
            photoURL={postData.photoURL}
          />
        )
      })
      content = <ul className="list-unstyled">{posts}</ul>
    }

    return <Fragment>{content}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    fetching: state.posts.fetching,
    userId: state.auth.userId,
    idToken: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postsFetch: (userId, idToken) => {
      dispatch(actions.postsFetch(userId, idToken))
    }
  }
}

PostList.propTypes = {
  posts: PropTypes.object,
  fetching: PropTypes.bool,
  userId: PropTypes.string,
  idToken: PropTypes.string,
  postsFetch: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
