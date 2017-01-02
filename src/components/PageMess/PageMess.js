import React from 'react'
import styles from './PageMess.css'
type Props = {
  title: String
}
export default class PageMess extends React.Component {
  props: Props

  constructor (props) {
    super(props)
  }

  componentDidUpdate () {
    console.log(this.props)
  }

  render () {
    return (
      <div className={styles['page-mess']}>
        {this.props.title}
      </div>
    )
  }
}
