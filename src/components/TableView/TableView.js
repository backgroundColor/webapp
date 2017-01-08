import React from 'react'
import { Table } from 'antd'
type Props = {
  columns: array,
  data: array
}
export default class TableView extends React.Component {
  props: props
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange(pagination, filters, sorter) {
   console.log('params', pagination, filters, sorter);
  }
  render () {
    return (
      <div>
        <Table columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
      </div>
    )
  }
}