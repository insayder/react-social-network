import React from 'react';
import { Col, Card, CardImg, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { showModal } from '../../../../store/actions';

import styles from './../../Album.module.css';
import ModalPhoto from './ModalPhoto';

const Photo = props => {
  const handlerPhotoClick = e => {
    if (!props.modalStatus) {
      props.showModal(props.dataPhoto.id);
    }
  };
  const handlerCheckboxChange = e => {};
  return (
    <Col md={3} className={`${styles.mrBottom}`}>
      <Card>
        <Input className={styles.photoCheckbox} type="checkbox" onChange={handlerCheckboxChange} />
        <CardImg
          onClick={handlerPhotoClick}
          width="250"
          height="150"
          src={props.dataPhoto.thumbnailUrl}
        />
      </Card>
      <ModalPhoto dataPhoto={props.dataPhoto} />
    </Col>
  );
};

const mapStateToProps = (state, ownProp) => {
  return {
    modalStatus: state.albums.modal.status,
    modalId: state.albums.modal.id,
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({
    showModal: id => {
      dispatch(showModal(id));
    },
  })
)(Photo);
