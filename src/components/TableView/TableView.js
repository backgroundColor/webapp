import React from 'react'
import { Table } from 'antd'
type Props = {
  columns: array,
  data: array,
  pagination: boolean
}
export default class TableView extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter)
  }
  render () {
    return (
      <div>
        <Table bordered pagination={this.props.pagination}
          columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
      </div>
    )
  }
}
