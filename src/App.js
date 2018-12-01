import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'

import Album from './containers/Album/Album'
import Login from './containers/Auth/Login/Login'
import Logout from './containers/Auth/Logout/Logout'
import Register from './containers/Auth/Register/Register'
import Profile from './containers/Profile/Profile'
import Tasks from './containers/Tasks/Tasks'
import Wall from './containers/Wall/Wall'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Route path="/wall" component={Wall} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/albums" component={Album} />
          <Route path="/auth/logout" component={Logout} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/wall" component={Wall} />
          <Route path="/" exact component={Profile} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckLoginStatus())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
