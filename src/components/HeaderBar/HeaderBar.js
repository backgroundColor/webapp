import React from 'react'
import styles from './HeaderBar.css'
export default class HeaderBar extends React.Component {

  render () {
    return (
      <div className={styles['headerbar']}>
        <div className={styles['logo']}>
          <img height='30' src={require('../../static/logo.png')} />
        </div>
        <div className={styles['login']}>
          hi ~ <span>admin</span> &nbsp;&nbsp;&nbsp;
          <a>退出&nbsp;&nbsp;<i className='fa fa-sign-out' aria-hidden='true' /></a>
        </div>
      </div>
    )
  }
}
