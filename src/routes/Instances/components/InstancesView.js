import React from 'react'
import TaskTableView from 'components/TaskTableView'
const propTypes = {
  params: React.PropTypes.object.isRequired
}
export default class InstancesView extends React.Component {
  props: propTypes
  componentDidMount () {
    // console.log(this.props)
  }
  render () {
    return (
      <div style={{height: '100%'}}>
        <TaskTableView path={this.props.route.path} type={'instances'} />
      </div>
    )
  }
}
