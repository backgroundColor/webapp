import React from 'react'
import PageMess from 'components/PageMess'
import History from 'components/History'
export default class RunTimeView extends React.Component {

  render () {
    return (
      <div style={{ height: '100%' }}>
        <PageMess title='历史数据' />
        <History />
      </div>
    )
  }
}
