import React from 'react'
import AddUser from 'components/AddUser'
import PageMess from 'components/PageMess'

export default class AddUserView extends React.Component {

  render () {
    return (
      <div>
        <PageMess title='添加用户' />
        <AddUser />
      </div>
    )
  }
}
