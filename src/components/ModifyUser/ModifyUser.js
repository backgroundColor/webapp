import React from 'react'
import { Table, Input, Popconfirm, notification } from 'antd'
import EditableCell from './EditableCell'

class ModifyUser extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      width: '40px',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'id', text)
    }, {
      title: '用户名',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text)
    }, {
      title: '密码',
      dataIndex: 'password',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'password', text)
    }, {
      title: '用户级别',
      dataIndex: 'level',
      width: '20%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'level', text)
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].name
        return (<div className='editable-row-operations'>
          {
            editable
              ? <span>
                <a onClick={() => this.editDone(index, 'save')}>保存</a>&nbsp;&nbsp;
                <Popconfirm title='确定取消?' onConfirm={() => this.editDone(index, 'cancel')}>
                  <a>取消</a>
                </Popconfirm>
              </span>
              : <span>
                <a onClick={() => this.edit(index)}>修改</a>&nbsp;&nbsp;
                <Popconfirm title='确定删除?' onConfirm={() => this.delUser(index)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
          }
        </div>)
      }
    }]
    this.state = {
      data: []
    }
    this.getUsers = this.getUsers.bind(this)
    this.delUser = this.delUser.bind(this)
  }

  delUser (index) {
    const { data } = this.state
    console.log(data[index])
    fetch(`${__TASK_URL__}user/delete`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data[index]['id'].value })
    })
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json === 'yes') {
        notification['success']({
          message: '成功',
          description: '删除成功'
        })
        this.getUsers()
      } else {
        notification['error']({
          message: '错误',
          description: '删除失败'
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '删除失败'
      })
    })
  }

  componentDidMount () {
    this.getUsers()
  }

  getUsers () {
    fetch(`${__TASK_URL__}allusers`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page: 1, size: 10 })
    })
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json.code === 0) {
        console.info(json)
        this.setState({
          data: json.body.items.map((item, index) => {
            return {
              key: index + 1,
              id: {
                editable: false,
                value: item.id
              },
              name: {
                editable: false,
                value: item.name
              },
              level: {
                editable: false,
                value: item.level
              },
              password: {
                editable: false,
                value: item.pass
              },
              createTime: {
                editable: false,
                value: item.createTime
              }
            }
          })
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '访问失败'
      })
    })
  }

  renderColumns (data, index, key, text) {
    const { editable, status } = data[index][key]
    if (typeof editable === 'undefined') {
      return text
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />)
  }
  handleChange (key, index, value) {
    const { data } = this.state
    data[index][key].value = value
    this.setState({ data })
  }
  edit (index) {
    const { data } = this.state
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true
      }
    })
    this.setState({ data })
  }
  editDone (index, type) {
    const { data } = this.state
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false
        data[index][item].status = type
      }
    })
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status
        }
      })
    })
  }
  render () {
    const { data } = this.state
    const dataSource = data.map((item) => {
      const obj = {}
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value
      })
      return obj
    })
    const columns = this.columns
    return <Table bordered dataSource={dataSource} columns={columns} />
  }
}

export default ModifyUser
