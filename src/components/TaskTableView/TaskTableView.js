import React from 'react'
import classes from './TaslTableView.css'
import moment from 'moment'
type Props = {
  path: string,
  type: string
}
export default class TaskTableView extends React.Component {
  props: Props
  componentDidMount () {
    console.log(this.props.path)
  }
  render () {
    return (
      <div className={classes['task-table-container']}>
        testview
      </div>
    )
  }
}
