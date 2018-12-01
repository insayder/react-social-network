import React, { Component } from 'react'

import Album from '../Album/Album'
import { Container, Row, Col } from 'reactstrap';
import UserInfoWithRedactor from './components/user-info-with-redactor'
import styles from './Profile.module.css'
import { Route, Switch } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        name: '',
        address: '',
        phone: '',
        job: '',
        avatarUrl: ''
      },
      albums: [],
      tasks: [],
      editorActive: false
    }
  }
  componentDidMount() {
    //fetch user info
    this.setState({user: {
        id: 1,
        name: 'InavBB',
        address: "Moscow",
        phone: '+79883121',
        job: "Somewhere",
        avatarUrl: 'https://picsum.photos/200/200'
      }
    });

    this.setState({albums:["newHero", "tripToMountains", "partyForEveryBody"]});
  }

  render() {
    return (
      <Container className={styles.profile}>
        <Row className={styles.userAvatarAndInfo}>
          <Col xs="3">
            <img className={styles.userAvatar} src={this.state.user.avatarUrl} alt="User avatar"/>
          </Col>
          <Col xs="2" className={styles.userInfo}>
            <UserInfoWithRedactor/>
          </Col>
          <Col xs="7" className={styles.taskList}>
          </Col>
        </Row>
        <h3>Albums {this.state.albums.length}</h3>
        <Row className={styles.albumsBar}>
          <Switch>
            <Route path="/album" component={Album} />
          </Switch>
        </Row>
      </Container>
    )
  }
}

export default Profile
