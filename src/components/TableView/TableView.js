import React from 'react'
import { Table } from 'antd'
type Props = {
  columns: array,
  data: array,
  pagination: boolean,
  total: String,
  id: String,
  onChange: Function
}
export default class TableView extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (pagination, filters, sorter) {
    // console.info(pagination)
    // console.log('params', pagination, filters, sorter)
    this.props.onChange && this.onChange(pagination.current, this.props.id)
  }
  render () {
    const pageOptions = {
      defaultCurrent: 1,
      total: this.props.total
    }
    return (
      <div>
        <Table bordered pagination={!this.props.pagination && pageOptions}
          columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
      </div>
    )
  }
}
