import React from 'react'
import styles from './AddUser.css'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, Radio} from 'antd'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option
type Props = {
  form: object
}
class AddUser extends React.Component {
  props: Props
  state = {
    passwordDirty: false
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // fetch 后台
      }
    })
  }
  handlePasswordBlur(e) {
    const value = e.target.value
    this.setState({ passwordDirty: this.state.passwordDirty || !!value })
  }
  checkPassword(rule, value, callback) {
     const form = this.props.form
     if (value && value !== form.getFieldValue('password')) {
       callback('两次输入不一致!')
     } else {
       callback()
     }
   }
 checkConfirm(rule, value, callback) {
   const form = this.props.form
   if (value && this.state.passwordDirty) {
     form.validateFields(['confirm'], { force: true })
   }
   callback()
 }


 handleReset () {
    this.props.form.resetFields()
  }

 // checkLevel (rule, value, callback) {
 //   const form = this.props.form
 //   if (value && this.state.passwordDirty) {
 //     form.validateFields(['confirm'], { force: true })
 //   }
 //   callback()
 // }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div className={styles['add-user']}>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                用户名;
                <Tooltip title="人们怎么叫你?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input placeholder='请输入用户名' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密 码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" placeholder='请输入密码' onBlur={this.handlePasswordBlur} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='确认密码'
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认你的密码输入与第一次一样!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" placeholder='请输入确认密码' />
            )}
          </FormItem>
          <FormItem
            label="管理员级别"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('level', {
              rules: [{
                required: true, message: '请选择一个级别',
              }, {
                validator: this.checkLevel,
              }],
            })(
              <RadioGroup>
                <RadioButton value="1">一级管理员</RadioButton>
                <RadioButton value="2">二级管理员</RadioButton>
                <RadioButton value="3">三级管理员</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <div style={{textAlign: 'center'}}>
           <Button type="primary" htmlType="submit" size="large">注册</Button>
           <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
         </div>
        </Form>
      </div>
    )
  }
}
AddUser = Form.create({})(AddUser)
export default AddUser