import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Album from '../Album/List/AlbumList'
import * as actions from '../../store/actions'

import Avatar from './components/avatar'
import TodoList from '../../containers/Tasks/components/todo-list'
import ProfileForm from './components/ProfileForm/ProfileForm'
import UserInfoWithRedactor from './components/user-info-with-redactor'

import { Container, Row, Col } from 'reactstrap'
import styles from './Profile.module.css'

import { loadAlbums } from '../../store/actions'

class Profile extends Component {
  componentDidMount() {
    this.props.loadDataAlbums(this.props.userId, this.props.idToken)
    //fetch user info
    this.props.fetchProfile(this.props.userId, this.props.idToken)
  }

  render() {
    let content

    if (false) {
      content = <ProfileForm />
    } else {
      content = (
        <Container className={styles.profile}>
          <Row className={styles.userAvatarAndInfo}>
            <Col xs="3">
              <Avatar/>
            </Col>
            <Col xs="3" className={styles.userInfo}>
              <UserInfoWithRedactor/>
            </Col>
            <Col xs="6" className={styles.taskList}>
              <h2>Задачи</h2>
              <TodoList items={this.props.task.items}/>
            </Col>
          </Row>
          <h3>Albums {this.props.albums.length}</h3>
          <Row className={styles.albumsBar}>
            <Album isPropfile={true} />
          </Row>
        </Container>
      )
    }
    return <Fragment>{content}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    task: state.task,
    userId: state.auth.userId,
    idToken: state.auth.token,
    loading: state.profile.loading,
    newUser: state.profile.new,
    albums: state.albums.dataAlbums

  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId, idToken) => dispatch(actions.profileFetch(userId, idToken)),
  loadDataAlbums: (userId, authToken) => {
    dispatch(loadAlbums(userId, authToken))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
