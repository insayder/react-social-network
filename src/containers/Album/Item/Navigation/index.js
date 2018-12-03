import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import FileUploader from 'react-firebase-file-uploader'
import { AlbumTitle, EditAlbumTitle } from './AlbumNavTitle'
import { changeNameAlbum, removeAlbumPhoto, loadPhotoToDB } from '../../../../store/actions'

import styles from './../../Album.module.css'
import firebase from 'firebase'
import { config } from '../../../../constants/firebase'
import PropTypes from 'prop-types'

class NavAlbum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editTitle: false,
      loadButtonStatus: true,
      files: []
    }
  }
  handlerDeleteAlbumPhoto = e => {
    if (this.props.removablePhoto.idPhoto.length > 0) {
      this.props.removeSelectedPhoto({ idUser: this.props.idUser, authToken: this.props.authToken })
    }
  }
  // handlerStartUpload = e => {
  //   let oldData = this.state.files.data
  //   let oldName = this.state.files.name
  //   oldData.push(e)
  //   this.setState({
  //     files: {
  //       data: oldData,
  //       name: oldName
  //     }
  //   })
  // }
  handlerClickLoadPhoto = () => {
    Promise.all(
      this.state.files.map(file => {
        return firebase
          .storage()
          .ref(`images/${file.name}`)
          .put(file)
      })
    ).then(response => {
      Promise.all(
        response.map(resp => {
          //console.log(resp)
          return firebase
            .storage()
            .ref('images')
            .child(resp.metadata.name)
            .getDownloadURL()
        })
      ).then(result => {
        let photo = []
        result.map(url => {
          let dataPhoto = {
            url: url,
            idAlbum: this.props.idAlbum
          }
          photo.push(dataPhoto)
          return url
        })
        let objPhoto = {
          photo: photo,
          idUser: this.props.idUser,
          authToken: this.props.authToken
        }
        // this.fileUploader.value = ''
        return this.props.loadPhoto(objPhoto)
      })
    })
    this.fileUploader.value = ''
    this.setState({
      loadButtonStatus: true,
      files: []
    })
  }
  // handlerUploadSuccess = filename => {
  //   let oldData = this.state.files.data
  //   let oldName = this.state.files.name
  //   oldName.push(filename)
  //   this.setState({
  //     loadButtonStatus: false,
  //     files: {
  //       name: oldName,
  //       data: oldData
  //     }
  //   })
  // }
  handlerUploadError = e => {
    //  console.log(e)
  }

  handlerChangeUpload = e => {
    let files = []
    for (let i = 0; i < e.target.files.length; ++i) {
      files.push(e.target.files[i])
    }
    this.setState({
      files: files,
      loadButtonStatus: files.length > 0 ? false : true
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
      return false
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
        <form className="d-flex">
          <FileUploader
            //ref="files"
            ref={instance => (this.fileUploader = instance)}
            storageRef={firebase.storage().ref('images')}
            accept="image/*"
            name="albumPhoto"
            randomizeFilename
            multiple
            defaultValue=""
            // access_token={this.props.authToken}
            onUploadError={this.handlerUploadError}
            // onUploadStart={this.handlerStartUpload}
            // onUploadSuccess={this.handlerUploadSuccess}
            onChange={this.handlerChangeUpload}
          />
          <Button
            disabled={this.state.loadButtonStatus}
            type="button"
            onClick={this.handlerClickLoadPhoto}
            className={`${styles.button}`}
            color="success"
          >
            Зарузить
          </Button>
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

NavAlbum.propTypes = {
  changeAlbumTitle: PropTypes.func,
  removeSelectedPhoto: PropTypes.func,
  loadPhoto: PropTypes.func,
  idUser: PropTypes.string,
  authToken: PropTypes.string,
  albums: PropTypes.array,
  removablePhoto: PropTypes.shape({
    idAlbum: PropTypes.string,
    idPhoto: PropTypes.array
  }),
  idAlbum: PropTypes.string
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
