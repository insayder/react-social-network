import React from 'react'
import { Button, Col, Input } from 'reactstrap'
import PropTypes from 'prop-types'

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

EditAlbumTitle.propTypes = {
  allowEdit: PropTypes.func,
  changeTitle: PropTypes.func,
  dataAlbum: PropTypes.shape({
    photo: PropTypes.array,
    title: PropTypes.string,
    userId: PropTypes.string,
    id: PropTypes.string
  })
}

export { EditAlbumTitle }
