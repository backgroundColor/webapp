import React from 'react'
import TableView from '../TableView'
import ProSelect from '../ProSelect'
import { notification, Spin } from 'antd'
import { universalFetch } from 'modules/fetch'
const columns = [{
  title: '标题',
  dataIndex: 'title',
  width: 200
}, {
  title: '内容',
  dataIndex: 'content'
}, {
  title: '时间',
  dataIndex: 'createTime',
  width: 300
}]

export default class WarnView extends React.Component {

  constructor () {
    super()
    this.state = {
      data: [],
      projectId: 0,
      total: 1,
      loading: false
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
    this.setState({ loading: true })
    universalFetch(`${__TASK_URL__}reports?page=${page}&size=10&id=${id}`)
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json && json.code === 0) {
        const data = json.body.items.map((item, index) => {
          return { key: index + 1, title: item.title, content: item.content, createTime: item.createTime }
        })
        this.setState({ data, total: json.body.info.total, loading: false })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '获取项目数据失败！！'
      })
      this.setState({ loading: false })
    })
  }
  render () {
    const { data = [], total, projectId } = this.state
    return (
      <div>
        <ProSelect getProId={this.getProId} str='' />
        <Spin tip='加载中...' spinning={this.state.loading}>
          <TableView columns={columns} data={data}
            total={total}
            onChange={this.getData}
            id={projectId} />
        </Spin>
      </div>
    )
  }
}
