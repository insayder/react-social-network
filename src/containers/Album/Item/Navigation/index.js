import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'reactstrap'
import FileUploader from 'react-firebase-file-uploader'
import { AlbumTitle, EditAlbumTitle } from './AlbumNavTitle'
import { changeNameAlbum, removeAlbumPhoto, loadPhotoToDB } from '../../../../store/actions'

import styles from './../../Album.module.css'
import firebase from 'firebase'
import { API_KEY } from '../../../../constants/auth'

const config = {
  apiKey: API_KEY,
  authDomain: 'react-social-network-1f579.firebaseapp.com',
  databaseURL: 'https://react-social-network-1f579.firebaseio.com',
  storageBucket: 'gs://react-social-network-1f579.appspot.com'
}

firebase.initializeApp(config)

class NavAlbum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editTitle: false
    }
  }
  handlerDeleteAlbumPhoto = e => {
    if (this.props.removablePhoto.idPhoto.length > 0) {
      this.props.removeSelectedPhoto({ idUser: this.props.idUser, authToken: this.props.authToken })
    }
  }
  handleStartUpload = e => {
    console.log('uploaded')
  }
  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        let objPhoto = {
          photo: {
            url: url,
            idAlbum: this.props.idAlbum
          },
          idUser: this.props.idUser,
          authToken: this.props.authToken
        }
        return this.props.loadPhoto(objPhoto)
      })
  }
  handlerChangeAlbumName = e => {
    this.setState({ editTitle: false })
    this.props.changeAlbumTitle({
      idUser: this.props.idUser,
      authToken: this.props.authToken,
      title: e,
      id: this.props.idAlbum
    })
  }
  handlerAllowEdit = e => {
    this.state.editTitle ? this.setState({ editTitle: false }) : this.setState({ editTitle: true })
  }
  render() {
    let album = this.props.albums.find(album => {
      if (album !== null && album.id === this.props.idAlbum) {
        return album
      }
    })

    return (
      <Row className={`justify-content-between align-items-center ${styles.rowPadding}`}>
        <Col>
          <Row className="align-items-center">
            {this.state.editTitle ? (
              <EditAlbumTitle
                allowEdit={this.handlerAllowEdit}
                changeTitle={this.handlerChangeAlbumName}
                dataAlbum={album}
              />
            ) : (
              <AlbumTitle allowEdit={this.handlerAllowEdit} dataAlbum={album} />
            )}
          </Row>
        </Col>
        <form className="d-flex" method="POST" encType="multipart/form-data">
          <FileUploader
            accept="image/*"
            name="albumPhoto"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleStartUpload}
            onUploadSuccess={this.handleUploadSuccess}
          />
          {/* <Button type="button" onClick={this.handlerClickLoadPhoto} className={`${styles.button}`} color="success">
            Зарузить
          </Button> */}
        </form>
        <Button type="submit" onClick={this.handlerDeleteAlbumPhoto} className={`${styles.button}`} color="danger">
          Удалить выбранные
        </Button>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProp) => {
  return {
    idUser: state.auth.userId,
    authToken: state.auth.token,
    albums: state.albums.dataAlbums,
    removablePhoto: state.albums.removableAlbumPhoto
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    changeAlbumTitle: newAlbumTitle => {
      dispatch(changeNameAlbum(newAlbumTitle))
    },
    removeSelectedPhoto: objAuth => {
      dispatch(removeAlbumPhoto(objAuth))
    },
    loadPhoto: photos => {
      dispatch(loadPhotoToDB(photos))
    }
  })
)(NavAlbum)
