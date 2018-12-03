import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

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

InitialAddAlbum.propTypes = {
  allowAdd: PropTypes.func
}

export { InitialAddAlbum }
