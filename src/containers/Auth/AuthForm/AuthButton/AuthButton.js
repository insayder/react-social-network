import React, { Fragment } from 'react'
import { Button, FormGroup } from 'reactstrap'

function AuthButton(props) {
  const content =
    props.type === 'login' ? (
      <FormGroup>
        <Button color="primary" tabIndex={props.tabIndex} onClick={props.auth}>
          Log In
        </Button>
      </FormGroup>
    ) : (
      <FormGroup>
        <Button disabled={props.disabled} color="primary" tabIndex={props.tabIndex} onClick={props.auth}>
          Register
        </Button>
      </FormGroup>
    )
  return <Fragment>{content}</Fragment>
}

export default AuthButton
