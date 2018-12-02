import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Col, Input } from 'reactstrap'

import styles from '../../../Album.module.css'

class EditAlbumTitle extends React.Component {
  constructor(props) {
    super(props)
    this.refTitle = React.createRef()
  }
  handlerCancelButton = () => {
    this.props.allowEdit()
  }
  handlerSaveButton = () => {
    this.props.changeTitle(this.refTitle.value)
  }
  render() {
    return (
      <Col>
        <Input
          innerRef={input => (this.refTitle = input)}
          placeholder="Название заголовка"
          defaultValue={this.props.dataAlbum.title}
        />
        <Button className={`${styles.button}`} color="success" onClick={this.handlerSaveButton}>
          Сохранить
        </Button>
        <Button className={`${styles.button}`} color="danger" onClick={this.handlerCancelButton}>
          Отмена
        </Button>
      </Col>
    )
  }
}

export { EditAlbumTitle }
