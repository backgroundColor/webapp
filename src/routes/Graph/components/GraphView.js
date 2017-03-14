import React from 'react'
import PageMess from 'components/PageMess'
import GraphView from 'components/GraphView'
export default class RunTimeView extends React.Component {

  render () {
    return (
      <div style={{ height: '100%' }}>
        <PageMess title='趋势曲线' />
        <GraphView />
      </div>
    )
  }
}
