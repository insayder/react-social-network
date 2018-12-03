import React from 'react'
import { Button, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import styles from '../../../Album.module.css'

const AlbumTitle = ({ allowEdit, dataAlbum }) => {
  const handlerRenameButton = () => {
    allowEdit()
  }
  return (
    <Col>
      <span className={`${styles.title}`}>{dataAlbum.title}</span>
      <Button onClick={handlerRenameButton} className={`${styles.button}`} color="primary">
        Переименовать
      </Button>
    </Col>
  )
}

AlbumTitle.defaultProps = {
  dataAlbum: PropTypes.shape({
    title: '',
    photo: []
  })
}

AlbumTitle.propTypes = {
  allowEdit: PropTypes.func,
  dataAlbum: PropTypes.any //.shape({
  //   photo: PropTypes.any,
  //   title: PropTypes.any,
  //   userId: PropTypes.string,
  //   id: PropTypes.string
  // })
}

export { AlbumTitle }
