import React from 'react'
import styles from './LayoutView.css'
import PageMess from '../PageMess'
import ViewContent from '../ViewContent'
type Props = {
  type: String,
  title: String,
  location: React.PropTypes.object.isRequired
}
export default class LayoutView extends React.Component {
  props: Props
  //
  // constructor (props) {
  //   super(props)
  // }
  componentDidMount () {
    // console.log(this.props)
  }
  render () {
    return (
      <div className={styles['layout-view']}>
        <PageMess title={this.props.title} />
        <ViewContent {...this.props} />
      </div>
    )
  }
}
