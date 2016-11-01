// @flow
import React from 'react'
import { IndexLink, Link } from 'react-router'
// import CSSModules from 'react-css-modules'
import styles from './Header.css'

const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName={styles['route-active']}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={styles['route-active']}>
      Counter
    </Link>
  </div>
)

// export default CSSModules(Header, styles)
export default Header
