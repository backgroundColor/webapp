import React from 'react'
import LayoutView from 'components/LayoutView'
const propTypes = {
  params: React.PropTypes.object.isRequired
}
export default class Maps extends React.Component {
  props: propTypes
  componentDidMount () {
    // console.log(this.props)
  }
  render () {
    return (
      <div style={{height: '100%'}}>
        <LayoutView type='runtime' title='实时数据' />
      </div>
    )
  }
}
