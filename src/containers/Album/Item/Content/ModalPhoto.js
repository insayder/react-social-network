import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'

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
        <img src={dataPhoto.url} alt={dataPhoto.title} />
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

export default connect(
  mapStateToProps,
  dispatch => ({
    hideModal: () => {
      dispatch(hideModal())
    }
  })
)(modalPhoto)
