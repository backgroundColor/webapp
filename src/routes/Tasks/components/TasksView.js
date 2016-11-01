import React from 'react'
import TaskTableView from 'components/TaskTableView'

export default class TasksView extends React.Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <TaskTableView type={'tasks'} />
      </div>
    )
  }
}
