import React from 'react'
import styles from './HeaderBar.css'
import { menuOpen, menuClose } from 'store/MenuStatus/action'
import { connect } from 'react-redux'
type Props = {
  menuOpen: Function,
  menuClose: Function,
  menustatus: String
}
class HeaderBar extends React.Component {
  props: Props

  componentDidMount () {
    console.info('menustatus', this.props)
  }
  render () {
    return (
      <div className={styles['headerbar']}>
        <div className={styles['logo']}>
          <img height='30' src={require('../../static/logo.png')} />
        </div>
        <div className={styles['vertical-menu']}>
          <i className='fa fa-bars' aria-hidden='true' />
        </div>
        <div className={styles['login']}>
          hi ~ <span>admin</span> &nbsp;&nbsp;&nbsp;
          <a>退出&nbsp;&nbsp;<i className='fa fa-sign-out' aria-hidden='true' /></a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menustatus: state.menuStatus
})

export default connect(mapStateToProps, { menuOpen, menuClose })(HeaderBar)
