// @flow
import React from 'react'
// import Header from '../../components/Header'
// import SideNav from '../../components/SideNav'
// normalize with antd and add icons & animations
import 'font-awesome/css/font-awesome.css'
import 'biu.js/dist/biu.css'
import 'antd/lib/style/css'

import '../../styles/biu-tip.css'

import LeftPanel from '../../components/LeftPanel'
import styles from './CoreLayout.css'
import '../../styles/core.css'
import HeaderBar from 'components/HeaderBar'

class CoreLayout extends React.Component {

  render () {
    const { children, location } = this.props
    console.info(this.props)
    return (
      <div className={styles['core-layout']}>
        {
          location.pathname === '/login'
            ? <div style={{ height: '100%' }}>{children}</div>
          : <div style={{ height: '100%' }}>
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
        }
      </div>
    )
  }
}
// export const CoreLayout = ({ children, location }: { children: HTMLElement, location: Object }) => (
//   <div className={styles['core-layout']}>
//     <div className={styles['header']}>
//       <HeaderBar />
//     </div>
//     <div className={styles['content']}>
//       <div className={styles['side-nav']}>
//         <LeftPanel />
//       </div>
//       <div className={styles['viewport']}>
//         {children}
//       </div>
//     </div>
//   </div>
// )

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  location: React.PropTypes.object.isRequired
}

export default CoreLayout
