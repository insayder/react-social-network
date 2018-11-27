import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import Photo from './Photo';

const contentAlbum = ({ albums, idAlbum }) => {
  let albumPhoto = albums.find(album => album.id === +idAlbum);
  return (
    <Row width="100%" className={`justify-content-between align-items-center`}>
      {albumPhoto.photo.map(photo => (
        <Photo key={photo.id} dataPhoto={photo} />
      ))}
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
  dispatch => ({})
)(contentAlbum);
