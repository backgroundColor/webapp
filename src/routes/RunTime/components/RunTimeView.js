import React from 'react'
import PageMess from 'components/PageMess'
import RunTime from 'components/RunTime'
export default class RunTimeView extends React.Component {

  render () {
    return (
      <div style={{height: '100%'}}>
        <PageMess title='实时数据' />
        <RunTime />
      </div>
    )
  }
}
