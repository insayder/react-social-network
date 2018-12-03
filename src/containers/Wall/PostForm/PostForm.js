import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'

import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions'
import { updateObject } from '../../../shared/utility'

class PostForm extends Component {
  state = {
    postBody: ''
  }

  onClickHandler = event => {
    event.preventDefault()
    this.props.createPost(
      this.state.postBody,
      new Date(),
      null,
      this.props.userId,
      this.props.userName,
      this.props.photoURL,
      this.props.idToken
    )
  }

  onChangeHandler = event => {
    const postBody = event.target.value
    this.setState(updateObject(this.state, { postBody }))
  }

  render() {
    let content
    if (this.props.creatingPost) {
      content = <Spinner />
    } else {
      content = (
        <Form className="mb-5">
          <FormGroup>
            <Input type="textarea" name="text" id="text" value={this.state.postBody} onChange={this.onChangeHandler} />
          </FormGroup>
          <Row>
            <Col xs="12" sm="12" md="auto" lg="auto">
              <Button block onClick={this.onClickHandler}>
                Create post
              </Button>
            </Col>
          </Row>
        </Form>
      )
    }
    return <Fragment>{content}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    idToken: state.auth.token,
    userId: state.auth.userId,
    userName: [state.profile.firstName, state.profile.lastName].join(' '),
    photoURL: state.profile.photoURL,
    creatingPost: state.posts.creatingPost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: (body, date, parentPostId, userId, userName, photoURL, idToken) =>
      dispatch(actions.postsCreate(body, date, parentPostId, userId, userName, photoURL, idToken))
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func,
  idToken: PropTypes.string,
  userId: PropTypes.string,
  userName: PropTypes.string,
  photoURL: PropTypes.string,
  creatingPost: PropTypes.bool
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
