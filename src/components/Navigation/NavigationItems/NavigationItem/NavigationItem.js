import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'

import { NavItem, NavLink } from 'reactstrap'
import styles from './NavigationItem.module.css'

function NavigationItem(props) {
  return (
    <NavItem>
      <NavLink tag={RRNavLink} to={props.link} exact={props.exact} activeClassName={styles.active}>
        {props.children}
      </NavLink>
    </NavItem>
  )
}

export default NavigationItem
