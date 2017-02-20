import React from 'react'
import TableView from '../TableView'
import ProSelect from '../ProSelect'
import { notification } from 'antd'
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
      data: [],
      projectId: 0,
      total: 1
    }
    this.getData = this.getData.bind(this)
    this.getProId = this.getProId.bind(this)
  }
  getProId (value) {
    console.info(value)
    this.setState({ projectId: value })
    this.getData(value, 1)
  }
  getData (id, page) {
    fetch(`${__TASK_URL__}reports?page=${page}&size=10&id=${id}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json && json.code === 0) {
        const data = json.body.items.map((item, index) => {
          return { key: index + 1, title: item.title, content: item.content, createTime: item.createTime }
        })
        this.setState({ data, total: json.body.info.total })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '获取项目数据失败！！'
      })
    })
  }
  render () {
    const { data = [], total, projectId } = this.state
    return (
      <div>
        <ProSelect getProId={this.getProId} str='' />
        <TableView columns={columns} data={data}
          total={total}
          onChange={this.getData}
          d={projectId} />
      </div>
    )
  }
}
