import React from 'react'
import { Button, Col } from 'reactstrap'

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

export { AlbumTitle }
