import React from 'react'
import TableView from '../TableView'
import ProSelect from '../ProSelect'
const columns = [{
  title: '标题',
  dataIndex: 'title'
  // filters: [{
  //   text: 'Joe',
  //   value: 'Joe'
  // }, {
  //   text: 'Jim',
  //   value: 'Jim'
  // }, {
  //   text: 'Submenu',
  //   value: 'Submenu',
  //   children: [{
  //     text: 'Green',
  //     value: 'Green'
  //   }, {
  //     text: 'Black',
  //     value: 'Black'
  //   }]
  // }],
  // onFilter: (value, record) => record.name.indexOf(value) === 0,
  // sorter: (a, b) => a.name.length - b.name.length
}, {
  title: '内容',
  dataIndex: 'content'
  // sorter: (a, b) => a.age - b.age
}, {
  title: '时间',
  dataIndex: 'createTime'
  // filters: [{
  //   text: 'London',
  //   value: 'London'
  // }, {
  //   text: 'New York',
  //   value: 'New York'
  // }],
  // filterMultiple: false,
  // onFilter: (value, record) => record.address.indexOf(value) === 0,
  // sorter: (a, b) => a.address.length - b.address.length
}]

export default class WarnView extends React.Component {

  constructor () {
    super()
    this.state = {
      data: []
    }
    this.getData = this.getData.bind(this)
  }
  getData (value) {
    console.info(value)
    const data = value && value.map((item, index) => {
      return { key: index + 1, title: item.title, content: item.content, createTime: item.createTime }
    })
    this.setState({
      data
    })
  }
  render () {
    const { data = [] } = this.state
    return (
      <div>
        <ProSelect getData={this.getData} str='' />
        <TableView columns={columns} data={data} />
      </div>
    )
  }
}
