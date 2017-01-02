import React from 'react'
import ModifyUser from 'components/ModifyUser'
import PageMess from 'components/PageMess'

export default class ModifyUserView extends React.Component {

  render () {
    return (
      <div>
        <PageMess title='修改用户' />
        <ModifyUser />
      </div>
    )
  }
}
