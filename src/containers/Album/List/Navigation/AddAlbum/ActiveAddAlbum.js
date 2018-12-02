import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col } from 'reactstrap'
import { addNewAlbum } from '../../../../../store/actions'
import _ from 'lodash'

import styles from '../../../Album.module.css'

class ActiveAddAlbumClass extends React.Component {
  constructor(props) {
    super(props)
    this.refAlbumName = React.createRef()
  }
  handlerCancelButton = () => {
    this.props.allowAdd()
  }
  handlerSaveButton = () => {
    let arrayOfId = this.props.albums.map(album => {
      return album !== null ? album.id : null
    })
    //let id = _.max(arrayOfId) + 1
    let dataNewAlbum = {
      idUser: this.props.idUser,
      authToken: this.props.authToken,
      newAlbum: {
        userId: this.props.idUser,
        //id: id,
        title: this.refAlbumName.value,
        photo: []
      }
    }
    this.props.allowAdd()
    this.props.addAlbum(dataNewAlbum)
  }
  render() {
    return (
      <Row>
        <Col>
          <Input innerRef={input => (this.refAlbumName = input)} placeholder="Введите название альбома" />
          <Button onClick={this.handlerSaveButton} className={`${styles.button}`} color="success">
            Сохранить
          </Button>
          <Button onClick={this.handlerCancelButton} className={`${styles.button}`} color="danger">
            Отменить
          </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    albums: state.albums.dataAlbums,
    idUser: state.auth.userId,
    authToken: state.auth.token
  }
}

const ActiveAddAlbum = connect(
  mapStateToProps,
  dispatch => ({
    addAlbum: objAlbum => {
      dispatch(addNewAlbum(objAlbum))
    }
  })
)(ActiveAddAlbumClass)

export { ActiveAddAlbum }
