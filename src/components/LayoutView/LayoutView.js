import React from 'react'
import styles from './LayoutView.css'
import PageMess from '../PageMess'
import ViewContent from '../ViewContent'
type Props = {
  type: String,
  title: String
}
export default class LayoutView extends React.Component {
  // props: props
  //
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles['layout-view']}>
        <PageMess title={this.props.title} />
        <ViewContent {...this.props} />
      </div>
    )
  }
}
