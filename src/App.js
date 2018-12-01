import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import PrivateRoute from './components/hoc/PrivateRoute/PrivateRoute'
import Album from './containers/Album/Album'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import Profile from './containers/Profile/Profile'
import Tasks from './containers/Tasks/Tasks'
import Wall from './containers/Wall/Wall'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin()
  }

  render() {
    const routes = (
      <Switch>
        <PrivateRoute path="/albums" component={Album} />
        <PrivateRoute path="/wall" component={Wall} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/tasks" component={Tasks} />
        <PrivateRoute path="/" exact component={Profile} />
        <Route path="/auth/login" render={props => <Auth type="login" />} />
        <Route path="/auth/register" render={props => <Auth type="register" />} />
        <Route path="/auth/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    tokenRefreshTimeoutId: state.auth.tokenRefreshTimeoutId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckLoginStatus()),
    onLogout: tokenRefreshTimeoutId => dispatch(actions.authLogout(tokenRefreshTimeoutId))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
