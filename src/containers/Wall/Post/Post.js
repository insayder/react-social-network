import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Row, Card, CardHeader, CardBody, Col } from 'reactstrap'

import styles from './Post.module.css'

function Post(props) {
  const thumbnailClasses = ['img-thumbnail'].join(' ')
  const minutes = props.date.getMinutes().toString()
  let postDate = `${props.date.getFullYear()}-${props.date.getMonth() +
    1}-${props.date.getDate()} ${props.date.getHours()}:${minutes.length < 2 ? '0' + minutes : minutes}`

  return (
    <Fragment>
      <Row className="mb-4">
        <Col className="d-none d-sm-block p-0 m-0" sm="2" md="2" lg="1" xl="1">
          <img className={thumbnailClasses} src={props.photoURL} alt={props.userName} />
        </Col>
        <Col xs="12" sm="10" md="9" lg="10" xl="9">
          <Card className={styles.post_card}>
            <CardHeader className={styles.post_header}>
              <Link to={`/users/${props.userId}/wall`}>
                <strong>{props.userName}</strong>
              </Link>{' '}
              <span className="text-muted">опубликовано {postDate}</span>
            </CardHeader>
            <CardBody>{props.body}</CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

Post.propTypes = {
  body: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  userId: PropTypes.string,
  userName: PropTypes.string,
  photoURL: PropTypes.string
}

export default Post
