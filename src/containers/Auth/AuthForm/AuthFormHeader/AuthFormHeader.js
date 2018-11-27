import React from 'react'
import { CardHeader, Col, Row } from 'reactstrap'

function AuthFormHeader(props) {
  return (
    <CardHeader>
      <Row>
        <Col lg="12">
          <h3>{props.type === 'login' ? 'Login' : 'Register'}</h3>
        </Col>
      </Row>
    </CardHeader>
  )
}

export default AuthFormHeader
