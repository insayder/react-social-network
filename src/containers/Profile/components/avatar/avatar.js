import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import styles from './Avatar.module.css'
import { Col } from 'reactstrap'
import { changeAvatar, editorStart } from '../../../../store/actions'

import FileUploader from "react-firebase-file-uploader"
import firebase from 'firebase'
class Avatar extends Component {
  constructor(props) {
    super(props)
    this.state = { photoUrl: '' }
    this.changeAvatar = this.changeAvatar.bind(this)
  }
  changeAvatar(fileName) {
    console.log(this.props.photoUrl)
    this.props.changeAvatar(this.props.userId, fileName)
  }
  render() {
    return (
      <Col xs="3">
        <form className={styles.downloadButton}>
          <FileUploader
            accept="image/*"
            name="avatar"
            access_token={this.props.token}
            randomizeFilename
            storageRef={firebase.storage().ref("avatars")}
            onUploadSuccess={this.changeAvatar}
          />
        </form>
        <img className={styles.avatar} src={this.props.photoUrl} alt="User avatar" />
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    photoUrl: state.profile.photoUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editorStart: () => dispatch(editorStart()),
    changeAvatar: (userId, fileName) => dispatch(changeAvatar(userId, fileName)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar)
