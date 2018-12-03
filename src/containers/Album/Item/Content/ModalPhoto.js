import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../../Album.module.css'
import { hideModal } from '../../../../store/actions'

const modalPhoto = ({ hideModal, dataPhoto, modalStatus: status, modalId: id }) => {
  const toggleModalState = () => {
    if (status) {
      hideModal()
    }
  }
  return (
    <Modal
      className={`${styles.modalSize}`}
      toggle={toggleModalState}
      isOpen={status && id === dataPhoto.id ? true : false}
    >
      <ModalBody>
        <img src={dataPhoto.url} alt={dataPhoto.url} />
      </ModalBody>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    modalStatus: state.albums.modal.status,
    modalId: state.albums.modal.id
  }
}

modalPhoto.defaultProps = {
  id: ''
}

modalPhoto.propTypes = {
  dataPhoto: PropTypes.shape({
    idAlbum: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string
  }),
  modalStatus: PropTypes.bool,
  id: PropTypes.string,
  hideModal: PropTypes.func
}

export default connect(
  mapStateToProps,
  dispatch => ({
    hideModal: () => {
      dispatch(hideModal())
    }
  })
)(modalPhoto)
