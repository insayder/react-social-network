import React from 'react'
import { Col, Card, CardImg, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { showModal } from '../../../../store/actions'
import { addToRemovableAlbumPhoto, deleteFromRemovableAlbumPhoto } from '../../../../store/actions'
import PropTypes from 'prop-types'

import styles from './../../Album.module.css'
import ModalPhoto from './ModalPhoto'

const Photo = props => {
  const handlerPhotoClick = e => {
    if (!props.modalStatus) {
      props.showModal(props.dataPhoto.id)
    }
  }
  const handlerCheckboxChange = e => {
    e.target.checked
      ? props.selectPhoto({ idAlbum: props.idAlbum, idPhoto: props.dataPhoto.id })
      : props.resetSelectedPhoto({ idAlbum: props.idAlbum, idPhoto: props.dataPhoto.id })
  }
  return (
    <Col md={3} className={`${styles.mrBottom}`}>
      <Card>
        <Input className={styles.photoCheckbox} type="checkbox" onChange={handlerCheckboxChange} />
        <CardImg onClick={handlerPhotoClick} width="250" height="150" src={props.dataPhoto.url} />
      </Card>
      <ModalPhoto dataPhoto={props.dataPhoto} />
    </Col>
  )
}

const mapStateToProps = (state, ownProp) => {
  return {
    modalStatus: state.albums.modal.status,
    modalId: state.albums.modal.id
  }
}

Photo.propTypes = {
  idAlbum: PropTypes.string,
  dataPhoto: PropTypes.shape({
    idAlbum: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string
  }),
  showModal: PropTypes.func,
  selectPhoto: PropTypes.func,
  resetSelectedPhoto: PropTypes.func
}

export default connect(
  mapStateToProps,
  dispatch => ({
    showModal: id => {
      dispatch(showModal(id))
    },
    selectPhoto: objId => {
      dispatch(addToRemovableAlbumPhoto(objId))
    },
    resetSelectedPhoto: objId => {
      dispatch(deleteFromRemovableAlbumPhoto(objId))
    }
  })
)(Photo)
