import React from 'react'
import { NavLink as NLink} from 'react-router-dom'

import styles from './NavigationItem.module.css'
import { NavItem, NavLink } from 'reactstrap';

function NavigationItem(props) {
  return (
    <NavItem>
      <NavLink>
        <NLink to={props.link} exact={props.exact} activeClassName={styles.active}>
          {props.children}
        </NLink>
      </NavLink>
    </NavItem>
  )
}

export default NavigationItem
