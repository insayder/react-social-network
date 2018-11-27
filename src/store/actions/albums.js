import * as actionTypes from './actionTypes';

export const showModal = id => {
  return { type: actionTypes.SHOW_MODAL, payload: id };
};

export const hideModal = () => {
  return { type: actionTypes.HIDE_MODAL };
};

export const changeNameAlbum = newAlbumTitle => {
  return { type: actionTypes.CHANGE_TITLE_ALBUM, payload: newAlbumTitle };
};
