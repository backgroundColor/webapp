import React from 'react'
import { Form, Tooltip, Icon, Input, Table, Popconfirm, notification, Modal, Radio } from 'antd'
import EditableCell from './EditableCell'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
type Props = {
  form: Object
}
class ModifyUser extends React.Component {
  props: Props

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
        const that = this
        return <span>
          <a onClick={function () { that.modfiyUser(index) }}>修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title='确定删除?' onConfirm={() => this.delUser(index)}>
            <a>删除</a>
          </Popconfirm>
        </span>
      }
      // render: (text, record, index) => {
      //   const { editable } = this.state.data[index].name
      //   return (<div className='editable-row-operations'>
      //     {
      //       editable
      //         ? <span>
      //           <a onClick={() => this.editDone(index, 'save')}>保存</a>&nbsp;&nbsp;
      //           <Popconfirm title='确定取消?' onConfirm={() => this.editDone(index, 'cancel')}>
      //             <a>取消</a>
      //           </Popconfirm>
      //         </span>
      //         : <span>
      //           <a onClick={() => this.edit(index)}>修改</a>&nbsp;&nbsp;
      //           <Popconfirm title='确定删除?' onConfirm={() => this.delUser(index)}>
      //             <a>删除</a>
      //           </Popconfirm>
      //         </span>
      //     }
      //   </div>)
      // }
    }]
    this.state = {
      data: [],
      visible: false,
      confirmLoading: false,
      userMess: {}
    }
    this.getUsers = this.getUsers.bind(this)
    this.delUser = this.delUser.bind(this)
    this.modfiyUser = this.modfiyUser.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.queryModify = this.queryModify.bind(this)
  }

  modfiyUser (index) {
    // console.info(index)
    const { data } = this.state
    let userMess = {}
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item]) {
        userMess[item] = data[index][item].value
      }
    })
    this.setState({ userMess, visible: true })
    console.info(userMess)
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
  handleOk (e) {
    // this.setState({ visible: false, confirmLoading: true })
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        let userMess = {
          'name': values.name,
          'pass': values.pass,
          'level': values.level,
          'token': ''
        }
        console.info(userMess)
        this.queryModify(userMess)
        // this.addUser(userMess)
      }
    })
  }
  queryModify (value) {
    console.log(value)
    fetch(`${__TASK_URL__}user/modify`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: value
    })
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json.code === 0) {
        console.info('success!!')
        this.setState({ visible: false })
        this.getUsers()
        notification['success']({
          message: '成功',
          description: '修改成功！！'
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: '修改失败！！'
      })
    })
  }
  handleCancel () {
    this.props.form.resetFields()
    this.setState({ visible: false, confirmLoading: false })
  }
  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('pass')) {
      callback('两次输入不一致!')
    } else {
      callback()
    }
  }
  checkConfirm (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const { data, userMess } = this.state
    const dataSource = data.map((item) => {
      const obj = {}
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value
      })
      return obj
    })
    const columns = this.columns
    return (
      <div>
        <Table bordered dataSource={dataSource} columns={columns} />
        <Modal title='Modal' visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          okText='确定' cancelText='取消'
          >
          <div>
            <Form horizontal>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    用户名;
                    <Tooltip title='人们怎么叫你?'>
                      <Icon type='question-circle-o' />
                    </Tooltip>
                  </span>
                )}
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: userMess.name
                })(
                  <Input placeholder='请输入用户名' />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='密 码'
                hasFeedback
              >
                {getFieldDecorator('pass', {
                  rules: [{
                    required: true, message: '请输入密码!'
                  }, {
                    validator: this.checkConfirm
                  }],
                  initialValue: userMess.password
                })(
                  <Input type='password' placeholder='请输入密码' onBlur={this.handlePasswordBlur} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='确认密码'
                hasFeedback
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: '请确认你的密码输入与第一次一样!'
                  }, {
                    validator: this.checkPassword
                  }],
                  initialValue: userMess.password
                })(
                  <Input type='password' placeholder='请输入确认密码' />
                )}
              </FormItem>
              <FormItem
                label='管理员级别'
                {...formItemLayout}
                hasFeedback
              >
                {getFieldDecorator('level', {
                  rules: [{
                    required: true, message: '请选择一个级别'
                  }],
                  initialValue: userMess.level
                })(
                  <RadioGroup>
                    <RadioButton value={1}>一级管理员</RadioButton>
                    <RadioButton value={2}>二级管理员</RadioButton>
                    <RadioButton value={3}>三级管理员</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create({})(ModifyUser)
