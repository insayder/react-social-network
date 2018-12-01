import React from 'react'
import { Button } from 'reactstrap'

import styles from '../../../Album.module.css'

const InitialAddAlbum = ({ allowAdd }) => {
  const handlerAddButton = () => {
    allowAdd()
  }
  return (
    <Button onClick={handlerAddButton} className={`${styles.button}`} color="success">
      Добавить альбом
    </Button>
  )
}

export { InitialAddAlbum }
