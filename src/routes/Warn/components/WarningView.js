import React from 'react'
import ModifyUser from 'components/ModifyUser'
import PageMess from 'components/PageMess'
import WarnView from 'components/WarnView'
export default class WarningView extends React.Component {

  render () {
    return (
      <div>
        <PageMess title='报警记录' />
        <WarnView />
      </div>
    )
  }
}
