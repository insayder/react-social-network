import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(PrivateRoute)
