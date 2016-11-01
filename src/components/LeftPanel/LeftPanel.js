import React from 'react'
import classes from './LeftPanel.css'
import { IndexLink, Link } from 'react-router'
export default class LeftPanel extends React.Component {

  render () {
    return (
      <div className={classes['left-panel']}>
        <div className={classes['left-panel-logo']}>
          <div className={classes['left-panel-logo-img']}>
            <img src={require('../../static/logo.png')} />
              Task Pro
          </div>
        </div>
        <div className={classes['left-panel-link']}>
          <ul>
            <li>
              <IndexLink to='/tasks' activeClassName={classes['active']}>
                <i className="fa fa-file" aria-hidden="true"></i>
                {'  '}项目</IndexLink>
            </li>
            <li>
              <Link to='/instances' activeClassName={classes['active']}>
                <i className="fa fa-file" aria-hidden="true"></i>
                {'  '}作业</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
