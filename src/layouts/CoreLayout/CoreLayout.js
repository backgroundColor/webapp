// @flow
import React from 'react'
// import Header from '../../components/Header'
// import SideNav from '../../components/SideNav'
// normalize with antd and add icons & animations
import 'font-awesome/css/font-awesome.css'
import 'biu.js/dist/biu.css'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'
import 'antd/lib/style/css'

import '../../styles/agtable.css'
import '../../styles/biu-tip.css'

import LeftPanel from '../../components/LeftPanel'
import styles from './CoreLayout.css'
import '../../styles/core.css'
import HeaderBar from 'components/HeaderBar'

function hideNavbar (location) {
  return location.query['hide-navbar'] === 'true'
}

export const CoreLayout = ({ children, location }: { children: HTMLElement, location: Object }) => (
  <div className={styles['core-layout']}>
    <div className={styles['header']}>
      <HeaderBar />
    </div>
    <div className={styles['content']}>
      <div className={styles['side-nav']}>
        <LeftPanel />
      </div>
      <div className={styles['viewport']}>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
