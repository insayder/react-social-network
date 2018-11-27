import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'reactstrap';
import InlineEdit from 'react-inline-editing';
import { changeNameAlbum } from '../../../../store/actions';

import styles from './../../Album.module.css';

const NavAlbum = ({ changeAlbumTitle, albums, idAlbum }) => {
  let album = albums.find(album => album.id === +idAlbum);
  const handlerDeleteAlbum = e => {
    console.log('DELETE');
  };
  const handlerLoadPhoto = e => {
    console.log(e.target.files);
  };
  const handleChangeAlbumName = e => {
    changeAlbumTitle({ title: e, id: idAlbum });
  };

  return (
    <Row className={`justify-content-between align-items-center ${styles.rowPadding}`}>
      <Col>
        <Row className="align-items-center">
          <InlineEdit
            labelFontWeight="bold"
            text={album.title}
            onFocusOut={handleChangeAlbumName}
          />
          <Button className={`${styles.button}`} color="primary">
            Переименовать
          </Button>
        </Row>
      </Col>
      <form className="d-flex" method="POST" encType="multipart/form-data">
        <Input
          className={styles.uploadButton}
          onChange={handlerLoadPhoto}
          id="loadPhoto"
          type="file"
          multiple
          name="loadPhoto"
        />
        <Button className={`${styles.button}`} color="success">
          Зарузить
        </Button>
      </form>
      <Button
        type="submit"
        onClick={handlerDeleteAlbum}
        className={`${styles.button}`}
        color="danger"
      >
        Удалить выбранные
      </Button>
    </Row>
  );
};

const mapStateToProps = (state, ownProp) => {
  return {
    albums: state.albums.dataAlbums,
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({
    changeAlbumTitle: newAlbumTitle => {
      dispatch(changeNameAlbum(newAlbumTitle));
    },
  })
)(NavAlbum);
