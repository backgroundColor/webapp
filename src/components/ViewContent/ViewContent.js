import React from 'react'
import styles from './ViewContent.css'
import { route } from 'react-router'
import { connect } from 'react-redux'

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
        {
          // (() => {
          //   switch (this.props.params.id) {
          //     case 'adduser':
          //       return <div>adduser</div>
          //     case 'modifyuser':
          //       return <div>modifyuser</div>
          //     default:
          //       return
          //   }
          // })()
        }
      </div>
    )
  }
}

// connect(route)(ViewContent)

export default connect(route)(ViewContent)
