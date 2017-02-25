import React from 'react'
import { Table } from 'antd'
import R from 'ramda'
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
    console.info(this.props.pagination)
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
    const isFilter = n => n !== null || n
    return (
      <div>
        <Table bordered pagination={this.props.pagination !== false && pageOptions}
          columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
      </div>
    )
  }
}
