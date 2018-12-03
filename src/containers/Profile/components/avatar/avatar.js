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
    const updateData = {
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '' ,
      city: this.props.city || '',
      phone: this.props.phone || ''
    }
    this.props.changeAvatar(this.props.userId, this.props.token, fileName, updateData)
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
    photoUrl: state.profile.photoUrl,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    city: state.profile.city,
    phone: state.profile.phone,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    editorStart: () => dispatch(editorStart()),
    changeAvatar: (userId, token, fileName, updateData) => dispatch(changeAvatar(userId, token, fileName, updateData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar)
