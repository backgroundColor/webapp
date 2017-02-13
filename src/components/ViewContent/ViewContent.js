import React from 'react'
import styles from './ViewContent.css'
import { route } from 'react-router'
import { connect } from 'react-redux'
import MapBox from '../MapBox'
class ViewContent extends React.Component {

  componentDidMount () {
    console.log(this)
  }
  componentDidUpdate () {
    console.log(this)
  }
  render () {
    return (
      <div className={styles['view-content']}>
        <MapBox />
      </div>
    )
  }
}

// connect(route)(ViewContent)

export default connect(route)(ViewContent)
