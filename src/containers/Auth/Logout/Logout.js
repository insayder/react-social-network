import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions'

function Logout(props) {
  props.onLogout(props.tokenRefreshTimeoutId)
  return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
  return { onLogout: tokenRefreshTimeoutId => dispatch(actions.authLogout(tokenRefreshTimeoutId)) }
}

const mapStateToProps = state => {
  return { tokenRefreshTimeoutId: () => state.auth.tokenRefreshTimeoutId }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)
