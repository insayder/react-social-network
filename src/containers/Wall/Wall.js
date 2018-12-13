import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import PostForm from './PostForm/PostForm'
import PostList from './PostList/PostList'
import * as actions from '../../store/actions'

class Wall extends Component {
  componentDidMount() {
    const currentUserId = this.props.match.params.userId || this.props.userId
    const isSelfProfile = !this.props.match.userId || this.props.match.userId === this.props.userId
    if (isSelfProfile) {
      this.props.fetchProfile(currentUserId, this.props.idToken, isSelfProfile)
    } else {
      this.props.fetchProfile(this.props.userId, this.props.idToken)
    }
    this.props.fetchPosts(currentUserId, this.props.idToken)
  }

  render() {
    let postForm
    let userId
    if (this.props.match.params.userId === this.props.userId) {
      postForm = <Redirect to="/wall/" />
    } else if (this.props.match.params.userId) {
      userId = this.props.match.params.userId
      postForm = null
    } else {
      userId = this.props.userId
      postForm = (
        <Row>
          {postForm}
          <Col md="11" xl="10">
            <PostForm />
          </Col>
        </Row>
      )
    }
    return (
      <Container>
        {postForm}
        <PostList currentUserId={userId} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    idToken: state.auth.token,
    fetchingPosts: state.posts.fetching,
    fetchingProfile: state.profile.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (userId, idToken) => dispatch(actions.postsFetch(userId, idToken)),
    fetchProfile: (userId, idToken, isSelfProfile) => dispatch(actions.profileFetch(userId, idToken, isSelfProfile))
  }
}

Wall.propTypes = {
  fetchPosts: PropTypes.func,
  userId: PropTypes.string,
  idToken: PropTypes.string,
  fetchProfile: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wall)
