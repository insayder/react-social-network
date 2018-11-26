import React, { Component } from 'react'
import styles from './Profile.module.css'
import { Container, Row, Col } from 'reactstrap';


class UserInfo extends Component {
    render() {
        return (
            <div>
                <p>{this.props.user.name}</p>
                <p>{this.props.user.address}</p>
                <p>{this.props.user.phone}</p>
                <p>{this.props.user.workAddress}</p>
            </div>
        )
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                name: '',
                address: '',
                phone: '',
                workAddress: ''
            },
            avatarSrc: '',
            albums: []
        }
    }
    componentDidMount() {
        //fetch user info
        this.setState({user: {
                id: 1,
                name: 'InavBB',
                address: "Moscow",
                phone: '+79883121',
                workAddress: "Somewhere"
            }
        });
        //возможно стоит объеденить с информацией о юзере
        this.setState({ avatarSrc: 'https://picsum.photos/200/200'});

        this.setState({albums:["newHero", "tripToMountains", "partyForEveryBody"]});
    }

    render() {
        return (
            <Container className={styles.profile}>
                <Row className={styles.userAvatarAndInfo}>
                    <Col xs="3">
                        <img className={styles.userAvatar} src={this.state.avatarSrc} alt="User avatar"/>
                    </Col>
                    <Col xs="2" className={styles.userInfo}>
                        <UserInfo user={this.state.user} />
                    </Col>
                    <Col xs="7" className={styles.taskList}>
                   
                    </Col>
                </Row>
                <h3>Albums {this.state.albums.length}</h3>
                <Row className={styles.albumsBar}>
                    {this.state.albums.map(album => {
                        return <a href="#"><img className={styles.albumCover} src="https://picsum.photos/200/150" alt=""/></a>
                    })}
                </Row>
            </Container>
        )
    }
}

export default Profile
