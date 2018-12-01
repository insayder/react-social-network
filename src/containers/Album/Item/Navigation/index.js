import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'reactstrap'
import { AlbumTitle, EditAlbumTitle } from './AlbumNavTitle'
import { changeNameAlbum, removeAlbumPhoto } from '../../../../store/actions'

import styles from './../../Album.module.css'

class NavAlbum extends React.Component {
  state = {
    editTitle: false
  }
  handlerDeleteAlbumPhoto = e => {
    if (this.props.removablePhoto.idPhoto.length > 0) {
      this.props.removeSelectedPhoto()
    }
  }
  handlerLoadPhoto = e => {
    console.log(e.target.files)
  }
  handlerChangeAlbumName = e => {
    this.setState({ editTitle: false })
    this.props.changeAlbumTitle({ title: e, id: this.props.idAlbum })
  }
  handlerAllowEdit = e => {
    this.state.editTitle ? this.setState({ editTitle: false }) : this.setState({ editTitle: true })
  }
  render() {
    let album = this.props.albums.find(album => album.id === +this.props.idAlbum)
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
          <Input
            className={styles.uploadButton}
            onChange={this.handlerLoadPhoto}
            id="loadPhoto"
            type="file"
            multiple
            name="loadPhoto"
          />
          <Button className={`${styles.button}`} color="success">
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
    removeSelectedPhoto: () => {
      dispatch(removeAlbumPhoto())
    }
  })
)(NavAlbum)
