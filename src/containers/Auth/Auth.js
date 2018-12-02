import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AuthForm from './AuthForm/AuthForm'

function Auth(props) {
  const { from } = props.location.state || { from: { pathname: '/' } }
  if (props.redirectToReferrer) return <Redirect to={from} />
  return <AuthForm type={props.type} />
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    redirectToReferrer: state.auth.redirectToReferrer
  }
}

export default connect(mapStateToProps)(Auth)
