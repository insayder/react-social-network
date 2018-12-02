import React from 'react'
import { connect } from 'react-redux'
import { Col, Row, Button } from 'reactstrap'

import styles from '../../Album.module.css'
import { InitialAddAlbum, ActiveAddAlbum } from './AddAlbum'
import { removeAlbum } from '../../../../store/actions'

class AlbumsListNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addAlbum: false
    }
  }
  componentWillUnmount() {
    this.setState({ addAlbum: false })
  }
  handlerAllowAdd = () => {
    this.state.addAlbum ? this.setState({ addAlbum: false }) : this.setState({ addAlbum: true })
  }
  handlerDeleteAlbum = () => {
    this.props.removeSelectedAlbums({ idUser: this.props.idUser, authToken: this.props.authToken })
  }
  render() {
    return (
      <Row className={`justify-content-around ${styles.rowPadding}`}>
        <Col className="text-center" md={5}>
          <h4>Список альбомов</h4>
        </Col>
        <Col className="text-center" md={5}>
          {this.state.addAlbum ? (
            <ActiveAddAlbum allowAdd={this.handlerAllowAdd} />
          ) : (
            <InitialAddAlbum allowAdd={this.handlerAllowAdd} />
          )}
          <Button onClick={this.handlerDeleteAlbum} className={`${styles.button}`} color="danger">
            Удалить выбранные
          </Button>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => {
  return {
    idUser: state.auth.userId,
    authToken: state.auth.token
  }
}
export default connect(
  mapStateToProps,
  dispatch => ({
    removeSelectedAlbums: authObj => {
      dispatch(removeAlbum(authObj))
    }
  })
)(AlbumsListNav)
