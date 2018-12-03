import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { Nav } from 'reactstrap'

function NavigationItems(props) {
  let items = (
    <Fragment>
      <NavigationItem link="/" exact>
        Logo
      </NavigationItem>
      <NavigationItem link="/auth/login" exact>
        Login
      </NavigationItem>
      <NavigationItem link="/auth/register" exact>
        Register
      </NavigationItem>
    </Fragment>
  )
  if (props.isAuthenticated) {
    items = (
      <Fragment>
        <NavigationItem link="/" exact>
          Logo
        </NavigationItem>
        <NavigationItem link="/profile" exact>
          Profile
        </NavigationItem>
        <NavigationItem link="/albums">Albums</NavigationItem>
        <NavigationItem link="/tasks" exact>
          Tasks
        </NavigationItem>
        <NavigationItem link="/wall" exact>
          Wall
        </NavigationItem>
        <NavigationItem link="/auth/logout" exact>
          Logout
        </NavigationItem>
      </Fragment>
    )
  }
  return <Nav className={styles.navigationItem}>{items}</Nav>
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(NavigationItems)
