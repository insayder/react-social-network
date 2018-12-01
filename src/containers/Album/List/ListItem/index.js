import React from 'react'
import { connect } from 'react-redux'
import { Col, Card, CardTitle, CardImg, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { helpers } from '../../../../helpers'
import { NO_PHOTO } from '../../../../constants/albums'
import { addToRemovableAlbum, deleteFromRemovableAlbum } from '../../../../store/actions'

import styles from './../../Album.module.css'

const listItem = props => {
  const handlerCheckboxChange = e => {
    e.target.checked
      ? props.addToRemovable({ idAlbum: props.dataAlbum.id })
      : props.deleteFromRemovable({ idAlbum: props.dataAlbum.id })
  }
  return (
    <Col md={4} width="250" className={`text-center ${styles.mrBottom}`}>
      <Card>
        <Link width="250" to={`/album/${props.dataAlbum.id}`}>
          <CardTitle>{props.dataAlbum.title}</CardTitle>
        </Link>
        <Input className={styles.albumCheckbox} type="checkbox" onChange={handlerCheckboxChange} />
        <Link width="250" to={`/album/${props.dataAlbum.id}`}>
          <CardImg
            width="250"
            height="150"
            src={
              props.dataAlbum.photo.length > 0
                ? props.dataAlbum.photo[helpers.randomNumber(0, props.dataAlbum.photo.length - 1)].thumbnailUrl
                : NO_PHOTO
            }
          />
        </Link>
      </Card>
    </Col>
  )
}

export default connect(
  null,
  dispatch => ({
    addToRemovable: objIdAlbum => {
      dispatch(addToRemovableAlbum(objIdAlbum))
    },
    deleteFromRemovable: objIdAlbum => {
      dispatch(deleteFromRemovableAlbum(objIdAlbum))
    }
  })
)(listItem)
