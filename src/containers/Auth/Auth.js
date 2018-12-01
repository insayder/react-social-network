import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import AuthForm from './AuthForm/AuthForm'

class Auth extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.props.redirectToReferrer) return <Redirect to={from} />
    return <AuthForm type={this.props.type} />
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    redirectToReferrer: state.auth.redirectToReferrer
  }
}

export default withRouter(connect(mapStateToProps)(Auth))
