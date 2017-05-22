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
  componentDidUpdate () {
    // console.info(this.props.pagination)
  }
  onChange (pagination, filters, sorter) {
    console.info(pagination)
    // console.log('params', pagination, filters, sorter)
    this.props.onChange && this.props.onChange(this.props.id, pagination.current)
  }

  render () {
    const pageOptions = {
      // defaultCurrent: 1,
      pageSize: 10,
      total: this.props.total
    }
    // const isFilter = n => n !== null || n
    return (
      <div>
        <Table bordered
          columns={this.props.columns} dataSource={this.props.data}
          pagination={this.props.pagination !== false && pageOptions}
          scroll={{ x: 1010, y: 300 }}
          onChange={this.onChange} />
      </div>
    )
  }
}
