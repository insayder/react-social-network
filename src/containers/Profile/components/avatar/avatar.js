import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'

import axios from 'axios'
import styles from './Avatar.module.css'
import { Col } from 'reactstrap'
import { editorStart, profileFetch } from '../../../../store/actions'


import { config } from '../../../../constants/firebase'
import firebase from 'firebase'
import FileUploader from "react-firebase-file-uploader";



class Avatar extends Component {
  constructor(props) {
    super(props)
    this.showNewAvatar = this.showNewAvatar.bind(this)
    this.state = {avatarURL: '',
    token: localStorage.getItem('token')}
  }
  showNewAvatar(e) {
    e.preventDefault()
    firebase
      .storage()
      .ref("avatars")
      .child(e.filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));

  }
  render() {
    return (
      <Col xs="3">
        <form  onSubmit={this.showNewAvatar}>
          <FileUploader
            accept="image/*"
            name="avatar"
            access_token={this.state.token}

            randomizeFilename
            storageRef={firebase.storage().ref("avatars")}
     
          />
          <p>{this.state.avatarURL}</p>
        </form>
          <img src='https://picsum.photos/200/200' alt="User avatar"/>
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileFetch: (userId, token) => dispatch(profileFetch(userId, token)),
    editorStart: () => dispatch(editorStart())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar)


