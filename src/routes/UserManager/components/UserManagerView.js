import React from 'react'
import LayoutView from 'components/LayoutView'
type Props = {
  params: Object
}
class UserManger extends React.Component {
  props: Props
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    console.log(this)
  }
  render () {
    return (
      <div style={{height: '100%'}}>
        <LayoutView type='user' title='用户管理' {...this.props} />
      </div>
    )
  }
}

export default UserManger
